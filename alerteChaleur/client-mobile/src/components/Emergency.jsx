import React, { useState } from 'react';
import { Phone, AlertTriangle, Heart, Droplets, Thermometer, MapPin, Clock, Shield } from 'lucide-react';

const Emergency = () => {
  const [activeSection, setActiveSection] = useState('emergency');

  const emergencyNumbers = [
    { name: 'SAMU', number: '15', description: 'Service d\'Aide Médicale Urgente' },
    { name: 'Pompiers', number: '18', description: 'Secours et lutte contre l\'incendie' },
    { name: 'Police', number: '17', description: 'Police Secours' },
    { name: 'SOS Médecins', number: '33 889 15 15', description: 'Consultations médicales d\'urgence' }
  ];

  const firstAidSteps = [
    {
      title: 'Reconnaître un coup de chaleur',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100',
      steps: [
        'Température corporelle > 40°C',
        'Peau chaude et sèche (pas de transpiration)',
        'Confusion, délire ou perte de conscience',
        'Nausées et vomissements',
        'Pouls rapide et fort'
      ]
    },
    {
      title: 'Premiers secours - Coup de chaleur',
      icon: Heart,
      color: 'text-purple-600 bg-purple-100',
      steps: [
        'Appelez immédiatement le 15 (SAMU)',
        'Déplacez la personne à l\'ombre ou dans un lieu frais',
        'Retirez les vêtements en excès',
        'Appliquez de l\'eau fraîche sur le corps',
        'Ventilez la personne',
        'Ne donnez pas à boire si la personne est inconsciente'
      ]
    },
    {
      title: 'Prévenir l\'épuisement par la chaleur',
      icon: Shield,
      color: 'text-blue-600 bg-blue-100',
      steps: [
        'Buvez régulièrement même sans soif',
        'Évitez l\'alcool et la caféine',
        'Portez des vêtements légers et clairs',
        'Restez à l\'ombre entre 11h et 16h',
        'Rafraîchissez-vous régulièrement',
        'Surveillez les personnes vulnérables'
      ]
    }
  ];

  const hydrationGuide = [
    { time: '06:00', amount: '250ml', tip: 'Au réveil, avant le petit-déjeuner' },
    { time: '08:00', amount: '250ml', tip: 'Avec le petit-déjeuner' },
    { time: '10:00', amount: '250ml', tip: 'Milieu de matinée' },
    { time: '12:00', amount: '500ml', tip: 'Avec le déjeuner' },
    { time: '14:00', amount: '250ml', tip: 'Début d\'après-midi' },
    { time: '16:00', amount: '250ml', tip: 'Milieu d\'après-midi' },
    { time: '18:00', amount: '500ml', tip: 'Avec le dîner' },
    { time: '20:00', amount: '250ml', tip: 'Soirée' }
  ];

  const callEmergency = (number) => {
    if (window.confirm(`Appeler le ${number} ?`)) {
      window.location.href = `tel:${number}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Urgences & Premiers Secours</h1>
        <p className="text-sm text-gray-600 mt-1">Informations vitales en cas d'urgence</p>
      </div>

      {/* Navigation */}
      <div className="px-4 py-4">
        <div className="flex space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveSection('emergency')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeSection === 'emergency' 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Urgences
          </button>
          <button
            onClick={() => setActiveSection('firstaid')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeSection === 'firstaid' 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Premiers secours
          </button>
          <button
            onClick={() => setActiveSection('hydration')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeSection === 'hydration' 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-300'
            }`}
          >
            Hydratation
          </button>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Section Urgences */}
        {activeSection === 'emergency' && (
          <>
            {/* Appel d'urgence rapide */}
            <div className="bg-red-500 text-white rounded-2xl shadow-lg p-6 text-center">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">URGENCE MÉDICALE</h2>
              <p className="mb-4 text-red-100">En cas de coup de chaleur ou malaise grave</p>
              <button
                onClick={() => callEmergency('15')}
                className="bg-white text-red-500 px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors"
              >
                <Phone className="h-5 w-5 inline mr-2" />
                APPELER LE 15
              </button>
            </div>

            {/* Numéros d'urgence */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Numéros d'urgence</h2>
              <div className="space-y-3">
                {emergencyNumbers.map((emergency, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{emergency.name}</h3>
                      <p className="text-sm text-gray-600">{emergency.description}</p>
                    </div>
                    <button
                      onClick={() => callEmergency(emergency.number)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                    >
                      {emergency.number}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Localisation d'urgence */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-red-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Ma position</h2>
              </div>
              <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Partager ma localisation
              </button>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Permet aux secours de vous localiser rapidement
              </p>
            </div>
          </>
        )}

        {/* Section Premiers secours */}
        {activeSection === 'firstaid' && (
          <div className="space-y-6">
            {firstAidSteps.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className={`flex items-center mb-4 p-3 rounded-lg ${section.color}`}>
                    <IconComponent className="h-6 w-6 mr-3" />
                    <h2 className="text-lg font-semibold">{section.title}</h2>
                  </div>
                  <ol className="space-y-2">
                    {section.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <span className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                          {stepIndex + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        )}

        {/* Section Hydratation */}
        {activeSection === 'hydration' && (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Guide d'hydratation quotidien</h2>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-blue-900 font-medium">Objectif journalier : 2.5L minimum</p>
                <p className="text-blue-700 text-sm">Par temps de forte chaleur : 3-4L</p>
              </div>
              <div className="space-y-3">
                {hydrationGuide.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{item.time}</div>
                        <div className="text-sm text-gray-600">{item.tip}</div>
                      </div>
                    </div>
                    <div className="text-blue-600 font-semibold">{item.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Conseils d'hydratation</h2>
              <div className="space-y-3">
                <div className="flex items-start p-3 bg-green-50 rounded-lg">
                  <Droplets className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900 text-sm">Buvez avant d'avoir soif</p>
                    <p className="text-green-700 text-xs">La soif est déjà un signe de déshydratation</p>
                  </div>
                </div>

                <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
                  <Thermometer className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-900 text-sm">Eau fraîche mais pas glacée</p>
                    <p className="text-yellow-700 text-xs">15-20°C est la température idéale</p>
                  </div>
                </div>

                <div className="flex items-start p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900 text-sm">Évitez alcool et caféine</p>
                    <p className="text-red-700 text-xs">Ces substances favorisent la déshydratation</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Emergency;

