import api from './api.js'

export const trainingService = {
  // Get all training courses
  getCourses: async (params = {}) => {
    const response = await api.get('/training/courses', { params })
    return response
  },

  // Get a specific course
  getCourse: async (id) => {
    const response = await api.get(`/training/courses/${id}`)
    return response
  },

  // Create a new course
  createCourse: async (courseData) => {
    const response = await api.post('/training/courses', courseData)
    return response
  },

  // Update a course
  updateCourse: async (id, courseData) => {
    const response = await api.put(`/training/courses/${id}`, courseData)
    return response
  },

  // Delete a course
  deleteCourse: async (id) => {
    const response = await api.delete(`/training/courses/${id}`)
    return response
  },

  // Get all training sessions
  getSessions: async (params = {}) => {
    const response = await api.get('/training/sessions', { params })
    return response
  },

  // Get a specific session
  getSession: async (id) => {
    const response = await api.get(`/training/sessions/${id}`)
    return response
  },

  // Create a new session
  createSession: async (sessionData) => {
    const response = await api.post('/training/sessions', sessionData)
    return response
  },

  // Update a session
  updateSession: async (id, sessionData) => {
    const response = await api.put(`/training/sessions/${id}`, sessionData)
    return response
  },

  // Delete a session
  deleteSession: async (id) => {
    const response = await api.delete(`/training/sessions/${id}`)
    return response
  },

  // Get training categories
  getCategories: async () => {
    const response = await api.get('/training/categories')
    return response
  },

  // Get training topics
  getTopics: async () => {
    const response = await api.get('/training/topics')
    return response
  },

  // Get training skills
  getSkills: async () => {
    const response = await api.get('/training/skills')
    return response
  },
}

export default trainingService
