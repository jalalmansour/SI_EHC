import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  competencies: [],
  competencyProfiles: [],
  skillsMatrix: [],
  loading: false,
  error: null,
  statistics: {
    totalCompetencies: 0,
    averageLevel: 0,
    skillsGap: 0,
    improvementRate: 0,
  },
}

const competencySlice = createSlice({
  name: "competencies",
  initialState,
  reducers: {
    setCompetencies: (state, action) => {
      state.competencies = action.payload
      state.statistics.totalCompetencies = action.payload.length
    },
    setCompetencyProfiles: (state, action) => {
      state.competencyProfiles = action.payload

      // Calculate average level
      const allCompetencies = action.payload.flatMap((profile) => profile.competencies || [])
      if (allCompetencies.length > 0) {
        state.statistics.averageLevel =
          allCompetencies.reduce((sum, comp) => sum + comp.currentLevel, 0) / allCompetencies.length

        // Calculate skills gap
        const gaps = allCompetencies.map((comp) => comp.targetLevel - comp.currentLevel)
        state.statistics.skillsGap = gaps.reduce((sum, gap) => sum + Math.max(0, gap), 0) / gaps.length
      }
    },
    updateCompetencyProfile: (state, action) => {
      const { userId, competencies } = action.payload
      const profileIndex = state.competencyProfiles.findIndex((profile) => profile.userId === userId)

      if (profileIndex !== -1) {
        state.competencyProfiles[profileIndex].competencies = competencies
        state.competencyProfiles[profileIndex].lastUpdated = new Date().toISOString()
      } else {
        state.competencyProfiles.push({
          userId,
          competencies,
          lastUpdated: new Date().toISOString(),
        })
      }
    },
    addCompetencyFromEvaluation: (state, action) => {
      const { userId, competencyName, level, evaluationType, trainingId } = action.payload
      const profileIndex = state.competencyProfiles.findIndex((profile) => profile.userId === userId)

      if (profileIndex !== -1) {
        const profile = state.competencyProfiles[profileIndex]
        const competencyIndex = profile.competencies.findIndex((comp) => comp.name === competencyName)

        if (competencyIndex !== -1) {
          // Update existing competency
          profile.competencies[competencyIndex] = {
            ...profile.competencies[competencyIndex],
            currentLevel: level,
            lastEvaluation: new Date().toISOString(),
            evaluationType,
            trainingId,
          }
        } else {
          // Add new competency
          profile.competencies.push({
            id: Date.now().toString(),
            name: competencyName,
            currentLevel: level,
            targetLevel: Math.max(level, 3), // Default target
            lastEvaluation: new Date().toISOString(),
            evaluationType,
            trainingId,
          })
        }
        profile.lastUpdated = new Date().toISOString()
      }
    },
    setSkillsMatrix: (state, action) => {
      state.skillsMatrix = action.payload
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
  setCompetencies,
  setCompetencyProfiles,
  updateCompetencyProfile,
  addCompetencyFromEvaluation,
  setSkillsMatrix,
  setLoading,
  setError,
  clearError,
} = competencySlice.actions

export default competencySlice.reducer
