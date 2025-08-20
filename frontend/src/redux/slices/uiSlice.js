import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarCollapsed: false,
  theme: 'light',
  notifications: [],
  modals: {
    login: false,
    register: false,
    confirmDelete: false,
  },
}

const uiSlice = createSlice({
  name: 'ui',
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
    addNotification: (state, action) => {
      state.notifications.push(action.payload)
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    openModal: (state, action) => {
      state.modals[action.payload] = true
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false
    },
  },
})

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
} = uiSlice.actions

export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed
export const selectTheme = (state) => state.ui.theme
export const selectNotifications = (state) => state.ui.notifications
export const selectModals = (state) => state.ui.modals

export default uiSlice.reducer
