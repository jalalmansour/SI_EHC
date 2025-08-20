import api from './api.js'

export const budgetService = {
  // Get budgets
  getBudgets: async () => {
    const response = await api.get('/budgets')
    return response
  },
}

export default budgetService
