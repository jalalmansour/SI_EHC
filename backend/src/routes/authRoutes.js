import { Router } from "express";
import { authController } from "@controllers/authController";
import { validateBody } from "@middlewares/validationMiddleware";
import authSchema from "../validations/authSchema";
import {authenticateUser, refreshTokenValidation} from "../middlewares/authenticationMiddleware";
import {authorizeUser} from "../middlewares/authorizationMiddleware";
import {tenantResolver} from "../middlewares/tenantResolverMiddleware";

const router = Router();

// --- UNAUTHENTICATED ROUTES ---
// These routes are for users who are not yet logged in.
// They DO NOT need `authenticateUser` or `authorizeUser`.

// --- 2. Special Case: Admin-Only User Registration ---
// This route is protected but does NOT use the tenant resolver.
// The controller and service will handle the tenant logic manually.
router.post(
    "/register",
    // authenticateUser,
    // authorizeUser('users:create'), // Ensure only authorized users can create new users
    authController.register
);
router.post(
    "/login",
    validateBody(authSchema.login),
    authController.login
);

router.post(
    "/refresh-token",
    refreshTokenValidation,
    authController.refreshToken
);

router.post(
    "/set-password",
    validateBody(authSchema.setPassword),
    authController.setPassword
);

router.get(
    "/verify-token",
    authController.verifyToken
);


// --- AUTHENTICATED ROUTES ---
// These routes are for users who are already logged in.
// They MUST have `authenticateUser`.

router.post(
    "/logout",
    authenticateUser,
    authController.logout
);

router.post(
    "/reset-password",
    authenticateUser,
    tenantResolver,
    validateBody(authSchema.changePassword),
    authController.resetPassword
);

export default router;