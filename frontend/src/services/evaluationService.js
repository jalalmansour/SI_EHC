import api from './api.js'

export const evaluationService = {
  getEvaluations: async () => {
    const response = await api.get('/evaluations')
    return response
  },
}

export default evaluationService
