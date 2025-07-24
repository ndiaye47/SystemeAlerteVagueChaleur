# Cahier des Charges - MBOYY MII Alert

## 1. Introduction

Ce document décrit les exigences fonctionnelles et non fonctionnelles pour le développement de la plateforme "MBOYY MII Alert". Cette plateforme vise à alerter et prévenir les populations du Sénégal des risques sanitaires liés aux vagues de chaleur, en proposant des gestes préventifs personnalisés.

## 2. Objectifs du Projet

### 2.1. Objectif Principal

Alerter les populations (notamment les plus vulnérables) des risques sanitaires liés aux vagues de chaleur et proposer des gestes préventifs personnalisés au Sénégal.

### 2.2. Objectifs Spécifiques
- Fournir des alertes localisées en temps réel.
- Afficher des données météo-santé précises et compréhensibles.
- Offrir des recommandations de prévention personnalisées selon le profil utilisateur.
- Mettre à disposition un module d'aide en cas d'urgence.
- Intégrer les bulletins officiels des autorités compétentes (CNCS/ANACIM).
- Permettre la collecte de données terrain pour le suivi sanitaire.
- Développer un module d'analyse basé sur l'IA pour l'identification des tendances.
- Assurer une accessibilité multilingue (Français, Wolof, Pulaar).
- Fournir une interface d'administration pour la gestion et le suivi.

## 3. Périmètre Fonctionnel

### 3.1. Rôles Utilisateurs

La plateforme gérera deux rôles principaux :
- **Administrateur** : Gère les utilisateurs, les alertes, visualise les statistiques et les rapports.
- **Client** : Reçoit les alertes, consulte les données météo, accède aux recommandations, soumet des rapports terrain.

### 3.2. Fonctionnalités Détaillées

#### 3.2.1. Système d’alerte localisée (Mobile)
- **Notification push/SMS** : Envoi d'alertes en cas de vague de chaleur annoncée.
- **Alerte basée sur la position GPS** : Localisation des alertes par région (Matam, Podor, Kaffrine, etc.).
- **Niveau de vigilance** : Affichage clair du niveau de risque (Très inconfortable / Dangereux / Très dangereux).

#### 3.2.2. Affichage des données météo-santé (Web et Mobile)
- **Températures prévues** : Affichage des températures maximales et nocturnes (via API existantes).
- **Niveau de risque** : Représentation visuelle du niveau de risque (code couleur).
- **Carte thermique par région** : Visualisation géographique des zones à risque (pour l'interface Admin).

#### 3.2.3. Profil utilisateur pour recommandations ciblées (Mobile)
- **Précision du profil** : L'utilisateur peut spécifier s'il est : Personne âgée, Femme enceinte, Enfant, Souffrant de maladie chronique.
- **Messages de prévention adaptés** : L'application adapte les recommandations en fonction du profil de vulnérabilité.

#### 3.2.4. Module "Que faire ?" (Mobile)
- **Gestes de premiers secours** : Informations sur les actions à entreprendre en cas de coup de chaleur.
- **Conseils pratiques** : Hydratation, habillage, ventilation.
- **Bouton “Urgence”** : Appel direct à un numéro d'urgence prédéfini (ex: XX XX).

#### 3.2.5. Connexion aux bulletins CNCS/ANACIM (Web)
- **Intégration automatique** : Récupération des bulletins PDF et alertes en temps réel.
- **Méthodes d'intégration** : Via API ou dépôt manuel dans l'application (si nécessaire).

#### 3.2.6. Collecte de données (Mobile)
- **Soumission de données terrain** : Permettre aux utilisateurs (citoyens, agents de santé, relais communautaires) de soumettre des informations sur :
    - Symptômes observés (ex. déshydratation, coup de chaleur).
    - Signalements d’événements sanitaires.
    - Ressenti thermique.
    - Conditions environnementales locales (absence d’ombre, accès à l’eau, etc.).

#### 3.2.7. Module IA (Web)
- **Création et entraînement de modèles IA** : Pour l'analyse prédictive des vagues de chaleur et l'identification des zones à risque.

#### 3.2.8. Version multilingue (Mobile)
- **Support linguistique** : Français, Wolof, Pulaar (via audio ou texte).

#### 3.2.9. Administration et statistiques (Web)
- **Gestion des utilisateurs** : Création, modification, suppression et gestion des rôles.
- **Visualisation des alertes** : Suivi en temps réel des alertes émises.
- **Suivi des rapports de signalement** : Consultation et analyse des données terrain.
- **Gestion des régions/zones de vigilance** : Configuration des zones géographiques pour les alertes.
- **Téléchargement des bulletins** : Accès aux bulletins PDF et données climatiques.
- **Statistiques d’impact santé** : Visualisation via graphes et cartographie.

## 4. Périmètre Non Fonctionnel

### 4.1. Performance
- Le temps de réponse des APIs ne doit pas dépasser 2 secondes pour 90% des requêtes.
- Le chargement des pages des interfaces utilisateur ne doit pas dépasser 3 secondes.
- La plateforme doit pouvoir gérer un minimum de 1000 utilisateurs simultanés.

### 4.2. Sécurité
- Authentification robuste des utilisateurs (JWT, hachage des mots de passe).
- Protection contre les injections SQL et les attaques XSS.
- Gestion des autorisations basée sur les rôles.
- Communication sécurisée (HTTPS) entre le client et le serveur.
- Protection des données personnelles conformément aux réglementations en vigueur.

### 4.3. Fiabilité
- Disponibilité de la plateforme : 99.5%.
- Système de logging et de monitoring des erreurs.
- Mécanismes de sauvegarde et de restauration de la base de données.

### 4.4. Maintenabilité
- Code source bien structuré, commenté et documenté.
- Utilisation de frameworks et bibliothèques standards.
- Facilité de déploiement et de mise à jour.

### 4.5. Évolutivité
- Architecture modulaire permettant l'ajout de nouvelles fonctionnalités.
- Capacité à gérer une augmentation du nombre d'utilisateurs et de données.

### 4.6. Ergonomie et Design
- Interfaces utilisateur intuitives, simples et modernes.
- Design responsive pour une expérience optimale sur mobile et web.
- Cohérence graphique et respect des principes d'UX/UI.
- Tableau de bord vertical pour l'interface Admin.

### 4.7. Données
- Utilisation d'APIs météo réelles (Open-Meteo).
- Intégration des données CNCS/ANACIM (si API disponible, sinon dépôt manuel).
- Données de localisation précises pour les alertes.

## 5. Contraintes Techniques

- **Backend** : Node.js, Express.js, Sequelize, MySQL.
- **Frontend** : React.js, Tailwind CSS.
- **Base de données** : MySQL.
- **API Météo** : Open-Meteo.
- **Déploiement** : Environnement Linux (Ubuntu).

## 6. Calendrier Prévisionnel (Estimatif)

- **Phase 1 : Planification et Conception** (1 semaine)
    - Rédaction du cahier des charges et spécifications techniques.
    - Conception de l'architecture et du schéma de base de données.
- **Phase 2 : Développement Backend** (3 semaines)
    - Mise en place de l'API REST, authentification, gestion des utilisateurs.
    - Intégration de l'API météo et logique de calcul de risque.
- **Phase 3 : Développement Frontend Admin** (2 semaines)
    - Implémentation du tableau de bord, gestion des utilisateurs, alertes.
- **Phase 4 : Développement Frontend Client** (3 semaines)
    - Interface mobile, profil utilisateur, module "Que faire ?", signalement.
- **Phase 5 : Intégration et Tests** (1 semaine)
    - Intégration des modules, tests fonctionnels et de performance.
- **Phase 6 : Déploiement et Documentation** (1 semaine)
    - Préparation à la production, rédaction des rapports et guides.

## 7. Critères d'Acceptation

- Toutes les fonctionnalités décrites dans le périmètre fonctionnel doivent être implémentées et testées.
- Les exigences non fonctionnelles (performance, sécurité, fiabilité) doivent être respectées.
- Les interfaces utilisateur doivent être intuitives et conformes aux maquettes (si fournies).
- La base de données doit être stable et les données cohérentes.
- L'application doit être déployable et fonctionnelle dans l'environnement cible.
- La documentation technique et utilisateur doit être complète et à jour.

## 8. Glossaire

- **API** : Application Programming Interface
- **CNCS** : Centre National de la Climatologie du Sénégal
- **ANACIM** : Agence Nationale de l'Aviation Civile et de la Météorologie
- **GPS** : Global Positioning System
- **IA** : Intelligence Artificielle
- **JWT** : JSON Web Token
- **ORM** : Object-Relational Mapper
- **REST** : Representational State Transfer
- **SMS** : Short Message Service
- **UI** : User Interface
- **UX** : User Experience
- **XSS** : Cross-Site Scripting

---

**Date de Génération : 24 juillet 2025**

