// src/routes/auth.ts
import { Router } from "express";
import { authController } from "@controllers/authController";
import { validateBody } from "@middlewares/validationMiddleware";
import { authenticateUser, refreshTokenValidation } from "@middlewares/authMiddleware";
import authSchema from "../validations/authSchema";

// Create a new router instance
const router = Router();

// POST /api/auth/register
router.post(
    "/register",
    validateBody(authSchema.register), // Validate request body
    authController.register            // Handle registration
);

// POST /api/auth/login
router.post(
    "/login",
    validateBody(authSchema.login),    // Validate request body
    authController.login               // Handle login
);

// POST /api/auth/refresh-token
router.post(
    "/refresh-token",
    refreshTokenValidation,            // Validate the refresh token
    authController.refreshToken        // Issue a new access token
);

// POST /api/auth/logout
router.post(
    "/logout",
    authenticateUser,                  // Ensure user is authenticated
    authController.logout              // Handle logout
);

// POST /api/auth/set-password
router.post(
    "/set-password",
    validateBody(authSchema.setPassword),
    authController.setPassword         // Set password via verification token
);

// POST /api/auth/reset-password
router.post(
    "/reset-password",
    authenticateUser,                  // Ensure user is authenticated
    validateBody(authSchema.changePassword), // Validate new/old password
    authController.resetPassword       // Handle password reset for authenticated user
);

// GET /api/auth/verify-token
router.get(
    "/verify-token",
    authController.verifyToken
);

export default router;
