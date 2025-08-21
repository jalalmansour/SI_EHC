import api from './api.js'

// Helper function to safely handle localStorage operations
const safeLocalStorage = {
  removeItem: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
    }
  }
}

export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response
  },
  
  // Logout user
  logout: async () => {
    // Call backend logout to clear HTTP-only cookies
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.warn('Logout request failed:', error)
    }
    // Clear local storage safely
    safeLocalStorage.removeItem('user')
    return { success: true }
  },
}

export default authService
