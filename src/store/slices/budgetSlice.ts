import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Budget, BudgetForm, BudgetAlert } from "../../types"
import { budgetAPI } from "../../services/api"

interface BudgetState {
  budgets: Budget[]
  currentBudget: Budget | null
  alerts: BudgetAlert[]
  isLoading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const initialState: BudgetState = {
  budgets: [],
  currentBudget: null,
  alerts: [],
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
}

// Async thunks
export const fetchBudgets = createAsyncThunk(
  "budget/fetchBudgets",
  async (params: { page?: number; limit?: number; organizationId?: string }, { rejectWithValue }) => {
    try {
      const response = await budgetAPI.getBudgets(params)
      if (response.success) {
        return response.data
      }
      return rejectWithValue(response.message || "Failed to fetch budgets")
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error")
    }
  },
)

export const createBudget = createAsyncThunk(
  "budget/createBudget",
  async (budgetData: BudgetForm, { rejectWithValue }) => {
    try {
      const response = await budgetAPI.createBudget(budgetData)
      if (response.success) {
        return response.data
      }
      return rejectWithValue(response.message || "Failed to create budget")
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error")
    }
  },
)

export const updateBudget = createAsyncThunk(
  "budget/updateBudget",
  async ({ id, data }: { id: string; data: Partial<BudgetForm> }, { rejectWithValue }) => {
    try {
      const response = await budgetAPI.updateBudget(id, data)
      if (response.success) {
        return response.data
      }
      return rejectWithValue(response.message || "Failed to update budget")
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error")
    }
  },
)

export const fetchBudgetAlerts = createAsyncThunk(
  "budget/fetchBudgetAlerts",
  async (organizationId: string, { rejectWithValue }) => {
    try {
      const response = await budgetAPI.getBudgetAlerts(organizationId)
      if (response.success) {
        return response.data
      }
      return rejectWithValue(response.message || "Failed to fetch alerts")
    } catch (error: any) {
      return rejectWithValue(error.message || "Network error")
    }
  },
)

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentBudget: (state, action: PayloadAction<Budget | null>) => {
      state.currentBudget = action.payload
    },
    updateBudgetUsage: (state, action: PayloadAction<{ budgetId: string; amount: number }>) => {
      const budget = state.budgets.find((b) => b.id === action.payload.budgetId)
      if (budget) {
        budget.usedAmount += action.payload.amount
        budget.remainingAmount = budget.totalAmount - budget.usedAmount
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch budgets
      .addCase(fetchBudgets.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.isLoading = false
        state.budgets = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Create budget
      .addCase(createBudget.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.isLoading = false
        state.budgets.unshift(action.payload)
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Update budget
      .addCase(updateBudget.fulfilled, (state, action) => {
        const index = state.budgets.findIndex((b) => b.id === action.payload.id)
        if (index !== -1) {
          state.budgets[index] = action.payload
        }
        if (state.currentBudget?.id === action.payload.id) {
          state.currentBudget = action.payload
        }
      })
      // Fetch alerts
      .addCase(fetchBudgetAlerts.fulfilled, (state, action) => {
        state.alerts = action.payload
      })
  },
})

export const { clearError, setCurrentBudget, updateBudgetUsage } = budgetSlice.actions
export default budgetSlice.reducer
