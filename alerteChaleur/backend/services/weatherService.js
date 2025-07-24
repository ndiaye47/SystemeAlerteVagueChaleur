const axios = require('axios');

/**
 * Service d'intégration de l'API météorologique Open-Meteo
 * API gratuite, open-source, sans clé API requise
 * Documentation: https://open-meteo.com/
 */

// Coordonnées des principales villes du Sénégal
const SENEGAL_CITIES = {
  'Dakar': { lat: 14.6928, lon: -17.4467 },
  'Saint-Louis': { lat: 16.0199, lon: -16.4896 },
  'Thiès': { lat: 14.7886, lon: -16.9246 },
  'Kaolack': { lat: 14.1594, lon: -16.0736 },
  'Ziguinchor': { lat: 12.5681, lon: -16.2719 },
  'Diourbel': { lat: 14.6529, lon: -16.2292 },
  'Tambacounda': { lat: 13.7671, lon: -13.6681 },
  'Matam': { lat: 15.6556, lon: -13.2553 },
  'Podor': { lat: 16.6514, lon: -14.9597 },
  'Kaffrine': { lat: 14.1058, lon: -15.5500 },
  'Linguère': { lat: 15.3927, lon: -15.1186 },
  'Kolda': { lat: 12.8939, lon: -14.9407 }
};

// Codes météo WMO pour l'interprétation
const WEATHER_CODES = {
  0: { description: 'Ciel dégagé', icon: '☀️', severity: 'normal' },
  1: { description: 'Principalement dégagé', icon: '🌤️', severity: 'normal' },
  2: { description: 'Partiellement nuageux', icon: '⛅', severity: 'normal' },
  3: { description: 'Couvert', icon: '☁️', severity: 'normal' },
  45: { description: 'Brouillard', icon: '🌫️', severity: 'normal' },
  48: { description: 'Brouillard givrant', icon: '🌫️', severity: 'normal' },
  51: { description: 'Bruine légère', icon: '🌦️', severity: 'normal' },
  53: { description: 'Bruine modérée', icon: '🌦️', severity: 'normal' },
  55: { description: 'Bruine dense', icon: '🌦️', severity: 'normal' },
  61: { description: 'Pluie légère', icon: '🌧️', severity: 'normal' },
  63: { description: 'Pluie modérée', icon: '🌧️', severity: 'normal' },
  65: { description: 'Pluie forte', icon: '🌧️', severity: 'normal' },
  80: { description: 'Averses légères', icon: '🌦️', severity: 'normal' },
  81: { description: 'Averses modérées', icon: '🌦️', severity: 'normal' },
  82: { description: 'Averses violentes', icon: '⛈️', severity: 'warning' },
  95: { description: 'Orage', icon: '⛈️', severity: 'warning' },
  96: { description: 'Orage avec grêle légère', icon: '⛈️', severity: 'warning' },
  99: { description: 'Orage avec grêle forte', icon: '⛈️', severity: 'danger' }
};

class WeatherService {
  constructor() {
    this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
  }

  /**
   * Récupère les données météorologiques actuelles pour une ville
   * @param {string} city - Nom de la ville
   * @returns {Object} Données météo actuelles
   */
  async getCurrentWeather(city) {
    try {
      const coordinates = SENEGAL_CITIES[city];
      if (!coordinates) {
        throw new Error(`Ville non supportée: ${city}`);
      }

      const params = {
        latitude: coordinates.lat,
        longitude: coordinates.lon,
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m'
        ].join(','),
        timezone: 'Africa/Dakar'
      };

      const response = await axios.get(this.baseUrl, { params });
      const data = response.data;

      return {
        city,
        coordinates,
        current: {
          time: data.current.time,
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          apparentTemperature: data.current.apparent_temperature,
          weatherCode: data.current.weather_code,
          weatherDescription: this.getWeatherDescription(data.current.weather_code),
          windSpeed: data.current.wind_speed_10m,
          windDirection: data.current.wind_direction_10m,
          heatRiskLevel: this.calculateHeatRiskLevel(
            data.current.temperature_2m,
            data.current.relative_humidity_2m,
            data.current.apparent_temperature
          )
        },
        units: data.current_units
      };
    } catch (error) {
      console.error(`Erreur lors de la récupération des données météo pour ${city}:`, error.message);
      throw error;
    }
  }

  /**
   * Récupère les prévisions météorologiques pour une ville
   * @param {string} city - Nom de la ville
   * @param {number} days - Nombre de jours de prévision (1-16)
   * @returns {Object} Prévisions météo
   */
  async getForecast(city, days = 7) {
    try {
      const coordinates = SENEGAL_CITIES[city];
      if (!coordinates) {
        throw new Error(`Ville non supportée: ${city}`);
      }

      const params = {
        latitude: coordinates.lat,
        longitude: coordinates.lon,
        hourly: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'weather_code',
          'wind_speed_10m'
        ].join(','),
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'weather_code',
          'wind_speed_10m_max'
        ].join(','),
        forecast_days: Math.min(days, 16),
        timezone: 'Africa/Dakar'
      };

      const response = await axios.get(this.baseUrl, { params });
      const data = response.data;

      // Traitement des données horaires
      const hourlyData = [];
      for (let i = 0; i < data.hourly.time.length; i++) {
        hourlyData.push({
          time: data.hourly.time[i],
          temperature: data.hourly.temperature_2m[i],
          humidity: data.hourly.relative_humidity_2m[i],
          apparentTemperature: data.hourly.apparent_temperature[i],
          weatherCode: data.hourly.weather_code[i],
          weatherDescription: this.getWeatherDescription(data.hourly.weather_code[i]),
          windSpeed: data.hourly.wind_speed_10m[i],
          heatRiskLevel: this.calculateHeatRiskLevel(
            data.hourly.temperature_2m[i],
            data.hourly.relative_humidity_2m[i],
            data.hourly.apparent_temperature[i]
          )
        });
      }

      // Traitement des données quotidiennes
      const dailyData = [];
      for (let i = 0; i < data.daily.time.length; i++) {
        dailyData.push({
          date: data.daily.time[i],
          temperatureMax: data.daily.temperature_2m_max[i],
          temperatureMin: data.daily.temperature_2m_min[i],
          weatherCode: data.daily.weather_code[i],
          weatherDescription: this.getWeatherDescription(data.daily.weather_code[i]),
          windSpeedMax: data.daily.wind_speed_10m_max[i],
          heatRiskLevel: this.calculateHeatRiskLevel(
            data.daily.temperature_2m_max[i],
            null,
            data.daily.temperature_2m_max[i] // Approximation pour le risque quotidien
          )
        });
      }

      return {
        city,
        coordinates,
        hourly: hourlyData,
        daily: dailyData,
        units: {
          hourly: data.hourly_units,
          daily: data.daily_units
        }
      };
    } catch (error) {
      console.error(`Erreur lors de la récupération des prévisions pour ${city}:`, error.message);
      throw error;
    }
  }

  /**
   * Récupère les données météo pour toutes les villes du Sénégal
   * @returns {Array} Données météo pour toutes les villes
   */
  async getAllCitiesWeather() {
    try {
      const cities = Object.keys(SENEGAL_CITIES);
      const weatherPromises = cities.map(city => this.getCurrentWeather(city));
      const results = await Promise.allSettled(weatherPromises);

      return results.map((result, index) => ({
        city: cities[index],
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason.message : null
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des données pour toutes les villes:', error.message);
      throw error;
    }
  }

  /**
   * Calcule le niveau de risque de chaleur
   * @param {number} temperature - Température en °C
   * @param {number} humidity - Humidité relative en %
   * @param {number} apparentTemperature - Température ressentie en °C
   * @returns {Object} Niveau de risque et recommandations
   */
  calculateHeatRiskLevel(temperature, humidity, apparentTemperature) {
    const temp = temperature || apparentTemperature;
    
    if (temp >= 45) {
      return {
        level: 'très_dangereux',
        color: '#8B0000',
        label: 'Très Dangereux',
        description: 'Risque extrême de coup de chaleur',
        recommendations: [
          'Évitez absolument toute exposition au soleil',
          'Restez dans un environnement climatisé',
          'Hydratez-vous constamment',
          'Consultez un médecin en cas de malaise'
        ]
      };
    } else if (temp >= 40) {
      return {
        level: 'dangereux',
        color: '#FF4500',
        label: 'Dangereux',
        description: 'Risque élevé de problèmes de santé',
        recommendations: [
          'Limitez les activités extérieures',
          'Portez des vêtements légers et clairs',
          'Buvez de l\'eau régulièrement',
          'Cherchez l\'ombre et la fraîcheur'
        ]
      };
    } else if (temp >= 35) {
      return {
        level: 'très_inconfortable',
        color: '#FF8C00',
        label: 'Très Inconfortable',
        description: 'Inconfort thermique important',
        recommendations: [
          'Évitez les efforts physiques intenses',
          'Hydratez-vous fréquemment',
          'Portez un chapeau et des lunettes',
          'Privilégiez les heures fraîches'
        ]
      };
    } else if (temp >= 30) {
      return {
        level: 'inconfortable',
        color: '#FFA500',
        label: 'Inconfortable',
        description: 'Chaleur notable, précautions recommandées',
        recommendations: [
          'Buvez suffisamment d\'eau',
          'Évitez l\'exposition prolongée au soleil',
          'Portez des vêtements adaptés'
        ]
      };
    } else {
      return {
        level: 'normal',
        color: '#32CD32',
        label: 'Normal',
        description: 'Conditions météorologiques normales',
        recommendations: [
          'Conditions normales',
          'Hydratation régulière recommandée'
        ]
      };
    }
  }

  /**
   * Obtient la description météorologique à partir du code WMO
   * @param {number} code - Code météo WMO
   * @returns {Object} Description et icône
   */
  getWeatherDescription(code) {
    return WEATHER_CODES[code] || {
      description: 'Conditions inconnues',
      icon: '❓',
      severity: 'normal'
    };
  }

  /**
   * Génère des alertes de vague de chaleur
   * @param {string} city - Nom de la ville
   * @returns {Array} Liste des alertes
   */
  async generateHeatWaveAlerts(city) {
    try {
      const forecast = await this.getForecast(city, 3);
      const alerts = [];

      // Analyse des prochaines 72 heures
      const next72Hours = forecast.hourly.slice(0, 72);
      
      // Détection de vagues de chaleur (température > 35°C pendant plus de 6h consécutives)
      let consecutiveHotHours = 0;
      let heatWaveStart = null;

      for (const hour of next72Hours) {
        if (hour.temperature >= 35) {
          if (consecutiveHotHours === 0) {
            heatWaveStart = hour.time;
          }
          consecutiveHotHours++;
        } else {
          if (consecutiveHotHours >= 6) {
            alerts.push({
              type: 'vague_de_chaleur',
              severity: hour.temperature >= 40 ? 'danger' : 'warning',
              startTime: heatWaveStart,
              duration: consecutiveHotHours,
              maxTemperature: Math.max(...next72Hours.slice(-consecutiveHotHours).map(h => h.temperature)),
              message: `Vague de chaleur prévue à ${city}`,
              recommendations: this.calculateHeatRiskLevel(hour.temperature).recommendations
            });
          }
          consecutiveHotHours = 0;
        }
      }

      // Alerte pour température extrême (>= 42°C)
      const extremeHours = next72Hours.filter(h => h.temperature >= 42);
      if (extremeHours.length > 0) {
        alerts.push({
          type: 'temperature_extreme',
          severity: 'danger',
          time: extremeHours[0].time,
          temperature: extremeHours[0].temperature,
          message: `Température extrême prévue à ${city}`,
          recommendations: this.calculateHeatRiskLevel(extremeHours[0].temperature).recommendations
        });
      }

      return alerts;
    } catch (error) {
      console.error(`Erreur lors de la génération d'alertes pour ${city}:`, error.message);
      throw error;
    }
  }

  /**
   * Obtient la liste des villes supportées
   * @returns {Array} Liste des villes avec leurs coordonnées
   */
  getSupportedCities() {
    return Object.entries(SENEGAL_CITIES).map(([name, coords]) => ({
      name,
      latitude: coords.lat,
      longitude: coords.lon
    }));
  }
}

module.exports = new WeatherService();

