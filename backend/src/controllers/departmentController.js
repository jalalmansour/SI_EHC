import * as response from "@utils/response";
import { catchAsync } from "@utils/catchAsync";
import departmentService from "@services/departmentService";

/**
 * GET /api/departments
 * Handles fetching all departments for the current tenant.
 */
const getAllDepartments = catchAsync(async (req, res) => {
    const { models } = req;

    // Pass the models to the service layer.
    const departments = await departmentService.getAllDepartments(models);

    response.success(res, departments, "Departments retrieved successfully");
});

/**
 * GET /api/departments/:id
 * Handles fetching a single department by its ID for the current tenant.
 */
const getDepartmentById = catchAsync(async (req, res) => {
    const { models } = req;
    const { id } = req.params;

    const department = await departmentService.getDepartmentById(models, id);

    response.success(res, department, "Department retrieved successfully");
});

/**
 * POST /api/departments
 * Handles the creation of a new department for the current tenant.
 */
const createDepartment = catchAsync(async (req, res) => {
    const { models } = req;

    const newDepartment = await departmentService.createDepartment(models, req.body);

    response.created(res, newDepartment, "Department created successfully");
});

/**
 * PUT /api/departments/:id
 * Handles updating a department for the current tenant.
 */
const updateDepartment = catchAsync(async (req, res) => {
    const updatedDepartment = await departmentService.updateDepartment(req);

    response.success(res, updatedDepartment, "Department updated successfully");
});

/**
 * DELETE /api/departments/:id
 * Handles deleting a department for the current tenant.
 */
const deleteDepartment = catchAsync(async (req, res) => {
    await departmentService.deleteDepartment(req);

    response.noContent(res);
});

export const departmentController = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};
