import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  budgets: [],
  currentBudget: null,
  loading: false,
  error: null,
  alerts: [],
  statistics: {
    totalBudgets: 0,
    activeBudgets: 0,
    totalAmount: 0,
    consumedAmount: 0,
    alertsCount: 0,
  },
}

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgets: (state, action) => {
      state.budgets = action.payload
      state.statistics.totalBudgets = action.payload.length
      state.statistics.activeBudgets = action.payload.filter((b) => b.status === "ACTIVE").length
    },
    addBudget: (state, action) => {
      state.budgets.push(action.payload)
      state.statistics.totalBudgets += 1
      if (action.payload.status === "ACTIVE") {
        state.statistics.activeBudgets += 1
      }
    },
    updateBudget: (state, action) => {
      const index = state.budgets.findIndex((b) => b.id === action.payload.id)
      if (index !== -1) {
        state.budgets[index] = { ...state.budgets[index], ...action.payload }
      }
    },
    addBudgetExtension: (state, action) => {
      const { budgetId, extension } = action.payload
      const budget = state.budgets.find((b) => b.id === budgetId)
      if (budget) {
        budget.extensions = budget.extensions || []
        budget.extensions.push(extension)
        budget.currentAmount =
          budget.initialAmount +
          budget.extensions.reduce((sum, ext) => sum + ext.amount, 0) -
          (budget.cuts || []).reduce((sum, cut) => sum + cut.amount, 0)
      }
    },
    addBudgetCut: (state, action) => {
      const { budgetId, cut } = action.payload
      const budget = state.budgets.find((b) => b.id === budgetId)
      if (budget) {
        budget.cuts = budget.cuts || []
        budget.cuts.push(cut)
        budget.currentAmount =
          budget.initialAmount +
          (budget.extensions || []).reduce((sum, ext) => sum + ext.amount, 0) -
          budget.cuts.reduce((sum, c) => sum + c.amount, 0)
      }
    },
    setBudgetAlerts: (state, action) => {
      state.alerts = action.payload
      state.statistics.alertsCount = action.payload.length
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setBudgets,
  addBudget,
  updateBudget,
  addBudgetExtension,
  addBudgetCut,
  setBudgetAlerts,
  setLoading,
  setError,
  clearError,
} = budgetSlice.actions

export default budgetSlice.reducer
