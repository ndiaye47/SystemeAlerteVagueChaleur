import React, { useState, useEffect } from 'react';
import { Sun, Cloud, Droplets, Wind, Eye, Thermometer, MapPin, Calendar } from 'lucide-react';

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('Dakar');

  const locations = [
    'Dakar', 'Thiès', 'Kaolack', 'Saint-Louis', 'Ziguinchor',
    'Diourbel', 'Tambacounda', 'Fatick', 'Kolda', 'Matam',
    'Kaffrine', 'Kédougou', 'Louga', 'Sédhiou', 'Podor'
  ];

  useEffect(() => {
    fetchWeatherData();
  }, [selectedLocation]);

  const fetchWeatherData = () => {
    // Simulation de données météo
    setTimeout(() => {
      setWeatherData({
        location: selectedLocation,
        temperature: Math.floor(Math.random() * 15) + 35, // 35-50°C
        humidity: Math.floor(Math.random() * 40) + 20, // 20-60%
        windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
        uvIndex: Math.floor(Math.random() * 5) + 6, // 6-11
        visibility: Math.floor(Math.random() * 5) + 5, // 5-10 km
        pressure: Math.floor(Math.random() * 20) + 1010, // 1010-1030 hPa
        riskLevel: Math.random() > 0.5 ? 'high' : 'extreme',
        condition: 'sunny'
      });

      // Prévisions sur 5 jours
      const forecastData = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        forecastData.push({
          date: date.toISOString().split('T')[0],
          day: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
          maxTemp: Math.floor(Math.random() * 15) + 35,
          minTemp: Math.floor(Math.random() * 10) + 25,
          condition: 'sunny',
          riskLevel: Math.random() > 0.6 ? 'high' : 'extreme'
        });
      }
      setForecast(forecastData);
    }, 500);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'extreme': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskText = (level) => {
    switch (level) {
      case 'low': return 'Faible';
      case 'medium': return 'Modéré';
      case 'high': return 'Élevé';
      case 'extreme': return 'Extrême';
      default: return 'Inconnu';
    }
  };

  if (!weatherData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Météo & Climat</h1>
      </div>

      {/* Sélecteur de localisation */}
      <div className="px-4 py-4">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className="px-4 space-y-6">
        {/* Météo actuelle */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">{weatherData.location}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(weatherData.riskLevel)}`}>
              Risque {getRiskText(weatherData.riskLevel)}
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {weatherData.temperature}°C
            </div>
            <div className="flex items-center justify-center mb-4">
              <Sun className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="text-gray-600">Ensoleillé</span>
            </div>
          </div>

          {/* Détails météo */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">Humidité</span>
              </div>
              <div className="text-xl font-semibold text-gray-900">{weatherData.humidity}%</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Wind className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Vent</span>
              </div>
              <div className="text-xl font-semibold text-gray-900">{weatherData.windSpeed} km/h</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Eye className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-sm text-gray-600">UV Index</span>
              </div>
              <div className="text-xl font-semibold text-gray-900">{weatherData.uvIndex}</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Cloud className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Visibilité</span>
              </div>
              <div className="text-xl font-semibold text-gray-900">{weatherData.visibility} km</div>
            </div>
          </div>
        </div>

        {/* Prévisions 5 jours */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Prévisions 5 jours</h2>
          </div>

          <div className="space-y-3">
            {forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {index === 0 ? 'Aujourd\'hui' : day.day}
                    </div>
                  </div>
                  <Sun className="h-5 w-5 text-yellow-500 mx-4" />
                </div>

                <div className="flex items-center space-x-4">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(day.riskLevel)}`}>
                    {getRiskText(day.riskLevel)}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{day.maxTemp}°</div>
                    <div className="text-xs text-gray-500">{day.minTemp}°</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conseils météo */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Conseils du jour</h2>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-red-50 rounded-lg">
              <Thermometer className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-red-900 text-sm">Température extrême</p>
                <p className="text-red-700 text-xs">Évitez toute activité extérieure entre 10h et 18h</p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <Droplets className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 text-sm">Hydratation critique</p>
                <p className="text-blue-700 text-xs">Buvez au moins 4L d'eau répartis sur la journée</p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-purple-50 rounded-lg">
              <Eye className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-purple-900 text-sm">Protection UV maximale</p>
                <p className="text-purple-700 text-xs">Crème solaire SPF 50+ et vêtements couvrants obligatoires</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;

