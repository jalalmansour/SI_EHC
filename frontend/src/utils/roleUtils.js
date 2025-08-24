// Role-based routing and permissions utility for EHC Training Hub

// Define all available roles
export const ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  RRH: 'rrh',
  RF: 'rf',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
  FORMATEUR: 'formateur',
  ORGANISME: 'organisme',
  DIRECTEUR: 'directeur'
}

// Define role hierarchy (higher number = more permissions)
export const ROLE_HIERARCHY = {
  [ROLES.SUPERADMIN]: 9,
  [ROLES.ADMIN]: 8,
  [ROLES.DIRECTEUR]: 7,
  [ROLES.RRH]: 6,
  [ROLES.RF]: 5,
  [ROLES.MANAGER]: 4,
  [ROLES.FORMATEUR]: 3,
  [ROLES.ORGANISME]: 2,
  [ROLES.EMPLOYEE]: 1
}

// Define role-based dashboard routes
export const ROLE_DASHBOARDS = {
  [ROLES.SUPERADMIN]: '/dashboard/superadmin',
  [ROLES.ADMIN]: '/dashboard/admin',
  [ROLES.RRH]: '/dashboard/rrh',
  [ROLES.RF]: '/dashboard/rf',
  [ROLES.MANAGER]: '/dashboard/manager',
  [ROLES.EMPLOYEE]: '/dashboard/employee',
  [ROLES.FORMATEUR]: '/dashboard/formateur',
  [ROLES.ORGANISME]: '/dashboard/organisme',
  [ROLES.DIRECTEUR]: '/dashboard/directeur'
}

// Define role-based navigation menus
export const ROLE_MENUS = {
  [ROLES.SUPERADMIN]: [
    { key: 'dashboard', label: 'Tableau de Bord', path: '/dashboard/superadmin' },
    { key: 'global-management', label: 'Gestion Globale', path: '/dashboard/superadmin/global-management' },
    { key: 'system-monitoring', label: 'Monitoring Système', path: '/dashboard/superadmin/system-monitoring' },
    { key: 'clients-management', label: 'Gestion Clients', path: '/dashboard/superadmin/clients-management' },
    { key: 'system-settings', label: 'Paramètres Système', path: '/dashboard/superadmin/system-settings' }
  ],
  [ROLES.ADMIN]: [
    { key: 'dashboard', label: 'Tableau de Bord', path: '/dashboard/admin' },
    { key: 'clients-management', label: 'Gestion Clients', path: '/dashboard/admin/clients-management' },
    { key: 'system-settings', label: 'Paramètres Système', path: '/dashboard/admin/system-settings' }
  ],
  [ROLES.RRH]: [
    { key: 'dashboard', label: 'Tableau de Bord', path: '/dashboard/rrh' },
    { key: 'budget-management', label: 'Gestion Budget', path: '/dashboard/rrh/budget-management' },
    { key: 'organization-management', label: 'Gestion Organisation', path: '/dashboard/rrh/organization-management' },
    { key: 'training-catalog', label: 'Catalogue Formation', path: '/dashboard/rrh/training-catalog' },
    { key: 'participant-management', label: 'Gestion Participants', path: '/dashboard/rrh/participant-management' },
    { key: 'reports', label: 'Rapports', path: '/dashboard/rrh/reports' },
    { key: 'settings', label: 'Paramètres', path: '/dashboard/rrh/settings' }
  ],
  [ROLES.RF]: [
    { key: 'dashboard', label: 'Tableau de Bord', path: '/dashboard/rf' },
    { key: 'training-planning', label: 'Planification Formation', path: '/dashboard/rf/training-planning' },
    { key: 'validation-requests', label: 'Validation Demandes', path: '/dashboard/rf/validation-requests' },
    { key: 'training-reports', label: 'Rapports Formation', path: '/dashboard/rf/training-reports' }
  ],
  [ROLES.MANAGER]: [
    { key: 'dashboard', label: 'Tableau de Bord', path: '/dashboard/manager' },
    { key: 'team-formations', label: 'Formations Équipe', path: '/dashboard/manager/team-formations' },
    { key: 'validation-requests', label: 'Validation Demandes', path: '/dashboard/manager/validation-requests' }
  ],
  [ROLES.EMPLOYEE]: [
    { key: 'dashboard', label: 'Tableau de Bord', path: '/dashboard/employee' },
    { key: 'mes-formations', label: 'Mes Formations', path: '/dashboard/employee/mes-formations' },
    { key: 'demande-formation', label: 'Demande Formation', path: '/dashboard/employee/demande-formation' },
    { key: 'mes-certifications', label: 'Mes Certifications', path: '/dashboard/employee/mes-certifications' },
    { key: 'evaluations', label: 'Évaluations', path: '/dashboard/employee/evaluations' }
  ],
  [ROLES.FORMATEUR]: [
    { key: 'dashboard', label: 'Tableau de Bord', path: '/dashboard/formateur' },
    { key: 'mes-formations', label: 'Mes Formations', path: '/dashboard/formateur/mes-formations' },
    { key: 'evaluations', label: 'Évaluations', path: '/dashboard/formateur/evaluations' }
  ],
  [ROLES.ORGANISME]: [
    { key: 'dashboard', label: 'Tableau de Bord', path: '/dashboard/organisme' },
    { key: 'formations-proposees', label: 'Formations Proposées', path: '/dashboard/organisme/formations-proposees' }
  ],
  [ROLES.DIRECTEUR]: [
    { key: 'dashboard', label: 'Tableau de Bord', path: '/dashboard/directeur' },
    { key: 'reports-globaux', label: 'Rapports Globaux', path: '/dashboard/directeur/reports-globaux' }
  ]
}

// Define permissions for each role
export const ROLE_PERMISSIONS = {
  [ROLES.SUPERADMIN]: ['*'], // All permissions
  [ROLES.ADMIN]: [
    'manage_users', 'view_reports', 'configure_system', 'manage_clients',
    'view_global_analytics', 'manage_subscriptions', 'manage_billing'
  ],
  [ROLES.RRH]: [
    'manage_budget', 'manage_organization', 'view_reports', 'manage_training_catalog',
    'manage_participants', 'approve_training_requests', 'view_employee_data',
    'manage_certifications', 'export_reports', 'manage_training_plans'
  ],
  [ROLES.RF]: [
    'plan_training', 'validate_requests', 'view_reports', 'manage_sessions',
    'assign_trainers', 'create_training_plans', 'view_participant_progress'
  ],
  [ROLES.MANAGER]: [
    'view_team_trainings', 'approve_requests', 'view_team_reports',
    'manage_team_budget', 'view_team_performance'
  ],
  [ROLES.EMPLOYEE]: [
    'view_my_trainings', 'request_training', 'view_my_certifications',
    'submit_evaluations', 'view_my_progress'
  ],
  [ROLES.FORMATEUR]: [
    'manage_sessions', 'view_courses', 'create_course', 'evaluate_participants',
    'view_session_reports', 'manage_course_content'
  ],
  [ROLES.ORGANISME]: [
    'propose_formations', 'view_formation_requests', 'manage_formation_catalog',
    'view_participant_feedback'
  ],
  [ROLES.DIRECTEUR]: [
    'view_global_reports', 'view_financial_reports', 'view_performance_metrics',
    'approve_budget_allocations', 'view_strategic_analytics'
  ]
}

// Utility functions
export const getRoleDashboard = (role) => {
  return ROLE_DASHBOARDS[role] || '/dashboard'
}

export const getRoleMenu = (role) => {
  return ROLE_MENUS[role] || []
}

export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || []
}

export const hasPermission = (userRole, requiredPermission) => {
  const userPermissions = getRolePermissions(userRole)
  return userPermissions.includes('*') || userPermissions.includes(requiredPermission)
}

export const canAccessRoute = (userRole, requiredRole) => {
  const userLevel = ROLE_HIERARCHY[userRole] || 0
  const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0
  return userLevel >= requiredLevel
}

export const getRoleDisplayName = (role) => {
  const roleNames = {
    [ROLES.SUPERADMIN]: 'Super Administrateur',
    [ROLES.ADMIN]: 'Administrateur',
    [ROLES.RRH]: 'Responsable RH',
    [ROLES.RF]: 'Responsable Formation',
    [ROLES.MANAGER]: 'Manager',
    [ROLES.EMPLOYEE]: 'Employé',
    [ROLES.FORMATEUR]: 'Formateur',
    [ROLES.ORGANISME]: 'Organisme Formation',
    [ROLES.DIRECTEUR]: 'Directeur'
  }
  return roleNames[role] || role
}

export const getRoleColor = (role) => {
  const roleColors = {
    [ROLES.SUPERADMIN]: '#ff4d4f',
    [ROLES.ADMIN]: '#ff7875',
    [ROLES.RRH]: '#1890ff',
    [ROLES.RF]: '#52c41a',
    [ROLES.MANAGER]: '#faad14',
    [ROLES.EMPLOYEE]: '#722ed1',
    [ROLES.FORMATEUR]: '#13c2c2',
    [ROLES.ORGANISME]: '#eb2f96',
    [ROLES.DIRECTEUR]: '#f5222d'
  }
  return roleColors[role] || '#d9d9d9'
}

// Validate user role and redirect to appropriate dashboard
export const validateUserAccess = (user, currentPath) => {
  if (!user || !user.role) {
    return '/login'
  }

  const userDashboard = getRoleDashboard(user.role)
  
  // If user is on a generic dashboard path, redirect to role-specific dashboard
  if (currentPath === '/dashboard' || currentPath === '/dashboard/') {
    return userDashboard
  }

  // Check if user is trying to access a route they shouldn't have access to
  const roleMenu = getRoleMenu(user.role)
  const allowedPaths = roleMenu.map(item => item.path)
  
  if (!allowedPaths.some(path => currentPath.startsWith(path)) && 
      !currentPath.startsWith('/dashboard/profile') && 
      !currentPath.startsWith('/dashboard/settings')) {
    return userDashboard
  }

  return null // No redirect needed
}
