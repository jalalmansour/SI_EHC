import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  participants: [],
  registrations: [],
  trainingSessions: [],
  loading: false,
  error: null,
  statistics: {
    totalParticipants: 0,
    activeRegistrations: 0,
    pendingApprovals: 0,
    confirmedParticipants: 0,
    completionRate: 0,
  },
}

const participantSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    setParticipants: (state, action) => {
      state.participants = action.payload
      state.statistics.totalParticipants = action.payload.length
    },
    setRegistrations: (state, action) => {
      state.registrations = action.payload
      state.statistics.activeRegistrations = action.payload.length
      state.statistics.pendingApprovals = action.payload.filter(
        (reg) => reg.status === "INVITED" || reg.status === "REGISTERED",
      ).length
      state.statistics.confirmedParticipants = action.payload.filter((reg) => reg.status === "CONFIRMED").length
    },
    addRegistration: (state, action) => {
      state.registrations.push(action.payload)
      state.statistics.activeRegistrations += 1
      if (action.payload.status === "INVITED" || action.payload.status === "REGISTERED") {
        state.statistics.pendingApprovals += 1
      }
    },
    updateRegistration: (state, action) => {
      const index = state.registrations.findIndex((reg) => reg.id === action.payload.id)
      if (index !== -1) {
        const oldReg = state.registrations[index]
        state.registrations[index] = { ...oldReg, ...action.payload }

        // Update statistics
        if (oldReg.status !== action.payload.status) {
          if (oldReg.status === "INVITED" || oldReg.status === "REGISTERED") {
            state.statistics.pendingApprovals -= 1
          }
          if (action.payload.status === "CONFIRMED") {
            state.statistics.confirmedParticipants += 1
          }
        }
      }
    },
    setTrainingSessions: (state, action) => {
      state.trainingSessions = action.payload
    },
    addTrainingSession: (state, action) => {
      state.trainingSessions.push(action.payload)
    },
    updateTrainingSession: (state, action) => {
      const index = state.trainingSessions.findIndex((session) => session.id === action.payload.id)
      if (index !== -1) {
        state.trainingSessions[index] = { ...state.trainingSessions[index], ...action.payload }
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setParticipants,
  setRegistrations,
  addRegistration,
  updateRegistration,
  setTrainingSessions,
  addTrainingSession,
  updateTrainingSession,
  setLoading,
  setError,
  clearError,
} = participantSlice.actions

export default participantSlice.reducer
