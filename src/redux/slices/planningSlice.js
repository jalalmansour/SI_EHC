import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { planningService } from '../../services/planningService.js'

export const fetchPlanning = createAsyncThunk(
  'planning/fetchPlanning',
  async (_, { rejectWithValue }) => {
    try {
      const response = await planningService.getPlanning()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch planning')
    }
  }
)

const initialState = {
  planning: [],
  loading: false,
  error: null,
}

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanning.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPlanning.fulfilled, (state, action) => {
        state.loading = false
        state.planning = action.payload.planning || []
      })
      .addCase(fetchPlanning.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = planningSlice.actions

export const selectPlanning = (state) => state.planning.planning
export const selectPlanningLoading = (state) => state.planning.loading
export const selectPlanningError = (state) => state.planning.error

export default planningSlice.reducer
