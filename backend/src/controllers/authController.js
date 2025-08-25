import * as response from "@utils/response";
import authService from "@services/authService";
import { catchAsync } from "@utils/catchAsync";

/**
 * Handles user registration within a specific tenant.
 * This is a protected action, performed by an authenticated super-admin/manager.
 */
const register = catchAsync(async (req, res) => {
    const result = await authService.registerUser(req);
    return response.created(res, result.user, "User successfully registered.");
});

/**
 * Handles user login. This is a public endpoint.
 * It finds the correct tenant and authenticates the user against their database.
 */
const login = catchAsync(async (req, res) => {
    // This public service function handles the tenant lookup internally.
    const { tokens, user } = await authService.loginUser(req);

    res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "strict"
    });

    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict"
    });


    return response.success(res, user, "Login successful");
});

/**
 * Refreshes the access token. This is a public endpoint.
 * It decodes the refresh token to find the tenant.
 */
const refreshToken = catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await authService.refreshAccessToken(req);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
        sameSite: "strict"
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict"
    });

    return response.success(res, null, "Access token refreshed successfully");
});

/**
 * Handles user logout. This is a protected endpoint.
 */
const logout = catchAsync(async (req, res) => {
    // Logic for invalidating the refresh token on the backend would go here,
    // likely in a service call.
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return response.success(res, null, "Logged out successfully.");
});

/**
 * Sets a new password via verification token. This is a public endpoint.
 */
const setPassword = catchAsync(async (req, res) => {
    const result = await authService.setPassword(req);
    return response.success(res, result, "Password set successfully.");
});

/**
 * Resets the password for an authenticated user. This is a protected endpoint.
 */
const resetPassword = catchAsync(async (req, res) => {
    const result = await authService.resetPassword(req);
    return response.success(res, result, "Password updated successfully.");
});

/**
 * Verifies a password-reset or email-verification token. This is a public endpoint.
 */
const verifyToken = catchAsync(async (req, res) => {
    const result = await authService.verifyToken(req);
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
};