import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  FileText, 
  Search, 
  Filter,
  MapPin,
  Clock,
  User,
  AlertCircle,
  Thermometer,
  Eye,
  CheckCircle,
  XCircle,
  Calendar
} from 'lucide-react';

const Reports = () => {
  const { API_BASE_URL, token } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  // Données simulées pour les rapports
  const mockReports = [
    {
      id: 1,
      type: 'symptome',
      title: 'Signalement de déshydratation',
      description: 'Plusieurs cas de déshydratation observés dans le quartier de Médina. Les personnes âgées sont particulièrement affectées.',
      severity: 'grave',
      region: 'Dakar',
      latitude: 14.6937,
      longitude: -17.4441,
      temperature: 38.5,
      status: 'nouveau',
      createdAt: '2025-07-24T10:30:00Z',
      user: { username: 'marie_diop', email: 'marie.diop@email.com' }
    },
    {
      id: 2,
      type: 'evenement_sanitaire',
      title: 'Augmentation des consultations',
      description: 'Le centre de santé de Tambacounda rapporte une augmentation de 40% des consultations liées à la chaleur depuis 3 jours.',
      severity: 'critique',
      region: 'Tambacounda',
      latitude: 13.7671,
      longitude: -13.6681,
      temperature: 41.2,
      status: 'en_cours',
      createdAt: '2025-07-24T08:15:00Z',
      user: { username: 'dr_fall', email: 'dr.fall@sante.sn' }
    },
    {
      id: 3,
      type: 'ressenti_thermique',
      title: 'Chaleur insupportable à Matam',
      description: 'La population locale signale des conditions de chaleur extrême. Beaucoup de personnes restent confinées chez elles.',
      severity: 'modere',
      region: 'Matam',
      latitude: 15.6558,
      longitude: -13.2553,
      temperature: 42.1,
      status: 'resolu',
      createdAt: '2025-07-23T16:45:00Z',
      user: { username: 'amadou_ba', email: 'amadou.ba@email.com' }
    },
    {
      id: 4,
      type: 'conditions_env',
      title: 'Manque d\'ombre dans les marchés',
      description: 'Les marchés de Kaolack manquent cruellement d\'espaces ombragés. Les commerçants et clients souffrent de la chaleur.',
      severity: 'modere',
      region: 'Kaolack',
      latitude: 14.1520,
      longitude: -16.0728,
      temperature: 37.8,
      status: 'nouveau',
      createdAt: '2025-07-24T12:20:00Z',
      user: { username: 'fatou_sow', email: 'fatou.sow@email.com' }
    },
    {
      id: 5,
      type: 'symptome',
      title: 'Coup de chaleur chez les enfants',
      description: 'École primaire de Saint-Louis: 3 enfants ont fait des malaises dus à la chaleur pendant la récréation.',
      severity: 'grave',
      region: 'Saint-Louis',
      latitude: 16.0199,
      longitude: -16.4896,
      temperature: 39.3,
      status: 'en_cours',
      createdAt: '2025-07-24T09:10:00Z',
      user: { username: 'directeur_ecole', email: 'ecole.saintlouis@education.sn' }
    }
  ];

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      // Pour le moment, on utilise les données simulées
      setReports(mockReports);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des rapports:', error);
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || report.severity === filterSeverity;
    return matchesSearch && matchesType && matchesStatus && matchesSeverity;
  });

  const getTypeLabel = (type) => {
    const labels = {
      'symptome': 'Symptômes',
      'evenement_sanitaire': 'Événement Sanitaire',
      'ressenti_thermique': 'Ressenti Thermique',
      'conditions_env': 'Conditions Environnementales'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type) => {
    const colors = {
      'symptome': 'bg-red-100 text-red-800',
      'evenement_sanitaire': 'bg-purple-100 text-purple-800',
      'ressenti_thermique': 'bg-orange-100 text-orange-800',
      'conditions_env': 'bg-blue-100 text-blue-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'faible': 'bg-green-100 text-green-800',
      'modere': 'bg-yellow-100 text-yellow-800',
      'grave': 'bg-orange-100 text-orange-800',
      'critique': 'bg-red-100 text-red-800'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  const getSeverityLabel = (severity) => {
    const labels = {
      'faible': 'Faible',
      'modere': 'Modéré',
      'grave': 'Grave',
      'critique': 'Critique'
    };
    return labels[severity] || severity;
  };

  const getStatusColor = (status) => {
    const colors = {
      'nouveau': 'bg-blue-100 text-blue-800',
      'en_cours': 'bg-yellow-100 text-yellow-800',
      'resolu': 'bg-green-100 text-green-800',
      'ferme': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'nouveau': 'Nouveau',
      'en_cours': 'En cours',
      'resolu': 'Résolu',
      'ferme': 'Fermé'
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'nouveau':
        return <AlertCircle className="h-4 w-4" />;
      case 'en_cours':
        return <Clock className="h-4 w-4" />;
      case 'resolu':
        return <CheckCircle className="h-4 w-4" />;
      case 'ferme':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
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
                <FileText className="h-6 w-6 text-green-500" />
                Rapports et Signalements
              </h1>
              <p className="text-gray-600">Suivi des signalements terrain et événements sanitaires</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Rapports</p>
                    <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-gray-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Nouveaux</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {reports.filter(r => r.status === 'nouveau').length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">En cours</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {reports.filter(r => r.status === 'en_cours').length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critiques</p>
                    <p className="text-2xl font-bold text-red-600">
                      {reports.filter(r => r.severity === 'critique').length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-500" />
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
                      placeholder="Rechercher par titre, description ou région..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">Tous les types</option>
                    <option value="symptome">Symptômes</option>
                    <option value="evenement_sanitaire">Événement Sanitaire</option>
                    <option value="ressenti_thermique">Ressenti Thermique</option>
                    <option value="conditions_env">Conditions Env.</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="nouveau">Nouveau</option>
                    <option value="en_cours">En cours</option>
                    <option value="resolu">Résolu</option>
                    <option value="ferme">Fermé</option>
                  </select>
                  <select
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">Toutes les sévérités</option>
                    <option value="faible">Faible</option>
                    <option value="modere">Modéré</option>
                    <option value="grave">Grave</option>
                    <option value="critique">Critique</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des rapports */}
          <div className="grid gap-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className={`border-l-4 ${
                report.severity === 'critique' ? 'border-l-red-500' :
                report.severity === 'grave' ? 'border-l-orange-500' :
                report.severity === 'modere' ? 'border-l-yellow-500' :
                'border-l-green-500'
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(report.status)}
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getTypeColor(report.type)}>
                          {getTypeLabel(report.type)}
                        </Badge>
                        <Badge className={getSeverityColor(report.severity)}>
                          {getSeverityLabel(report.severity)}
                        </Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {getStatusLabel(report.status)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">{report.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Région:</span>
                        <span>{report.region}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">Température:</span>
                        <span className="text-orange-600 font-bold">{report.temperature}°C</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Signalé par:</span>
                        <span>{report.user.username}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Date:</span>
                        <span>{formatDate(report.createdAt)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Contact: {report.user.email}
                      </div>
                      
                      {report.status === 'nouveau' && (
                        <div className="flex items-center gap-1 text-sm text-blue-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          Nécessite une attention
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun rapport trouvé</h3>
                <p className="text-gray-500">
                  {searchTerm || filterType !== 'all' || filterStatus !== 'all' || filterSeverity !== 'all'
                    ? 'Aucun rapport ne correspond aux critères de recherche.'
                    : 'Aucun rapport n\'a été soumis pour le moment.'
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

export default Reports;

