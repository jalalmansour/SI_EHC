# EHC Training Hub - Plateforme de Gestion de Formation

## 📋 Description

EHC Training Hub est une plateforme complète de gestion de formation développée pour EHC Group. Elle permet la gestion de l'ingénierie de formation de bout en bout, selon les besoins de l'entreprise.

## 🚀 Fonctionnalités Principales

### Core Features
- **RBAC (Role-Based Access Control)** : Accès sécurisé basé sur des rôles prédéfinis (Admin, RRH, RF, Manager, Employee, Trainer)
- **Gestion du Catalogue** : Navigation, recherche et gestion des formations avec détails
- **Planification des Sessions** : Planification et gestion des sessions de formation
- **Inscription des Participants** : Inscription des participants avec workflows d'approbation
- **Gestion Budgétaire** : Demande, approbation et suivi des allocations budgétaires
- **Rapports & Analytics** : Génération de rapports sur l'efficacité des formations
- **Recommandations IA** : Suggestions de formations basées sur les rôles et compétences

### Modules Fonctionnels
1. **Prospection & Devis** - Gestion des prospects et devis
2. **Contrats & Signature** - Gestion des contrats clients
3. **Clients & Entreprises** - Gestion des comptes entreprises
4. **Abonnements & Services** - Gestion des abonnements
5. **Facturation & Paiements** - Gestion de la facturation
6. **Support Client & Rétention** - Support et fidélisation
7. **Résiliations & Historique** - Gestion des résiliations
8. **Statistiques & Reporting** - Analytics et rapports
9. **Module Formation** - Gestion complète des formations

## 🛠️ Technologies Utilisées

### Frontend
- **React.js 18** - Framework principal
- **Ant Design** - Bibliothèque UI
- **Redux Toolkit** - Gestion d'état global
- **React Router** - Navigation
- **Axios** - Requêtes HTTP
- **Chart.js** - Visualisation de données
- **Moment.js** - Gestion des dates
- **jsPDF & xlsx** - Génération de PDF/Excel

### Backend
- **Express.js** - Framework Node.js
- **MySQL** - Base de données
- **Sequelize** - ORM
- **JWT** - Authentification
- **bcryptjs** - Chiffrement des mots de passe
- **Multer** - Upload de fichiers
- **Nodemailer** - Envoi d'emails
- **Winston** - Logging

## 📁 Structure du Projet

```
ehc-formation-system/
├── frontend/                 # Application React
│   ├── public/
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── layouts/          # Layouts de pages
│   │   ├── pages/           # Pages par rôle
│   │   ├── services/        # Services API
│   │   ├── redux/           # Store Redux
│   │   ├── contexts/        # Context API
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Utilitaires
│   ├── package.json
│   └── vite.config.js
├── backend/                  # API Express
│   ├── src/
│   │   ├── config/          # Configuration
│   │   ├── models/          # Modèles Sequelize
│   │   ├── controllers/     # Contrôleurs
│   │   ├── services/        # Services métier
│   │   ├── routes/          # Routes API
│   │   ├── middlewares/     # Middlewares
│   │   ├── validations/     # Validation
│   │   └── utils/           # Utilitaires
│   ├── package.json
│   └── server.js
├── database/                 # Scripts de base de données
├── shared/                   # Code partagé
├── uploads/                  # Fichiers uploadés
└── docs/                     # Documentation
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+
- MySQL 8.0+
- npm ou yarn

### 1. Cloner le projet
```bash
git clone <repository-url>
cd ehc-formation-system
```

### 2. Configuration de la base de données
```bash
# Créer la base de données MySQL
mysql -u root -p
CREATE DATABASE ehc_formation;
```

### 3. Configuration Backend
```bash
cd backend
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer les variables d'environnement dans .env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ehc_formation
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key
```

### 4. Configuration Frontend
```bash
cd ../frontend
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer les variables d'environnement dans .env
VITE_API_URL=http://localhost:5000/api
```

### 5. Démarrage des services
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🔐 Rôles et Permissions

### Rôles Disponibles
- **SuperAdmin** : Accès complet au système
- **Admin EHC** : Administration des clients
- **RRH** : Gestion des ressources humaines
- **RF** : Responsable formation
- **Manager** : Gestion d'équipe
- **Employee** : Employé standard
- **Trainer** : Formateur
- **Organisme** : Organisme de formation

### Permissions par Rôle
Chaque rôle a des permissions spécifiques pour :
- Gestion des utilisateurs
- Gestion des formations
- Gestion des budgets
- Génération de rapports
- Administration système

## 📊 Base de Données

### Tables Principales
- **users** - Utilisateurs du système
- **companies** - Entreprises clientes
- **training_courses** - Catalogue de formations
- **training_sessions** - Sessions de formation
- **participants** - Participants aux formations
- **budgets** - Gestion budgétaire
- **evaluations** - Évaluations de formation
- **certifications** - Certifications

### Relations
Le système utilise des relations complexes entre les tables pour gérer :
- Hiérarchie organisationnelle
- Workflows d'approbation
- Suivi des formations
- Gestion des compétences

## 🔧 Configuration Avancée

### Variables d'Environnement Backend
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ehc_formation
DB_USER=root
DB_PASSWORD=

# JWT
JWT_SECRET=your-secret-key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
```

### Variables d'Environnement Frontend
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=EHC Training Hub
```

## 📈 Déploiement

### Production
```bash
# Build frontend
cd frontend
npm run build

# Start backend
cd backend
npm start
```

### Docker (Optionnel)
```bash
docker-compose up -d
```

## 🧪 Tests

```bash
# Tests backend
cd backend
npm test

# Tests frontend
cd frontend
npm test
```

## 📝 API Documentation

### Endpoints Principaux
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Utilisateur courant
- `GET /api/training/courses` - Liste des formations
- `GET /api/training/sessions` - Sessions de formation
- `GET /api/budgets` - Gestion budgétaire
- `GET /api/reports` - Rapports

### Authentification
Toutes les routes protégées nécessitent un token JWT dans le header :
```
Authorization: Bearer <token>
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est la propriété exclusive d'EHC Group. Toute utilisation non autorisée est interdite.

## 📞 Support

Pour toute question ou support :
- Email : support@ehc-group.com
- Documentation : `/docs`
- Issues : GitHub Issues

## 🔄 Changelog

### Version 1.0.0
- ✅ Structure de base complète
- ✅ Authentification JWT
- ✅ Gestion des rôles
- ✅ Interface utilisateur React
- ✅ API REST Express
- ✅ Base de données MySQL
- ✅ Dashboard employé
- ✅ Système de navigation

---

**EHC Training Hub** - Développé avec ❤️ par l'équipe EHC Group
