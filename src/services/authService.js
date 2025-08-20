import api from './api.js'

export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response
  },

  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout')
    return response
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh')
    return response
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email })
    return response
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password })
    return response
  },

  // Change password
  changePassword: async (passwords) => {
    const response = await api.post('/auth/change-password', passwords)
    return response
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData)
    return response
  },
}

export default authService
