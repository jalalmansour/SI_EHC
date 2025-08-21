// Import the default (public) and the named (private) export
import axiosPublic, { axiosPrivate } from './axios';

export const authService = {
    // === PUBLIC ENDPOINTS (use axiosPublic) ===
    login: (credentials) => {
        return axiosPublic.post('/auth/login', credentials);
    },
    forgotPassword: (email) => {
        return axiosPublic.post('/auth/forgot-password', { email });
    },
    resetPassword: (token, password) => {
        return axiosPublic.post('/auth/reset-password', { token, password });
    },
    refreshToken: () => {
        return axiosPublic.post('/auth/refresh-token', {}, { withCredentials: true });
    },

    // === PROTECTED ENDPOINTS (use axiosPrivate) ===
    register: (userData) => { // As per your logic, this is a protected route
        return axiosPrivate.post('/auth/register', userData);
    },
    getMe: () => {
        return axiosPrivate.get('/user/me');
    },
    logout: () => {
        return axiosPrivate.post('/auth/logout');
    },
    changePassword: (passwords) => {
        return axiosPrivate.post('/auth/change-password', passwords);
    },
    updateProfile: (profileData) => {
        return axiosPrivate.put('/auth/profile', profileData);
    },
};