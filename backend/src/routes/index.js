import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import departmentRoutes from "./departmentRoutes";

const mainRouter = Router();

// Mount the authentication routes under the "/auth" path
mainRouter.use("/auth", authRoutes);

// Mount the user routes under the "/user" path
mainRouter.use("/user", userRoutes);

// Import the department routes
mainRouter.use('/departments', departmentRoutes); // Mount the new routes

export default mainRouter;