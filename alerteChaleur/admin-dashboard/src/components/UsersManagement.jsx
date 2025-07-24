import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Mail,
  Phone
} from 'lucide-react';

const UsersManagement = () => {
  const { API_BASE_URL, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Données simulées pour les utilisateurs
  const mockUsers = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@heatwave.sn',
      role: 'admin',
      isActive: true,
      createdAt: '2025-01-15',
      profile: {
        region: 'Dakar',
        ageGroup: 'normal',
        phoneNumber: '+221 77 123 4567'
      }
    },
    {
      id: 2,
      username: 'marie_diop',
      email: 'marie.diop@email.com',
      role: 'client',
      isActive: true,
      createdAt: '2025-01-20',
      profile: {
        region: 'Thiès',
        ageGroup: 'femme_enceinte',
        phoneNumber: '+221 76 987 6543'
      }
    },
    {
      id: 3,
      username: 'amadou_fall',
      email: 'amadou.fall@email.com',
      role: 'client',
      isActive: true,
      createdAt: '2025-01-22',
      profile: {
        region: 'Saint-Louis',
        ageGroup: 'personne_agee',
        phoneNumber: '+221 78 456 7890'
      }
    },
    {
      id: 4,
      username: 'fatou_ndiaye',
      email: 'fatou.ndiaye@email.com',
      role: 'client',
      isActive: false,
      createdAt: '2025-01-18',
      profile: {
        region: 'Kaolack',
        ageGroup: 'maladie_chronique',
        phoneNumber: '+221 77 654 3210'
      }
    },
    {
      id: 5,
      username: 'ibrahim_sarr',
      email: 'ibrahim.sarr@email.com',
      role: 'client',
      isActive: true,
      createdAt: '2025-01-25',
      profile: {
        region: 'Matam',
        ageGroup: 'normal',
        phoneNumber: '+221 76 321 9876'
      }
    }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Pour le moment, on utilise les données simulées
      setUsers(mockUsers);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    return role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  const getAgeGroupLabel = (ageGroup) => {
    const labels = {
      'normal': 'Normal',
      'personne_agee': 'Personne âgée',
      'femme_enceinte': 'Femme enceinte',
      'enfant': 'Enfant',
      'maladie_chronique': 'Maladie chronique'
    };
    return labels[ageGroup] || ageGroup;
  };

  const getAgeGroupColor = (ageGroup) => {
    const colors = {
      'normal': 'bg-gray-100 text-gray-800',
      'personne_agee': 'bg-yellow-100 text-yellow-800',
      'femme_enceinte': 'bg-pink-100 text-pink-800',
      'enfant': 'bg-green-100 text-green-800',
      'maladie_chronique': 'bg-red-100 text-red-800'
    };
    return colors[ageGroup] || 'bg-gray-100 text-gray-800';
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
                <Users className="h-6 w-6 text-blue-500" />
                Gestion des Utilisateurs
              </h1>
              <p className="text-gray-600">Gérer les comptes utilisateurs et leurs profils</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Plus className="h-4 w-4 mr-2" />
              Nouvel Utilisateur
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
                    <p className="text-sm font-medium text-gray-600">Total Utilisateurs</p>
                    <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Utilisateurs Actifs</p>
                    <p className="text-2xl font-bold text-green-600">
                      {users.filter(u => u.isActive).length}
                    </p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Administrateurs</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {users.filter(u => u.role === 'admin').length}
                    </p>
                  </div>
                  <UserCheck className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Clients</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {users.filter(u => u.role === 'client').length}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
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
                      placeholder="Rechercher par nom ou email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tous les rôles</option>
                    <option value="admin">Administrateurs</option>
                    <option value="client">Clients</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des utilisateurs */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des Utilisateurs ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Gérer les comptes utilisateurs et leurs informations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Utilisateur</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Rôle</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Profil</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Région</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {user.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.username}</p>
                              <p className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </p>
                              {user.profile?.phoneNumber && (
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {user.profile.phoneNumber}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role === 'admin' ? 'Administrateur' : 'Client'}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getAgeGroupColor(user.profile?.ageGroup)}>
                            {getAgeGroupLabel(user.profile?.ageGroup)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-900">{user.profile?.region || 'Non spécifiée'}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {user.isActive ? 'Actif' : 'Inactif'}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
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

export default UsersManagement;

