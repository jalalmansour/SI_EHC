import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Mock API calls
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data based on email
    const mockUsers = {
      "rrh@ingenia.com": {
        id: "1",
        email: "rrh@ingenia.com",
        firstName: "Marie",
        lastName: "Dubois",
        role: "RRH",
        position: "Responsable RH",
        department: "Ressources Humaines",
        avatar: null,
        permissions: ["all"],
        company: "INGÉNIA Corp",
        phone: "+33 1 23 45 67 89",
        address: "123 Rue de la Formation, 75001 Paris",
        bio: "Responsable RH avec 10 ans d'expérience en gestion de formation.",
        preferences: {
          language: "fr",
          timezone: "Europe/Paris",
          theme: "light",
          notifications: {
            email: true,
            push: true,
            sms: false,
          },
        },
      },
      "rf@ingenia.com": {
        id: "2",
        email: "rf@ingenia.com",
        firstName: "Pierre",
        lastName: "Martin",
        role: "RF",
        position: "Responsable Formation",
        department: "Formation",
        avatar: null,
        permissions: ["planning", "catalog", "evaluations"],
        company: "INGÉNIA Corp",
        phone: "+33 1 23 45 67 90",
        address: "123 Rue de la Formation, 75001 Paris",
        bio: "Responsable Formation spécialisé en planification et évaluation.",
        preferences: {
          language: "fr",
          timezone: "Europe/Paris",
          theme: "light",
          notifications: {
            email: true,
            push: true,
            sms: true,
          },
        },
      },
      "manager@ingenia.com": {
        id: "3",
        email: "manager@ingenia.com",
        firstName: "Sophie",
        lastName: "Laurent",
        role: "MANAGER",
        position: "Chef d'équipe IT",
        department: "Informatique",
        avatar: null,
        permissions: ["team_management", "validations"],
        company: "INGÉNIA Corp",
        phone: "+33 1 23 45 67 91",
        address: "123 Rue de la Formation, 75001 Paris",
        bio: "Manager IT avec une équipe de 12 développeurs.",
        preferences: {
          language: "fr",
          timezone: "Europe/Paris",
          theme: "dark",
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
        },
      },
      "employee@ingenia.com": {
        id: "4",
        email: "employee@ingenia.com",
        firstName: "Jean",
        lastName: "Dupont",
        role: "EMPLOYEE",
        position: "Développeur Senior",
        department: "Informatique",
        avatar: null,
        permissions: ["self_training"],
        company: "INGÉNIA Corp",
        phone: "+33 1 23 45 67 92",
        address: "123 Rue de la Formation, 75001 Paris",
        bio: "Développeur passionné par les nouvelles technologies.",
        preferences: {
          language: "fr",
          timezone: "Europe/Paris",
          theme: "auto",
          notifications: {
            email: true,
            push: true,
            sms: false,
          },
        },
      },
    }

    const user = mockUsers[email]
    if (!user || password !== "password123") {
      throw new Error("Identifiants invalides")
    }

    localStorage.setItem("token", "mock-jwt-token")
    return { user, token: "mock-jwt-token", permissions: user.permissions }
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (currentPassword !== "password123") {
        throw new Error("Mot de passe actuel incorrect")
      }
      return { message: "Mot de passe modifié avec succès" }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
  permissions: [],
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.permissions = action.payload.permissions || []
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("user", JSON.stringify(action.payload.user))
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      state.permissions = []
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
    setProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem("user", JSON.stringify(state.user))
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.permissions = action.payload.permissions || []
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, setProfile, setPermissions } = authSlice.actions

export default authSlice.reducer
