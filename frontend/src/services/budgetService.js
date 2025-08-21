import {axiosPrivate} from "./axios.js";

export const budgetService = {
  // Get budgets
  getBudgets: async () => {
      return await axiosPrivate().get('/budgets')
  },
}

export default budgetService
