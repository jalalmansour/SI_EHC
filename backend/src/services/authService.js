import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "@config/authConfig";
import { AppError } from "@utils/errors";
import { userModel } from "@models/userModel";
import { roleModel } from "@models/roleModel";
import { getAdminModels, getTenantConnection } from "@utils/connectionManager";
import { generatePassword, generateToken } from "@utils/security";
import mailingService from "./mailingService";
import appConfig from "../config/appConfig";
import verificationTokenModel from "../models/admin/verificationTokenModel";
import {tenantUserModel} from "../models/admin/tenantUserModel";

/**
 * Generates JWTs with a consistent payload.
 * @param {object} user - The user object from the tenant DB.
 * @param {number} tenantId - The ID of the tenant.
 * @param {Array<string>} permissions - The final combined list of permissions.
 * @returns {{accessToken: string, refreshToken: string}}
 */
const generateTokens = (user, tenantId, permissions) => {
    const accessTokenPayload = { userId: user.id, tenantId, role: user.role?.name, permissions };
    const refreshTokenPayload = { userId: user.id, tenantId };
    return {
        accessToken: jwt.sign(accessTokenPayload, authConfig.secret, { expiresIn: authConfig.secret_expires_in }),
        refreshToken: jwt.sign(refreshTokenPayload, authConfig.refresh_secret, { expiresIn: authConfig.refresh_secret_expires_in }),
    };
};

/**
 * --- PUBLIC: Authenticates a user against their specific tenant database ---
 */
const loginUser = async (req) => {
    const data = req.body;
    const { email, password } = data;
    const adminModels = getAdminModels();

    const tenantUser = await adminModels.TenantUser.findOne({ where: { email } });
    if (!tenantUser) throw new AppError("Invalid email or password.", 401);

    const { tenantId } = tenantUser;
    const connectionData = await getTenantConnection(tenantId);
    if (!connectionData) throw new AppError("Could not connect to tenant database.", 500);
    const tenantModels = connectionData.models;

    const userWithPassword = await userModel.findByEmail(tenantModels, email);
    if (!userWithPassword || !(await bcrypt.compare(password, userWithPassword.password))) {
        throw new AppError("Invalid email or password.", 401);
    }

    const fullUser = await userModel.findByIdWithPermissions(tenantModels, userWithPassword.id);
    if (!fullUser) throw new AppError("Could not retrieve user profile.", 500);

    const rolePermissions = fullUser.role?.permissions?.map(p => p.name) || [];
    const directPermissions = fullUser.directPermissions?.map(p => p.name) || [];
    const combinedPermissions = [...new Set([...rolePermissions, ...directPermissions])];
    const tokens = generateTokens(fullUser, tenantId, combinedPermissions);

    const publicUser = fullUser.toJSON();
    if (publicUser.role) delete publicUser.role.permissions;
    delete publicUser.directPermissions;
    publicUser.permissions = combinedPermissions;

    return { tokens, user: publicUser };
};

/**
 * --- PROTECTED: Registers a new user within a specific tenant's context ---
 */
const registerUser = async (req) => {
    const data = req.body;
    const { email, roleId, tenantId, ...restOfUserData } = data;
    const adminModels = getAdminModels();

    if (!tenantId) throw new AppError("Tenant ID is required.", 400);
    const connectionData = await getTenantConnection(tenantId);
    if (!connectionData) throw new AppError(`Tenant with ID ${tenantId} not found.`, 404);

    const tenantModels = connectionData.models;

    if (await userModel.findByEmail(tenantModels, email) || await tenantUserModel.findByEmail(adminModels, email)) {
        throw new AppError("Email is already in use.", 409);
    }
    if (!(await roleModel.findById(tenantModels, roleId))) {
        throw new AppError("Role does not exist for this tenant.", 404);
    }

    const hashedPassword = await bcrypt.hash(generatePassword(), 10);
    let newUserInTenantDb = null;
    try {
        newUserInTenantDb = await userModel.createUser(tenantModels, {
            ...restOfUserData, email, roleId, password: hashedPassword,
        });

        const newTenantUser = await adminModels.TenantUser.create({
            email: newUserInTenantDb.email,
            tenantId,
            userIdInTenant: newUserInTenantDb.id,
        });

        const verificationToken = generateToken(32);
        await adminModels.VerificationToken.create({
            tenantUserId: newTenantUser.id,
            token: verificationToken,
            type: "PASSWORD_SETUP",
            expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour
        });

        const verificationUrl = `${appConfig.host}/set-password?token=${verificationToken}`;
        await mailingService.sendMail({
            to: newUserInTenantDb.email,
            subject: "Set Your Password",
            text: `Welcome! Please set your password using this link:\n${verificationUrl}`
        });

    } catch (error) {
        if (newUserInTenantDb?.id) {
            await userModel.remove(tenantModels, newUserInTenantDb.id);
        }
        throw new AppError(`Failed to register user: ${error.message}`, 500);
    }

    return { user: newUserInTenantDb };
};

/**
 * --- PUBLIC: Refreshes an access token ---
 */
const refreshAccessToken = async (req) => {
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

    const { tenantId, userId } = payload;
    if (!tenantId || !userId) {
        throw new AppError("Invalid refresh token payload.", 401);
    }

    const connectionData = await getTenantConnection(tenantId);
    if (!connectionData) {
        throw new AppError("Tenant not found.", 401);
    }

    const tenantModels = connectionData.models;
    const fullUser = await userModel.findByIdWithPermissions(tenantModels, userId);
    if (!fullUser) {
        throw new AppError("User not found.", 401);
    }

    const rolePermissions = fullUser.role?.permissions?.map(p => p.name) || [];
    const directPermissions = fullUser.directPermissions?.map(p => p.name) || [];
    const combinedPermissions = [...new Set([...rolePermissions, ...directPermissions])];

    const { accessToken, refreshToken } = generateTokens(fullUser, tenantId, combinedPermissions);

    return { accessToken, refreshToken };
};
/**
 * --- PUBLIC: Sets a password using a verification token ---
 */
const setPassword = async (req) => {
    const { token } = req.query;
    const {password} = req.body;
    const adminModels = getAdminModels();

    const storedToken = await verificationTokenModel.findByToken(adminModels, token);
    if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new AppError("Token is invalid or has expired.", 401);
    }

    const { userIdInTenant, tenantId } = storedToken.tenantUser;
    const connectionData = await getTenantConnection(tenantId);
    if (!connectionData) throw new AppError("Associated tenant not found.", 404);
    const tenantModels = connectionData.models;

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await userModel.updateUser(tenantModels, userIdInTenant, { password: hashedPassword });
    if (!updatedUser) throw new AppError("User associated with this token not found.", 404);

    await storedToken.destroy();

    return { message: "Password has been set successfully." };
};


const verifyToken = async (req) => {
    const { token } = req.body;
    const adminModels = getAdminModels();

    if (!token) throw new AppError("Unauthorised", 401);

    const storedToken = await verificationTokenModel.findByToken(adminModels, token);

    if (!storedToken) {
        throw new AppError("Invalid or expired token", 401);
    }

    // Optional: check expiration
    if (storedToken.expiresAt < new Date()) {
        throw new AppError("Token has expired", 401);
    }

    return { userId: storedToken.tenantUserId };
};

const resetPassword = async (req) => {
    const { userId, models } = req;
    const { newPassword } = req.body;
    // Hash the new password and update the user in their specific tenant database.
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.updateUser(models, userId, { password: hashedPassword });

    return { message: "Your password has been reset successfully." };
};

const authService = {
    registerUser,
    loginUser,
    refreshAccessToken,
    setPassword,
    verifyToken,
    resetPassword,
};

export default authService;
