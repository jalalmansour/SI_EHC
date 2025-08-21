import { Router } from "express";
import { departmentController } from "@controllers/departmentController";
import { validateBody } from "@middlewares/validationMiddleware";
import { authenticateUser } from "@middlewares/authenticationMiddleware";
import departmentSchema from "../validations/departmentSchema";

// You will also need to import your authorization middleware here
import { authorizeUser } from "@middlewares/authorizationMiddleware";

const router = Router();

// --- All department routes are protected by authentication ---
// This middleware runs first for every request to this router.
router.use(authenticateUser);


// POST /api/departments - Create a new department
router.post(
    "/",
    authorizeUser('departments:create'),
    validateBody(departmentSchema.create),
    departmentController.createDepartment
);

// GET /api/departments - Get a list of all departments
router.get(
    "/",
    authorizeUser('departments:read'),
    departmentController.getAllDepartments
);

// GET /api/departments/:id - Get a single department by its ID
router.get(
    "/:id",
    authorizeUser('departments:read'),
    departmentController.getDepartmentById
);

// PUT /api/departments/:id - Update an existing department
router.put(
    "/:id",
    authorizeUser('departments:update'),
    validateBody(departmentSchema.update),
    departmentController.updateDepartment
);

// DELETE /api/departments/:id - Delete a department (Corrected path)
router.delete(
    "/:id",
    authorizeUser('departments:delete'),
    departmentController.deleteDepartment
);

export default router;