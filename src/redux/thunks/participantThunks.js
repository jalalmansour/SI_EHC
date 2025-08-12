import { createAsyncThunk } from "@reduxjs/toolkit"
import { participantAPI } from "../../services/api"
import {
  setParticipants,
  setRegistrations,
  addRegistration,
  updateRegistration,
  setLoading,
  setError,
} from "../slices/participantSlice"

export const fetchParticipants = createAsyncThunk(
  "participants/fetchParticipants",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await participantAPI.getAll()
      dispatch(setParticipants(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const fetchRegistrations = createAsyncThunk(
  "participants/fetchRegistrations",
  async (filters = {}, { dispatch, rejectWithValue }) => {
    try {
      const response = await participantAPI.getRegistrations(filters)
      dispatch(setRegistrations(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)

export const inviteParticipants = createAsyncThunk(
  "participants/inviteParticipants",
  async ({ sessionId, participantIds }, { dispatch, rejectWithValue }) => {
    try {
      const response = await participantAPI.invite(sessionId, participantIds)
      response.data.forEach((registration) => {
        dispatch(addRegistration(registration))
      })
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)

export const approveRegistration = createAsyncThunk(
  "participants/approveRegistration",
  async ({ registrationId, approvalType }, { dispatch, rejectWithValue }) => {
    try {
      const response = await participantAPI.approve(registrationId, approvalType)
      dispatch(updateRegistration(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)

export const rejectRegistration = createAsyncThunk(
  "participants/rejectRegistration",
  async ({ registrationId, reason }, { dispatch, rejectWithValue }) => {
    try {
      const response = await participantAPI.reject(registrationId, reason)
      dispatch(updateRegistration(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)
