import api from './api.js'

const DEV_TEST_USERS = [
  {
    email: 'admin@ehc.com',
    password: 'admin123',
    role: 'admin',
    permissions: ['manage_users', 'view_reports', 'configure_system'],
    description: 'Full system access',
  },
  {
    email: 'formateur@ehc.com',
    password: 'formateur123',
    role: 'formateur',
    permissions: ['manage_sessions', 'view_courses', 'create_course'],
    description: 'Training management',
  },
  {
    email: 'rrh@ehc.com',
    password: 'rrh123',
    role: 'rrh',
    permissions: ['manage_budget', 'manage_organization', 'view_reports'],
    description: 'HR management',
  },
  {
    email: 'manager@ehc.com',
    password: 'manager123',
    role: 'manager',
    permissions: ['view_team_trainings', 'approve_requests'],
    description: 'Team management',
  },
  
  {
    email: 'rf@ehc.com',
    password: 'rf123',
    role: 'rf',
    permissions: ['plan_training', 'validate_requests', 'view_reports'],
    description: 'Responsable Formation',
  },
  {
    email: 'employee@ehc.com',
    password: 'employee123',
    role: 'employee',
    permissions: ['view_my_trainings', 'request_training'],
    description: 'Employee',
  },
  {
    email: 'superadmin@ehc.com',
    password: 'superadmin12456783',
    role: 'superadmin',
    permissions: ['*'],
    description: 'Global platform admin',
  },
]

function buildFakeResponse(user) {
  const safeUser = {
    id: user.id || Math.random().toString(36).slice(2),
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    firstName: user.firstName || user.role?.toUpperCase(),
    lastName: user.lastName || 'Test',
    avatarUrl: '/public/placeholder-user.jpg',
  }
  return {
    data: {
      token: 'dev-fake-token-' + safeUser.role,
      user: safeUser,
    },
    status: 200,
    headers: {},
    config: {},
    statusText: 'OK',
  }
}

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)
      return response
    } catch (error) {
      // Dev fallback: allow predefined test accounts without backend
      const email = String(credentials?.email || '').toLowerCase()
      const password = String(credentials?.password || '')
      const match = DEV_TEST_USERS.find((u) => u.email === email && u.password === password)
      if (match) {
        return buildFakeResponse(match)
      }
      throw error
    }
  },
  
  // Logout user
  logout: async () => {
    // Clear local storage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return { success: true }
  },
}

export default authService
