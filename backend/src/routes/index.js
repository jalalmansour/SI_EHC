// routes/index.js

import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import departmentRoutes from "./departmentRoutes";
import { authenticateUser } from "../middlewares/authenticationMiddleware";
import { tenantResolver } from "../middlewares/tenantResolverMiddleware";

const tenantApiRouter = Router();

// --- 1. Public Tenant Routes ---
// Handles login, registration, password reset etc. for tenant users.
// No authentication is needed yet.
tenantApiRouter.use("/auth", authRoutes);


// --- 2. Protected, Tenant-Specific Routes ---
// All routes after this middleware chain are for authenticated tenant users
// and will have their database connection resolved.
tenantApiRouter.use(authenticateUser, tenantResolver);

// Mount the protected routes
tenantApiRouter.use("/users", userRoutes);
tenantApiRouter.use("/departments", departmentRoutes);

// Add other future tenant-specific routes here
// tenantApiRouter.use('/projects', projectRoutes);

export default tenantApiRouter;