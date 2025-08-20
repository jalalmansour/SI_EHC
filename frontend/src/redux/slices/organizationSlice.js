import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { organizationService } from '../../services/organizationService.js'

export const fetchOrganizations = createAsyncThunk(
  'organization/fetchOrganizations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await organizationService.getOrganizations()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch organizations')
    }
  }
)

export const fetchUsers = createAsyncThunk(
  'organization/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await organizationService.getUsers()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users')
    }
  }
)

const initialState = {
  organizations: [],
  users: [],
  departments: [],
  loading: false,
  error: null,
}

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false
        state.organizations = action.payload.organizations || []
        state.departments = action.payload.departments || []
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users || []
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = organizationSlice.actions

export const selectOrganizations = (state) => state.organization.organizations
export const selectUsers = (state) => state.organization.users
export const selectDepartments = (state) => state.organization.departments
export const selectOrganizationLoading = (state) => state.organization.loading
export const selectOrganizationError = (state) => state.organization.error

export default organizationSlice.reducer
