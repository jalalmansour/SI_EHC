import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import organizationSlice from "./slices/organizationSlice"
import budgetSlice from "./slices/budgetSlice"
import catalogSlice from "./slices/catalogSlice"
import calendarSlice from "./slices/calendarSlice"
import participantSlice from "./slices/participantSlice"
import reportSlice from "./slices/reportSlice"
import uiSlice from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    organization: organizationSlice,
    budget: budgetSlice,
    catalog: catalogSlice,
    calendar: calendarSlice,
    participants: participantSlice,
    reports: reportSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
