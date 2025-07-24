import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Users, 
  AlertTriangle, 
  Thermometer, 
  FileText,
  TrendingUp,
  MapPin,
  Clock,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { API_BASE_URL, token } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeAlerts: 0,
    totalReports: 0,
    averageTemp: 0
  });
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données simulées pour les graphiques (en attendant les vraies données)
  const temperatureData = [
    { name: 'Lun', temperature: 32, humidity: 65 },
    { name: 'Mar', temperature: 35, humidity: 70 },
    { name: 'Mer', temperature: 38, humidity: 75 },
    { name: 'Jeu', temperature: 41, humidity: 80 },
    { name: 'Ven', temperature: 39, humidity: 72 },
    { name: 'Sam', temperature: 36, humidity: 68 },
    { name: 'Dim', temperature: 34, humidity: 63 }
  ];

  const regionData = [
    { name: 'Dakar', alerts: 12, color: '#f97316' },
    { name: 'Thiès', alerts: 8, color: '#ef4444' },
    { name: 'Kaolack', alerts: 15, color: '#eab308' },
    { name: 'Saint-Louis', alerts: 6, color: '#22c55e' },
    { name: 'Tambacounda', alerts: 20, color: '#dc2626' }
  ];

  const riskLevels = [
    { name: 'Faible', value: 35, color: '#22c55e' },
    { name: 'Modéré', value: 25, color: '#eab308' },
    { name: 'Élevé', value: 25, color: '#f97316' },
    { name: 'Très élevé', value: 15, color: '#dc2626' }
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulation des données pour le moment
      setStats({
        totalUsers: 1247,
        activeAlerts: 8,
        totalReports: 156,
        averageTemp: 36.5
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setLoading(false);
    }
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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}
                </Badge>
              </div>
            </div>

            <div className="space-y-6">
              {/* Statistiques principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-blue-500 dark:bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium dark:text-white">Utilisateurs Total</CardTitle>
                    <Users className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold dark:text-white">{stats.totalUsers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">
                      <span className="text-green-600">+12%</span> depuis le mois dernier
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500 dark:bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium dark:text-white">Alertes Actives</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold dark:text-white">{stats.activeAlerts}</div>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">
                      <span className="text-red-600">+3</span> nouvelles aujourd'hui
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 dark:bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium dark:text-white">Température Moyenne</CardTitle>
                    <Thermometer className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold dark:text-white">{stats.averageTemp}°C</div>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">
                      <span className="text-orange-600">+2.3°C</span> au-dessus de la normale
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 dark:bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium dark:text-white">Rapports Reçus</CardTitle>
                    <FileText className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold dark:text-white">{stats.totalReports}</div>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">
                      <span className="text-green-600">+8</span> cette semaine
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Graphiques */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Évolution des températures */}
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <TrendingUp className="h-5 w-5 text-orange-500" />
                      Évolution des Températures
                    </CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Températures et humidité des 7 derniers jours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="temperature" 
                          stroke="#f97316" 
                          strokeWidth={3}
                          name="Température (°C)"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="humidity" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          name="Humidité (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Alertes par région */}
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <MapPin className="h-5 w-5 text-red-500" />
                      Alertes par Région
                    </CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Distribution des alertes actives
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={regionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="alerts" fill="#f97316" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Niveau de risque et activité récente */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Répartition des niveaux de risque */}
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Activity className="h-5 w-5 text-purple-500" />
                      Niveaux de Risque
                    </CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Répartition actuelle des zones de risque
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={riskLevels}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {riskLevels.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Activité récente */}
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Activité Récente</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Dernières actions sur la plateforme
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: 'alert', message: 'Nouvelle alerte créée pour Matam', time: '5 min', color: 'text-red-600' },
                        { type: 'user', message: 'Nouvel utilisateur inscrit', time: '12 min', color: 'text-blue-600' },
                        { type: 'report', message: 'Rapport de symptômes reçu de Kaolack', time: '18 min', color: 'text-green-600' },
                        { type: 'weather', message: 'Données météo mises à jour', time: '25 min', color: 'text-orange-600' },
                        { type: 'alert', message: 'Alerte résolue pour Saint-Louis', time: '1h', color: 'text-gray-600' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')}`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Il y a {activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;