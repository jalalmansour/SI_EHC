import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { evaluationService } from '../../services/evaluationService.js'

export const fetchEvaluations = createAsyncThunk(
  'evaluation/fetchEvaluations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await evaluationService.getEvaluations()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch evaluations')
    }
  }
)

const initialState = {
  evaluations: [],
  loading: false,
  error: null,
}

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvaluations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvaluations.fulfilled, (state, action) => {
        state.loading = false
        state.evaluations = action.payload.evaluations || []
      })
      .addCase(fetchEvaluations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = evaluationSlice.actions

export const selectEvaluations = (state) => state.evaluation.evaluations
export const selectEvaluationLoading = (state) => state.evaluation.loading
export const selectEvaluationError = (state) => state.evaluation.error

export default evaluationSlice.reducer
