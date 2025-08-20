import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { reportService } from '../../services/reportService.js'

export const fetchReports = createAsyncThunk(
  'report/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await reportService.getReports()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reports')
    }
  }
)

const initialState = {
  reports: [],
  analytics: {},
  loading: false,
  error: null,
}

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false
        state.reports = action.payload.reports || []
        state.analytics = action.payload.analytics || {}
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = reportSlice.actions

export const selectReports = (state) => state.report.reports
export const selectAnalytics = (state) => state.report.analytics
export const selectReportLoading = (state) => state.report.loading
export const selectReportError = (state) => state.report.error

export default reportSlice.reducer
