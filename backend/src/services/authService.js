// src/services/auth.service.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "@config/authConfig";
import { AppError } from "@utils/errors";
import { userModel } from "@models/userModel";
import { roleModel } from "@models/roleModel";
import { generatePassword, generateToken } from "@utils/security";
import mailingService from "./mailingService";
import verificationTokenModel from "../models/verificationTokenModel";
import authSchema from "../validations/authSchema";
import appConfig from "../config/appConfig";

// --- Helper to generate access & refresh tokens ---
const generateTokens = (userId) => ({
    accessToken: jwt.sign({ userId }, authConfig.secret, { expiresIn: authConfig.secret_expires_in }),
    refreshToken: jwt.sign({ userId }, authConfig.refresh_secret, { expiresIn: authConfig.refresh_secret_expires_in }),
});

// --- Register a new user ---
const registerUser = async (data) => {
    const { email, roleId } = data;

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) throw new AppError("Email is already in use.", 400);

    const role = await roleModel.findById(roleId);
    if (!role) throw new AppError("Role doesn't exist.", 404);

    const tempPassword = generatePassword();
    data.password = await bcrypt.hash(tempPassword, 10);
    const newUser = await userModel.createUser(data);

    const verificationToken = generateToken(32);

    await verificationTokenModel.createVerificationToken({
        userId: newUser.id,
        token: verificationToken,
        type: "PASSWORD_RESET",
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    const verificationUrl = `${appConfig.host}:${appConfig.port}/set-password?token=${verificationToken}`;

    await mailingService.sendMail({
        to: newUser.dataValues.email,
        subject: "Set Your Password",
        text: `Hello ${newUser.firstName},\n\n` +
            `Welcome! Set your password using this link:\n${verificationUrl}\n\n` +
            `This link expires in 1 hour.\n\nBest regards,\nThe Team`
    });

    return { user: newUser };
};

// --- Login user ---
const loginUser = async (data) => {
    const { email, password } = data;

    // Step 1: Find the user by email. This query MUST include the password for comparison.
    const userWithPassword = await userModel.findByEmail(email);

    // Step 2: Validate the user's existence and password.
    if (!userWithPassword || !(await bcrypt.compare(password, userWithPassword.password))) {
        throw new AppError("Invalid email or password.", 401);
    }

    // Step 3: Password is valid. Now, fetch the user AGAIN, but this time with all permissions.
    const fullUser = await userModel.findByIdWithPermissions(userWithPassword.id);

    if (!fullUser) {
        throw new AppError("Could not retrieve user profile.", 500);
    }

    // Step 4: Combine permissions from the user's role and their direct assignments.
    const rolePermissions = fullUser.role?.permissions?.map(p => p.name) || [];
    const directPermissions = fullUser.directPermissions?.map(p => p.name) || [];

    // Use a Set to create a unique, combined list of all permissions.
    const combinedPermissions = [...new Set([...rolePermissions, ...directPermissions])];

    // Step 5: Generate the authentication tokens.
    const tokens = generateTokens(fullUser.id, fullUser.role?.name, combinedPermissions);

    // Step 6: Return the final, sanitized payload.
    // The `fullUser` object from `findByIdWithPermissions` is already public-safe.
    const publicUser = fullUser.toJSON();

    if (publicUser.role) {
        delete publicUser.role.permissions;
    }
    delete publicUser.directPermissions; // Clean up the response
    publicUser.permissions = combinedPermissions; // Add the final combined list

    return {
        tokens,
        user: publicUser
    };
};

// --- Refresh access token ---
const refreshAccessToken = async (userId, refreshToken) => {
    const user = await userModel.findById(userId);
    if (!user || !user.refreshToken) throw new AppError("Refresh token not found", 401);
    if (user.refreshToken !== refreshToken) throw new AppError("Invalid refresh token", 401);

    return generateTokens(userId).accessToken;
};

// --- Set password using verification token ---
const setPassword = async (token, data) => {
    const storedToken = await verificationTokenModel.findByToken(token);
    if (!storedToken || storedToken.token !== token) throw new AppError("Unauthorized.", 401);

    await userModel.updateUser(storedToken.userId, { password: await bcrypt.hash(data.password, 10) });

    return { message: "Password set successfully." };
};

// --- Reset password for authenticated user ---
const resetPassword = async (userId, data) => {
    const { oldPassword, newPassword } = authSchema.changePassword.parse(data);

    const user = await userModel.findById(userId);
    if (!user) throw new AppError("User not found.", 404);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new AppError("Old password is incorrect.", 400);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.updateUser(userId, { password: hashedPassword });

    return { message: "Password updated successfully." };
};

const verifyToken = async (token) => {
    if (!token) throw new AppError("Unauthorised", 401);

    const storedToken = await verificationTokenModel.findByToken(token);

    if (!storedToken) {
        throw new AppError("Invalid or expired token", 401);
    }

    // Optional: check expiration
    if (storedToken.expiresAt < new Date()) {
        throw new AppError("Token has expired", 401);
    }

    return { userId: storedToken.userId };
};

const authService = {
    registerUser,
    loginUser,
    refreshAccessToken,
    setPassword,
    resetPassword,
    verifyToken,
};

export default authService;