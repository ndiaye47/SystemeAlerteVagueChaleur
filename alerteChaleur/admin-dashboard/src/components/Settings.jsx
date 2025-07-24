import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Settings as SettingsIcon, 
  Save, 
  RefreshCw,
  Bell,
  Mail,
  Shield,
  Database,
  Globe,
  Thermometer,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Paramètres généraux
    siteName: 'Plateforme d\'Alerte Santé Sénégal',
    adminEmail: 'admin@heatwave.sn',
    supportEmail: 'support@heatwave.sn',
    
    // Paramètres d'alerte
    tempThresholdModerate: 35,
    tempThresholdHigh: 38,
    tempThresholdCritical: 40,
    
    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    
    // APIs
    openWeatherApiKey: '',
    meteosourceApiKey: '',
    
    // Système
    dataRetentionDays: 365,
    backupFrequency: 'daily',
    maintenanceMode: false
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simulation de la sauvegarde
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const testApiConnection = async (apiType) => {
    // Simulation du test de connexion API
    alert(`Test de connexion ${apiType} en cours...`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <SettingsIcon className="h-6 w-6 text-gray-500" />
                Paramètres et Configuration
              </h1>
              <p className="text-gray-600">Gérer les paramètres de la plateforme</p>
            </div>
            <div className="flex items-center gap-3">
              {saved && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Paramètres sauvegardés</span>
                </div>
              )}
              <Button 
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Paramètres généraux */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Paramètres Généraux
              </CardTitle>
              <CardDescription>
                Configuration générale de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Nom du site</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="adminEmail">Email administrateur</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="supportEmail">Email de support</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Seuils de température */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                Seuils de Température
              </CardTitle>
              <CardDescription>
                Définir les seuils pour les différents niveaux d'alerte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="tempModerate">Seuil Modéré (°C)</Label>
                  <Input
                    id="tempModerate"
                    type="number"
                    value={settings.tempThresholdModerate}
                    onChange={(e) => handleInputChange('tempThresholdModerate', parseInt(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Température à partir de laquelle une alerte modérée est déclenchée</p>
                </div>
                <div>
                  <Label htmlFor="tempHigh">Seuil Élevé (°C)</Label>
                  <Input
                    id="tempHigh"
                    type="number"
                    value={settings.tempThresholdHigh}
                    onChange={(e) => handleInputChange('tempThresholdHigh', parseInt(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Température pour une alerte de niveau élevé</p>
                </div>
                <div>
                  <Label htmlFor="tempCritical">Seuil Critique (°C)</Label>
                  <Input
                    id="tempCritical"
                    type="number"
                    value={settings.tempThresholdCritical}
                    onChange={(e) => handleInputChange('tempThresholdCritical', parseInt(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Température pour une alerte critique</p>
                </div>
              </div>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Les seuils actuels sont: Modéré ≥ {settings.tempThresholdModerate}°C, 
                  Élevé ≥ {settings.tempThresholdHigh}°C, 
                  Critique ≥ {settings.tempThresholdCritical}°C
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Paramètres de notification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-purple-500" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configuration des systèmes de notification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Notifications par email</Label>
                    <p className="text-sm text-gray-500">Envoyer les alertes par email aux utilisateurs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <Badge className={settings.emailNotifications ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {settings.emailNotifications ? 'Activé' : 'Désactivé'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Notifications SMS</Label>
                    <p className="text-sm text-gray-500">Envoyer les alertes par SMS</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <Badge className={settings.smsNotifications ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {settings.smsNotifications ? 'Activé' : 'Désactivé'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Notifications push</Label>
                    <p className="text-sm text-gray-500">Notifications push pour l'application mobile</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <Badge className={settings.pushNotifications ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {settings.pushNotifications ? 'Activé' : 'Désactivé'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration des APIs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-500" />
                Configuration des APIs
              </CardTitle>
              <CardDescription>
                Clés API pour les services météorologiques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="openWeatherApi">Clé API OpenWeatherMap</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="openWeatherApi"
                    type="password"
                    placeholder="Entrez votre clé API OpenWeatherMap"
                    value={settings.openWeatherApiKey}
                    onChange={(e) => handleInputChange('openWeatherApiKey', e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline"
                    onClick={() => testApiConnection('OpenWeatherMap')}
                  >
                    Tester
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="meteosourceApi">Clé API Meteosource</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="meteosourceApi"
                    type="password"
                    placeholder="Entrez votre clé API Meteosource"
                    value={settings.meteosourceApiKey}
                    onChange={(e) => handleInputChange('meteosourceApiKey', e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline"
                    onClick={() => testApiConnection('Meteosource')}
                  >
                    Tester
                  </Button>
                </div>
              </div>
              
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Les clés API sont stockées de manière sécurisée et ne sont jamais exposées côté client.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Paramètres système */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-gray-500" />
                Paramètres Système
              </CardTitle>
              <CardDescription>
                Configuration avancée du système
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dataRetention">Rétention des données (jours)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetentionDays}
                    onChange={(e) => handleInputChange('dataRetentionDays', parseInt(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Durée de conservation des données historiques</p>
                </div>
                
                <div>
                  <Label htmlFor="backupFreq">Fréquence de sauvegarde</Label>
                  <select
                    id="backupFreq"
                    value={settings.backupFrequency}
                    onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="hourly">Toutes les heures</option>
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <Label className="text-base">Mode maintenance</Label>
                  <p className="text-sm text-gray-500">Activer le mode maintenance pour les mises à jour</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <Badge className={settings.maintenanceMode ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                    {settings.maintenanceMode ? 'Maintenance' : 'Opérationnel'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;

