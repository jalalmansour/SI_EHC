import api from './api.js'

export const organizationService = {
  // Get organizations
  getOrganizations: async () => {
    const response = await api.get('/organizations')
    return response
  },

  // Get users
  getUsers: async () => {
    const response = await api.get('/users')
    return response
  },
}

export default organizationService
