import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  sidebarCollapsed: false,
  theme: "light",
  language: "fr",
  notifications: [],
  loading: {
    global: false,
    budget: false,
    catalog: false,
    participants: false,
    evaluations: false,
  },
  modals: {
    budgetModal: false,
    catalogModal: false,
    participantModal: false,
    evaluationModal: false,
  },
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now().toString(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      })
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter((notif) => notif.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    setLoading: (state, action) => {
      const { key, value } = action.payload
      state.loading[key] = value
    },
    setModal: (state, action) => {
      const { modal, open } = action.payload
      state.modals[modal] = open
    },
  },
})

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
  setLanguage,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  setModal,
} = uiSlice.actions

export default uiSlice.reducer
