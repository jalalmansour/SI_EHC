import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { certificationService } from '../../services/certificationService.js'

export const fetchCertifications = createAsyncThunk(
  'certification/fetchCertifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await certificationService.getCertifications()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch certifications')
    }
  }
)

const initialState = {
  certifications: [],
  loading: false,
  error: null,
}

const certificationSlice = createSlice({
  name: 'certification',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertifications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCertifications.fulfilled, (state, action) => {
        state.loading = false
        state.certifications = action.payload.certifications || []
      })
      .addCase(fetchCertifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = certificationSlice.actions

export const selectCertifications = (state) => state.certification.certifications
export const selectCertificationLoading = (state) => state.certification.loading
export const selectCertificationError = (state) => state.certification.error

export default certificationSlice.reducer
