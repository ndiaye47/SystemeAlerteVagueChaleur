import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  Shield, 
  LogOut, 
  ChevronRight,
  Moon,
  Sun,
  Volume2,
  Vibrate,
  MapPin,
  Heart
} from 'lucide-react';

const Settings = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    alerts: true,
    weather: true,
    health: true,
    sound: true,
    vibration: true
  });
  const [language, setLanguage] = useState('fr');

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Paramètres</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profil utilisateur */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{user?.username}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-400 mr-3" />
              <span className="text-gray-700 dark:text-gray-300">{user?.location}</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.profileType === 'elderly' ? 'Personne âgée' :
                 user?.profileType === 'pregnant' ? 'Femme enceinte' :
                 user?.profileType === 'child' ? 'Enfant' :
                 user?.profileType === 'chronic' ? 'Maladie chronique' :
                 'Profil normal'}
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Alertes météo</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Notifications de vagues de chaleur</p>
              </div>
              <button
                onClick={() => handleNotificationChange('alerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.alerts ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.alerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Prévisions météo</p>
                <p className="text-sm text-gray-600">Bulletins météorologiques quotidiens</p>
              </div>
              <button
                onClick={() => handleNotificationChange('weather')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.weather ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.weather ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Conseils santé</p>
                <p className="text-sm text-gray-600">Recommandations personnalisées</p>
              </div>
              <button
                onClick={() => handleNotificationChange('health')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.health ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.health ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <hr className="my-4" />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 className="h-4 w-4 text-gray-400 mr-3" />
                <span className="font-medium text-gray-900">Son</span>
              </div>
              <button
                onClick={() => handleNotificationChange('sound')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.sound ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.sound ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Vibrate className="h-4 w-4 text-gray-400 mr-3" />
                <span className="font-medium text-gray-900">Vibration</span>
              </div>
              <button
                onClick={() => handleNotificationChange('vibration')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.vibration ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.vibration ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Apparence */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Sun className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Apparence</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900 dark:text-white">Thème</span>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  theme === 'light' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Sun className="h-4 w-4 inline mr-1" />
                Clair
              </button>
              <button
                onClick={() => theme === 'light' && toggleTheme()}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  theme === 'dark' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Moon className="h-4 w-4 inline mr-1" />
                Sombre
              </button>
            </div>
          </div>
        </div>

        {/* Langue */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Globe className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Langue</h2>
          </div>
          
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="fr">Français</option>
            <option value="wo">Wolof</option>
            <option value="ff">Pulaar</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Sécurité */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sécurité</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <span className="font-medium text-gray-900 dark:text-white">Changer le mot de passe</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <span className="font-medium text-gray-900 dark:text-white">Données personnelles</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* À propos */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">À propos</h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <span className="font-medium text-gray-900 dark:text-white">Aide & Support</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <span className="font-medium text-gray-900 dark:text-white">Conditions d'utilisation</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <span className="font-medium text-gray-900 dark:text-white">Politique de confidentialité</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Version 1.0.0</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">© 2025 MBOYY MII Alert</p>
          </div>
        </div>

        {/* Déconnexion */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="font-medium">Se déconnecter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

