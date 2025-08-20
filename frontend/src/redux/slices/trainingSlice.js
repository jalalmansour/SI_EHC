import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { trainingService } from '../../services/trainingService.js'

// Async thunks
export const fetchTrainingCourses = createAsyncThunk(
  'training/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await trainingService.getCourses()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses')
    }
  }
)

export const fetchTrainingSessions = createAsyncThunk(
  'training/fetchSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await trainingService.getSessions()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sessions')
    }
  }
)

export const createTrainingCourse = createAsyncThunk(
  'training/createCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await trainingService.createCourse(courseData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create course')
    }
  }
)

export const updateTrainingCourse = createAsyncThunk(
  'training/updateCourse',
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const response = await trainingService.updateCourse(id, courseData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update course')
    }
  }
)

export const deleteTrainingCourse = createAsyncThunk(
  'training/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      await trainingService.deleteCourse(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete course')
    }
  }
)

const initialState = {
  courses: [],
  sessions: [],
  categories: [],
  loading: false,
  error: null,
  selectedCourse: null,
  selectedSession: null,
}

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload
    },
    setSelectedSession: (state, action) => {
      state.selectedSession = action.payload
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null
    },
    clearSelectedSession: (state) => {
      state.selectedSession = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchTrainingCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTrainingCourses.fulfilled, (state, action) => {
        state.loading = false
        state.courses = action.payload.courses || []
        state.categories = action.payload.categories || []
      })
      .addCase(fetchTrainingCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch sessions
      .addCase(fetchTrainingSessions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTrainingSessions.fulfilled, (state, action) => {
        state.loading = false
        state.sessions = action.payload.sessions || []
      })
      .addCase(fetchTrainingSessions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create course
      .addCase(createTrainingCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload.course)
      })
      .addCase(createTrainingCourse.rejected, (state, action) => {
        state.error = action.payload
      })
      // Update course
      .addCase(updateTrainingCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(course => course.id === action.payload.course.id)
        if (index !== -1) {
          state.courses[index] = action.payload.course
        }
      })
      .addCase(updateTrainingCourse.rejected, (state, action) => {
        state.error = action.payload
      })
      // Delete course
      .addCase(deleteTrainingCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(course => course.id !== action.payload)
      })
      .addCase(deleteTrainingCourse.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { 
  clearError, 
  setSelectedCourse, 
  setSelectedSession, 
  clearSelectedCourse, 
  clearSelectedSession 
} = trainingSlice.actions

// Selectors
export const selectTraining = (state) => state.training
export const selectCourses = (state) => state.training.courses
export const selectSessions = (state) => state.training.sessions
export const selectCategories = (state) => state.training.categories
export const selectSelectedCourse = (state) => state.training.selectedCourse
export const selectSelectedSession = (state) => state.training.selectedSession
export const selectTrainingLoading = (state) => state.training.loading
export const selectTrainingError = (state) => state.training.error

export default trainingSlice.reducer
