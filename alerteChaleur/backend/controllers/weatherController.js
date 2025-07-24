const weatherService = require('../services/weatherService');
const { WeatherData, Alert } = require('../models');

/**
 * Contrôleur pour la gestion des données météorologiques
 * Intégration avec l'API Open-Meteo pour des données réelles
 */

class WeatherController {
  /**
   * Récupère les données météorologiques actuelles pour une ville
   */
  async getCurrentWeather(req, res) {
    try {
      const { city } = req.params;
      
      if (!city) {
        return res.status(400).json({
          success: false,
          message: 'Le nom de la ville est requis'
        });
      }

      const weatherData = await weatherService.getCurrentWeather(city);
      
      // Sauvegarde en base de données
      await WeatherData.create({
        city: weatherData.city,
        latitude: weatherData.coordinates.lat,
        longitude: weatherData.coordinates.lon,
        temperature: weatherData.current.temperature,
        humidity: weatherData.current.humidity,
        apparentTemperature: weatherData.current.apparentTemperature,
        weatherCode: weatherData.current.weatherCode,
        weatherDescription: weatherData.current.weatherDescription.description,
        windSpeed: weatherData.current.windSpeed,
        windDirection: weatherData.current.windDirection,
        heatRiskLevel: weatherData.current.heatRiskLevel.level,
        timestamp: new Date(weatherData.current.time)
      });

      res.json({
        success: true,
        data: weatherData
      });
    } catch (error) {
      console.error('Erreur getCurrentWeather:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des données météo',
        error: error.message
      });
    }
  }

  /**
   * Récupère les prévisions météorologiques pour une ville
   */
  async getForecast(req, res) {
    try {
      const { city } = req.params;
      const { days = 7 } = req.query;
      
      if (!city) {
        return res.status(400).json({
          success: false,
          message: 'Le nom de la ville est requis'
        });
      }

      const forecastData = await weatherService.getForecast(city, parseInt(days));

      res.json({
        success: true,
        data: forecastData
      });
    } catch (error) {
      console.error('Erreur getForecast:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des prévisions',
        error: error.message
      });
    }
  }

  /**
   * Récupère les données météo pour toutes les villes du Sénégal
   */
  async getAllCitiesWeather(req, res) {
    try {
      const allCitiesData = await weatherService.getAllCitiesWeather();

      // Sauvegarde des données réussies en base
      const successfulData = allCitiesData.filter(item => item.success);
      for (const item of successfulData) {
        const data = item.data;
        await WeatherData.create({
          city: data.city,
          latitude: data.coordinates.lat,
          longitude: data.coordinates.lon,
          temperature: data.current.temperature,
          humidity: data.current.humidity,
          apparentTemperature: data.current.apparentTemperature,
          weatherCode: data.current.weatherCode,
          weatherDescription: data.current.weatherDescription.description,
          windSpeed: data.current.windSpeed,
          windDirection: data.current.windDirection,
          heatRiskLevel: data.current.heatRiskLevel.level,
          timestamp: new Date(data.current.time)
        });
      }

      res.json({
        success: true,
        data: allCitiesData,
        summary: {
          total: allCitiesData.length,
          successful: successfulData.length,
          failed: allCitiesData.length - successfulData.length
        }
      });
    } catch (error) {
      console.error('Erreur getAllCitiesWeather:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des données pour toutes les villes',
        error: error.message
      });
    }
  }

  /**
   * Génère et récupère les alertes de vague de chaleur
   */
  async getHeatWaveAlerts(req, res) {
    try {
      const { city } = req.params;
      
      if (!city) {
        return res.status(400).json({
          success: false,
          message: 'Le nom de la ville est requis'
        });
      }

      const alerts = await weatherService.generateHeatWaveAlerts(city);

      // Sauvegarde des alertes en base de données
      for (const alert of alerts) {
        await Alert.create({
          type: alert.type,
          severity: alert.severity,
          city: city,
          title: alert.message,
          message: alert.message,
          recommendations: JSON.stringify(alert.recommendations),
          startTime: alert.startTime || alert.time,
          endTime: alert.startTime ? new Date(new Date(alert.startTime).getTime() + alert.duration * 60 * 60 * 1000) : null,
          isActive: true,
          metadata: JSON.stringify({
            temperature: alert.temperature || alert.maxTemperature,
            duration: alert.duration,
            source: 'Open-Meteo API'
          })
        });
      }

      res.json({
        success: true,
        data: {
          city,
          alerts,
          count: alerts.length
        }
      });
    } catch (error) {
      console.error('Erreur getHeatWaveAlerts:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la génération des alertes',
        error: error.message
      });
    }
  }

  /**
   * Récupère les villes supportées
   */
  async getSupportedCities(req, res) {
    try {
      const cities = weatherService.getSupportedCities();

      res.json({
        success: true,
        data: cities
      });
    } catch (error) {
      console.error('Erreur getSupportedCities:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des villes supportées',
        error: error.message
      });
    }
  }

  /**
   * Récupère l'historique des données météo depuis la base de données
   */
  async getWeatherHistory(req, res) {
    try {
      const { city } = req.params;
      const { limit = 100, offset = 0 } = req.query;

      const whereClause = city ? { city } : {};

      const weatherHistory = await WeatherData.findAndCountAll({
        where: whereClause,
        order: [['timestamp', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        success: true,
        data: {
          records: weatherHistory.rows,
          pagination: {
            total: weatherHistory.count,
            limit: parseInt(limit),
            offset: parseInt(offset),
            pages: Math.ceil(weatherHistory.count / parseInt(limit))
          }
        }
      });
    } catch (error) {
      console.error('Erreur getWeatherHistory:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'historique météo',
        error: error.message
      });
    }
  }

  /**
   * Récupère les alertes actives depuis la base de données
   */
  async getActiveAlerts(req, res) {
    try {
      const { city } = req.query;

      const whereClause = {
        isActive: true,
        ...(city && { city })
      };

      const alerts = await Alert.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: alerts
      });
    } catch (error) {
      console.error('Erreur getActiveAlerts:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des alertes actives',
        error: error.message
      });
    }
  }

  /**
   * Met à jour les données météo pour toutes les villes (tâche automatique)
   */
  async updateAllWeatherData(req, res) {
    try {
      console.log('🌡️ Mise à jour automatique des données météo...');
      
      const allCitiesData = await weatherService.getAllCitiesWeather();
      const successfulUpdates = [];
      const failedUpdates = [];

      for (const item of allCitiesData) {
        if (item.success) {
          try {
            const data = item.data;
            await WeatherData.create({
              city: data.city,
              latitude: data.coordinates.lat,
              longitude: data.coordinates.lon,
              temperature: data.current.temperature,
              humidity: data.current.humidity,
              apparentTemperature: data.current.apparentTemperature,
              weatherCode: data.current.weatherCode,
              weatherDescription: data.current.weatherDescription.description,
              windSpeed: data.current.windSpeed,
              windDirection: data.current.windDirection,
              heatRiskLevel: data.current.heatRiskLevel.level,
              timestamp: new Date(data.current.time)
            });

            // Génération automatique d'alertes si nécessaire
            if (data.current.heatRiskLevel.level === 'dangereux' || data.current.heatRiskLevel.level === 'très_dangereux') {
              const alerts = await weatherService.generateHeatWaveAlerts(data.city);
              for (const alert of alerts) {
                await Alert.create({
                  type: alert.type,
                  severity: alert.severity,
                  city: data.city,
                  title: alert.message,
                  message: alert.message,
                  recommendations: JSON.stringify(alert.recommendations),
                  startTime: alert.startTime || alert.time,
                  isActive: true,
                  metadata: JSON.stringify({
                    temperature: alert.temperature || alert.maxTemperature,
                    source: 'Mise à jour automatique'
                  })
                });
              }
            }

            successfulUpdates.push(item.city);
          } catch (dbError) {
            console.error(`Erreur DB pour ${item.city}:`, dbError.message);
            failedUpdates.push({ city: item.city, error: dbError.message });
          }
        } else {
          failedUpdates.push({ city: item.city, error: item.error });
        }
      }

      const result = {
        success: true,
        message: 'Mise à jour des données météo terminée',
        summary: {
          successful: successfulUpdates.length,
          failed: failedUpdates.length,
          successfulCities: successfulUpdates,
          failedCities: failedUpdates
        }
      };

      console.log('✅ Mise à jour terminée:', result.summary);

      if (res) {
        res.json(result);
      }

      return result;
    } catch (error) {
      console.error('Erreur updateAllWeatherData:', error);
      const errorResult = {
        success: false,
        message: 'Erreur lors de la mise à jour automatique des données météo',
        error: error.message
      };

      if (res) {
        res.status(500).json(errorResult);
      }

      return errorResult;
    }
  }
}

module.exports = new WeatherController();

