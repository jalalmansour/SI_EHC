import { configureStore, ReturnType } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import budgetSlice from "./slices/budgetSlice"
import catalogSlice from "./slices/catalogSlice"
import participantSlice from "./slices/participantSlice"
import evaluationSlice from "./slices/evaluationSlice"
import calendarSlice from "./slices/calendarSlice"
import competencySlice from "./slices/competencySlice"
import organizationSlice from "./slices/organizationSlice"
import uiSlice from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    budget: budgetSlice,
    catalog: catalogSlice,
    participants: participantSlice,
    evaluations: evaluationSlice,
    calendar: calendarSlice,
    competencies: competencySlice,
    organization: organizationSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
