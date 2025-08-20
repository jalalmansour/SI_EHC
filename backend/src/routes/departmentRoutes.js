import { Router } from "express";
import { departmentController } from "@controllers/departmentController";
import { validateBody } from "@middlewares/validationMiddleware";
import { authenticateUser } from "@middlewares/authMiddleware";
import departmentSchema from "../validations/departmentSchema";

const router = Router();

// --- All department routes are protected and require authentication ---
router.use(authenticateUser);

// good idea save for later
// --- You could add role-based authorization here for all routes ---
// router.use(authorizeUser(['ADMIN', 'RRH'])); // Example: Only Admins and HR can manage departments

// POST /api/departments - Create a new department
router.post(
    "/",
    validateBody(departmentSchema.create),   // Validate the request body
    departmentController.createDepartment    // Handle creation
);

// GET /api/departments - Get a list of all departments
router.get(
    "/",
    departmentController.getAllDepartments   // Handle fetching all
);

// GET /api/departments/:id - Get a single department by its ID
router.get(
    "/:id",
    departmentController.getDepartmentById   // Handle fetching one
);

// PUT /api/departments/:id - Update an existing department
router.put(
    "/:id",
    validateBody(departmentSchema.update),   // Validate the request body
    departmentController.updateDepartment    // Handle the update
);

// DELETE /api/thanks/:id - Delete a department
router.delete(
    "/:id",
    departmentController.deleteDepartment    // Handle deletion
);

export default router;