import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import organizationReducer from './slices/organizationSlice.js'
import budgetReducer from './slices/budgetSlice.js'
import trainingReducer from './slices/trainingSlice.js'
import planningReducer from './slices/planningSlice.js'
import participantReducer from './slices/participantSlice.js'
import evaluationReducer from './slices/evaluationSlice.js'
import libraryReducer from './slices/librarySlice.js'
import certificationReducer from './slices/certificationSlice.js'
import reportReducer from './slices/reportSlice.js'
import uiReducer from './slices/uiSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
    budget: budgetReducer,
    training: trainingReducer,
    planning: planningReducer,
    participant: participantReducer,
    evaluation: evaluationReducer,
    library: libraryReducer,
    certification: certificationReducer,
    report: reportReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export default store
