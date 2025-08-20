import api from './api.js'

export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response
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
