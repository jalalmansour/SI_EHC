import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import devisService from '../../services/devisService.js'

export const submitDevisRequest = createAsyncThunk(
  'devis/submitDevisRequest',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await devisService.submitDevisRequest(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Unknown error' })
    }
  }
)

export const fetchDevisSummary = createAsyncThunk(
  'devis/fetchDevisSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await devisService.getDevisSummary()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Unknown error' })
    }
  }
)

const initialState = {
  submitting: false,
  submitError: null,
  lastSubmission: null,
  summaryLoading: false,
  summaryError: null,
  summary: {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    recent: [],
  },
}

const devisSlice = createSlice({
  name: 'devis',
  initialState,
  reducers: {
    resetDevisState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitDevisRequest.pending, (state) => {
        state.submitting = true
        state.submitError = null
      })
      .addCase(submitDevisRequest.fulfilled, (state, action) => {
        state.submitting = false
        state.lastSubmission = action.payload
      })
      .addCase(submitDevisRequest.rejected, (state, action) => {
        state.submitting = false
        state.submitError = action.payload?.message || 'Failed to submit request'
      })
      .addCase(fetchDevisSummary.pending, (state) => {
        state.summaryLoading = true
        state.summaryError = null
      })
      .addCase(fetchDevisSummary.fulfilled, (state, action) => {
        state.summaryLoading = false
        state.summary = action.payload
      })
      .addCase(fetchDevisSummary.rejected, (state, action) => {
        state.summaryLoading = false
        state.summaryError = action.payload?.message || 'Failed to load summary'
      })
  },
})

export const { resetDevisState } = devisSlice.actions

export default devisSlice.reducer


