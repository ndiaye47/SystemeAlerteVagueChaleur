const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const WeatherData = sequelize.define('WeatherData', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true
  },
  temperature: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  humidity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  apparentTemperature: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  weatherCode: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  weatherDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  windSpeed: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  windDirection: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  heatRiskLevel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'weather_data',
  timestamps: true
});

module.exports = WeatherData;

