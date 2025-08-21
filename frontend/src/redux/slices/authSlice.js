import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, fetchMe } from '../thunks/authThunks';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false, // For the initial session check on app load
    loading: false,  // For active submissions (e.g., login button spinner)
    error: null,
    role: null,
    permissions: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // --- Reducers for fetchMe (session check) ---
            .addCase(fetchMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                // The payload from fetchMe is the user object itself.
                const userData = action.payload;

                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = userData;
                // The role and permissions are top-level properties on the user object.
                state.role = userData.role?.name || null;
                state.permissions = userData.permissions || [];
            })
            .addCase(fetchMe.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.role = null;
                state.permissions = [];
            })

            // --- Reducers for Login ---
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                const userData = action.payload.data; // The user object is inside `data`

                state.loading = false;
                state.isAuthenticated = true;
                state.user = userData;
                state.role = userData.role?.name || null;
                state.permissions = userData.permissions || [];
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.permissions = []; // Always clear on failure
            })

            // --- Reducers for Logout ---
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.role = null;
                state.permissions = [];
            })

            // --- Reducers for Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = authSlice.actions;

// --- Selectors (no changes needed) ---
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectRole = (state) => state.auth.role;
export const selectPermissions = (state) => state.auth.permissions;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;