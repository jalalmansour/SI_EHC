// controllers/admin/authAdminController.js

import * as response from "@utils/response";
import authAdminService from "@services/admin/authAdminService";
import { catchAsync } from "@utils/catchAsync";


const register = catchAsync(async (req, res) => {
    const { user } = await authAdminService.registerAdmin(req);
    return response.created(res, user, "Admin user successfully created.");
});

/**
 * Handles platform admin login.
 */
const login = catchAsync(async (req, res) => {
    const { tokens, user } = await authAdminService.loginAdmin(req);

    // Set cookies, same as tenant login
    res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000, // 15 minutes
        sameSite: "strict"
    });

    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: "strict"
    });

    return response.success(res, user, "Admin login successful");
});

/**
 * Refreshes the access token for a platform admin.
 */
const refreshToken = catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await authAdminService.refreshAdminAccessToken(req);

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
 * Handles platform admin logout.
 */
const logout = catchAsync(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return response.success(res, null, "Logged out successfully.");
});


export const authAdminController = {
    register,
    login,
    refreshToken,
    logout,
};