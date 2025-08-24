import api from './api.js'

export const reportService = {
  getReports: async () => {
    const response = await api.get('/reports')
    return response
  },
}

export default reportService
