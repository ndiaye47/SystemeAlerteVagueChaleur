import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Bell, Settings, User, LogOut, Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
    }
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setShowMobileMenu(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowMobileMenu(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo et titre */}
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🌡️</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Alerte Chaleur
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Sénégal
            </p>
          </div>
        </div>

        {/* Actions en haut à droite */}
        <div className="flex items-center space-x-2">
          {/* Bouton de basculement de thème */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Menu mobile */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {showMobileMenu && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="p-4 space-y-3">
            {/* Profil utilisateur */}
            {user && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Actions du menu */}
            <div className="space-y-2">
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <User className="h-4 w-4 mr-3" />
                Mon Profil
              </button>
              
              <button
                onClick={handleSettingsClick}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Settings className="h-4 w-4 mr-3" />
                Paramètres
              </button>
              
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay pour fermer le menu mobile */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40" 
          onClick={() => setShowMobileMenu(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;

