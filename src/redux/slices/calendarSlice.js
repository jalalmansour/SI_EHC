import { createSlice } from "@reduxjs/toolkit"
import moment from "moment"

const initialState = {
  events: [],
  selectedDate: moment().format("YYYY-MM-DD"),
  viewMode: "month", // month, week, day
  loading: false,
  error: null,
  filters: {
    status: "all",
    category: "all",
    trainer: "all",
  },
}

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload
    },
    addEvent: (state, action) => {
      state.events.push(action.payload)
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id)
      if (index !== -1) {
        state.events[index] = { ...state.events[index], ...action.payload }
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((event) => event.id !== action.payload)
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
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
  setEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  setSelectedDate,
  setViewMode,
  setFilters,
  setLoading,
  setError,
  clearError,
} = calendarSlice.actions

export default calendarSlice.reducer
