import api from './api.js'

export const libraryService = {
  getLibrary: async () => {
    const response = await api.get('/library')
    return response
  },
}

export default libraryService
