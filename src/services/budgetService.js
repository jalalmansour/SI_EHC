import apiClient from "./apiClient"

export const budgetService = {
  getBudgets: (params) => apiClient.get("/budgets", { params }),

  getBudget: (id) => apiClient.get(`/budgets/${id}`),

  createBudget: (data) => apiClient.post("/budgets", data),

  updateBudget: (id, data) => apiClient.put(`/budgets/${id}`, data),

  deleteBudget: (id) => apiClient.delete(`/budgets/${id}`),

  getBudgetAlerts: (organizationId) => apiClient.get(`/budgets/alerts/${organizationId}`),

  addBudgetExtension: (id, amount, reason) => apiClient.post(`/budgets/${id}/extension`, { amount, reason }),

  cutBudget: (id, amount, reason) => apiClient.post(`/budgets/${id}/cut`, { amount, reason }),

  getBudgetReport: (budgetId, dateRange) => apiClient.get(`/budgets/${budgetId}/report`, { params: dateRange }),
}
