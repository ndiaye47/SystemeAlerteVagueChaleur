const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { authenticateToken } = require('../middleware/auth');

// Routes météorologiques publiques
router.get('/current/:city', weatherController.getCurrentWeather);
router.get('/forecast/:city', weatherController.getForecast);
router.get('/cities', weatherController.getSupportedCities);
router.get('/all-cities', weatherController.getAllCitiesWeather);

// Routes pour les alertes
router.get('/alerts/active', weatherController.getActiveAlerts);
router.get('/alerts/heatwave/:city', weatherController.getHeatWaveAlerts);

// Routes protégées (admin seulement)
router.get('/history/:city', authenticateToken, weatherController.getWeatherHistory);
router.get('/history', authenticateToken, weatherController.getWeatherHistory);
router.post('/update-all', authenticateToken, weatherController.updateAllWeatherData);

// Routes de compatibilité (anciennes routes)
router.get('/current', async (req, res) => {
  // Redirection vers Dakar par défaut
  req.params.city = 'Dakar';
  return weatherController.getCurrentWeather(req, res);
});

router.get('/forecast', async (req, res) => {
  // Redirection vers Dakar par défaut
  req.params.city = 'Dakar';
  return weatherController.getForecast(req, res);
});

router.get('/regions', weatherController.getSupportedCities);

router.get('/history', authenticateToken, async (req, res) => {
  return weatherController.getWeatherHistory(req, res);
});

module.exports = router;

