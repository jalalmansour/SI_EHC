import {axiosPrivate} from './axios.js'

export const devisService = {
  // Submit a devis request
  submitDevisRequest: async (data) => {
    try {
      const response = await axiosPrivate.post('/devis/submit', data)
      return response
    } catch (error) {
      // If backend is not available, simulate success for demo purposes
      if (error.code === 'ERR_NETWORK' || error.message.includes('ERR_CONNECTION_REFUSED')) {
        console.log('Backend not available, simulating success response')
        return {
          data: {
            success: true,
            message: 'Demande simulée avec succès (backend non disponible)',
            devisId: 'DEMO-' + Date.now()
          }
        }
      }
      throw error
    }
  },

  // Get devis summary data
  getDevisSummary: async () => {
    try {
      const response = await axiosPrivate.get('/devis/summary')
      return response
    } catch (error) {
      // If backend is not available, return mock data for demo purposes
      if (error.code === 'ERR_NETWORK' || error.message.includes('ERR_CONNECTION_REFUSED')) {
        console.log('Backend not available, returning mock data')
        return {
          data: {
            total: 156,
            pending: 23,
            approved: 98,
            rejected: 35,
            recent: [
              {
                id: 1,
                company: 'TechCorp',
                contact: 'Jean Dupont',
                topic: 'Formation React',
                status: 'En attente',
                date: '2024-01-15'
              },
              {
                id: 2,
                company: 'InnovSoft',
                contact: 'Marie Martin',
                topic: 'Leadership',
                status: 'Approuvé',
                date: '2024-01-14'
              }
            ]
          }
        }
      }
      throw error
    }
  }
}

export default devisService


