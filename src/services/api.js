import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api"

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  login: (credentials) => apiClient.post("/auth/login", credentials),
  register: (userData) => apiClient.post("/auth/register", userData),
  logout: () => apiClient.post("/auth/logout"),
  refreshToken: () => apiClient.post("/auth/refresh"),
  forgotPassword: (email) => apiClient.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) => apiClient.post("/auth/reset-password", { token, password }),
}

// Budget API
export const budgetAPI = {
  getAll: () => apiClient.get("/budgets"),
  getById: (id) => apiClient.get(`/budgets/${id}`),
  create: (data) => apiClient.post("/budgets", data),
  update: (id, data) => apiClient.put(`/budgets/${id}`, data),
  delete: (id) => apiClient.delete(`/budgets/${id}`),
  addExtension: (budgetId, extension) => apiClient.post(`/budgets/${budgetId}/extensions`, extension),
  addCut: (budgetId, cut) => apiClient.post(`/budgets/${budgetId}/cuts`, cut),
  getAlerts: () => apiClient.get("/budgets/alerts"),
  getStatistics: () => apiClient.get("/budgets/statistics"),
}

// Catalog API
export const catalogAPI = {
  getAll: (filters) => apiClient.get("/catalog", { params: filters }),
  getById: (id) => apiClient.get(`/catalog/${id}`),
  create: (data) => apiClient.post("/catalog", data),
  update: (id, data) => apiClient.put(`/catalog/${id}`, data),
  delete: (id) => apiClient.delete(`/catalog/${id}`),
  approve: (id) => apiClient.post(`/catalog/${id}/approve`),
  reject: (id, reason) => apiClient.post(`/catalog/${id}/reject`, { reason }),
  getCategories: () => apiClient.get("/catalog/categories"),
  getProviders: () => apiClient.get("/catalog/providers"),
  importExcel: (file) => {
    const formData = new FormData()
    formData.append("file", file)
    return apiClient.post("/catalog/import", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },
  exportExcel: (filters) =>
    apiClient.get("/catalog/export", {
      params: filters,
      responseType: "blob",
    }),
}

// Participant API
export const participantAPI = {
  getAll: () => apiClient.get("/participants"),
  getById: (id) => apiClient.get(`/participants/${id}`),
  getRegistrations: (filters) => apiClient.get("/participants/registrations", { params: filters }),
  invite: (sessionId, participantIds) => apiClient.post("/participants/invite", { sessionId, participantIds }),
  register: (sessionId, participantId) => apiClient.post("/participants/register", { sessionId, participantId }),
  approve: (registrationId, approvalType) =>
    apiClient.post(`/participants/registrations/${registrationId}/approve`, { approvalType }),
  reject: (registrationId, reason) =>
    apiClient.post(`/participants/registrations/${registrationId}/reject`, { reason }),
  updateAttendance: (registrationId, status) =>
    apiClient.put(`/participants/registrations/${registrationId}/attendance`, { status }),
}

// Training Sessions API
export const trainingSessionAPI = {
  getAll: (filters) => apiClient.get("/training-sessions", { params: filters }),
  getById: (id) => apiClient.get(`/training-sessions/${id}`),
  create: (data) => apiClient.post("/training-sessions", data),
  update: (id, data) => apiClient.put(`/training-sessions/${id}`, data),
  delete: (id) => apiClient.delete(`/training-sessions/${id}`),
  getParticipants: (id) => apiClient.get(`/training-sessions/${id}/participants`),
  updateStatus: (id, status) => apiClient.put(`/training-sessions/${id}/status`, { status }),
}

// Evaluation API
export const evaluationAPI = {
  getAll: (filters) => apiClient.get("/evaluations", { params: filters }),
  getById: (id) => apiClient.get(`/evaluations/${id}`),
  create: (data) => apiClient.post("/evaluations", data),
  update: (id, data) => apiClient.put(`/evaluations/${id}`, data),
  submit: (id, answers) => apiClient.post(`/evaluations/${id}/submit`, { answers }),
  schedule: (data) => apiClient.post("/evaluations/schedule", data),
  getTemplates: (type) => apiClient.get(`/evaluations/templates/${type}`),
  getResults: (participantId, trainingId) => apiClient.get(`/evaluations/results/${participantId}/${trainingId}`),
}

// Competency API
export const competencyAPI = {
  getAll: () => apiClient.get("/competencies"),
  getByUserId: (userId) => apiClient.get(`/competencies/user/${userId}`),
  updateProfile: (userId, competencies) => apiClient.put(`/competencies/user/${userId}`, { competencies }),
  getSkillsMatrix: (departmentId) => apiClient.get(`/competencies/skills-matrix/${departmentId}`),
  getGapAnalysis: (userId) => apiClient.get(`/competencies/gap-analysis/${userId}`),
}

// Organization API
export const organizationAPI = {
  getEmployees: () => apiClient.get("/organization/employees"),
  getDepartments: () => apiClient.get("/organization/departments"),
  getOrgChart: () => apiClient.get("/organization/chart"),
  importEmployees: (file) => {
    const formData = new FormData()
    formData.append("file", file)
    return apiClient.post("/organization/import", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },
  exportEmployees: () => apiClient.get("/organization/export", { responseType: "blob" }),
}

// Reports API
export const reportsAPI = {
  getBudgetReport: (filters) => apiClient.get("/reports/budget", { params: filters }),
  getTrainingReport: (filters) => apiClient.get("/reports/training", { params: filters }),
  getParticipationReport: (filters) => apiClient.get("/reports/participation", { params: filters }),
  getCompetencyReport: (filters) => apiClient.get("/reports/competency", { params: filters }),
  exportReport: (type, filters) =>
    apiClient.get(`/reports/${type}/export`, {
      params: filters,
      responseType: "blob",
    }),
}

export default apiClient
