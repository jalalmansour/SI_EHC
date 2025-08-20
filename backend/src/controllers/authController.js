// src/controllers/auth.js
import * as response from "@utils/response";
import authService from "@services/authService";
import { catchAsync } from "@utils/catchAsync";

/**
 * Handles user registration.
 */
const register = catchAsync(async (req, res) => {
    const newUser = await authService.registerUser(req.body);
    return response.created(res, newUser, "User successfully registered.");
});

/**
 * Handles user login.
 */
const login = catchAsync(async (req, res) => {
    const { tokens, user } = await authService.loginUser(req.body);

    res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000, // 15 minutes
        sameSite: "strict"
    });

    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict"
    });

    return response.success(res, user, "Login successful");
});

/**
 * Refreshes the access token using a valid refresh token.
 */
const refreshToken = catchAsync(async (req, res) => {
    const userId = req.userId; // set by the auth middleware
    const refreshToken = req.cookies.refreshToken;

    if (!userId || !refreshToken) {
        return response.unauthorized(res, null, "Invalid token claims");
    }

    const newAccessToken = await authService.refreshAccessToken(userId, refreshToken);

    // Set new access token cookie
    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000, // 15 minutes
        sameSite: "strict"
    });

    return response.success(res, { message: "Access token refreshed successfully" });
});

/**
 * Handles user logout.
 */
const logout = catchAsync(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return response.success(res, null, "Logged out successfully.");
});

/**
 * Sets a new password after registration (via verification token)
 */
 const setPassword = catchAsync(async (req, res) => {
    const { token } = req.query;
    const result = await authService.setPassword(token, req.body);
    return response.success(res, result, "Password set successfully.");
});


 /**
 * resets the user password
 */
 const resetPassword = catchAsync(async (req, res) => {
     const userId = req.userId; // the id is set by the auth middleware

     const result = await authService.resetPassword(userId, req.body);
    return response.success(res, result, "Password updated successfully..");
});

/**
 * Verifies if the access token is valid.
 */
const verifyToken = catchAsync(async (req, res) => {
    const { token } = req.body;

    const result = await authService.verifyToken(token);

    return response.success(res, result, "Token is valid");
});

export const authController = {
    register,
    login,
    refreshToken,
    logout,
    setPassword,
    resetPassword,
    verifyToken
 }
