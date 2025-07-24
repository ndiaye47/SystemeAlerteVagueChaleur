import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  CloudSun, 
  FileText, 
  Settings, 
  LogOut,
  Thermometer,
  Bell,
  Moon,
  Sun
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      icon: LayoutDashboard,
      label: 'Tableau de bord',
      description: 'Vue d\'ensemble'
    },
    {
      path: '/users',
      icon: Users,
      label: 'Utilisateurs',
      description: 'Gestion des comptes'
    },
    {
      path: '/alerts',
      icon: AlertTriangle,
      label: 'Alertes',
      description: 'Gestion des alertes'
    },
    {
      path: '/weather',
      icon: CloudSun,
      label: 'Météo',
      description: 'Données climatiques'
    },
    {
      path: '/reports',
      icon: FileText,
      label: 'Rapports',
      description: 'Signalements terrain'
    },
    {
      path: '/settings',
      icon: Settings,
      label: 'Paramètres',
      description: 'Configuration'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
            <Thermometer className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">MBOYY MII</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link key={item.path} to={item.path}>
              <div className={`
                group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                ${active 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }
              `}>
                <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`} />
                <div className="flex-1">
                  <div className={`font-medium text-sm ${active ? 'text-white' : 'dark:text-gray-300'}`}>
                    {item.label}
                  </div>
                  <div className={`text-xs ${active ? 'text-orange-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {item.description}
                  </div>
                </div>
                {active && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User info et logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.username}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        
        {/* <Button 
          onClick={toggleTheme}
          variant="outline" 
          className="w-full justify-start gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-600 mb-2 dark:border-gray-600"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}
        </Button> */}
        
        <Button 
          onClick={logout}
          variant="outline" 
          className="w-full justify-start gap-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-600 dark:border-gray-600"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

