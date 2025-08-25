// routes/adminRoutes.js

import { Router } from "express";
import { authAdminController } from "../controllers/admin/authAdminController";
import { tenantController } from "../controllers/admin/tenantController"; // Tenant management is an admin task
import { validateBody } from "../middlewares/validationMiddleware";
import tenantSchema from "../validations/tenantSchema";
import {authenticateAdmin} from "../middlewares/authenticateAdmin";

const adminRouter = Router();

// --- 1. Admin Authentication Routes (Public within the admin domain) ---
// Base path: /auth
const authRouter = Router();
authRouter.post("/login", authAdminController.login);
authRouter.post("/refresh", authAdminController.refreshToken);
authRouter.post("/logout", authAdminController.logout);
adminRouter.use("/auth", authRouter);


// --- 2. Protected Admin Routes ---
// All routes after this point will require a valid admin JWT.
adminRouter.use(authenticateAdmin);

// Base path: /tenants
const tenantManagementRouter = Router();
tenantManagementRouter.get("/", tenantController.getAllTenants);
tenantManagementRouter.post("/", validateBody(tenantSchema.create), tenantController.createTenant);
adminRouter.use("/tenants", tenantManagementRouter);


// Add other admin-only routes here in the future
// adminRouter.use("/billing", billingRoutes);

export default adminRouter;