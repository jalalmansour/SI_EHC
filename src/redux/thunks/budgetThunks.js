import { createAsyncThunk } from "@reduxjs/toolkit"
import { budgetAPI } from "../../services/api"
import {
  setBudgets,
  addBudget,
  updateBudget,
  setLoading,
  setError,
  addBudgetExtension,
  addBudgetCut,
} from "../slices/budgetSlice"

export const fetchBudgets = createAsyncThunk("budget/fetchBudgets", async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true))
    const response = await budgetAPI.getAll()
    dispatch(setBudgets(response.data))
    return response.data
  } catch (error) {
    dispatch(setError(error.message))
    return rejectWithValue(error.message)
  } finally {
    dispatch(setLoading(false))
  }
})

export const createBudget = createAsyncThunk(
  "budget/createBudget",
  async (budgetData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await budgetAPI.create(budgetData)
      dispatch(addBudget(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const updateBudgetThunk = createAsyncThunk(
  "budget/updateBudget",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await budgetAPI.update(id, data)
      dispatch(updateBudget(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const addBudgetExtensionThunk = createAsyncThunk(
  "budget/addExtension",
  async ({ budgetId, extension }, { dispatch, rejectWithValue }) => {
    try {
      const response = await budgetAPI.addExtension(budgetId, extension)
      dispatch(addBudgetExtension({ budgetId, extension: response.data }))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)

export const addBudgetCutThunk = createAsyncThunk(
  "budget/addCut",
  async ({ budgetId, cut }, { dispatch, rejectWithValue }) => {
    try {
      const response = await budgetAPI.addCut(budgetId, cut)
      dispatch(addBudgetCut({ budgetId, cut: response.data }))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)
