import React, { useState } from 'react';
import { FileText, MapPin, Thermometer, Droplets, AlertTriangle, Send, Camera, Mic } from 'lucide-react';

const Reports = () => {
  const [reportType, setReportType] = useState('symptoms');
  const [formData, setFormData] = useState({
    location: '',
    temperature: '',
    symptoms: [],
    description: '',
    severity: 'medium',
    hasPhoto: false,
    hasAudio: false
  });

  const reportTypes = [
    { value: 'symptoms', label: 'Symptômes observés', icon: AlertTriangle },
    { value: 'environment', label: 'Conditions environnementales', icon: Thermometer },
    { value: 'resources', label: 'Accès aux ressources', icon: Droplets },
    { value: 'incident', label: 'Incident sanitaire', icon: FileText }
  ];

  const symptomsList = [
    'Déshydratation',
    'Coup de chaleur',
    'Fatigue extrême',
    'Nausées/Vomissements',
    'Maux de tête',
    'Vertiges',
    'Crampes musculaires',
    'Confusion',
    'Éruption cutanée',
    'Difficultés respiratoires'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'symptoms') {
      setFormData(prev => ({
        ...prev,
        symptoms: checked 
          ? [...prev.symptoms, value]
          : prev.symptoms.filter(symptom => symptom !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, on enverrait les données au backend
    console.log('Rapport soumis:', { reportType, ...formData });
    alert('Rapport envoyé avec succès !');
    
    // Réinitialiser le formulaire
    setFormData({
      location: '',
      temperature: '',
      symptoms: [],
      description: '',
      severity: 'medium',
      hasPhoto: false,
      hasAudio: false
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Signaler un Incident</h1>
        <p className="text-sm text-gray-600 mt-1">Aidez-nous à surveiller les effets de la chaleur</p>
      </div>

      <div className="px-4 py-6">
        {/* Sélection du type de rapport */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Type de signalement</h2>
          <div className="grid grid-cols-2 gap-3">
            {reportTypes.map(type => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => setReportType(type.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    reportType === type.value
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium text-center">{type.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Formulaire de rapport */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Localisation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Localisation
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Où vous trouvez-vous ?"
              />
            </div>

            {/* Température ressentie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Thermometer className="h-4 w-4 inline mr-2" />
                Température ressentie (optionnel)
              </label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: 45°C"
              />
            </div>

            {/* Symptômes (si type = symptoms) */}
            {reportType === 'symptoms' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <AlertTriangle className="h-4 w-4 inline mr-2" />
                  Symptômes observés
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {symptomsList.map(symptom => (
                    <label key={symptom} className="flex items-center p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        name="symptoms"
                        value={symptom}
                        checked={formData.symptoms.includes(symptom)}
                        onChange={handleChange}
                        className="mr-2 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">{symptom}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Niveau de gravité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau de gravité
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="low">Faible</option>
                <option value="medium">Modéré</option>
                <option value="high">Élevé</option>
                <option value="critical">Critique</option>
              </select>
              <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium inline-block ${getSeverityColor(formData.severity)}`}>
                Niveau {formData.severity === 'low' ? 'Faible' : formData.severity === 'medium' ? 'Modéré' : formData.severity === 'high' ? 'Élevé' : 'Critique'}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description détaillée
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                placeholder="Décrivez la situation en détail..."
              />
            </div>

            {/* Pièces jointes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pièces jointes (optionnel)
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setFormData(prev => ({ ...prev, hasPhoto: !prev.hasPhoto }))}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  <span className="text-sm">Photo</span>
                  {formData.hasPhoto && <span className="ml-2 text-green-600">✓</span>}
                </button>
                
                <button
                  type="button"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setFormData(prev => ({ ...prev, hasAudio: !prev.hasAudio }))}
                >
                  <Mic className="h-4 w-4 mr-2" />
                  <span className="text-sm">Audio</span>
                  {formData.hasAudio && <span className="ml-2 text-green-600">✓</span>}
                </button>
              </div>
            </div>

            {/* Bouton d'envoi */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
            >
              <Send className="h-4 w-4 mr-2" />
              Envoyer le rapport
            </button>
          </form>
        </div>

        {/* Information */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">Information importante</h3>
              <p className="text-xs text-blue-700 mt-1">
                Vos signalements sont anonymes et contribuent à améliorer la surveillance sanitaire. 
                En cas d'urgence médicale, contactez immédiatement les services d'urgence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

