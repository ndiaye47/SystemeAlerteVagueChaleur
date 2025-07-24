import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CloudSun, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  RefreshCw,
  MapPin,
  Calendar,
  TrendingUp,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const WeatherData = () => {
  const { API_BASE_URL, token } = useAuth();
  const [weatherData, setWeatherData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('Dakar');

  // Régions du Sénégal
  const regions = [
    'Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Tambacounda', 
    'Ziguinchor', 'Louga', 'Fatick', 'Kolda', 'Matam', 
    'Kaffrine', 'Kédougou', 'Sédhiou', 'Diourbel'
  ];

  // Données simulées pour les prévisions sur 7 jours
  const mockWeatherData = [
    { date: '24/07', temp: 36, humidity: 75, windSpeed: 12, riskLevel: 'eleve' },
    { date: '25/07', temp: 38, humidity: 78, windSpeed: 10, riskLevel: 'tres_eleve' },
    { date: '26/07', temp: 41, humidity: 82, windSpeed: 8, riskLevel: 'tres_eleve' },
    { date: '27/07', temp: 39, humidity: 76, windSpeed: 14, riskLevel: 'eleve' },
    { date: '28/07', temp: 37, humidity: 72, windSpeed: 16, riskLevel: 'eleve' },
    { date: '29/07', temp: 35, humidity: 68, windSpeed: 18, riskLevel: 'modere' },
    { date: '30/07', temp: 33, humidity: 65, windSpeed: 20, riskLevel: 'modere' }
  ];

  // Données météo actuelles simulées
  const mockCurrentWeather = {
    region: selectedRegion,
    temperature: 36.5,
    feelsLike: 42.3,
    humidity: 75,
    windSpeed: 12,
    pressure: 1013,
    description: 'Très chaud et ensoleillé',
    riskLevel: 'eleve',
    lastUpdate: new Date().toISOString()
  };

  useEffect(() => {
    fetchWeatherData();
  }, [selectedRegion]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      // Pour le moment, on utilise les données simulées
      setWeatherData(mockWeatherData);
      setCurrentWeather(mockCurrentWeather);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error);
      setLoading(false);
    }
  };

  const getRiskLevelColor = (level) => {
    const colors = {
      'faible': 'bg-green-100 text-green-800 border-green-200',
      'modere': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'eleve': 'bg-orange-100 text-orange-800 border-orange-200',
      'tres_eleve': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[level] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getRiskLevelLabel = (level) => {
    const labels = {
      'faible': 'Faible',
      'modere': 'Modéré',
      'eleve': 'Élevé',
      'tres_eleve': 'Très Élevé'
    };
    return labels[level] || level;
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <CloudSun className="h-6 w-6 text-orange-500" />
                Données Météorologiques
              </h1>
              <p className="text-gray-600">Surveillance en temps réel des conditions climatiques</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              <Button 
                onClick={fetchWeatherData}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Conditions actuelles */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Température principale */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-orange-500" />
                  Conditions Actuelles - {currentWeather.region}
                </CardTitle>
                <CardDescription>
                  Dernière mise à jour: {formatTime(currentWeather.lastUpdate)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-orange-500">
                        {currentWeather.temperature}°C
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Ressenti: {currentWeather.feelsLike}°C
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-900">
                        {currentWeather.description}
                      </p>
                      <Badge className={getRiskLevelColor(currentWeather.riskLevel)}>
                        Risque: {getRiskLevelLabel(currentWeather.riskLevel)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-6xl">☀️</div>
                </div>
              </CardContent>
            </Card>

            {/* Détails météo */}
            <Card>
              <CardHeader>
                <CardTitle>Détails</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Humidité</span>
                  </div>
                  <span className="text-lg font-bold">{currentWeather.humidity}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Vent</span>
                  </div>
                  <span className="text-lg font-bold">{currentWeather.windSpeed} km/h</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Pression</span>
                  </div>
                  <span className="text-lg font-bold">{currentWeather.pressure} hPa</span>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Localisation</span>
                  </div>
                  <p className="text-sm text-gray-600">{currentWeather.region}, Sénégal</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prévisions sur 7 jours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Prévisions sur 7 jours - {selectedRegion}
              </CardTitle>
              <CardDescription>
                Évolution des températures et du niveau de risque
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={weatherData}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'temp') return [`${value}°C`, 'Température'];
                      if (name === 'humidity') return [`${value}%`, 'Humidité'];
                      if (name === 'windSpeed') return [`${value} km/h`, 'Vent'];
                      return [value, name];
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#f97316" 
                    fillOpacity={1}
                    fill="url(#tempGradient)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tableau détaillé des prévisions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-500" />
                    Détails des Prévisions
                  </CardTitle>
                  <CardDescription>
                    Données complètes pour chaque jour
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Température</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Humidité</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Vent</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Niveau de Risque</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weatherData.map((day, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-900">{day.date}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-orange-500" />
                            <span className="font-bold text-orange-600">{day.temp}°C</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span>{day.humidity}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Wind className="h-4 w-4 text-gray-500" />
                            <span>{day.windSpeed} km/h</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getRiskLevelColor(day.riskLevel)}>
                            {getRiskLevelLabel(day.riskLevel)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;

