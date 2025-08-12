import { createAsyncThunk } from "@reduxjs/toolkit"
import { catalogAPI } from "../../services/api"
import { setCatalogItems, addCatalogItem, updateCatalogItem, setLoading, setError } from "../slices/catalogSlice"

export const fetchCatalogItems = createAsyncThunk(
  "catalog/fetchItems",
  async (filters = {}, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await catalogAPI.getAll(filters)
      dispatch(setCatalogItems(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const createCatalogItem = createAsyncThunk(
  "catalog/createItem",
  async (itemData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await catalogAPI.create(itemData)
      dispatch(addCatalogItem(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    } finally {
      dispatch(setLoading(false))
    }
  },
)

export const updateCatalogItemThunk = createAsyncThunk(
  "catalog/updateItem",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const response = await catalogAPI.update(id, data)
      dispatch(updateCatalogItem(response.data))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)

export const approveCatalogItem = createAsyncThunk(
  "catalog/approveItem",
  async (itemId, { dispatch, rejectWithValue }) => {
    try {
      const response = await catalogAPI.approve(itemId)
      dispatch(updateCatalogItem({ id: itemId, status: "APPROVED", approvedAt: new Date().toISOString() }))
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)

export const rejectCatalogItem = createAsyncThunk(
  "catalog/rejectItem",
  async ({ itemId, reason }, { dispatch, rejectWithValue }) => {
    try {
      const response = await catalogAPI.reject(itemId, reason)
      dispatch(
        updateCatalogItem({
          id: itemId,
          status: "REJECTED",
          rejectedAt: new Date().toISOString(),
          rejectionReason: reason,
        }),
      )
      return response.data
    } catch (error) {
      dispatch(setError(error.message))
      return rejectWithValue(error.message)
    }
  },
)
