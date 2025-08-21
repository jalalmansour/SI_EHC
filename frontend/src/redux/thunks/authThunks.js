import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

/**
 * Thunk for handling user login.
 * It uses a try/catch block to explicitly pass the detailed error from the interceptor
 * into rejectWithValue, ensuring the full error object reaches the component.
 */
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            return response.data;
        } catch (error) {
            // 'error' is now the detailed object from your interceptor.
            // We pass it directly to rejectWithValue to preserve it.
            return rejectWithValue(error);
        }
    }
);

/**
 * Thunk for handling user registration.
 */
export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authService.register(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

/**
 * Thunk for fetching the current user's data.
 */
// Fetch user profile
export const fetchMe = createAsyncThunk(
    "auth/fetchMe",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await authService.getMe();
            return response.data;
        } catch (error) {
            // ❌ Interceptor already tried refresh
            // If still 401, session is invalid → logout
            if (error.status === 401) {
                dispatch(logout());
            }
            return rejectWithValue(error);
        }
    }
);


/**
 * Thunk for handling user logout.
 */
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
        } catch (error) {
            // Even for logout, it's good practice to pass the error along.
            return rejectWithValue(error);
        }
    }
);