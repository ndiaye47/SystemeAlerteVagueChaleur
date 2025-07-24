# Guide d'Utilisation - MBOYY MII Alert

## 🎯 Guide Rapide de Démarrage

### Démarrage de l'Application

1. **Démarrer le Backend**
```bash
cd heatwave-platform/backend
npm start
```
✅ Serveur disponible sur http://localhost:5000

2. **Démarrer l'Interface Admin**
```bash
cd heatwave-platform/admin-dashboard
npm run dev
```
✅ Interface admin sur http://localhost:5173

3. **Démarrer l'Interface Client**
```bash
cd heatwave-platform/client-mobile
npm run dev
```
✅ Interface client sur http://localhost:5174

## 👨‍💼 Guide Administrateur

### Connexion Admin
1. Aller sur http://localhost:5173
2. Utiliser les identifiants :
   - **Email** : admin@heatwave.sn
   - **Mot de passe** : admin123

### Fonctionnalités Admin

#### 📊 Dashboard Principal
- **Vue d'ensemble** : Statistiques en temps réel
- **Alertes actives** : Nombre et détails des alertes
- **Utilisateurs connectés** : Suivi de l'activité
- **Données météo** : Résumé des conditions actuelles

#### 👥 Gestion des Utilisateurs
- **Liste des utilisateurs** : Voir tous les comptes
- **Création d'utilisateurs** : Ajouter de nouveaux comptes
- **Modification** : Éditer les profils utilisateurs
- **Suppression** : Désactiver des comptes
- **Filtrage** : Par rôle (admin/client)

#### 🚨 Gestion des Alertes
- **Alertes actives** : Voir les alertes en cours
- **Création d'alertes** : Nouvelles alertes manuelles
- **Historique** : Consulter les alertes passées
- **Paramétrage** : Seuils et conditions d'alerte

#### 🌡️ Données Météorologiques
- **Monitoring temps réel** : Toutes les villes
- **Graphiques** : Évolution des températures
- **Cartes thermiques** : Visualisation géographique
- **Prévisions** : Données prévisionnelles

#### 📝 Rapports et Signalements
- **Signalements citoyens** : Données terrain
- **Statistiques santé** : Impact des vagues de chaleur
- **Exports** : Données au format PDF/Excel
- **Analyses** : Tendances et patterns

#### ⚙️ Paramètres Système
- **Configuration** : Seuils d'alerte
- **Régions** : Gestion des zones de vigilance
- **Notifications** : Paramètres d'envoi
- **Maintenance** : Outils de diagnostic

## 📱 Guide Utilisateur Client

### Connexion Client
1. Aller sur http://localhost:5174
2. Utiliser les identifiants :
   - **Email** : client@heatwave.sn
   - **Mot de passe** : client123

### Fonctionnalités Client

#### 🏠 Écran d'Accueil
- **Météo actuelle** : Température et conditions
- **Niveau de risque** : Indicateur coloré
- **Recommandations** : Conseils personnalisés
- **Dernière mise à jour** : Horodatage des données

#### 📍 Sélection de Ville
- **Menu déroulant** : 12 villes du Sénégal
- **Changement automatique** : Mise à jour des données
- **Géolocalisation** : (Préparé pour implémentation)

#### 🌡️ Informations Météo Détaillées
- **Température ressentie** : Calcul de l'index de chaleur
- **Humidité** : Pourcentage d'humidité relative
- **Vent** : Vitesse et direction
- **Conditions** : Description textuelle et icône

#### 🚨 Système d'Alertes
- **Alertes actives** : Notifications importantes
- **Niveaux de vigilance** :
  - 🟢 **Normal** : Conditions normales
  - 🟡 **Inconfortable** : Précautions recommandées
  - 🟠 **Très Inconfortable** : Vigilance accrue
  - 🔴 **Dangereux** : Risque sanitaire élevé

#### 💡 Recommandations Personnalisées
Selon le niveau de risque :

**Normal** :
- Conditions normales
- Hydratation régulière recommandée

**Inconfortable** :
- Buvez suffisamment d'eau
- Évitez l'exposition prolongée au soleil
- Portez des vêtements adaptés

**Très Inconfortable** :
- Évitez les efforts physiques intenses
- Hydratez-vous fréquemment
- Portez un chapeau et des lunettes
- Privilégiez les heures fraîches

**Dangereux** :
- Restez à l'intérieur si possible
- Hydratation constante obligatoire
- Évitez toute activité physique
- Consultez un médecin si nécessaire

#### 📞 Module Urgence
- **Appel direct** : Numéros d'urgence
- **Premiers secours** : Gestes essentiels
- **Symptômes** : Reconnaissance des signes
- **Localisation** : Centres de santé proches

#### 📝 Signalement
- **Symptômes observés** : Déshydratation, coup de chaleur
- **Conditions locales** : Absence d'ombre, accès à l'eau
- **Ressenti thermique** : Perception personnelle
- **Photos** : Documentation visuelle (optionnel)

#### 👤 Profil Utilisateur
- **Informations personnelles** : Nom, âge, localisation
- **Profil de vulnérabilité** :
  - Personne âgée
  - Femme enceinte
  - Enfant
  - Maladie chronique
- **Préférences** : Notifications, langue
- **Historique** : Signalements précédents

## 🔧 Fonctionnalités Techniques

### API Météorologique
- **Source** : Open-Meteo (données gratuites et fiables)
- **Fréquence** : Mise à jour toutes les heures
- **Couverture** : 12 villes principales du Sénégal
- **Paramètres** : Température, humidité, vent, conditions

### Calcul des Risques
```javascript
// Algorithme de calcul du niveau de risque
function calculateHeatRisk(apparentTemperature) {
  if (apparentTemperature >= 40) return 'dangereux';
  if (apparentTemperature >= 35) return 'très_inconfortable';
  if (apparentTemperature >= 30) return 'inconfortable';
  return 'normal';
}
```

### Base de Données
- **Création automatique** : Au démarrage du serveur
- **Synchronisation** : Modèles Sequelize
- **Sauvegarde** : Données météo historiques
- **Performance** : Index optimisés

## 🚨 Gestion des Alertes

### Types d'Alertes
1. **Automatiques** : Basées sur les seuils de température
2. **Manuelles** : Créées par les administrateurs
3. **Préventives** : Prévisions à 24-48h
4. **Urgentes** : Situations critiques immédiates

### Niveaux de Priorité
- **Info** : Information générale
- **Attention** : Vigilance recommandée
- **Alerte** : Précautions nécessaires
- **Urgence** : Action immédiate requise

### Diffusion des Alertes
- **Interface web** : Notifications en temps réel
- **Interface mobile** : Alertes push (préparé)
- **SMS** : Intégration possible
- **Email** : Notifications par email

## 📊 Données et Statistiques

### Villes Supportées
1. **Dakar** - Capitale, zone côtière
2. **Saint-Louis** - Nord, zone sahélienne
3. **Thiès** - Centre-ouest
4. **Kaolack** - Centre, zone continentale
5. **Ziguinchor** - Sud, Casamance
6. **Diourbel** - Centre, zone arachidière
7. **Tambacounda** - Est, zone continentale
8. **Matam** - Nord-est, vallée du fleuve
9. **Podor** - Nord, vallée du fleuve
10. **Kaffrine** - Centre-est
11. **Kolda** - Sud-est
12. **Louga** - Nord-ouest

### Métriques Surveillées
- **Température actuelle** : °C
- **Température ressentie** : Index de chaleur
- **Humidité relative** : %
- **Vitesse du vent** : km/h
- **Direction du vent** : Degrés
- **Code météo** : Conditions générales

## 🔒 Sécurité et Confidentialité

### Authentification
- **JWT Tokens** : Sécurisation des sessions
- **Hashage bcrypt** : Protection des mots de passe
- **Expiration** : Tokens avec durée limitée
- **Refresh** : Renouvellement automatique

### Protection des Données
- **Validation** : Contrôle des entrées utilisateur
- **Sanitisation** : Nettoyage des données
- **CORS** : Protection cross-origin
- **HTTPS** : Chiffrement des communications (production)

### Rôles et Permissions
- **Admin** : Accès complet au système
- **Client** : Accès aux données personnelles uniquement
- **Invité** : Consultation limitée (optionnel)

## 🛠️ Maintenance et Dépannage

### Problèmes Courants

#### Serveur Backend ne démarre pas
```bash
# Vérifier MySQL
sudo systemctl status mysql
sudo systemctl start mysql

# Vérifier les dépendances
cd backend && npm install

# Vérifier les logs
npm start
```

#### Interface ne se charge pas
```bash
# Vérifier le serveur de développement
npm run dev

# Vérifier les ports
netstat -tulpn | grep :5173
netstat -tulpn | grep :5174
```

#### Données météo non disponibles
1. Vérifier la connexion internet
2. Tester l'API Open-Meteo directement
3. Consulter les logs du service météo
4. Vérifier les limites de l'API

#### Problèmes de connexion
1. Vérifier les identifiants
2. Contrôler la base de données
3. Tester l'API d'authentification
4. Vérifier les tokens JWT

### Logs et Diagnostic
```bash
# Logs du backend
cd backend && npm start

# Logs de la base de données
sudo tail -f /var/log/mysql/error.log

# Logs du navigateur
F12 > Console > Network
```

## 📞 Support et Contact

### Support Technique
- **Documentation** : README.md complet
- **Code source** : Commenté et structuré
- **API** : Documentation des endpoints
- **Base de données** : Schéma détaillé

### Évolutions Futures
- **Notifications push** : Implémentation mobile
- **Géolocalisation** : Détection automatique
- **Multilingue** : Wolof et Pulaar
- **IA prédictive** : Modèles d'apprentissage
- **Application mobile** : React Native

---

**Guide mis à jour le 24 juillet 2025**

