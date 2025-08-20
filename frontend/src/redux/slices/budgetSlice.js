import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { budgetService } from '../../services/budgetService.js'

export const fetchBudgets = createAsyncThunk(
  'budget/fetchBudgets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await budgetService.getBudgets()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch budgets')
    }
  }
)

const initialState = {
  budgets: [],
  loading: false,
  error: null,
}

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.loading = false
        state.budgets = action.payload.budgets || []
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = budgetSlice.actions

export const selectBudgets = (state) => state.budget.budgets
export const selectBudgetLoading = (state) => state.budget.loading
export const selectBudgetError = (state) => state.budget.error

export default budgetSlice.reducer
