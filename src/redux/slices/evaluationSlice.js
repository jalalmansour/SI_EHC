import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  evaluations: [],
  evaluationTemplates: [],
  competencyUpdates: [],
  loading: false,
  error: null,
  statistics: {
    totalEvaluations: 0,
    preliminaryEvaluations: 0,
    hotEvaluations: 0,
    coldEvaluations: 0,
    completedEvaluations: 0,
    averageScore: 0,
  },
}

const evaluationSlice = createSlice({
  name: "evaluations",
  initialState,
  reducers: {
    setEvaluations: (state, action) => {
      state.evaluations = action.payload
      state.statistics.totalEvaluations = action.payload.length
      state.statistics.preliminaryEvaluations = action.payload.filter((e) => e.type === "PRELIMINARY").length
      state.statistics.hotEvaluations = action.payload.filter((e) => e.type === "HOT").length
      state.statistics.coldEvaluations = action.payload.filter((e) => e.type === "COLD").length
      state.statistics.completedEvaluations = action.payload.filter((e) => e.status === "COMPLETED").length

      const completedWithScores = action.payload.filter((e) => e.status === "COMPLETED" && e.score)
      state.statistics.averageScore =
        completedWithScores.length > 0
          ? completedWithScores.reduce((sum, e) => sum + e.score, 0) / completedWithScores.length
          : 0
    },
    addEvaluation: (state, action) => {
      state.evaluations.push(action.payload)
      state.statistics.totalEvaluations += 1
      if (action.payload.type === "PRELIMINARY") {
        state.statistics.preliminaryEvaluations += 1
      } else if (action.payload.type === "HOT") {
        state.statistics.hotEvaluations += 1
      } else if (action.payload.type === "COLD") {
        state.statistics.coldEvaluations += 1
      }
    },
    updateEvaluation: (state, action) => {
      const index = state.evaluations.findIndex((e) => e.id === action.payload.id)
      if (index !== -1) {
        const oldEval = state.evaluations[index]
        state.evaluations[index] = { ...oldEval, ...action.payload }

        if (oldEval.status !== "COMPLETED" && action.payload.status === "COMPLETED") {
          state.statistics.completedEvaluations += 1
        }
      }
    },
    setEvaluationTemplates: (state, action) => {
      state.evaluationTemplates = action.payload
    },
    addCompetencyUpdate: (state, action) => {
      state.competencyUpdates.push(action.payload)
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
  setEvaluations,
  addEvaluation,
  updateEvaluation,
  setEvaluationTemplates,
  addCompetencyUpdate,
  setLoading,
  setError,
  clearError,
} = evaluationSlice.actions

export default evaluationSlice.reducer
