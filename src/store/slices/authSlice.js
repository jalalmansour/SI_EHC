import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authService } from "../../services/authService"
import { message } from "antd"

// Actions asynchrones existantes
export const loginThunk = createAsyncThunk("auth/login", async ({ email, password, totpCode }, { rejectWithValue }) => {
  try {
    const response = await authService.login({ email, password, totpCode })
    if (response.success) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      return response.data
    }
    return rejectWithValue(response.message)
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Erreur de connexion")
  }
})

// Nouvelles actions pour l'authentification biométrique
export const biometricLoginThunk = createAsyncThunk("auth/biometricLogin", async (_, { rejectWithValue }) => {
  try {
    // Vérifier si l'API WebAuthn est disponible
    if (!window.PublicKeyCredential) {
      return rejectWithValue("Authentification biométrique non supportée")
    }

    // Simuler l'authentification biométrique
    const response = await authService.biometricLogin()
    if (response.success) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      return response.data
    }
    return rejectWithValue(response.message)
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Échec authentification biométrique")
  }
})

// Actions pour la récupération de mot de passe
export const requestPasswordResetThunk = createAsyncThunk(
  "auth/requestPasswordReset",
  async ({ email, method }, { rejectWithValue }) => {
    try {
      const response = await authService.requestPasswordReset({ email, method })
      if (response.success) {
        message.success("Code de vérification envoyé avec succès")
        return response.data
      }
      return rejectWithValue(response.message)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors de l'envoi du code")
    }
  },
)

export const verifyResetCodeThunk = createAsyncThunk(
  "auth/verifyResetCode",
  async ({ email, code, method }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyResetCode({ email, code, method })
      if (response.success) {
        message.success("Code vérifié avec succès")
        return response.data
      }
      return rejectWithValue(response.message)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Code de vérification invalide")
    }
  },
)

export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async ({ resetToken, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword({ resetToken, newPassword, confirmPassword })
      if (response.success) {
        message.success("Mot de passe réinitialisé avec succès")
        return response.data
      }
      return rejectWithValue(response.message)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors de la réinitialisation")
    }
  },
)

// Actions pour la protection contre les attaques
export const reportSuspiciousActivityThunk = createAsyncThunk(
  "auth/reportSuspiciousActivity",
  async (activityData, { rejectWithValue }) => {
    try {
      const response = await authService.reportSuspiciousActivity(activityData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors du signalement")
    }
  },
)

export const getSecurityDashboardThunk = createAsyncThunk(
  "auth/getSecurityDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getSecurityDashboard()
      if (response.success) {
        return response.data
      }
      return rejectWithValue(response.message)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors du chargement du dashboard")
    }
  },
)

export const getComplianceReportThunk = createAsyncThunk(
  "auth/getComplianceReport",
  async ({ startDate, endDate, type }, { rejectWithValue }) => {
    try {
      const response = await authService.getComplianceReport({ startDate, endDate, type })
      if (response.success) {
        return response.data
      }
      return rejectWithValue(response.message)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors de la génération du rapport")
    }
  },
)

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: false,
  isLoading: false,
  error: null,
  twoFactorRequired: false,
  twoFactorSetup: {
    qrCode: null,
    secret: null,
    isEnabled: false,
    isLoading: false,
  },
  permissions: [],
  sessionExpiry: null,

  // Protection contre les attaques
  loginAttempts: 0,
  accountLocked: false,
  lockoutExpiry: null,
  maxLoginAttempts: 5,
  lockoutDuration: 30 * 60 * 1000, // 30 minutes

  // Authentification biométrique
  biometricEnabled: false,
  biometricType: null, // 'fingerprint', 'face', 'voice'

  // Récupération de mot de passe
  passwordResetStep: 0,
  resetToken: null,

  // Dashboard sécurité
  securityDashboard: {
    loginHistory: [],
    activeDevices: [],
    securityAlerts: [],
    complianceStatus: null,
    riskScore: 0,
  },

  // Rapports de conformité
  complianceReports: [],
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    resetAuth: (state) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.twoFactorRequired = false
      state.permissions = []
      state.sessionExpiry = null
      state.loginAttempts = 0
      state.accountLocked = false
      state.lockoutExpiry = null
    },
    setTwoFactorRequired: (state, action) => {
      state.twoFactorRequired = action.payload
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },

    // Gestion des tentatives de connexion
    incrementLoginAttempts: (state) => {
      state.loginAttempts += 1
      if (state.loginAttempts >= state.maxLoginAttempts) {
        state.accountLocked = true
        state.lockoutExpiry = Date.now() + state.lockoutDuration
      }
    },

    resetLoginAttempts: (state) => {
      state.loginAttempts = 0
      state.accountLocked = false
      state.lockoutExpiry = null
    },

    checkLockoutStatus: (state) => {
      if (state.accountLocked && state.lockoutExpiry && Date.now() > state.lockoutExpiry) {
        state.accountLocked = false
        state.lockoutExpiry = null
        state.loginAttempts = 0
      }
    },

    // Authentification biométrique
    setBiometricEnabled: (state, action) => {
      state.biometricEnabled = action.payload.enabled
      state.biometricType = action.payload.type
    },

    // Récupération de mot de passe
    setPasswordResetStep: (state, action) => {
      state.passwordResetStep = action.payload
    },

    setResetToken: (state, action) => {
      state.resetToken = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Login existant
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken
        state.isAuthenticated = true
        state.permissions = action.payload.user.role.permissions || []
        state.sessionExpiry = action.payload.expiresAt
        state.twoFactorRequired = false
        state.error = null
        state.loginAttempts = 0
        state.accountLocked = false
        state.lockoutExpiry = null
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false

        if (action.payload === "2FA_REQUIRED") {
          state.twoFactorRequired = true
        } else {
          state.loginAttempts += 1
          if (state.loginAttempts >= state.maxLoginAttempts) {
            state.accountLocked = true
            state.lockoutExpiry = Date.now() + state.lockoutDuration
          }
        }
      })

      // Authentification biométrique
      .addCase(biometricLoginThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(biometricLoginThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken
        state.isAuthenticated = true
        state.permissions = action.payload.user.role.permissions || []
        state.sessionExpiry = action.payload.expiresAt
        state.loginAttempts = 0
        state.accountLocked = false
        state.lockoutExpiry = null
      })
      .addCase(biometricLoginThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Récupération de mot de passe
      .addCase(requestPasswordResetThunk.fulfilled, (state, action) => {
        state.passwordResetStep = 1
      })
      .addCase(verifyResetCodeThunk.fulfilled, (state, action) => {
        state.passwordResetStep = 2
        state.resetToken = action.payload.resetToken
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.passwordResetStep = 3
        state.resetToken = null
      })

      // Dashboard sécurité
      .addCase(getSecurityDashboardThunk.fulfilled, (state, action) => {
        state.securityDashboard = action.payload
      })

      // Rapports de conformité
      .addCase(getComplianceReportThunk.fulfilled, (state, action) => {
        state.complianceReports = [...state.complianceReports, action.payload]
      })
  },
})

export const {
  clearError,
  resetAuth,
  setTwoFactorRequired,
  updateUserProfile,
  incrementLoginAttempts,
  resetLoginAttempts,
  checkLockoutStatus,
  setBiometricEnabled,
  setPasswordResetStep,
  setResetToken,
} = authSlice.actions

export default authSlice.reducer
