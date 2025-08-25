import { getTenantConnection } from '@utils/connectionManager';
import * as response from '@utils/response';
import jwt from "jsonwebtoken";
import authConfig from "../config/authConfig";

export const tenantResolver = async (req, res, next) => {
    const token = req.cookies.accessToken; // Or however you get your token
    if (!token) {
        // This middleware should run *after* authentication, so a token should exist.
        return response.unauthorized(res, null, "Authentication token required.");
    }

    try {
        const payload = jwt.verify(token, authConfig.secret);
        const tenantId = payload.tenantId;

        if (!tenantId) {
            return response.unauthorized(res, null, "Token is missing tenant information.");
        }

        // Get the tenant-specific models from the Connection Manager
        const { models } = await getTenantConnection(tenantId);

        if (!models) {
            return response.unauthorized(res, null, `Access denied. No active tenant found for ID ${tenantId}.`);
        }

        // Attach the tenant's models to the request object.
        req.models = models;

        next(); // Proceed to the next middleware or controller
    } catch (error) {
        return response.unauthorized(res, null, "Invalid or expired token.");
    }
};