import api from './api.js'

export const planningService = {
  getPlanning: async () => {
    const response = await api.get('/planning')
    return response
  },
}

export default planningService
