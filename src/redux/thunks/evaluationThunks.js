import { createAsyncThunk } from "@reduxjs/toolkit"
import { evaluationAPI } from "../../services/api"
import { setEvaluations, addEvaluation, updateEvaluation, setLoading, setError } from "../slices/evaluationSlice"
import { addCompetencyFromEvaluation } from "../slices/competencySlice"

export const fetchEvaluations = createAsyncThunk(
  "evaluations/fetchEvaluations",
  async (filters = {}, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await evaluationAPI.getAll(filters)
      dispatch(setEvaluations(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const createEvaluation = createAsyncThunk(
  "evaluations/createEvaluation",
  async (evaluationData, { dispatch, rejectWithValue }) => {
    try {
      const response = await evaluationAPI.create(evaluationData)
      dispatch(addEvaluation(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)

export const submitEvaluation = createAsyncThunk(
  "evaluations/submitEvaluation",
  async ({ evaluationId, answers }, { dispatch, rejectWithValue }) => {
    try {
      const response = await evaluationAPI.submit(evaluationId, answers)
      dispatch(updateEvaluation(response.data))

      // Update competencies based on evaluation results
      if (response.data.type === "HOT" || response.data.type === "COLD") {
        const competencyUpdates = response.data.competencyUpdates || []
        competencyUpdates.forEach((update) => {
          dispatch(
            addCompetencyFromEvaluation({
              userId: response.data.participantId,
              competencyName: update.competencyName,
              level: update.level,
              evaluationType: response.data.type.toLowerCase(),
              trainingId: response.data.trainingId,
            }),
          )
        })
      }

      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)

export const scheduleEvaluation = createAsyncThunk(
  "evaluations/scheduleEvaluation",
  async ({ participantId, trainingId, type, scheduledDate }, { dispatch, rejectWithValue }) => {
    try {
      const response = await evaluationAPI.schedule({
        participantId,
        trainingId,
        type,
        scheduledDate,
      })
      dispatch(addEvaluation(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)
