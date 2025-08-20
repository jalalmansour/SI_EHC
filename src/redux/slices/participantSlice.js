import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { participantService } from '../../services/participantService.js'

export const fetchParticipants = createAsyncThunk(
  'participant/fetchParticipants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await participantService.getParticipants()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch participants')
    }
  }
)

const initialState = {
  participants: [],
  loading: false,
  error: null,
}

const participantSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false
        state.participants = action.payload.participants || []
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = participantSlice.actions

export const selectParticipants = (state) => state.participant.participants
export const selectParticipantLoading = (state) => state.participant.loading
export const selectParticipantError = (state) => state.participant.error

export default participantSlice.reducer
