import { Router } from "express";
import { authController } from "@controllers/authController";
import { validateBody } from "@middlewares/validationMiddleware";
import authSchema from "../validations/authSchema";
import {authenticateUser, refreshTokenValidation} from "../middlewares/authenticationMiddleware";
import {authorizeUser} from "../middlewares/authorizationMiddleware";

const router = Router();

// --- UNAUTHENTICATED ROUTES ---
// These routes are for users who are not yet logged in.
// They DO NOT need `authenticateUser` or `authorizeUser`.

router.post(
    "/register",
    authenticateUser,
    authorizeUser('users:create'),
    validateBody(authSchema.register),
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
    validateBody(authSchema.changePassword),
    authController.resetPassword
);

export default router;