import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  MapPin, 
  Clock,
  Thermometer,
  Edit,
  Trash2,
  Eye,
  Send,
  Users,
  Calendar
} from 'lucide-react';

const AlertsManagement = () => {
  const { API_BASE_URL, token } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Données simulées pour les alertes
  const mockAlerts = [
    {
      id: 1,
      type: 'canicule',
      level: 'tres_dangereux',
      title: 'Alerte Canicule Extrême - Matam',
      message: 'Températures exceptionnellement élevées prévues. Risque sanitaire majeur pour les populations vulnérables.',
      region: 'Matam',
      latitude: 15.6558,
      longitude: -13.2553,
      startDate: '2025-07-24T06:00:00Z',
      endDate: '2025-07-26T18:00:00Z',
      isActive: true,
      createdAt: '2025-07-24T05:30:00Z',
      creator: { username: 'admin' }
    },
    {
      id: 2,
      type: 'chaleur',
      level: 'dangereux',
      title: 'Alerte Chaleur - Tambacounda',
      message: 'Températures élevées attendues. Recommandations de précaution pour toute la population.',
      region: 'Tambacounda',
      latitude: 13.7671,
      longitude: -13.6681,
      startDate: '2025-07-24T08:00:00Z',
      endDate: '2025-07-25T20:00:00Z',
      isActive: true,
      createdAt: '2025-07-24T07:15:00Z',
      creator: { username: 'admin' }
    },
    {
      id: 3,
      type: 'chaleur',
      level: 'tres_inconfortable',
      title: 'Alerte Chaleur Modérée - Kaolack',
      message: 'Conditions météorologiques inconfortables. Hydratation recommandée.',
      region: 'Kaolack',
      latitude: 14.1520,
      longitude: -16.0728,
      startDate: '2025-07-23T10:00:00Z',
      endDate: '2025-07-24T22:00:00Z',
      isActive: false,
      createdAt: '2025-07-23T09:30:00Z',
      creator: { username: 'admin' }
    },
    {
      id: 4,
      type: 'humidite',
      level: 'dangereux',
      title: 'Alerte Humidité Élevée - Ziguinchor',
      message: 'Taux d\'humidité très élevé combiné à la chaleur. Risque accru de malaise.',
      region: 'Ziguinchor',
      latitude: 12.5681,
      longitude: -16.2719,
      startDate: '2025-07-24T12:00:00Z',
      endDate: '2025-07-25T06:00:00Z',
      isActive: true,
      createdAt: '2025-07-24T11:45:00Z',
      creator: { username: 'admin' }
    }
  ];

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      // Pour le moment, on utilise les données simulées
      setAlerts(mockAlerts);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
      setLoading(false);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || alert.level === filterLevel;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && alert.isActive) ||
                         (filterStatus === 'inactive' && !alert.isActive);
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const getLevelColor = (level) => {
    const colors = {
      'tres_inconfortable': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'dangereux': 'bg-orange-100 text-orange-800 border-orange-200',
      'tres_dangereux': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[level] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelLabel = (level) => {
    const labels = {
      'tres_inconfortable': 'Très Inconfortable',
      'dangereux': 'Dangereux',
      'tres_dangereux': 'Très Dangereux'
    };
    return labels[level] || level;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'canicule':
        return <Thermometer className="h-4 w-4" />;
      case 'chaleur':
        return <Thermometer className="h-4 w-4" />;
      case 'humidite':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
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
                <AlertTriangle className="h-6 w-6 text-red-500" />
                Gestion des Alertes
              </h1>
              <p className="text-gray-600">Créer et gérer les alertes de vagues de chaleur</p>
            </div>
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Alerte
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Alertes</p>
                    <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-gray-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Alertes Actives</p>
                    <p className="text-2xl font-bold text-red-600">
                      {alerts.filter(a => a.isActive).length}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Très Dangereux</p>
                    <p className="text-2xl font-bold text-red-600">
                      {alerts.filter(a => a.level === 'tres_dangereux').length}
                    </p>
                  </div>
                  <Thermometer className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Régions Couvertes</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {new Set(alerts.map(a => a.region)).size}
                    </p>
                  </div>
                  <MapPin className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres et recherche */}
          <Card>
            <CardHeader>
              <CardTitle>Filtres et Recherche</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Rechercher par titre ou région..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">Tous les niveaux</option>
                    <option value="tres_inconfortable">Très Inconfortable</option>
                    <option value="dangereux">Dangereux</option>
                    <option value="tres_dangereux">Très Dangereux</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="active">Actives</option>
                    <option value="inactive">Inactives</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des alertes */}
          <div className="grid gap-4">
            {filteredAlerts.map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${
                alert.level === 'tres_dangereux' ? 'border-l-red-500' :
                alert.level === 'dangereux' ? 'border-l-orange-500' :
                'border-l-yellow-500'
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${
                          alert.level === 'tres_dangereux' ? 'bg-red-100' :
                          alert.level === 'dangereux' ? 'bg-orange-100' :
                          'bg-yellow-100'
                        }`}>
                          {getTypeIcon(alert.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getLevelColor(alert.level)}>
                              {getLevelLabel(alert.level)}
                            </Badge>
                            <Badge className={alert.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {alert.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">{alert.message}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Région:</span>
                        <span>{alert.region}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Début:</span>
                        <span>{formatDate(alert.startDate)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Fin:</span>
                        <span>{formatDate(alert.endDate)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Créée par <span className="font-medium">{alert.creator.username}</span> le {formatDate(alert.createdAt)}
                      </div>
                      
                      {alert.isActive && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          En cours
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune alerte trouvée</h3>
                <p className="text-gray-500">
                  {searchTerm || filterLevel !== 'all' || filterStatus !== 'all' 
                    ? 'Aucune alerte ne correspond aux critères de recherche.'
                    : 'Aucune alerte n\'a été créée pour le moment.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsManagement;

