import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  employees: [],
  departments: [],
  orgChart: [],
  loading: false,
  error: null,
  statistics: {
    totalEmployees: 0,
    totalDepartments: 0,
    averageTeamSize: 0,
  },
}

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload
      state.statistics.totalEmployees = action.payload.length
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload)
      state.statistics.totalEmployees += 1
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex((emp) => emp.id === action.payload.id)
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...action.payload }
      }
    },
    setDepartments: (state, action) => {
      state.departments = action.payload
      state.statistics.totalDepartments = action.payload.length

      if (action.payload.length > 0 && state.statistics.totalEmployees > 0) {
        state.statistics.averageTeamSize = Math.round(state.statistics.totalEmployees / action.payload.length)
      }
    },
    setOrgChart: (state, action) => {
      state.orgChart = action.payload
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
  setEmployees,
  addEmployee,
  updateEmployee,
  setDepartments,
  setOrgChart,
  setLoading,
  setError,
  clearError,
} = organizationSlice.actions

export default organizationSlice.reducer
