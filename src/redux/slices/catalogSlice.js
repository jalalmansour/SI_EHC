import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  catalogItems: [],
  categories: [],
  providers: [],
  loading: false,
  error: null,
  filters: {
    type: "all", // all, planned, unplanned
    category: "all",
    status: "all", // all, pending, approved, rejected
    provider: "all",
  },
  statistics: {
    totalItems: 0,
    plannedItems: 0,
    unplannedItems: 0,
    pendingApproval: 0,
    approvedItems: 0,
  },
}

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCatalogItems: (state, action) => {
      state.catalogItems = action.payload
      state.statistics.totalItems = action.payload.length
      state.statistics.plannedItems = action.payload.filter((item) => item.type === "PLANNED").length
      state.statistics.unplannedItems = action.payload.filter((item) => item.type === "UNPLANNED").length
      state.statistics.pendingApproval = action.payload.filter((item) => item.status === "PENDING_APPROVAL").length
      state.statistics.approvedItems = action.payload.filter((item) => item.status === "APPROVED").length
    },
    addCatalogItem: (state, action) => {
      state.catalogItems.push(action.payload)
      state.statistics.totalItems += 1
      if (action.payload.type === "PLANNED") {
        state.statistics.plannedItems += 1
      } else {
        state.statistics.unplannedItems += 1
      }
      if (action.payload.status === "PENDING_APPROVAL") {
        state.statistics.pendingApproval += 1
      }
    },
    updateCatalogItem: (state, action) => {
      const index = state.catalogItems.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        const oldItem = state.catalogItems[index]
        state.catalogItems[index] = { ...oldItem, ...action.payload }

        // Update statistics if status changed
        if (oldItem.status !== action.payload.status) {
          if (oldItem.status === "PENDING_APPROVAL") {
            state.statistics.pendingApproval -= 1
          }
          if (action.payload.status === "APPROVED") {
            state.statistics.approvedItems += 1
          }
        }
      }
    },
    deleteCatalogItem: (state, action) => {
      const item = state.catalogItems.find((item) => item.id === action.payload)
      if (item) {
        state.catalogItems = state.catalogItems.filter((item) => item.id !== action.payload)
        state.statistics.totalItems -= 1
        if (item.type === "PLANNED") {
          state.statistics.plannedItems -= 1
        } else {
          state.statistics.unplannedItems -= 1
        }
        if (item.status === "PENDING_APPROVAL") {
          state.statistics.pendingApproval -= 1
        } else if (item.status === "APPROVED") {
          state.statistics.approvedItems -= 1
        }
      }
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setProviders: (state, action) => {
      state.providers = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
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
  setCatalogItems,
  addCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
  setCategories,
  setProviders,
  setFilters,
  setLoading,
  setError,
  clearError,
} = catalogSlice.actions

export default catalogSlice.reducer
