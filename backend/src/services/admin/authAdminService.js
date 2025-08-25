// services/authAdminService.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "@config/authConfig";
import { AppError } from "@utils/errors";
import { getAdminModels } from "@utils/connectionManager";
import { ehcUserModel } from "@models/admin/ehcUserModel";

/**
 * Generates JWTs for a platform admin user.
 * The payload is different from a tenant user's token.
 * @param {object} user - The EHC user object from the admin DB.
 * @returns {{accessToken: string, refreshToken: string}}
 */
const generateAdminTokens = (user) => {
    // The payload identifies the user as a platform admin and has no tenantId.
    const accessTokenPayload = { userId: user.id, role: user.role, scope: 'admin' };
    const refreshTokenPayload = { userId: user.id, scope: 'admin' };
    return {
        accessToken: jwt.sign(accessTokenPayload, authConfig.secret, { expiresIn: authConfig.secret_expires_in }),
        refreshToken: jwt.sign(refreshTokenPayload, authConfig.refresh_secret, { expiresIn: authConfig.refresh_secret_expires_in }),
    };
};


/**
 * --- PUBLIC: Authenticates a platform admin against the central admin database ---
 */
const loginAdmin = async (req) => {
    const { email, password } = req.body;
    const adminModels = getAdminModels();

    const adminUser = await ehcUserModel.findByEmail(adminModels, email);

    // Check if user exists, is active, and the password is correct
    if (!adminUser || !adminUser.isActive || !(await bcrypt.compare(password, adminUser.password))) {
        throw new AppError("Invalid email or password.", 401);
    }

    const tokens = generateAdminTokens(adminUser);

    // Prepare a safe user object to return to the frontend
    const publicUser = adminUser.toJSON();
    delete publicUser.password;

    return { tokens, user: publicUser };
};

/**
 * --- PUBLIC: Refreshes an access token for a platform admin ---
 */
const refreshAdminAccessToken = async (req) => {
    const { refreshToken: tokenFromCookie } = req.cookies;
    if (!tokenFromCookie) {
        throw new AppError("Refresh token is missing.", 401);
    }

    let payload;
    try {
        payload = jwt.verify(tokenFromCookie, authConfig.refresh_secret);
    } catch (error) {
        throw new AppError("Invalid or expired refresh token.", 401);
    }

    // Crucially, verify this is an admin token
    if (!payload.userId || payload.scope !== 'admin') {
        throw new AppError("Invalid refresh token payload.", 401);
    }

    const adminModels = getAdminModels();
    const adminUser = await ehcUserModel.findById(adminModels, payload.userId);

    if (!adminUser || !adminUser.isActive) {
        throw new AppError("Admin user not found or is inactive.", 401);
    }

    const tokens = generateAdminTokens(adminUser);
    return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
};


const authAdminService = {
    loginAdmin,
    refreshAdminAccessToken,
};

export default authAdminService;