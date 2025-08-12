import apiClient from "./apiClient"

export const catalogService = {
  getTrainings: (params) => apiClient.get("/catalog", { params }),

  getTraining: (id) => apiClient.get(`/catalog/${id}`),

  createTraining: (data) => apiClient.post("/catalog", data),

  updateTraining: (id, data) => apiClient.put(`/catalog/${id}`, data),

  deleteTraining: (id) => apiClient.delete(`/catalog/${id}`),

  getCategories: () => apiClient.get("/catalog/categories"),

  validateTraining: (id, status, comment) => apiClient.put(`/catalog/${id}/validate`, { status, comment }),

  archiveTraining: (id) => apiClient.put(`/catalog/${id}/archive`),

  duplicateTraining: (id) => apiClient.post(`/catalog/${id}/duplicate`),

  exportCatalog: (format) => apiClient.get(`/catalog/export/${format}`),

  importCatalog: (file) => {
    const formData = new FormData()
    formData.append("file", file)
    return apiClient.post("/catalog/import", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },
}
