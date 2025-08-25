// src/middlewares/authentication.js
import jwt from "jsonwebtoken";
import authConfig from "@config/authConfig";
import * as response from "@utils/response";

/**
 * Middleware to authenticate a user based on the `accessToken` cookie.
 * It verifies the JWT and attaches the `userId` to the request object.
 */
export const authenticateUser = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return response.unauthorized(res, { message: "Access token is missing" });
    }

    try {
        const decoded = jwt.verify(token, authConfig.secret);

        // --- ADD THIS STRICT CHECK ---
        // Ensure this is a tenant token by checking for the presence of a tenantId.
        // This prevents an admin token from being used on tenant-specific routes.
        if (!decoded.tenantId) {
            return response.forbidden(res, { message: "Invalid token scope for this resource." });
        }

        // Attach the full decoded payload to a `user` property for clarity in controllers.
        req.user = decoded;

        // You can keep these for backward compatibility if needed.
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        req.userPermissions = decoded.permissions || [];

        next();
    } catch (error) {
        console.error("User authentication failed:", error.message);
        return response.unauthorized(res, { message: "Invalid or expired access token" });
    }
};

/**
 * Middleware to validate a refresh token from the `refreshToken` cookie.
 * It verifies the JWT and attaches the `userId` to the request object.
 * This is typically used only for the token refresh endpoint.
 */
export const refreshTokenValidation = (req, res, next) => {
    // 1. Extract the refresh token from the HttpOnly cookie
    const refreshToken = req.cookies.refreshToken;

    // If there's no token, return an unauthorized error
    if (!refreshToken) {
        return response.unauthorized(res, { message: "Refresh token is missing" });
    }

    try {
        // 2. Verify the token using the dedicated refresh secret key
        const decoded = jwt.verify(refreshToken, authConfig.refresh_secret);

        // 3. Attach userId to the request object
        req.userId = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If verification fails, return an unauthorized error
        console.error("Refresh token validation failed:", error);
        return response.unauthorized(res, { message: "Invalid or expired refresh token" });
    }
};