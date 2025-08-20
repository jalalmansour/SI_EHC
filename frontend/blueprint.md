make sure to follow this to-do list:
EHC Training Hub - Project Completion Tasks
✅ Completed
 Development server is running
 No linting errors found
 Step 1: Verify TypeScript to JavaScript migration
 Step 2: Check current project structure against blueprint
 Step 3: Fill missing components in src/components/common
 Step 4: Complete RRH role pages (Budget, Training Catalog, Organization, Participants, Reports, Settings)
 Fixed API_ENDPOINTS missing export error
 Fixed duplicate selectParticipant export error
 Added comprehensive common components (Button, Charts, Form, Modal, Table, FileUpload)
 Created Employee pages (MesFormations, DemandeFormation)
🔄 In Progress - Starting Step 5
 Step 5: Ensure backend follows the specified structure
 Step 6: Add all missing database models and migrations
 Step 7: Implement all service layers
 Step 8: Test full frontend-backend integration
 Step 9: Verify RBAC implementation
 Step 10: Create version and deploy
📋 Detailed Backend Tasks
Backend Structure Implementation
 Create all controllers following blueprint
 Implement database models with Sequelize
 Add all service layers
 Create API routes structure
 Implement authentication middleware
 Add validation schemas
 Create database migrations
 Add seeders for initial data

and highly follow these blueprint.md
# **App Name**: EHC Training Hub

## Core Features:

- RBAC: Role-Based Access Control: Secure access based on predefined roles (Admin, RRH, RF, Manager, Employee, Trainer).
- Catalog Management: Training Catalog Management: Browse, search, and manage training courses with details like descriptions, categories, duration, and cost.
- Session Scheduling: Session Scheduling: Plan and manage training sessions including dates, times, locations (physical/virtual), and trainer assignments.
- Participant Enrollment: Participant Enrollment: Enroll participants in training sessions with approval workflows for managers or HR.
- Budget Management: Budget Management: Request, approve, and track budget allocations for training initiatives.
- Reporting & Analytics: Reporting and Analytics: Generate reports on training effectiveness, budget utilization, and compliance audits.
- AI Recommendations: AI-Driven Training Recommendations: Suggest relevant training courses and sessions to employees based on their roles, skills, and past training history; use a tool that reasons whether each training recommendation matches with the role, skills, and training history of a given employee.

## Style Guidelines:

- Primary color: Deep sky blue (#3498db) for a professional and trustworthy feel.
- Background color: Light gray (#f0f2f5) for a clean and modern interface.
- Accent color: Orange (#e67e22) to highlight key actions and calls to action.
- Body and headline font: 'Inter', a sans-serif font providing a modern and neutral appearance.
- Use Ant Design icons for a consistent and enterprise-grade UI.
- Employ a responsive grid layout optimized for various screen sizes.
- Subtle transitions and animations for a smooth user experience.
- This is the Cahier de charge:
Avertissement : Document en propriété d’EHC Groupe destiné à usage unique et exclusif aux ingénieurs et techniciens développeurs
et designer (ayant le statut de prestataires, et ou, salariés, et ou stagiaires) Tout partage aux autres sont strictement interdit. Le code
source développé est une propriété unique d’EHC Groupe, les ingénieurs et techniciens développeurs et designer ont la mission du
développement informatique de ce code source et non pas sa propriété, tout usage en dehors de la mission confiée et sans
autorisation expresse et écrite du représentant légale d’EHC, est passible de poursuites judiciaires
CPS ( V1 – PT 1)
SI INGENIEURIE DE FORMATION
 Module Gestion de l’ingénierie de la Formation
Descriptions principales : Le but de ce module est la gestion de l’ingénierie de la formation de
bout en bout, selon les besoins de l’entreprise.
Les fonctionnalités de la plateforme :
1 -Création de l'organigramme de l'entreprise et des utilisateurs
(voir le code la platfrome EHC E-LEARNING ) , et Prévoir la possibilité d’importer une liste EXCEL
comme LE SI ELEARNING
2 - Le budget de la formation (voir CPS)
o Créer un budget d’ingénieurie de formation
 Choisir une périodicité du PF : Annuel/Biennale/Triennale/
Quadriennale/Quinquennale
 Entrer Date de début : 1/1/2025
 Entrer Date de fin : 31/12/2025
 Entrer le budget de l’exercice actuel (Liste déroulante DHS/EURO/…) : 500.000,00
o Gérer le budget d’ingénierie de formation
 Entrer une rallonge budgétaire (elle s’ajoute au budget actuel) : 100.000,00
 Entrer une coupe budgétaire : (elle est tranchée budget actuel) :
200.000,00
o Suivi du budget d’ingénierie de formation
 Etat d’avancement du budget d’ingénierie de formation
= Budget de l’exercice actuel + rallonge budgétaire - coupe budgétaire – Le prix de chaque
thématique de formation à condition qu’elle soit réalisée ; Exemple :
…. Thématique Cabinet de
formation
Cout de la formation en
DHS
Etat de
réalisation
(si réalisé
……
Java EHC 15.000 (aligorithme) Réalisé/Non
réalisé
Paython UIR 20.000
Avertissement : Document en propriété d’EHC Groupe destiné à usage unique et exclusif aux ingénieurs et techniciens développeurs
et designer (ayant le statut de prestataires, et ou, salariés, et ou stagiaires) Tout partage aux autres sont strictement interdit. Le code
source développé est une propriété unique d’EHC Groupe, les ingénieurs et techniciens développeurs et designer ont la mission du
développement informatique de ce code source et non pas sa propriété, tout usage en dehors de la mission confiée et sans
autorisation expresse et écrite du représentant légale d’EHC, est passible de poursuites judiciaires
…. …. ….
N.B : Envoyer une alerte au responsable formation quand le budget est consommé à plus de 50%
60% …. 90% (permettre au RRH et Responsable de la formation de paramétrer cette alerte)
3- Un exercice d'ingénierie de formation (voir CPS)
 Paramétrage de l’ingénierie de formation
o Périodicité du Plan de formation : interfacé avec celle du budget de la formation
o Date de début : interfacé avec celle du budget de la formation
o Date de fin : interfacé avec celle du budget de la formation
o Créer (paramétrer) un catalogue de formation (Voir fichier EXCEL)
 Catalogue des Formations planifiées ( c à d planifiées en début d’exercice)
o Gérer la validation du catalogue de formation et demande de formation non planfié(
voir fichier EXCEL)
 Valider le Catalogue des Formations planifiées
 Valider les demandes formations non planifiées ( c à d non planifiées et
demander par les employer encours d’exercice de la formation)
4- La planification de la réalisation des formations (voir fichier excel)
avec paramétrage d’un calendrier des formations (visible chez les utilisateurs)
5 – Gestion des participants aux formations
o Affectation des participants aux formations
( voir code E-ELARNING) et (voir fichier excel)
le système envois une invitation à la formation aux employés affectés par le RF et
RRH
o Inscription des employés aux formations :
l’employé peut demander à s’inscrire à une formation à partir du catalogue de
formation, sa demande doit etre valider par son manager n+1 et le RF et le RRH. le
système envois une invitation à la formation aux employés dont l’inscription est
accepté

6- L'évaluation de la formation (voir platforme e-learning)
( Quiz ( préliminaire (Test de niveau) + à chaud (en cours de formation , et en fin de formation) + à
froid ( 1 mois minimum et 12 mois maximum apres la date de fin de la formation) + Taux de
Avertissement : Document en propriété d’EHC Groupe destiné à usage unique et exclusif aux ingénieurs et techniciens développeurs
et designer (ayant le statut de prestataires, et ou, salariés, et ou stagiaires) Tout partage aux autres sont strictement interdit. Le code
source développé est une propriété unique d’EHC Groupe, les ingénieurs et techniciens développeurs et designer ont la mission du
développement informatique de ce code source et non pas sa propriété, tout usage en dehors de la mission confiée et sans
autorisation expresse et écrite du représentant légale d’EHC, est passible de poursuites judiciaires
satisfaction formation ( employé & cabinet de formation (formateur externe) (voir le code la
platfrome EHC E-LEARNING )
6-La bibliothèque en ligne ( fichier doc, vid, XLS, JPG, ...) (voir le code la plateforme EHC ELEARNING )
7 - Les certifications : (voir le code la platfrome EHC E-LEARNING )
le RRH charge les certifcation dans sa session et le systeme les dispatch dans les sessions des
participants de la formation concerné et ses derniers la télécharge dans leur sessions personnel
8 - Le rapport de la formation (voir le code la platfrome EHC E-LEARNING )
9 – La fiche de compétence du salarié et la formation
Gestion automatique du lien entre la formation et la fiche de compétence du salarié
o SERA EXPLIQUEE par Pr Taha
10-Historique de formation
 La platforme doit afficher l’historique des formations pour chaque employé ( en
nombre et en genre (formation planifié & formation planifié ; formations métiers ;
formations support ; …. ))
 La plateforme doit afficher l’historique des formations par entité (
direction/departement/service/…) ( en nombre et en genre (formation planifié &
formation planifié ; formations métiers ; formations support ; …. )
11- Reporting/Extraction :
✓ Extraction des données sur les formations ( les données peuvent etre télécharger sur excel)
✓ Suivi du planning de réalisation : le calendrier globale de réalisation avec statut (réalisé/en
cours/non réalisé/Annulé/Reporté ( la date de la formation va etre reporgramée)
✓ Reporting global sur les formations et suivi d’exécution du plan de formation selon les indicateurs
arrêtés ( un canva prédéfini des indicateurs sera communiqué à l’équipe des dev)

always focus on these:
FICHE TECHNOLOGIQUE - SIRH EHC
1. TECHNOLOGIES UTILISÉES
FRONTEND :
- develop using jsx
- Framework : React.js (version 18, pas 19)
- UI Library : Ant Design
- Gestion de l'état global : Redux Toolkit (dossier redux avec slices, thunks et store)
- Gestion des requêtes HTTP : Axios
- Gestion des dates : Moment.js
- Génération de PDF & Excel : jsPDF & xlsx
- Visualisation des données : Chart.js & React-Chartjs-2 …
- Navigation : React-Router-Dom
- Optimisation des performances : React Lazy & React Memo …
Structure du projet (src/) :
- components/ : Composants réutilisables
- contexts/ : Gestion du contexte global (Theme)
- layouts/ : Agencement des pages
- pages/ : Pages principales de l?application
- services/ : API calls (Axios, Redux intégré)
- redux/ : Gestion du store
- slices/ : États globaux
- thunks/ : Actions asynchrones
- store.js : Configuration du store
BACKEND :
- Framework : Express.js (basé sur Node.js)
- Architecture : Microservices (RestAPI)
- Sécurité : Gestion des rôles et droits d’accès
BASE DE DONNÉES :
- SGBD : MySQL
- Architecture :
- Base centralisée, chaque microservice accède à ses tables spécifiques
- Respect des bonnes pratiques SQL
2. BONNES PRATIQUES ET STANDARDS
- Utilisation stricte de React 18 (éviter React 19)
- Code propre et maintenable avec des conventions ESLint & Prettier
- Architecture microservices pour garantir l’indépendance des modules du SIRH
- Sécurité des API :
- API protégées avec authentification JWT
- Chiffrement des données sensibles
- Journalisation et suivi des accès
- Optimisation des performances :
- Lazy Loading
- Memoization des composants React
- Documentation et conformité : Chaque fonctionnalité doit être documentée

Follow this structure:
# 🔍 Comparaison des Structures et Recommandation Finale

## 📊 Analyse des Structures Présentées

### **Structure 1: authExpress (Simple)**
```
✅ Avantages:
- Structure claire et simple
- Séparation logique (config, controllers, models, routes)
- Utilise TypeScript
- Prisma ORM

❌ Inconvénients:
- Pas assez modulaire pour votre projet complexe
- Ne gère pas les 11 modules fonctionnels requis
- Manque la gestion multi-rôles (RRH, RF, Manager, etc.)
```

### **Structure 2: Microservices (Complexe)**
```
✅ Avantages:
- Très scalable
- Services indépendants
- Chaque service a sa responsabilité

❌ Inconvénients:
- Trop complexe pour commencer
- Gestion des communications inter-services
- Déploiement plus complexe
```

### **Structure 3: Monolith Modulaire (Équilibré)**
```
✅ Avantages:
- Équilibre parfait complexité/simplicité
- Modules indépendants mais dans un seul projet
- Évolution possible vers microservices
- Gestion centralisée des données
```

---

## 🎯 **STRUCTURE FINALE RECOMMANDÉE**

Basée sur vos besoins spécifiques et votre CPS, voici la structure optimale :

```
ehc-formation-system/
├── 📁 frontend/                    # React.js App
├── 📁 backend/                     # Express.js API
├── 📁 database/                    # MySQL Scripts
├── 📁 shared/                      # Code partagé
├── 📁 uploads/                     # Fichiers uploadés
├── 📁 docs/                        # Documentation
├── 📄 docker-compose.yml
├── 📄 .env.example
└── 📄 README.md
```

---

## 🎨 **FRONTEND FINAL** (React.js 18)

```
frontend/
├── 📁 public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
│
├── 📁 src/
│   ├── 📁 components/              # Composants réutilisables
│   │   ├── 📁 common/              # Composants génériques
│   │   │   ├── Button/
│   │   │   ├── Modal/
│   │   │   ├── Table/
│   │   │   ├── Form/
│   │   │   ├── Charts/             # Chart.js components
│   │   │   └── FileUpload/
│   │   ├── 📁 navigation/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │   └── Breadcrumb/
│   │   └── 📁 widgets/             # Widgets spécifiques
│   │       ├── BudgetWidget/
│   │       ├── StatsWidget/
│   │       └── CalendarWidget/
│   │
│   ├── 📁 layouts/                 # Layouts par rôle
│   │   ├── DashboardLayout/
│   │   ├── AuthLayout/
│   │   └── LandingLayout/
│   │
│   ├── 📁 pages/                   # Pages par rôle utilisateur
│   │   ├── 📁 landing/             # Page d'accueil publique
│   │   │   ├── HomePage.jsx
│   │   │   ├── Demo.jsx
│   │   │   └── DemandeDevis.jsx
│   │   ├── 📁 auth/                # Authentification
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── 📁 rrh/                 # Dashboard RRH complet
│   │   │   ├── DashboardRRH.jsx
│   │   │   ├── BudgetManagement/
│   │   │   ├── OrganizationManagement/
│   │   │   ├── TrainingCatalog/
│   │   │   ├── ParticipantManagement/
│   │   │   ├── Reports/
│   │   │   └── Settings/
│   │   ├── 📁 rf/                  # Dashboard RF (Responsable Formation)
│   │   │   ├── DashboardRF.jsx
│   │   │   ├── TrainingPlanning/
│   │   │   ├── ValidationRequests/
│   │   │   └── TrainingReports/
│   │   ├── 📁 manager/             # Dashboard Manager
│   │   │   ├── DashboardManager.jsx
│   │   │   ├── TeamFormations/
│   │   │   └── ValidationRequests/
│   │   ├── 📁 employee/            # Dashboard Employé
│   │   │   ├── DashboardEmployee.jsx
│   │   │   ├── MesFormations/
│   │   │   ├── DemandeFormation/
│   │   │   ├── MesCertifications/
│   │   │   └── Evaluations/
│   │   ├── 📁 formateur/           # Dashboard Formateur
│   │   │   ├── DashboardFormateur.jsx
│   │   │   ├── MesFormations/
│   │   │   └── Evaluations/
│   │   ├── 📁 organisme/           # Dashboard Organisme
│   │   │   ├── DashboardOrganisme.jsx
│   │   │   └── FormationsProposees/
│   │   ├── 📁 directeur/           # Dashboard Directeur
│   │   │   ├── DashboardDirecteur.jsx
│   │   │   └── ReportsGlobaux/
│   │   ├── 📁 admin/               # Dashboard Admin EHC
│   │   │   ├── DashboardAdmin.jsx
│   │   │   ├── ClientsManagement/
│   │   │   └── SystemSettings/
│   │   └── 📁 superadmin/          # Dashboard Super Admin
│   │       ├── DashboardSuperAdmin.jsx
│   │       ├── GlobalManagement/
│   │       └── SystemMonitoring/
│   │
│   ├── 📁 services/                # Services API (Axios)
│   │   ├── api.js                  # Configuration Axios
│   │   ├── authService.js
│   │   ├── organizationService.js
│   │   ├── budgetService.js
│   │   ├── trainingService.js
│   │   ├── planningService.js
│   │   ├── participantService.js
│   │   ├── evaluationService.js
│   │   ├── libraryService.js
│   │   ├── certificationService.js
│   │   ├── reportService.js
│   │   └── skillService.js
│   │
│   ├── 📁 redux/                   # Redux Toolkit Store
│   │   ├── 📁 slices/              # États globaux
│   │   │   ├── authSlice.js
│   │   │   ├── organizationSlice.js
│   │   │   ├── budgetSlice.js
│   │   │   ├── trainingSlice.js
│   │   │   ├── planningSlice.js
│   │   │   ├── participantSlice.js
│   │   │   ├── evaluationSlice.js
│   │   │   ├── librarySlice.js
│   │   │   ├── certificationSlice.js
│   │   │   ├── reportSlice.js
│   │   │   └── uiSlice.js
│   │   ├── 📁 thunks/              # Actions asynchrones
│   │   │   ├── authThunks.js
│   │   │   ├── trainingThunks.js
│   │   │   └── [autres modules]...
│   │   └── store.js                # Configuration store
│   │
│   ├── 📁 contexts/                # Context API
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   │
│   ├── 📁 hooks/                   # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   ├── usePermissions.js
│   │   └── useNotifications.js
│   │
│   ├── 📁 utils/                   # Utilitaires
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validation.js
│   │   ├── dateUtils.js            # Moment.js
│   │   ├── pdfGenerator.js         # jsPDF
│   │   ├── excelExporter.js        # xlsx
│   │   └── chartUtils.js           # Chart.js
│   │
│   ├── 📁 assets/                  # Assets statiques
│   │   ├── 📁 images/
│   │   ├── 📁 icons/
│   │   └── 📁 styles/
│   │       ├── globals.css
│   │       ├── antd-overrides.css
│   │       └── themes.css
│   │
│   ├── App.jsx                     # Routes principales
│   ├── main.jsx                    # Point d'entrée
│   └── routes.jsx                  # Configuration routes
│
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 .eslintrc.js
└── 📄 .prettierrc
```

---

## 🖥️ **BACKEND FINAL** (Express.js)

```
backend/
├── 📁 src/
│   ├── 📁 config/                  # Configuration
│   │   ├── database.js             # MySQL/Sequelize
│   │   ├── redis.js                # Cache Redis
│   │   ├── jwt.js                  # JWT configuration
│   │   ├── multer.js               # Upload files
│   │   └── constants.js
│   │
│   ├── 📁 models/                  # Modèles Sequelize
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Entreprise.js
│   │   ├── Organization.js
│   │   ├── Budget.js
│   │   ├── Formation.js
│   │   ├── Catalogue.js
│   │   ├── Thematique.js
│   │   ├── Planning.js
│   │   ├── Participant.js
│   │   ├── Inscription.js
│   │   ├── Evaluation.js
│   │   ├── EvaluationResult.js
│   │   ├── DemandeFormation.js
│   │   ├── Bibliotheque.js
│   │   ├── Certification.js
│   │   ├── CertificationUtilisateur.js
│   │   ├── Skill.js
│   │   ├── History.js
│   │   └── Dashboard.js
│   │
│   ├── 📁 controllers/             # Contrôleurs par module
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── entreprise.controller.js
│   │   ├── organization.controller.js
│   │   ├── budget.controller.js
│   │   ├── formation.controller.js
│   │   ├── catalogue.controller.js
│   │   ├── thematique.controller.js
│   │   ├── planning.controller.js
│   │   ├── participant.controller.js
│   │   ├── evaluation.controller.js
│   │   ├── demandeFormation.controller.js
│   │   ├── bibliotheque.controller.js
│   │   ├── certification.controller.js
│   │   ├── skill.controller.js
│   │   ├── history.controller.js
│   │   └── dashboard.controller.js
│   │
│   ├── 📁 services/                # Services métier
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── entreprise.service.js
│   │   ├── organization.service.js
│   │   ├── budget.service.js
│   │   ├── formation.service.js
│   │   ├── catalogue.service.js
│   │   ├── thematique.service.js
│   │   ├── planning.service.js
│   │   ├── participant.service.js
│   │   ├── evaluation.service.js
│   │   ├── demandeFormation.service.js
│   │   ├── bibliotheque.service.js
│   │   ├── certification.service.js
│   │   ├── skill.service.js
│   │   ├── history.service.js
│   │   ├── email.service.js        # Notifications
│   │   ├── file.service.js         # Gestion fichiers
│   │   ├── excel.service.js        # Import/Export Excel
│   │   ├── pdf.service.js          # Génération PDF
│   │   └── integration.service.js  # Intégration E-Learning
│   │
│   ├── 📁 routes/                  # Routes API
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── entreprise.routes.js
│   │   ├── organization.routes.js
│   │   ├── budget.routes.js
│   │   ├── formation.routes.js
│   │   ├── catalogue.routes.js
│   │   ├── thematique.routes.js
│   │   ├── planning.routes.js
│   │   ├── participant.routes.js
│   │   ├── evaluation.routes.js
│   │   ├── demandeFormation.routes.js
│   │   ├── bibliotheque.routes.js
│   │   ├── certification.routes.js
│   │   ├── skill.routes.js
│   │   ├── history.routes.js
│   │   └── dashboard.routes.js
│   │
│   ├── 📁 middlewares/             # Middlewares
│   │   ├── auth.middleware.js      # JWT validation
│   │   ├── roles.middleware.js     # Vérification rôles
│   │   ├── upload.middleware.js    # Upload files
│   │   ├── validation.middleware.js # Validation données
│   │   ├── error.middleware.js     # Gestion erreurs
│   │   ├── logging.middleware.js   # Logs
│   │   └── rate-limit.middleware.js # Rate limiting
│   │
│   ├── 📁 validations/             # Schémas de validation
│   │   ├── auth.validation.js
│   │   ├── user.validation.js
│   │   ├── formation.validation.js
│   │   ├── budget.validation.js
│   │   └── [autres modules]...
│   │
│   ├── 📁 utils/                   # Utilitaires
│   │   ├── logger.js               # Winston logger
│   │   ├── generateToken.js        # JWT tokens
│   │   ├── validateRoles.js        # Validation rôles
│   │   ├── encryption.js           # Chiffrement
│   │   ├── helpers.js              # Fonctions utiles
│   │   └── constants.js            # Constantes
│   │
│   ├── 📁 migrations/              # Migrations DB
│   │   ├── 001-create-users.js
│   │   ├── 002-create-entreprises.js
│   │   ├── 003-create-organizations.js
│   │   ├── 004-create-budgets.js
│   │   └── [autres tables]...
│   │
│   ├── 📁 seeders/                 # Données initiales
│   │   ├── users.seeder.js
│   │   ├── roles.seeder.js
│   │   └── default-data.seeder.js
│   │
│   ├── app.js                      # Configuration Express
│   └── server.js                   # Point d'entrée
│
├── 📁 tests/                       # Tests
│   ├── 📁 unit/
│   ├── 📁 integration/
│   └── 📁 fixtures/
│
├── 📄 package.json
├── 📄 .env.example
├── 📄 .gitignore
└── 📄 Dockerfile
```

---

## 🗄️ **DATABASE FINALE** (MySQL)

```
database/
├── 📁 schemas/                     # Schémas par module
│   ├── users_schema.sql
│   ├── entreprises_schema.sql
│   ├── organizations_schema.sql
│   ├── budgets_schema.sql
│   ├── formations_schema.sql
│   ├── evaluations_schema.sql
│   └── certifications_schema.sql
├── 📁 migrations/                  # Migrations historiques
├── 📁 seeds/                       # Données de test
├── 📁 procedures/                  # Procédures stockées
│   ├── budget_calculations.sql
│   ├── training_stats.sql
│   └── reporting_procedures.sql
├── 📁 triggers/                    # Triggers automatiques
│   └── budget_alerts.sql
└── 📄 complete_schema.sql          # Schéma complet
```

---

## 🤝 **SHARED** (Code partagé)

```
shared/
├── 📁 constants/                   # Constantes partagées
│   ├── roles.js
│   ├── permissions.js
│   ├── statuses.js
│   └── modules.js
├── 📁 types/                       # Types (si TypeScript)
├── 📁 validations/                 # Schémas validation
└── 📁 utils/                       # Utilitaires communs
```

---

## 📋 **Configuration Finale**

### **package.json Frontend**
```json
{
  "name": "ehc-formation-frontend",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "antd": "^5.12.0",
    "@reduxjs/toolkit": "^1.9.7",
    "react-redux": "^8.1.3",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "moment": "^2.29.4",
    "jspdf": "^2.5.1",
    "xlsx": "^0.18.5",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### **package.json Backend**
```json
{
  "name": "ehc-formation-backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.5",
    "sequelize": "^6.35.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.7",
    "express-validator": "^7.0.1",
    "winston": "^3.11.0",
    "redis": "^4.6.0",
    "joi": "^17.11.0"
  },
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "migrate": "npx sequelize-cli db:migrate",
    "seed": "npx sequelize-cli db:seed:all"
  }
}
```

---

## 🎯 **Pourquoi cette structure ?**

### ✅ **Avantages**
1. **Modulaire** : Chaque module est indépendant
2. **Scalable** : Évolution vers microservices possible
3. **Multi-rôles** : Support complet de tous vos rôles utilisateurs
4. **Technologies modernes** : React 18, Redux Toolkit, Express.js
5. **Maintenable** : Code organisé et documenté
6. **Sécurisé** : JWT, validation, middlewares de sécurité
7. **Conforme CPS** : Respect complet de vos 11 modules

### 🎪 **Évolution possible**
- Démarrage en monolithe modulaire
- Migration progressive vers microservices
- Ajout de nouvelles fonctionnalités facilement
- Intégration avec la plateforme E-Learning existante

Cette structure finale combine **simplicité de développement** et **robustesse architecturale** pour votre système de formation EHC. 




step by tep chek if the migrate from type script to java script for all scripts 
and weny correctly and make sure if really  follows this strutures add necessary files and make sure 100% featured and fully functional from front end to back end 
# 🔍 Comparaison des Structures et Recommandation Finale

## 📊 Analyse des Structures Présentées

### **Structure 1: authExpress (Simple)**
```
✅ Avantages:
- Structure claire et simple
- Séparation logique (config, controllers, models, routes)
- Utilise TypeScript
- Prisma ORM

❌ Inconvénients:
- Pas assez modulaire pour votre projet complexe
- Ne gère pas les 11 modules fonctionnels requis
- Manque la gestion multi-rôles (RRH, RF, Manager, etc.)
```

### **Structure 2: Microservices (Complexe)**
```
✅ Avantages:
- Très scalable
- Services indépendants
- Chaque service a sa responsabilité

❌ Inconvénients:
- Trop complexe pour commencer
- Gestion des communications inter-services
- Déploiement plus complexe
```

### **Structure 3: Monolith Modulaire (Équilibré)**
```
✅ Avantages:
- Équilibre parfait complexité/simplicité
- Modules indépendants mais dans un seul projet
- Évolution possible vers microservices
- Gestion centralisée des données
```

---

## 🎯 **STRUCTURE FINALE RECOMMANDÉE**

Basée sur vos besoins spécifiques et votre CPS, voici la structure optimale :

```
ehc-formation-system/
├── 📁 frontend/                    # React.js App
├── 📁 backend/                     # Express.js API
├── 📁 database/                    # MySQL Scripts
├── 📁 shared/                      # Code partagé
├── 📁 uploads/                     # Fichiers uploadés
├── 📁 docs/                        # Documentation
├── 📄 docker-compose.yml
├── 📄 .env.example
└── 📄 README.md
```

---

## 🎨 **FRONTEND FINAL** (React.js 18)

```
frontend/
├── 📁 public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
│
├── 📁 src/
│   ├── 📁 components/              # Composants réutilisables
│   │   ├── 📁 common/              # Composants génériques
│   │   │   ├── Button/
│   │   │   ├── Modal/
│   │   │   ├── Table/
│   │   │   ├── Form/
│   │   │   ├── Charts/             # Chart.js components
│   │   │   └── FileUpload/
│   │   ├── 📁 navigation/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │   └── Breadcrumb/
│   │   └── 📁 widgets/             # Widgets spécifiques
│   │       ├── BudgetWidget/
│   │       ├── StatsWidget/
│   │       └── CalendarWidget/
│   │
│   ├── 📁 layouts/                 # Layouts par rôle
│   │   ├── DashboardLayout/
│   │   ├── AuthLayout/
│   │   └── LandingLayout/
│   │
│   ├── 📁 pages/                   # Pages par rôle utilisateur
│   │   ├── 📁 landing/             # Page d'accueil publique
│   │   │   ├── HomePage.jsx
│   │   │   ├── Demo.jsx
│   │   │   └── DemandeDevis.jsx
│   │   ├── 📁 auth/                # Authentification
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── 📁 rrh/                 # Dashboard RRH complet
│   │   │   ├── DashboardRRH.jsx
│   │   │   ├── BudgetManagement/
│   │   │   ├── OrganizationManagement/
│   │   │   ├── TrainingCatalog/
│   │   │   ├── ParticipantManagement/
│   │   │   ├── Reports/
│   │   │   └── Settings/
│   │   ├── 📁 rf/                  # Dashboard RF (Responsable Formation)
│   │   │   ├── DashboardRF.jsx
│   │   │   ├── TrainingPlanning/
│   │   │   ├── ValidationRequests/
│   │   │   └── TrainingReports/
│   │   ├── 📁 manager/             # Dashboard Manager
│   │   │   ├── DashboardManager.jsx
│   │   │   ├── TeamFormations/
│   │   │   └── ValidationRequests/
│   │   ├── 📁 employee/            # Dashboard Employé
│   │   │   ├── DashboardEmployee.jsx
│   │   │   ├── MesFormations/
│   │   │   ├── DemandeFormation/
│   │   │   ├── MesCertifications/
│   │   │   └── Evaluations/
│   │   ├── 📁 formateur/           # Dashboard Formateur
│   │   │   ├── DashboardFormateur.jsx
│   │   │   ├── MesFormations/
│   │   │   └── Evaluations/
│   │   ├── 📁 organisme/           # Dashboard Organisme
│   │   │   ├── DashboardOrganisme.jsx
│   │   │   └── FormationsProposees/
│   │   ├── 📁 directeur/           # Dashboard Directeur
│   │   │   ├── DashboardDirecteur.jsx
│   │   │   └── ReportsGlobaux/
│   │   ├── 📁 admin/               # Dashboard Admin EHC
│   │   │   ├── DashboardAdmin.jsx
│   │   │   ├── ClientsManagement/
│   │   │   └── SystemSettings/
│   │   └── 📁 superadmin/          # Dashboard Super Admin
│   │       ├── DashboardSuperAdmin.jsx
│   │       ├── GlobalManagement/
│   │       └── SystemMonitoring/
│   │
│   ├── 📁 services/                # Services API (Axios)
│   │   ├── api.js                  # Configuration Axios
│   │   ├── authService.js
│   │   ├── organizationService.js
│   │   ├── budgetService.js
│   │   ├── trainingService.js
│   │   ├── planningService.js
│   │   ├── participantService.js
│   │   ├── evaluationService.js
│   │   ├── libraryService.js
│   │   ├── certificationService.js
│   │   ├── reportService.js
│   │   └── skillService.js
│   │
│   ├── 📁 redux/                   # Redux Toolkit Store
│   │   ├── 📁 slices/              # États globaux
│   │   │   ├── authSlice.js
│   │   │   ├── organizationSlice.js
│   │   │   ├── budgetSlice.js
│   │   │   ├── trainingSlice.js
│   │   │   ├── planningSlice.js
│   │   │   ├── participantSlice.js
│   │   │   ├── evaluationSlice.js
│   │   │   ├── librarySlice.js
│   │   │   ├── certificationSlice.js
│   │   │   ├── reportSlice.js
│   │   │   └── uiSlice.js
│   │   ├── 📁 thunks/              # Actions asynchrones
│   │   │   ├── authThunks.js
│   │   │   ├── trainingThunks.js
│   │   │   └── [autres modules]...
│   │   └── store.js                # Configuration store
│   │
│   ├── 📁 contexts/                # Context API
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   │
│   ├── 📁 hooks/                   # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   ├── usePermissions.js
│   │   └── useNotifications.js
│   │
│   ├── 📁 utils/                   # Utilitaires
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validation.js
│   │   ├── dateUtils.js            # Moment.js
│   │   ├── pdfGenerator.js         # jsPDF
│   │   ├── excelExporter.js        # xlsx
│   │   └── chartUtils.js           # Chart.js
│   │
│   ├── 📁 assets/                  # Assets statiques
│   │   ├── 📁 images/
│   │   ├── 📁 icons/
│   │   └── 📁 styles/
│   │       ├── globals.css
│   │       ├── antd-overrides.css
│   │       └── themes.css
│   │
│   ├── App.jsx                     # Routes principales
│   ├── main.jsx                    # Point d'entrée
│   └── routes.jsx                  # Configuration routes
│
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 .eslintrc.js
└── 📄 .prettierrc
```

---

## 🖥️ **BACKEND FINAL** (Express.js)

```
backend/
├── 📁 src/
│   ├── 📁 config/                  # Configuration
│   │   ├── database.js             # MySQL/Sequelize
│   │   ├── redis.js                # Cache Redis
│   │   ├── jwt.js                  # JWT configuration
│   │   ├── multer.js               # Upload files
│   │   └── constants.js
│   │
│   ├── 📁 models/                  # Modèles Sequelize
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Entreprise.js
│   │   ├── Organization.js
│   │   ├── Budget.js
│   │   ├── Formation.js
│   │   ├── Catalogue.js
│   │   ├── Thematique.js
│   │   ├── Planning.js
│   │   ├── Participant.js
│   │   ├── Inscription.js
│   │   ├── Evaluation.js
│   │   ├── EvaluationResult.js
│   │   ├── DemandeFormation.js
│   │   ├── Bibliotheque.js
│   │   ├── Certification.js
│   │   ├── CertificationUtilisateur.js
│   │   ├── Skill.js
│   │   ├── History.js
│   │   └── Dashboard.js
│   │
│   ├── 📁 controllers/             # Contrôleurs par module
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── entreprise.controller.js
│   │   ├── organization.controller.js
│   │   ├── budget.controller.js
│   │   ├── formation.controller.js
│   │   ├── catalogue.controller.js
│   │   ├── thematique.controller.js
│   │   ├── planning.controller.js
│   │   ├── participant.controller.js
│   │   ├── evaluation.controller.js
│   │   ├── demandeFormation.controller.js
│   │   ├── bibliotheque.controller.js
│   │   ├── certification.controller.js
│   │   ├── skill.controller.js
│   │   ├── history.controller.js
│   │   └── dashboard.controller.js
│   │
│   ├── 📁 services/                # Services métier
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── entreprise.service.js
│   │   ├── organization.service.js
│   │   ├── budget.service.js
│   │   ├── formation.service.js
│   │   ├── catalogue.service.js
│   │   ├── thematique.service.js
│   │   ├── planning.service.js
│   │   ├── participant.service.js
│   │   ├── evaluation.service.js
│   │   ├── demandeFormation.service.js
│   │   ├── bibliotheque.service.js
│   │   ├── certification.service.js
│   │   ├── skill.service.js
│   │   ├── history.service.js
│   │   ├── email.service.js        # Notifications
│   │   ├── file.service.js         # Gestion fichiers
│   │   ├── excel.service.js        # Import/Export Excel
│   │   ├── pdf.service.js          # Génération PDF
│   │   └── integration.service.js  # Intégration E-Learning
│   │
│   ├── 📁 routes/                  # Routes API
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── entreprise.routes.js
│   │   ├── organization.routes.js
│   │   ├── budget.routes.js
│   │   ├── formation.routes.js
│   │   ├── catalogue.routes.js
│   │   ├── thematique.routes.js
│   │   ├── planning.routes.js
│   │   ├── participant.routes.js
│   │   ├── evaluation.routes.js
│   │   ├── demandeFormation.routes.js
│   │   ├── bibliotheque.routes.js
│   │   ├── certification.routes.js
│   │   ├── skill.routes.js
│   │   ├── history.routes.js
│   │   └── dashboard.routes.js
│   │
│   ├── 📁 middlewares/             # Middlewares
│   │   ├── auth.middleware.js      # JWT validation
│   │   ├── roles.middleware.js     # Vérification rôles
│   │   ├── upload.middleware.js    # Upload files
│   │   ├── validation.middleware.js # Validation données
│   │   ├── error.middleware.js     # Gestion erreurs
│   │   ├── logging.middleware.js   # Logs
│   │   └── rate-limit.middleware.js # Rate limiting
│   │
│   ├── 📁 validations/             # Schémas de validation
│   │   ├── auth.validation.js
│   │   ├── user.validation.js
│   │   ├── formation.validation.js
│   │   ├── budget.validation.js
│   │   └── [autres modules]...
│   │
│   ├── 📁 utils/                   # Utilitaires
│   │   ├── logger.js               # Winston logger
│   │   ├── generateToken.js        # JWT tokens
│   │   ├── validateRoles.js        # Validation rôles
│   │   ├── encryption.js           # Chiffrement
│   │   ├── helpers.js              # Fonctions utiles
│   │   └── constants.js            # Constantes
│   │
│   ├── 📁 migrations/              # Migrations DB
│   │   ├── 001-create-users.js
│   │   ├── 002-create-entreprises.js
│   │   ├── 003-create-organizations.js
│   │   ├── 004-create-budgets.js
│   │   └── [autres tables]...
│   │
│   ├── 📁 seeders/                 # Données initiales
│   │   ├── users.seeder.js
│   │   ├── roles.seeder.js
│   │   └── default-data.seeder.js
│   │
│   ├── app.js                      # Configuration Express
│   └── server.js                   # Point d'entrée
│
├── 📁 tests/                       # Tests
│   ├── 📁 unit/
│   ├── 📁 integration/
│   └── 📁 fixtures/
│
├── 📄 package.json
├── 📄 .env.example
├── 📄 .gitignore
└── 📄 Dockerfile
```

---

## 🗄️ **DATABASE FINALE** (MySQL)

```
database/
├── 📁 schemas/                     # Schémas par module
│   ├── users_schema.sql
│   ├── entreprises_schema.sql
│   ├── organizations_schema.sql
│   ├── budgets_schema.sql
│   ├── formations_schema.sql
│   ├── evaluations_schema.sql
│   └── certifications_schema.sql
├── 📁 migrations/                  # Migrations historiques
├── 📁 seeds/                       # Données de test
├── 📁 procedures/                  # Procédures stockées
│   ├── budget_calculations.sql
│   ├── training_stats.sql
│   └── reporting_procedures.sql
├── 📁 triggers/                    # Triggers automatiques
│   └── budget_alerts.sql
└── 📄 complete_schema.sql          # Schéma complet
```

---

## 🤝 **SHARED** (Code partagé)

```
shared/
├── 📁 constants/                   # Constantes partagées
│   ├── roles.js
│   ├── permissions.js
│   ├── statuses.js
│   └── modules.js
├── 📁 types/                       # Types (si TypeScript)
├── 📁 validations/                 # Schémas validation
└── 📁 utils/                       # Utilitaires communs
```

---

## 📋 **Configuration Finale**

### **package.json Frontend**
```json
{
  "name": "ehc-formation-frontend",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "antd": "^5.12.0",
    "@reduxjs/toolkit": "^1.9.7",
    "react-redux": "^8.1.3",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "moment": "^2.29.4",
    "jspdf": "^2.5.1",
    "xlsx": "^0.18.5",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### **package.json Backend**
```json
{
  "name": "ehc-formation-backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.5",
    "sequelize": "^6.35.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.7",
    "express-validator": "^7.0.1",
    "winston": "^3.11.0",
    "redis": "^4.6.0",
    "joi": "^17.11.0"
  },
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "migrate": "npx sequelize-cli db:migrate",
    "seed": "npx sequelize-cli db:seed:all"
  }
}
```

---

## 🎯 **Pourquoi cette structure ?**

### ✅ **Avantages**
1. **Modulaire** : Chaque module est indépendant
2. **Scalable** : Évolution vers microservices possible
3. **Multi-rôles** : Support complet de tous vos rôles utilisateurs
4. **Technologies modernes** : React 18, Redux Toolkit, Express.js
5. **Maintenable** : Code organisé et documenté
6. **Sécurisé** : JWT, validation, middlewares de sécurité
7. **Conforme CPS** : Respect complet de vos 11 modules

### 🎪 **Évolution possible**
- Démarrage en monolithe modulaire
- Migration progressive vers microservices
- Ajout de nouvelles fonctionnalités facilement
- Intégration avec la plateforme E-Learning existante

Cette structure finale combine **simplicité de développement** et **robustesse architecturale** pour votre système de formation EHC.

Excellent. This is a superb foundation. Your detailed breakdown shows a deep understanding of the project's scope, covering both the commercial CRM aspects and the core SIRH functionalities. My role here is to refine this structure into a final architectural blueprint, ensuring it's robust, scalable, and follows best practices from an experienced developer's and system architect's perspective.

I will enhance your structure by:

Standardizing Naming Conventions for clarity and consistency.

Adding Missing Linker/Join Tables for complex relationships.

Introducing Key System & Auditing Tables crucial for security, maintenance, and analytics.

Organizing the structure into a logical, top-down document that can serve as the official database schema.

Here is the enhanced and complete database architecture.

Architecture de la Base de Données - Système Intégré EHC

This document outlines the complete database schema for the EHC platform, encompassing CRM, Sales, Billing, and the core Training Management SIRH.

Partie 1: Structure Logique par Module

This high-level overview explains the purpose of each group of tables.

1. CRM & Ventes

Prospects & Interactions: Manages potential clients, their contact information, and the history of all commercial interactions (calls, emails, demos).

Devis & Propositions: Handles the creation, tracking, and status of all commercial offers sent to prospects.

2. Gestion Client & Contrats

Clients & Organisation: Contains the master data for all client companies, including their organizational structure and key contacts.

Contrats & Documents: Formalizes the legal agreements, manages versions, and stores signed documents.

3. Abonnements & Services

Plans & Souscriptions: Manages the subscription plans available and tracks which clients are subscribed to which services.

Modules & Historique: Tracks enabled features for each client and logs all changes to their subscriptions (upgrades, downgrades).

4. Facturation & Finances

Factures & Paiements: Handles the entire invoicing lifecycle, from generation to payment reconciliation.

Avoirs & Remises: Manages credit notes and specific commercial discounts granted to clients.

5. Support Client & Rétention

Tickets & Communication: A complete system for tracking and resolving client support requests.

Satisfaction & Rétention: Gathers client feedback and tracks proactive measures to ensure client loyalty.

6. SIRH - Ingénierie & Planification

Catalogue de Formation: Defines all available training courses, their categories, topics, and associated skills.

Plans & Budgets: Manages the annual training plans and associated budgets for each client company.

7. SIRH - Exécution & Suivi

Sessions & Participants: Manages specific training instances (dates, trainers) and tracks participant enrollment and attendance.

Demandes & Inscriptions: Handles the workflow for employee training requests and their approval process.

8. SIRH - Évaluation & Compétences

Évaluations & Feedback: Gathers quantitative and qualitative feedback on training sessions and trainers.

Certifications & Compétences: Tracks official certifications and the skills acquired by users.

9. SIRH - Ressources Pédagogiques

Bibliothèque de Ressources: A central library for all training materials (documents, videos, links).

10. Système & Audit

Utilisateurs & Accès: Manages user accounts, roles, and granular permissions for the entire platform.

Logs & Paramètres: Contains system-level settings, audit trails for security, and notification logs.

Partie 2: Définition Détaillée des Tables

This is the detailed physical schema for developers.

Module 1: CRM & Ventes
prospects

prospect_id (PK), company_name, contact_name, email, phone, industry, status (new, qualified, contacted, lost), assigned_to (FK->users), created_at, updated_at

prospect_interactions

interaction_id (PK), prospect_id (FK->prospects), user_id (FK->users), type (call, email, meeting), subject, notes, next_action_date, created_at

quotes (Devis)

quote_id (PK), quote_number (UNIQUE), prospect_id (FK->prospects), status (draft, sent, accepted, rejected), valid_until, total_amount, created_by (FK->users), created_at, updated_at

quote_lines

line_id (PK), quote_id (FK->quotes), description, quantity, unit_price, total_price

Module 2: Gestion Client & Contrats
companies

company_id (PK), company_name, legal_name, siret, address, city, postal_code, country, status (active_client, former_client), created_at

company_contacts

contact_id (PK), company_id (FK->companies), first_name, last_name, email, phone, position, is_decision_maker

contracts

contract_id (PK), contract_number (UNIQUE), company_id (FK->companies), quote_id (FK->quotes), status (active, terminated), start_date, end_date, auto_renewal

contract_documents

document_id (PK), contract_id (FK->contracts), version_number, description, file_path, uploaded_by (FK->users), created_at

Module 3: Abonnements & Services
subscription_plans

plan_id (PK), plan_name, price, billing_cycle (monthly, annual), features (JSON), is_active

subscriptions

subscription_id (PK), company_id (FK->companies), plan_id (FK->subscription_plans), status (active, paused, cancelled), start_date, next_billing_date

subscription_history

history_id (PK), subscription_id (FK->subscriptions), action (created, upgraded, downgraded), details (JSON), performed_by (FK->users), created_at

Module 4: Facturation & Finances
invoices

invoice_id (PK), invoice_number (UNIQUE), company_id (FK->companies), subscription_id (FK->subscriptions), invoice_date, due_date, status (draft, sent, paid, overdue), total_amount

invoice_lines

line_id (PK), invoice_id (FK->invoices), description, quantity, unit_price, total_price

payments

payment_id (PK), invoice_id (FK->invoices), payment_date, amount, payment_method, transaction_id, status (completed, failed)

credit_notes (Avoirs)

credit_note_id (PK), invoice_id (FK->invoices), amount, reason, created_date, status (issued, applied)

Module 5: Support Client & Rétention
support_tickets

ticket_id (PK), ticket_number (UNIQUE), company_id (FK->companies), user_id (FK->users), subject, priority (low, medium, high), status (open, in_progress, closed), assigned_to (FK->users), created_at, resolved_at

support_messages

message_id (PK), ticket_id (FK->support_tickets), sender_id (FK->users), content, is_internal_note, created_at

Module 6: SIRH - Ingénierie & Planification
training_courses

course_id (PK), title, description, category_id (FK->training_categories), level (beginner, intermediate, advanced), duration_hours

training_categories

category_id (PK), category_name, parent_category_id (FK->training_categories)

course_skills

course_id (FK->training_courses), skill_id (FK->skills), PRIMARY KEY (course_id, skill_id)

skills

skill_id (PK), skill_name

annual_training_plans

plan_id (PK), company_id (FK->companies), year, total_budget, status (draft, approved), approved_by (FK->users)

training_plan_items

item_id (PK), plan_id (FK->annual_training_plans), course_id (FK->training_courses), target_audience, planned_quarter

Module 7: SIRH - Exécution & Suivi
training_sessions

session_id (PK), course_id (FK->training_courses), start_date, end_date, trainer_id (FK->users), location, status (planned, confirmed, completed, cancelled)

session_participants

participation_id (PK), session_id (FK->training_sessions), user_id (FK->users), status (registered, attended, absent), attendance_rate

training_requests

request_id (PK), user_id (FK->users), course_id (FK->training_courses), justification, status (pending, manager_approved, hr_approved, rejected), approved_by (FK->users)

Module 8: SIRH - Évaluation & Compétences
training_evaluations

evaluation_id (PK), session_id (FK->training_sessions), user_id (FK->users), rating_content, rating_trainer, comments, created_at

user_skills

user_id (FK->users), skill_id (FK->skills), level (foundational, proficient, expert), last_validated_at

certifications

certification_id (PK), name, issuing_body, validity_months

user_certifications

user_certification_id (PK), user_id (FK->users), certification_id (FK->certifications), issued_date, expiry_date, certificate_file_path

Module 9: SIRH - Ressources Pédagogiques
resource_library

resource_id (PK), title, resource_type (document, video, link), file_path, course_id (FK->training_courses, nullable), uploaded_by (FK->users), created_at

Module 10: Système & Audit
users

user_id (PK), company_id (FK->companies), email (UNIQUE), password_hash, first_name, last_name, is_active, last_login_at

roles

role_id (PK), role_name (EHC_Admin, Client_Admin, RRH, Manager, Employee)

user_roles

user_id (FK->users), role_id (FK->roles), PRIMARY KEY (user_id, role_id)

permissions

permission_id (PK), permission_name (manage_users, view_reports, create_training)

role_permissions

role_id (FK->roles), permission_id (FK->permissions), PRIMARY KEY (role_id, permission_id)

system_settings

setting_key (PK), setting_value, description, is_editable_by_client

audit_log

log_id (PK), user_id (FK->users, nullable), action, resource_type, resource_id, details (JSON), ip_address, created_at

If something is missed, add it, and add something like this no imogies please,think as a experienced developer  and owner of a company:
🗂️ Structure Simplifiée des Tables – Système EHC
📌 1. Prospection & Devis
● Prospects : Clients potentiels
○ Sous-tableaux :
■ Sources des prospects (origine : site web, salon…)
■ Interactions (appels, emails, réunions)
● Devis : Offres commerciales
○ Sous-tableaux :
■ Lignes de devis (détails : quantité, prix, description)
📌 2. Contrats & Signature
● Contrats : Accords signés
○ Sous-tableaux :
■ Clauses du contrat (conditions juridiques)
■ Versions du contrat (modifications et historique)
📌 3. Clients & Entreprises
● Entreprises : Données sur les sociétés clientes
○ Sous-tableaux :
■ Contacts dans l’entreprise (nom, fonction, email…)
● Utilisateurs : Comptes du système
○ Sous-tableaux :
■ Rôles (admin, RH, manager…)
■ Permissions (actions autorisées)
■ Liens rôles-permissions
■ Liens utilisateurs-rôles
📌 4. Abonnements & Services
● Abonnements : Plans actifs des entreprises
○ Sous-tableaux :
■ Plans tarifaires (mensuel, annuel, fonctionnalités)
■ Historique des abonnements (actions passées)
■ Modules activés (fonctionnalités en service)
■ Renouvellements (dates, montants)
📌 5. Facturation & Paiements
● Factures : Paiements à effectuer
○ Sous-tableaux :
■ Lignes de facture (détails des produits/services)
■ Paiements (montant, date, mode)
■ Avoirs (remboursements ou ajustements)
■ Remises clients (réductions accordées)
📌 6. Suivi & Support Client
● Tickets de support : Demandes d’aide
○ Sous-tableaux :
■ Messages de support (échanges)
■ Notes internes sur le client
■ Questionnaires de satisfaction
■ Actions de fidélisation (offres, suivis)
📌 7. Résiliations & Historique
● Résiliations : Fin d’abonnement
○ Sous-tableaux :
■ Offres de rétention (réductions pour garder le client)
■ Historique client (archivage après départ)
📌 8. Statistiques & Reporting
● Statistiques globales : Indicateurs clés (CA, taux de conversion…)
● Rapports : Documents générés
● Logs système : Historique des actions
● Notifications : Alertes envoyées
● Paramètres système : Réglages techniques
📌 9. Modules Formation (EHC)
● Formations : Liste des cours
○ Sous-tableaux :
■ Sessions de formation (dates, lieux, formateurs)
■ Participants (employés inscrits)
■ Thématiques (sujets abordés)
■ Inscriptions (demandes des employés)
■ Évaluations (tests à chaud, à froid…)
■ Plan annuel de formation
■ Budgets de formation
■ Demandes de formation (hors plan initial)
■ Certifications (documents délivrés)
■ Certifications utilisateurs (certificats reçus)
■ Bibliothèque (fichiers, vidéos, docs…)
🗄️ Structure Détaillée Base de Données -
Système EHC
📌 1. PROSPECTION & DEVIS
prospects
● prospect_id (PK)
● company_name
● contact_name
● contact_email
● contact_phone
● industry
● company_size
● status (nouveau, qualifié, intéressé, perdu)
● lead_score
● assigned_to (FK → users)
● created_at
● updated_at
prospect_sources
● source_id (PK)
● prospect_id (FK → prospects)
● source_type (site_web, salon, recommendation, cold_call, linkedin)
● source_detail
● campaign_id
● created_at
prospect_interactions
● interaction_id (PK)
● prospect_id (FK → prospects)
● user_id (FK → users)
● type (call, email, meeting, demo)
● subject
● description
● outcome
● next_action
● next_action_date
● created_at
quotes
● quote_id (PK)
● quote_number
● prospect_id (FK → prospects)
● company_id (FK → companies) - si existant
● status (draft, sent, accepted, rejected, expired)
● valid_until
● total_amount
● discount_percent
● notes
● created_by (FK → users)
● created_at
● updated_at
quote_lines
● line_id (PK)
● quote_id (FK → quotes)
● product_type (subscription, formation, consulting)
● description
● quantity
● unit_price
● discount_amount
● total_price
● order_index
📌 2. CONTRATS & SIGNATURE
contracts
● contract_id (PK)
● contract_number
● company_id (FK → companies)
● quote_id (FK → quotes)
● type (subscription, service, formation)
● status (draft, active, suspended, terminated)
● start_date
● end_date
● auto_renewal
● renewal_period
● total_value
● signed_date
● signed_by_client
● signed_by_ehc
● created_at
● updated_at
contract_clauses
● clause_id (PK)
● contract_id (FK → contracts)
● clause_type (payment, cancellation, liability, sla)
● title
● content
● is_mandatory
● order_index
contract_versions
● version_id (PK)
● contract_id (FK → contracts)
● version_number
● changes_description
● document_path
● created_by (FK → users)
● created_at
● is_active
📌 3. CLIENTS & ENTREPRISES
companies
● company_id (PK)
● company_name
● legal_name
● siret
● industry
● size_category (TPE, PME, ETI, GE)
● employee_count
● address
● city
● postal_code
● country
● website
● status (prospect, client, former_client)
● created_at
● updated_at
company_contacts
● contact_id (PK)
● company_id (FK → companies)
● first_name
● last_name
● email
● phone
● mobile
● position
● department
● is_main_contact
● is_decision_maker
● is_technical_contact
● notes
● created_at
● updated_at
users
● user_id (PK)
● company_id (FK → companies)
● username
● email
● password_hash
● first_name
● last_name
● phone
● is_active
● last_login
● created_at
● updated_at
roles
● role_id (PK)
● role_name (admin, hr_manager, employee, trainer, support)
● description
● is_system_role
● created_at
permissions
● permission_id (PK)
● permission_name
● module (users, formations, reports, settings)
● action (create, read, update, delete, export)
● description
role_permissions
● role_id (FK → roles)
● permission_id (FK → permissions)
● PRIMARY KEY (role_id, permission_id)
user_roles
● user_id (FK → users)
● role_id (FK → roles)
● assigned_by (FK → users)
● assigned_at
● PRIMARY KEY (user_id, role_id)
📌 4. ABONNEMENTS & SERVICES
subscription_plans
● plan_id (PK)
● plan_name
● plan_type (monthly, quarterly, annual)
● price
● max_users
● max_formations
● features (JSON)
● is_active
● created_at
● updated_at
subscriptions
● subscription_id (PK)
● company_id (FK → companies)
● contract_id (FK → contracts)
● plan_id (FK → subscription_plans)
● status (active, suspended, cancelled, expired)
● start_date
● end_date
● billing_cycle
● monthly_price
● user_limit
● created_at
● updated_at
subscription_history
● history_id (PK)
● subscription_id (FK → subscriptions)
● action (created, upgraded, downgraded, renewed, cancelled)
● old_plan_id (FK → subscription_plans)
● new_plan_id (FK → subscription_plans)
● reason
● performed_by (FK → users)
● created_at
subscription_modules
● module_id (PK)
● module_name (base_hr, formations, evaluations, reporting)
● description
● is_premium
● monthly_cost
subscription_active_modules
● subscription_id (FK → subscriptions)
● module_id (FK → subscription_modules)
● activated_at
● activated_by (FK → users)
● PRIMARY KEY (subscription_id, module_id)
subscription_renewals
● renewal_id (PK)
● subscription_id (FK → subscriptions)
● renewal_date
● amount
● status (pending, completed, failed)
● payment_method
● created_at
📌 5. FACTURATION & PAIEMENTS
invoices
● invoice_id (PK)
● invoice_number
● company_id (FK → companies)
● subscription_id (FK → subscriptions)
● contract_id (FK → contracts)
● invoice_date
● due_date
● status (draft, sent, paid, overdue, cancelled)
● subtotal
● tax_rate
● tax_amount
● total_amount
● currency
● notes
● created_at
● updated_at
invoice_lines
● line_id (PK)
● invoice_id (FK → invoices)
● description
● quantity
● unit_price
● discount_percent
● line_total
● tax_rate
● period_start
● period_end
payments
● payment_id (PK)
● invoice_id (FK → invoices)
● payment_date
● amount
● payment_method (bank_transfer, credit_card, check, cash)
● transaction_id
● status (pending, completed, failed, refunded)
● notes
● processed_by (FK → users)
● created_at
credit_notes
● credit_note_id (PK)
● invoice_id (FK → invoices)
● credit_note_number
● amount
● reason
● created_date
● status (draft, issued, applied)
● created_by (FK → users)
customer_discounts
● discount_id (PK)
● company_id (FK → companies)
● discount_type (percentage, fixed_amount, free_months)
● value
● reason
● start_date
● end_date
● is_active
● created_by (FK → users)
● created_at
📌 6. SUIVI & SUPPORT CLIENT
support_tickets
● ticket_id (PK)
● ticket_number
● company_id (FK → companies)
● user_id (FK → users) - demandeur
● category (technical, billing, formation, general)
● priority (low, medium, high, urgent)
● status (open, in_progress, waiting_client, resolved, closed)
● subject
● description
● assigned_to (FK → users) - support agent
● created_at
● updated_at
● resolved_at
● closed_at
support_messages
● message_id (PK)
● ticket_id (FK → support_tickets)
● sender_id (FK → users)
● message_type (client, support, internal)
● content
● attachments (JSON)
● is_internal
● created_at
client_notes
● note_id (PK)
● company_id (FK → companies)
● user_id (FK → users) - auteur
● note_type (commercial, technical, relationship, warning)
● title
● content
● is_private
● created_at
● updated_at
satisfaction_surveys
● survey_id (PK)
● company_id (FK → companies)
● survey_type (support, formation, general)
● reference_id (ticket_id ou formation_id)
● overall_rating
● questions_answers (JSON)
● comments
● created_at
retention_actions
● action_id (PK)
● company_id (FK → companies)
● action_type (discount_offer, feature_demo, training_offer, personal_call)
● trigger_reason
● description
● status (planned, executed, successful, failed)
● executed_by (FK → users)
● created_at
● executed_at
📌 7. RÉSILIATIONS & HISTORIQUE
cancellations
● cancellation_id (PK)
● subscription_id (FK → subscriptions)
● company_id (FK → companies)
● cancellation_date
● effective_date
● reason_category
● detailed_reason
● initiated_by (client, ehc)
● final_invoice_id (FK → invoices)
● refund_amount
● status (pending, confirmed, completed)
● processed_by (FK → users)
● created_at
retention_offers
● offer_id (PK)
● cancellation_id (FK → cancellations)
● offer_type (discount, free_months, feature_upgrade, training_bonus)
● offer_details
● value
● valid_until
● status (sent, accepted, rejected, expired)
● created_by (FK → users)
● created_at
client_history
● history_id (PK)
● company_id (FK → companies)
● user_id (FK → users)
● action_type
● description
● data_snapshot (JSON)
● created_at
📌 8. STATISTIQUES & REPORTING
kpi_metrics
● metric_id (PK)
● metric_name
● metric_type (revenue, users, formations, satisfaction)
● value
● period_type (daily, weekly, monthly, yearly)
● period_start
● period_end
● company_id (FK → companies) - null pour global
● calculated_at
reports
● report_id (PK)
● report_name
● report_type (financial, usage, formations, client_health)
● parameters (JSON)
● file_path
● status (generating, completed, failed)
● generated_by (FK → users)
● created_at
● expires_at
system_logs
● log_id (PK)
● user_id (FK → users)
● action
● module
● details (JSON)
● ip_address
● user_agent
● created_at
notifications
● notification_id (PK)
● recipient_id (FK → users)
● type (email, sms, in_app)
● subject
● content
● status (pending, sent, delivered, failed)
● sent_at
● read_at
● created_at
system_settings
● setting_id (PK)
● setting_key
● setting_value
● description
● category
● is_system
● updated_by (FK → users)
● updated_at
📌 9. MODULE FORMATION (EHC)
training_courses
● course_id (PK)
● course_code
● title
● description
● category_id (FK → training_categories)
● level (debutant, intermediaire, avance, expert)
● duration_hours
● max_participants
● prerequisites
● objectives (JSON)
● is_active
● is_certification_eligible
● price
● created_by (FK → users)
● created_at
● updated_at
training_categories
● category_id (PK)
● category_name
● parent_category_id (FK → training_categories)
● description
● color_code
● icon
● sort_order
training_sessions
● session_id (PK)
● course_id (FK → training_courses)
● session_code
● title
● start_date
● end_date
● location_type (presential, remote, hybrid)
● location_details
● trainer_id (FK → trainers)
● max_participants
● status (planned, confirmed, in_progress, completed, cancelled)
● price
● company_id (FK → companies) - si session privée
● created_at
● updated_at
trainers
● trainer_id (PK)
● first_name
● last_name
● email
● phone
● specialties (JSON)
● certifications (JSON)
● bio
● hourly_rate
● is_internal
● is_active
● created_at
session_participants
● participation_id (PK)
● session_id (FK → training_sessions)
● user_id (FK → users)
● registration_date
● status (registered, confirmed, attended, absent, cancelled)
● attendance_rate
● completion_status
● notes
training_topics
● topic_id (PK)
● topic_name
● description
● estimated_duration
● sort_order
course_topics
● course_id (FK → training_courses)
● topic_id (FK → training_topics)
● order_index
● duration_hours
● PRIMARY KEY (course_id, topic_id)
training_registrations
● registration_id (PK)
● user_id (FK → users)
● session_id (FK → training_sessions)
● registration_date
● status (pending, approved, rejected, cancelled)
● approved_by (FK → users)
● approval_date
● cancellation_reason
● cost
● budget_source
training_evaluations
● evaluation_id (PK)
● session_id (FK → training_sessions)
● participant_id (FK → users)
● evaluation_type (hot, cold, impact)
● evaluation_date
● overall_rating
● content_rating
● trainer_rating
● organization_rating
● would_recommend
● comments
● skills_acquired (JSON)
● improvement_suggestions
annual_training_plans
● plan_id (PK)
● company_id (FK → companies)
● year
● total_budget
● used_budget
● objectives
● priority_areas (JSON)
● status (draft, approved, in_progress, completed)
● created_by (FK → users)
● approved_by (FK → users)
● created_at
● updated_at
training_budgets
● budget_id (PK)
● company_id (FK → companies)
● plan_id (FK → annual_training_plans)
● department
● allocated_amount
● spent_amount
● remaining_amount
● year
training_requests
● request_id (PK)
● user_id (FK → users) - demandeur
● course_id (FK → training_courses)
● session_id (FK → training_sessions) - si session spécifique
● requested_date
● justification
● urgency (low, medium, high)
● estimated_cost
● status (pending, approved, rejected, planned)
● approved_by (FK → users)
● approval_date
● rejection_reason
● created_at
certifications
● certification_id (PK)
● certification_name
● issuing_organization
● description
● validity_period_months
● requirements (JSON)
● is_active
user_certifications
● user_certification_id (PK)
● user_id (FK → users)
● certification_id (FK → certifications)
● course_id (FK → training_courses) - si obtenue via formation
● obtained_date
● expiry_date
● certificate_number
● file_path
● status (active, expired, revoked)
● notes
training_library
● resource_id (PK)
● title
● description
● resource_type (document, video, audio, interactive)
● file_path
● file_size
● duration_minutes
● category_id (FK → training_categories)
● course_id (FK → training_courses) - si lié à un cours
● access_level (public, client, premium)
● download_count
● rating_average
● is_active
● uploaded_by (FK → users)
● created_at
● updated_at
🔗 Index et Contraintes Recommandés
Index principaux :
● Toutes les clés étrangères
● companies.company_name
● users.email
● training_sessions.start_date
● invoices.invoice_date
● support_tickets.status
Contraintes importantes :
● Email unique par utilisateur
● Numéro de contrat unique
● Numéro de facture unique
● Dates de début < dates de fin
● Montants >= 0
● Taux de TVA entre 0 et 100%

Absolument. Une analyse approfondie de la base de données est la clé de voûte de tout projet SIRH et commercial. Le schéma ci-dessous va bien au-delà des tables de base et inclut des tables de configuration, de journalisation, d'historique et de CRM pour refléter un système d'entreprise complet et robuste, comme demandé.

J'ai structuré la liste en 10 modules fonctionnels pour une meilleure lisibilité, couvrant tout le cycle de vie, de la prospection à la facturation et à l'utilisation de la plateforme de formation.

---

### **Schéma de Base de Données Complet - SIRH EHC**

#### **Module 1 : Gestion des Prospects et CRM (Commercial)**

| N° | Nom de la Table             | Colonnes Clés                                          | Explication Brève                                                                                   |
|----|-----------------------------|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 1  | `prospects`                 | `id`, `company_name`, `contact_person`, `email`, `status`| Stocke les informations sur les entreprises qui ne sont pas encore clientes.                          |
| 2  | `prospect_interactions`     | `id`, `prospect_id`, `user_id`, `type`, `interaction_date` | Journal de toutes les interactions (appel, email, réunion) avec un prospect.                    |
| 3  | `prospect_contacts`         | `id`, `prospect_id`, `name`, `email`, `role`           | Gère plusieurs contacts au sein d'une même entreprise prospect.                                     |
| 4  | `marketing_campaigns`       | `id`, `name`, `start_date`, `end_date`, `budget`       | Suivi des campagnes marketing pour mesurer le ROI.                                                  |
| 5  | `prospect_sources`          | `id`, `prospect_id`, `campaign_id`, `source_type`      | Permet de savoir d'où vient un prospect (campagne X, salon Y, etc.).                                |

#### **Module 2 : Gestion des Devis et Propositions Commerciales**

| N° | Nom de la Table             | Colonnes Clés                                             | Explication Brève                                                                                   |
|----|-----------------------------|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 6  | `products`                  | `id`, `name`, `description`, `category`, `price_model`    | Catalogue des produits et services vendus (Abonnement SIRH, Heures de conseil, etc.).               |
| 7  | `quotes` (Devis)            | `id`, `prospect_id`, `quote_number`, `status`, `total_amount` | Enregistre chaque devis envoyé à un prospect, avec son statut (brouillon, envoyé, accepté).         |
| 8  | `quote_items`               | `id`, `quote_id`, `product_id`, `quantity`, `unit_price`  | Les lignes de détail d'un devis (ex: 50 licences "Employé", 1 licence "RRH").                    |
| 9  | `quote_templates`           | `id`, `name`, `description`                               | Modèles de devis pour accélérer la création de propositions commerciales.                           |
| 10 | `quote_template_items`      | `id`, `template_id`, `product_id`, `default_quantity`     | Lignes de produits pré-remplies pour un modèle de devis.                                            |

#### **Module 3 : Gestion des Contrats et Souscriptions**

| N° | Nom de la Table             | Colonnes Clés                                                | Explication Brève                                                                                   |
|----|-----------------------------|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 11 | `contracts`                 | `id`, `company_id`, `quote_id`, `start_date`, `end_date`       | Documente l'accord formel avec un client, souvent généré à partir d'un devis accepté.            |
| 12 | `contract_documents`        | `id`, `contract_id`, `document_url`, `version`, `upload_date`  | Stocke les fichiers PDF des contrats signés.                                                        |
| 13 | `subscriptions`             | `id`, `contract_id`, `product_id`, `status`, `next_billing_date` | Gère les abonnements récurrents d'une entreprise aux services EHC.                               |
| 14 | `subscription_history`      | `id`, `subscription_id`, `event_type`, `event_date`, `details` | Historique des changements d'un abonnement (upgrade, downgrade, pause).                             |
| 15 | `terminations` (Résiliations)| `id`, `subscription_id`, `reason`, `effective_date`        | Enregistre les informations relatives à la fin d'un abonnement.                                     |

#### **Module 4 : Gestion des Comptes Entreprises et Utilisateurs (SIRH)**

| N° | Nom de la Table             | Colonnes Clés                                               | Explication Brève                                                                                   |
|----|-----------------------------|-------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 16 | `companies` (Entreprises)   | `id`, `name`, `address`, `primary_contact_id`, `subscription_tier` | Table centrale pour les entreprises clientes.                                                       |
| 17 | `users`                     | `id`, `company_id`, `role_id`, `email`, `password_hash`     | Table de tous les utilisateurs de la plateforme (employés, managers, RRH...).                       |
| 18 | `roles`                     | `id`, `name`                                                | Définit les rôles système (SuperAdmin, RRH, RF, Manager, Employé, etc.).                             |
| 19 | `permissions`               | `id`, `name`, `description`                                 | Permissions granulaires (ex: `create_training`, `delete_user`).                                   |
| 20 | `role_permissions`          | `role_id`, `permission_id`                                  | Table de jointure (Many-to-Many) liant les rôles à leurs permissions.                               |
| 21 | `organizational_units`      | `id`, `company_id`, `name`, `parent_unit_id`                | Modélise l'organigramme de l'entreprise (directions, départements, services).                       |
| 22 | `user_profiles`             | `user_id`, `job_title`, `phone_number`, `avatar_url`        | Informations de profil étendues pour les utilisateurs.                                              |

#### **Module 5 : Ingénierie de Formation et Catalogue (SIRH)**

| N° | Nom de la Table             | Colonnes Clés                                                  | Explication Brève                                                                                   |
|----|-----------------------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 23 | `domains` (Compétences)     | `id`, `name`, `description`                                    | Domaines de compétence généraux (ex: Management, IT, Soft Skills).                                  |
| 24 | `topics` (Thématiques)      | `id`, `domain_id`, `name`                                      | Thématiques spécifiques à l'intérieur d'un domaine (ex: "Développement Web" dans le domaine "IT"). |
| 25 | `skills`                    | `id`, `name`, `description`                                    | Compétences précises (ex: React.js, Gestion de projet Agile).                                       |
| 26 | `trainings` (Formations)    | `id`, `topic_id`, `title`, `type`, `level`, `duration_hours`     | Le catalogue central de toutes les formations disponibles.                                          |
| 27 | `training_skills`           | `training_id`, `skill_id`                                      | Table de jointure (M2M) indiquant quelles compétences une formation permet d'acquérir.              |
| 28 | `training_content_modules`  | `id`, `training_id`, `title`, `order`                          | Découpe une formation en modules logiques (ex: Module 1: Introduction, Module 2: ...).            |
| 29 | `training_content_units`    | `id`, `module_id`, `title`, `content_type`, `content_url`      | Unité de contenu atomique (une vidéo, un PDF, un quiz) dans un module.                              |
| 30 | `resource_library`          | `id`, `title`, `type`, `file_url`, `topic_id`                  | La bibliothèque en ligne (fichiers PDF, vidéos, etc.) accessible aux employés.                      |

#### **Module 6 : Gestion des Participants et Inscriptions (SIRH)**

| N° | Nom de la Table             | Colonnes Clés                                                 | Explication Brève                                                                                   |
|----|-----------------------------|---------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 31 | `training_sessions`         | `id`, `training_id`, `trainer_id`, `start_date`, `status`     | Instance spécifique d'une formation planifiée à une date donnée avec un formateur.                  |
| 32 | `enrollments` (Inscriptions)| `id`, `user_id`, `session_id`, `status`, `progress`           | Enregistre l'inscription d'un utilisateur à une session de formation.                                 |
| 33 | `enrollment_requests`       | `id`, `user_id`, `training_id`, `justification`, `status`     | Suivi des demandes de formation non planifiées, avec leur workflow de validation.                   |
| 34 | `user_training_history`     | `id`, `user_id`, `training_id`, `completion_date`, `score`    | Historique consolidé de toutes les formations suivies par un utilisateur.                           |
| 35 | `waiting_lists`             | `id`, `user_id`, `training_id`, `request_date`                | Gère les listes d'attente pour les formations complètes.                                            |

#### **Module 7 : Évaluations, Quiz et Certifications (SIRH)**

| N° | Nom de la Table             | Colonnes Clés                                                     | Explication Brève                                                                                   |
|----|-----------------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 36 | `quizzes`                   | `id`, `title`, `training_content_module_id`, `passing_score`      | Définit un quiz (ensemble de questions) associé à un module de formation.                           |
| 37 | `questions`                 | `id`, `quiz_id`, `question_text`, `type`                          | Stocke une question spécifique d'un quiz.                                                           |
| 38 | `question_options`          | `id`, `question_id`, `option_text`, `is_correct`                  | Les réponses possibles pour une question à choix multiple (QCM).                                    |
| 39 | `quiz_attempts`             | `id`, `user_id`, `quiz_id`, `start_time`, `score`, `status`       | Enregistre chaque tentative d'un utilisateur à un quiz.                                             |
| 40 | `user_answers`              | `id`, `attempt_id`, `question_id`, `selected_option_id`           | Stocke la réponse donnée par un utilisateur à une question lors d'une tentative.                    |
| 41 | `evaluations` (Feedback)    | `id`, `session_id`, `user_id`, `rating_content`, `comments`       | Feedback qualitatif donné par un participant à la fin d'une formation.                              |
| 42 | `certificates`              | `id`, `user_id`, `training_id`, `issue_date`, `certificate_url`   | Enregistre les certificats obtenus par les utilisateurs.                                            |
| 43 | `certificate_templates`     | `id`, `name`, `template_file_url`                                 | Modèles de design pour la génération de certificats PDF.                                            |

#### **Module 8 : Facturation et Paiements**

| N° | Nom de la Table             | Colonnes Clés                                                     | Explication Brève                                                                                   |
|----|-----------------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 44 | `invoices` (Factures)       | `id`, `company_id`, `subscription_id`, `issue_date`, `status`     | Génère et suit les factures pour les abonnements ou autres services.                                |
| 45 | `invoice_items`             | `id`, `invoice_id`, `description`, `amount`                       | Lignes de détail d'une facture.                                                                     |
| 46 | `payments`                  | `id`, `invoice_id`, `payment_date`, `amount`, `method`            | Enregistre les paiements reçus de la part des clients.                                              |
| 47 | `transactions`              | `id`, `payment_id`, `type`, `status`, `gateway_response`          | Journal de bas niveau de toutes les transactions financières avec une passerelle de paiement.       |

#### **Module 9 : Budgétisation et Planification (SIRH)**

| N° | Nom de la Table             | Colonnes Clés                                                  | Explication Brève                                                                                   |
|----|-----------------------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 48 | `budgets`                   | `id`, `company_id`, `year`, `total_amount`, `status`           | Définit le budget de formation global pour une période donnée.                                      |
| 49 | `budget_allocations`        | `id`, `budget_id`, `organizational_unit_id`, `allocated_amount`| Alloue des parties du budget global à des départements spécifiques.                                 |
| 50 | `training_plans`            | `id`, `company_id`, `name`, `year`, `status`                   | Le plan de formation annuel ou pluriannuel de l'entreprise.                                         |
| 51 | `plan_items`                | `id`, `plan_id`, `training_id`, `target_audience`              | Ligne d'un plan de formation, associant une formation à une population cible.                       |

#### **Module 10 : Tables Système, Journalisation et Analytics**

| N° | Nom de la Table             | Colonnes Clés                                                      | Explication Brève                                                                                   |
|----|-----------------------------|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| 52 | `settings`                  | `setting_key`, `setting_value`                                     | Configuration globale de l'application (clé-valeur).                                                |
| 53 | `audit_log`                 | `id`, `user_id`, `action`, `resource_name`, `resource_id`, `timestamp` | Journal d'audit immuable : QUI a fait QUOI, QUAND et sur QUELLE ressource. Crucial pour la sécurité. |
| 54 | `notification_templates`    | `id`, `name`, `subject`, `body_html`                               | Modèles pour les emails et notifications (ex: "Invitation à une formation").                        |
| 55 | `notifications`             | `id`, `user_id`, `type`, `content`, `is_read`, `created_at`         | Stocke les notifications envoyées aux utilisateurs dans l'application.                              |
| 56 | `kpi_commercials`           | `id`, `month`, `year`, `mrr`, `churn_rate`, `new_prospects`        | Table agrégée pour les indicateurs de performance clés (KPI), mise à jour périodiquement.           |

---

**Note sur l'Intégrité :**
Toutes ces tables doivent être liées par des **clés étrangères** (foreign keys) pour garantir l'intégrité référentielle. Des **index** doivent être placés sur les clés étrangères et sur les colonnes fréquemment utilisées dans les clauses `WHERE` pour optimiser les performances des requêtes.