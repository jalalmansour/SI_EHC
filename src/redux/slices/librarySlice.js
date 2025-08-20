import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { libraryService } from '../../services/libraryService.js'

export const fetchLibrary = createAsyncThunk(
  'library/fetchLibrary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await libraryService.getLibrary()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch library')
    }
  }
)

const initialState = {
  resources: [],
  loading: false,
  error: null,
}

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibrary.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLibrary.fulfilled, (state, action) => {
        state.loading = false
        state.resources = action.payload.resources || []
      })
      .addCase(fetchLibrary.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = librarySlice.actions

export const selectResources = (state) => state.library.resources
export const selectLibraryLoading = (state) => state.library.loading
export const selectLibraryError = (state) => state.library.error

export default librarySlice.reducer
