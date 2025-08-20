import * as response from "@utils/response";
import { catchAsync } from "@utils/catchAsync";
import departmentService from "@services/departmentService";

/**
 * GET /api/departments
 * Handles fetching all departments.
 */
const getAllDepartments = catchAsync(async (req, res) => {
    const departments = await departmentService.getAllDepartments();
    response.success(res, departments, "Departments retrieved successfully");
});

/**
 * GET /api/departments/:id
 * Handles fetching a single department by its ID.
 */
const getDepartmentById = catchAsync(async (req, res) => {
    const department = await departmentService.getDepartmentById(req.params.id);
    response.success(res, department, "Department retrieved successfully");
});

/**
 * POST /api/departments
 * Handles the creation of a new department.
 */
const createDepartment = catchAsync(async (req, res) => {
    const newDepartment = await departmentService.createDepartment(req.body);
    response.created(res, newDepartment, "Department created successfully");
});

/**
 * PUT /api/departments/:id
 * Handles updating a department.
 */
const updateDepartment = catchAsync(async (req, res) => {
    const updatedDepartment = await departmentService.updateDepartment(req.params.id, req.body);
    response.success(res, updatedDepartment, "Department updated successfully");
});

/**
 * DELETE /api/departments/:id
 * Handles deleting a department.
 */
const deleteDepartment = catchAsync(async (req, res) => {
    await departmentService.deleteDepartment(req.params.id);
    response.noContent(res);
});

export const departmentController = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};