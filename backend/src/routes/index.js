// src/routes/index.js
import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import departmentRoutes from "./departmentRoutes";
import trainingBudgetRoutes from "./budget.routes.js";

const mainRouter = Router();

console.log("Main router loaded");
// Mount the authentication routes under the "/auth" path
mainRouter.use("/auth", authRoutes);

// Mount the user routes under the "/user" path
mainRouter.use("/user", userRoutes);

// Mount the department routes
mainRouter.use('/departments', departmentRoutes);

// Mount the new training budget routes
mainRouter.use('/budgets', trainingBudgetRoutes);

export default mainRouter;