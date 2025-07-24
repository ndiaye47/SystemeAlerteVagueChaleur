import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [weatherData, setWeatherData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Dakar');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCities();
    fetchWeatherData();
    fetchAlerts();
  }, [selectedCity]);

  const fetchCities = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/weather/cities');
      const data = await response.json();
      if (data.success) {
        setCities(data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des villes:', error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/weather/current/${selectedCity}`);
      const data = await response.json();
      if (data.success) {
        setWeatherData(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error);
      setLoading(false);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/weather/alerts/active');
      const data = await response.json();
      if (data.success) {
        setAlerts(data.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
    }
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 40) return 'text-red-500';
    if (temp >= 35) return 'text-orange-500';
    if (temp >= 30) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'très_dangereux': return 'bg-red-600';
      case 'dangereux': return 'bg-red-500';
      case 'très_inconfortable': return 'bg-orange-500';
      case 'inconfortable': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des données météo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="px-4 py-6 space-y-6 pb-20">
        {/* Sélecteur de ville */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            📍 Localisation
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Données météo actuelles */}
        {weatherData && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{weatherData.city}</h2>
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl mr-3">{weatherData.current.weatherDescription.icon}</span>
                <div>
                  <div className={`text-4xl font-bold ${getTemperatureColor(weatherData.current.temperature)}`}>
                    {Math.round(weatherData.current.temperature)}°C
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    Ressenti {Math.round(weatherData.current.apparentTemperature)}°C
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{weatherData.current.weatherDescription.description}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Mis à jour à {formatTime(weatherData.current.time)}
              </p>
            </div>

            {/* Détails météo */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center border border-blue-200 dark:border-blue-800">
                <span className="text-2xl">💧</span>
                <div className="text-sm text-gray-600 dark:text-gray-400">Humidité</div>
                <div className="font-semibold text-blue-600 dark:text-blue-400">{weatherData.current.humidity}%</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center border border-green-200 dark:border-green-800">
                <span className="text-2xl">💨</span>
                <div className="text-sm text-gray-600 dark:text-gray-400">Vent</div>
                <div className="font-semibold text-green-600 dark:text-green-400">{Math.round(weatherData.current.windSpeed)} km/h</div>
              </div>
            </div>

            {/* Niveau de risque */}
            <div className={`${getRiskLevelColor(weatherData.current.heatRiskLevel.level)} rounded-lg p-4 text-white`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{weatherData.current.heatRiskLevel.label}</span>
                <span className="text-2xl">🛡️</span>
              </div>
              <p className="text-sm mb-3 opacity-90">{weatherData.current.heatRiskLevel.description}</p>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Recommandations :</p>
                {weatherData.current.heatRiskLevel.recommendations.map((rec, index) => (
                  <p key={index} className="text-xs opacity-90">• {rec}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Alertes actives */}
        {alerts.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              Alertes Actives ({alerts.length})
            </h3>
            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert, index) => (
                <div key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-red-800 dark:text-red-300">{alert.title}</span>
                    <span className="text-red-600 dark:text-red-400 text-xs">{alert.city}</span>
                  </div>
                  <p className="text-red-700 dark:text-red-300 text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions rapides */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-4 text-center shadow-sm transition-colors">
            <span className="text-2xl block mb-2">☀️</span>
            <div className="font-medium">Prévisions</div>
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white rounded-xl p-4 text-center shadow-sm transition-colors">
            <span className="text-2xl block mb-2">📞</span>
            <div className="font-medium">Urgence</div>
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 text-center shadow-sm transition-colors">
            <span className="text-2xl block mb-2">📝</span>
            <div className="font-medium">Signaler</div>
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-4 text-center shadow-sm transition-colors">
            <span className="text-2xl block mb-2">👤</span>
            <div className="font-medium">Mon Profil</div>
          </button>
        </div>
      </div>

      {/* Navigation mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center py-2 px-3 text-blue-600 dark:text-blue-400">
            <span className="text-lg mb-1">🌡️</span>
            <span className="text-xs">Accueil</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <span className="text-lg mb-1">⚠️</span>
            <span className="text-xs">Alertes</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <span className="text-lg mb-1">📝</span>
            <span className="text-xs">Signaler</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <span className="text-lg mb-1">📞</span>
            <span className="text-xs">Urgence</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <span className="text-lg mb-1">👤</span>
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

