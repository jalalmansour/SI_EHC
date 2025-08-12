import { createAsyncThunk } from "@reduxjs/toolkit"
import { authService } from "../../services/authService"

export const loginThunk = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.login(credentials)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Erreur de connexion")
  }
})

export const logoutThunk = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await authService.logout()
    return null
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Erreur de déconnexion")
  }
})

export const getCurrentUserThunk = createAsyncThunk("auth/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.getCurrentUser()
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Erreur lors de la récupération de l'utilisateur")
  }
})
