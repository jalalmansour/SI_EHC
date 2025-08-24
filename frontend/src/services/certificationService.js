import api from './api.js'

export const certificationService = {
  getCertifications: async () => {
    const response = await api.get('/certifications')
    return response
  },
}

export default certificationService
