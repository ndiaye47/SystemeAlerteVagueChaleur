import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, MapPin, Heart, Phone, Edit2, Save, X } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    profileType: user?.profileType || ''
  });

  const profileTypes = [
    { value: 'normal', label: 'Personne normale' },
    { value: 'elderly', label: 'Personne âgée (65+ ans)' },
    { value: 'pregnant', label: 'Femme enceinte' },
    { value: 'child', label: 'Enfant (moins de 12 ans)' },
    { value: 'chronic', label: 'Maladie chronique' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    const result = await updateProfile(formData);
    if (result.success) {
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      profileType: user?.profileType || ''
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 pb-20">
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Mon Profil</h1>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg"
            >
              <Edit2 className="h-5 w-5" />
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
              >
                <Save className="h-5 w-5" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <div className="h-20 w-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.username}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Nom d'utilisateur
              </label>
              {editing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{user?.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email
              </label>
              <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Téléphone
              </label>
              {editing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{user?.phone || 'Non renseigné'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Localisation
              </label>
              <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{user?.location}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Heart className="h-4 w-4 inline mr-2" />
                Profil de santé
              </label>
              {editing ? (
                <select
                  name="profileType"
                  value={formData.profileType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {profileTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              ) : (
                <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">
                  {profileTypes.find(type => type.value === user?.profileType)?.label || 'Non défini'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

