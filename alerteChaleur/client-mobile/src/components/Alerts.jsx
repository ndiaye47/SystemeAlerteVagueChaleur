import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, Clock, MapPin, Thermometer } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulation d'alertes
    setAlerts([
      {
        id: 1,
        type: 'extreme',
        title: 'Alerte Extrême - Vague de Chaleur',
        message: 'Température exceptionnellement élevée prévue. Risque sanitaire majeur. Restez à l\'intérieur et hydratez-vous régulièrement.',
        location: 'Matam',
        temperature: 47,
        time: '2025-07-24 08:00',
        isRead: false
      },
      {
        id: 2,
        type: 'high',
        title: 'Alerte Forte - Chaleur Intense',
        message: 'Température très élevée attendue. Évitez les activités extérieures entre 11h et 17h.',
        location: 'Podor',
        temperature: 44,
        time: '2025-07-24 07:30',
        isRead: true
      },
      {
        id: 3,
        type: 'medium',
        title: 'Vigilance - Température Élevée',
        message: 'Température élevée prévue. Prenez des précautions supplémentaires.',
        location: 'Kaffrine',
        temperature: 41,
        time: '2025-07-24 06:45',
        isRead: true
      },
      {
        id: 4,
        type: 'info',
        title: 'Information - Prévention Santé',
        message: 'Conseils d\'hydratation et de protection adaptés à votre profil de santé.',
        location: 'Dakar',
        temperature: 38,
        time: '2025-07-23 20:15',
        isRead: true
      }
    ]);
  }, []);

  const getAlertColor = (type) => {
    switch (type) {
      case 'extreme': return 'bg-purple-100 border-purple-500 text-purple-900';
      case 'high': return 'bg-red-100 border-red-500 text-red-900';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-900';
      case 'info': return 'bg-blue-100 border-blue-500 text-blue-900';
      default: return 'bg-gray-100 border-gray-500 text-gray-900';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'extreme':
      case 'high':
        return <AlertTriangle className="h-5 w-5" />;
      case 'medium':
        return <Thermometer className="h-5 w-5" />;
      case 'info':
        return <Bell className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.isRead;
    return alert.type === filter;
  });

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Alertes & Notifications</h1>
      </div>

      {/* Filtres */}
      <div className="px-4 py-4">
        <div className="flex space-x-2 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              filter === 'all' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              filter === 'unread' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Non lues
          </button>
          <button
            onClick={() => setFilter('extreme')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              filter === 'extreme' 
                ? 'bg-purple-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Extrêmes
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              filter === 'high' 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Fortes
          </button>
        </div>
      </div>

      {/* Liste des alertes */}
      <div className="px-4 space-y-4">
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            className={`bg-white rounded-2xl shadow-lg border-l-4 p-4 ${getAlertColor(alert.type)} ${
              !alert.isRead ? 'ring-2 ring-orange-200' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                {getAlertIcon(alert.type)}
                <h3 className="font-semibold ml-2 text-sm">{alert.title}</h3>
              </div>
              {!alert.isRead && (
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
              )}
            </div>

            <p className="text-sm mb-3 leading-relaxed">{alert.message}</p>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{alert.location}</span>
                </div>
                <div className="flex items-center">
                  <Thermometer className="h-3 w-3 mr-1" />
                  <span>{alert.temperature}°C</span>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{formatTime(alert.time)}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune alerte</h3>
            <p className="text-gray-600">Aucune alerte ne correspond à vos critères de filtrage.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;

