// middlewares/authenticateAdmin.js

import jwt from "jsonwebtoken";
import authConfig from "@config/authConfig";
import * as response from "@utils/response";

/**
 * Middleware to authenticate a platform admin based on the `accessToken` cookie.
 * It verifies the JWT and ensures the user has an 'admin' scope.
 */
export const authenticateAdmin = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return response.unauthorized(res, { message: "Access token is missing" });
    }

    try {
        const decoded = jwt.verify(token, authConfig.secret);

        // CRUCIAL: Verify that this token is specifically for an admin.
        // This is the key security check that prevents a tenant user's token
        // from being used to access these routes.
        if (decoded.scope !== 'admin') {
            return response.forbidden(res, { message: "You do not have permission to access this resource." });
        }

        // Attach the admin's info to a dedicated `req.admin` property.
        // This avoids any potential conflicts with `req.user` from other middlewares.
        req.admin = {
            id: decoded.userId,
            role: decoded.role
        };

        next();
    } catch (error) {
        // This handles cases where the token is malformed or expired.
        console.error("Admin authentication failed:", error.message);
        return response.unauthorized(res, { message: "Invalid or expired access token" });
    }
};