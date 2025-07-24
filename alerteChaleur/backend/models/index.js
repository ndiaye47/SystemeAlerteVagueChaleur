const { sequelize } = require('../config/database');
const User = require('./User');
const Profile = require('./Profile');
const Alert = require('./Alert');
const WeatherData = require('./WeatherData');
const Report = require('./Report');

// Définition des associations
User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Alert, { foreignKey: 'createdBy', as: 'alerts' });
Alert.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

User.hasMany(Report, { foreignKey: 'userId', as: 'reports' });
Report.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Fonction pour synchroniser la base de données
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ Base de données synchronisée avec succès');
    
    // Créer un utilisateur admin par défaut si aucun n'existe
    const adminExists = await User.findOne({ where: { role: 'admin' } });
    if (!adminExists) {
      const admin = await User.create({
        username: 'admin',
        email: 'admin@heatwave.sn',
        password: 'admin123',
        role: 'admin'
      });
      
      await Profile.create({
        userId: admin.id,
        ageGroup: 'normal',
        region: 'Dakar',
        language: 'francais'
      });
      
      console.log('✅ Utilisateur admin créé par défaut');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Profile,
  Alert,
  WeatherData,
  Report,
  syncDatabase
};

