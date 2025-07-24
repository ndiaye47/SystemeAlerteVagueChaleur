## 🌡️ Description du Projet

MBOYY MII Alert est une plateforme complète d'alerte et de prévention santé face aux vagues de chaleur au Sénégal. Elle permet d'alerter les populations, notamment les plus vulnérables, de la venue et des risques sanitaires liés aux vagues de chaleur et propose des gestes préventifs personnalisés.

## 🎯 Objectif Principal

Alerter les populations (notamment les plus vulnérables) des risques sanitaires liés aux vagues de chaleur et proposer des gestes préventifs personnalisés pour le Sénégal.

## 🏗️ Architecture Technique

### Stack Technologique
- **Backend** : Node.js + Express.js
- **Base de données** : MySQL
- **Frontend Admin** : React.js (Interface web)
- **Frontend Client** : React.js (Interface mobile-first)
- **API Météo** : Open-Meteo (données réelles)
- **Authentification** : JWT (JSON Web Tokens)

### Structure du Projet
```
heatwave-platform/
├── backend/                 # API Node.js + Express
│   ├── config/             # Configuration base de données
│   ├── controllers/        # Contrôleurs API
│   ├── middleware/         # Middlewares (auth, etc.)
│   ├── models/            # Modèles Sequelize
│   ├── routes/            # Routes API
│   ├── services/          # Services (météo, etc.)
│   └── app.js             # Point d'entrée
├── admin-dashboard/        # Interface admin React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── contexts/      # Contextes (Auth, etc.)
│   │   └── App.jsx        # Application principale
└── client-mobile/         # Interface client React
    ├── src/
    │   ├── components/    # Composants React
    │   ├── contexts/      # Contextes (Auth, etc.)
    │   └── App.jsx        # Application principale
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v20+)
- MySQL (v8+)
- npm ou yarn

### 1. Configuration de la Base de Données
```bash
# Démarrer MySQL
sudo systemctl start mysql

# La base de données se crée automatiquement au démarrage du serveur
```

### 2. Installation du Backend
```bash
cd backend
npm install
npm start
```
Le serveur démarre sur http://localhost:5000

### 3. Installation de l'Interface Admin
```bash
cd admin-dashboard
npm install
npm run dev
```
Interface admin disponible sur http://localhost:5173

### 4. Installation de l'Interface Client
```bash
cd client-mobile
npm install
npm run dev
```
Interface client disponible sur http://localhost:5174

## 👥 Comptes de Test

### Administrateur
- **Email** : admin@heatwave.sn
- **Mot de passe** : admin123

### Client
- **Email** : client@heatwave.sn
- **Mot de passe** : client123

## 🌟 Fonctionnalités Principales

### 1. Système d'Alerte Localisée
- Notifications en cas de vague de chaleur
- Alerte basée sur la position GPS
- Niveaux de vigilance : Normal / Inconfortable / Très Inconfortable / Dangereux

### 2. Données Météo en Temps Réel
- Intégration API Open-Meteo
- 12 villes du Sénégal supportées :
  - Dakar, Saint-Louis, Thiès, Kaolack
  - Ziguinchor, Diourbel, Tambacounda
  - Matam, Podor, Kaffrine, Kolda, Louga
- Températures actuelles et ressenties
- Humidité, vitesse du vent, conditions météo

### 3. Profil Utilisateur et Recommandations Ciblées
- Profils : Personne âgée, Femme enceinte, Enfant, Maladie chronique
- Messages de prévention adaptés selon le profil
- Recommandations personnalisées selon le niveau de risque

### 4. Module "Que faire ?"
- Gestes de premiers secours en cas de coup de chaleur
- Conseils d'hydratation, d'habillage, de ventilation
- Bouton "Urgence" pour appel direct

### 5. Interface d'Administration
- Gestion des utilisateurs
- Visualisation des alertes en temps réel
- Suivi des rapports de signalement
- Statistiques d'impact santé
- Gestion des régions/zones de vigilance

## 🔧 APIs Disponibles

### Authentification
- `POST /api/auth/login` - Connexion utilisateur
- `POST /api/auth/register` - Inscription utilisateur

### Données Météo
- `GET /api/weather/current/:city` - Météo actuelle d'une ville
- `GET /api/weather/all-cities` - Météo de toutes les villes
- `GET /api/weather/cities` - Liste des villes supportées
- `GET /api/weather/alerts/active` - Alertes actives

### Gestion des Utilisateurs (Admin)
- `GET /api/users` - Liste des utilisateurs
- `PUT /api/users/:id` - Mise à jour utilisateur
- `DELETE /api/users/:id` - Suppression utilisateur

## 🌡️ Calcul des Niveaux de Risque

Le système calcule automatiquement les niveaux de risque basés sur la température ressentie :

- **Normal** (< 30°C) : Conditions météorologiques normales
- **Inconfortable** (30-35°C) : Chaleur notable, précautions recommandées
- **Très Inconfortable** (35-40°C) : Inconfort thermique important
- **Dangereux** (> 40°C) : Risque sanitaire élevé

## 📱 Interfaces Utilisateur

### Interface Admin (Web)
- Dashboard avec statistiques en temps réel
- Gestion complète des utilisateurs
- Visualisation des données météo
- Système d'alertes et notifications
- Rapports et analyses

### Interface Client (Mobile-First)
- Données météo en temps réel
- Sélecteur de ville
- Alertes personnalisées
- Recommandations santé
- Navigation mobile intuitive
- Design responsive

## 🔒 Sécurité

- Authentification JWT sécurisée
- Hashage des mots de passe avec bcrypt
- Validation des données d'entrée
- Protection CORS configurée
- Séparation des rôles admin/client

## 🌍 Données Météorologiques

### Source des Données
- **API Open-Meteo** : Données météorologiques gratuites et fiables
- Mise à jour en temps réel
- Couverture complète du Sénégal
- Données historiques disponibles

### Paramètres Surveillés
- Température actuelle et ressentie
- Humidité relative
- Vitesse et direction du vent
- Code météorologique
- Prévisions à court terme

## 🚀 Déploiement

### Développement
```bash
# Backend
cd backend && npm start

# Admin
cd admin-dashboard && npm run dev

# Client
cd client-mobile && npm run dev
```

### Production
```bash
# Build des interfaces
cd admin-dashboard && npm run build
cd client-mobile && npm run build

# Démarrage du backend
cd backend && npm start
```

## 📊 Base de Données

### Tables Principales
- **users** : Utilisateurs (admin/client)
- **profiles** : Profils utilisateurs détaillés
- **weather_data** : Données météorologiques
- **alerts** : Alertes et notifications
- **reports** : Signalements utilisateurs

### Création Automatique
La base de données et les tables se créent automatiquement au démarrage du serveur backend grâce à Sequelize.

## 🔄 Fonctionnalités Avancées

### Système d'Alertes Intelligent
- Calcul automatique des seuils de risque
- Notifications push (préparé pour implémentation)
- Alertes géolocalisées
- Historique des alertes

### Collecte de Données Terrain
- Signalements citoyens
- Données des agents de santé
- Ressenti thermique local
- Conditions environnementales

### Support Multilingue (Préparé)
- Français (implémenté)
- Wolof (structure préparée)
- Pulaar (structure préparée)

## 🛠️ Maintenance et Support

### Logs et Monitoring
- Logs détaillés du serveur
- Suivi des erreurs API
- Monitoring des performances

### Mise à Jour des Données
- Synchronisation automatique avec Open-Meteo
- Sauvegarde des données historiques
- Cache intelligent pour optimiser les performances

## 📞 Support Technique

Pour toute question technique ou problème :
1. Vérifier les logs du serveur backend
2. Contrôler la connexion à la base de données
3. Valider la connectivité API Open-Meteo
4. Consulter la documentation des erreurs

## 🎉 Conclusion

MBOYY MII Alert est une solution complète et moderne pour la prévention des risques sanitaires liés aux vagues de chaleur au Sénégal. L'application combine des données météorologiques réelles, une interface utilisateur intuitive et un système d'alertes intelligent pour protéger efficacement les populations vulnérables.

---

**Développé avec ❤️ pour la santé publique au Sénégal**

