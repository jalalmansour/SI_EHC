// src/services/auth.service.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "@config/authConfig";
import { AppError } from "@utils/errors";
import { userModel } from "@models/userModel";
import { ehcuserModel } from "@models/master/ehcuserModel";
import { companyModel } from "@models/master/companyModel";
import { Sequelize, QueryTypes } from 'sequelize';
import { roleModel } from "@models/roleModel";
import { generatePassword, generateToken } from "@utils/security";
import mailingService from "./mailingService";
import verificationTokenModel from "../models/verificationTokenModel";
import authSchema from "../validations/authSchema";
import appConfig from "../config/appConfig";

// --- Helper to generate access & refresh tokens ---
// Include role and permissions in the token payload so middleware can read them.
const generateTokens = (userId, role = null, permissions = []) => ({
    accessToken: jwt.sign({ userId, role, permissions }, authConfig.secret, { expiresIn: authConfig.secret_expires_in }),
    refreshToken: jwt.sign({ userId, role, permissions }, authConfig.refresh_secret, { expiresIn: authConfig.refresh_secret_expires_in }),
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

    // 1) Check master EhcUser first (superadmins)
    const ehcUser = await ehcuserModel.findByEmail(email);
    if (ehcUser) {
        if (await bcrypt.compare(password, ehcUser.password)) {
            console.log(`[auth] authenticated via master ehcusers: ${email}`);
            const tokens = generateTokens(ehcUser.id, ehcUser.role || 'superadmin', []);
            const publicUser = {
                id: ehcUser.id,
                username: ehcUser.username,
                email: ehcUser.email,
                role: ehcUser.role || 'superadmin',
                permissions: [],
            };
            return { tokens, user: publicUser };
        }
        // If EhcUser exists but password mismatch, continue to tenant search (do not early-throw to allow tenant users with same email)
        console.log(`[auth] master ehcuser found but password mismatch for ${email}`);
    }

    // 2) Check tenant DBs dynamically using company records
    const companies = await companyModel.findAll();
    for (const company of companies) {
        // Skip companies without DB credentials
        if (!company.db_name || !company.db_user) continue;

        const tenantSequelize = new Sequelize(company.db_name, company.db_user, company.db_password, {
            host: company.db_host || 'localhost',
            dialect: 'mysql',
            logging: false,
        });

        try {
            // use a raw query to avoid reusing schema that's bound to the master sequelize instance
            const rows = await tenantSequelize.query(
                'SELECT * FROM Users WHERE email = ? LIMIT 1',
                { replacements: [email], type: QueryTypes.SELECT }
            );

        if (rows && rows.length > 0) {
                const tenantUser = rows[0];
                if (await bcrypt.compare(password, tenantUser.password)) {
            console.log(`[auth] authenticated via tenant ${company.db_name}: ${email}`);
            // Authenticated tenant user
            const tokens = generateTokens(tenantUser.id, tenantUser.role || 'user', []);
                    const publicUser = {
                        id: tenantUser.id,
                        username: tenantUser.username || tenantUser.email,
                        email: tenantUser.email,
                        role: tenantUser.role || 'user',
                        permissions: [],
                        tenant: { id: company.id, db_name: company.db_name }
                    };
                    await tenantSequelize.close();
                    return { tokens, user: publicUser };
                }
                // if password mismatches, continue to next company
            }
        } catch (err) {
            // ignore tenant DB errors (unreachable, offline) and continue
            console.warn(`Tenant DB check failed for ${company.db_name}:`, err.message);
        } finally {
            try { await tenantSequelize.close(); } catch (e) {}
        }
    }

    // 3) Fallback: check master 'User' table in case it's used locally
    const userWithPassword = await userModel.findByEmail(email);
    if (userWithPassword) {
        if (await bcrypt.compare(password, userWithPassword.password)) {
            console.log(`[auth] authenticated via local User table: ${email}`);
            const fullUser = await userModel.findByIdWithPermissions(userWithPassword.id);
            if (!fullUser) throw new AppError("Could not retrieve user profile.", 500);

            const rolePermissions = fullUser.role?.permissions?.map(p => p.name) || [];
            const directPermissions = fullUser.directPermissions?.map(p => p.name) || [];
            const combinedPermissions = [...new Set([...rolePermissions, ...directPermissions])];

            const tokens = generateTokens(fullUser.id, fullUser.role?.name, combinedPermissions);

            const publicUser = fullUser.toJSON();
            if (publicUser.role) delete publicUser.role.permissions;
            delete publicUser.directPermissions;
            publicUser.permissions = combinedPermissions;

            return { tokens, user: publicUser };
        }
    }

    // Not found in either table
    throw new AppError("Invalid email or password.", 401);
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