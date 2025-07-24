const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  ageGroup: {
    type: DataTypes.ENUM('personne_agee', 'femme_enceinte', 'enfant', 'maladie_chronique', 'normal'),
    allowNull: false,
    defaultValue: 'normal'
  },
  region: {
    type: DataTypes.STRING(100),
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
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  language: {
    type: DataTypes.ENUM('francais', 'wolof', 'pulaar'),
    defaultValue: 'francais'
  },
  notificationsEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'profiles',
  timestamps: true
});

module.exports = Profile;

