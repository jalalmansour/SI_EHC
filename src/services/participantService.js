import api from './api.js'

export const participantService = {
  getParticipants: async () => {
    const response = await api.get('/participants')
    return response
  },
}

export default participantService
