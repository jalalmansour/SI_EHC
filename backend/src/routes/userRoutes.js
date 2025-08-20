// src/routes/user.ts
import { Router } from "express";
import userController from "@controllers/userController";
import { authenticateUser } from "@middlewares/authMiddleware";

const router = Router();

// This route is protected and requires a valid access token.
router.get(
    "/me",
    authenticateUser,       // 1. Middleware: Protect the route
    userController.getUser  // 2. Controller: Get the authenticated user's info
);

router.put(
    "/:id",
    authenticateUser,       // 1. Middleware: Protect the route
    userController.updateUser  // 2. Controller: Get the authenticated user's info
);

router.delete(
    "/:id",
    authenticateUser,       // 1. Middleware: Protect the route
    userController.deleteUser // 2. Controller: Get the authenticated user's info
);

export default router;
