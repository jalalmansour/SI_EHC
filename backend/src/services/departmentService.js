import { departmentModel } from "@models/departmentModel";
import { AppError } from "../utils/errors";

/**
 * Get all departments for the current tenant.
 * @param {object} req - The Express request object, containing tenant-specific models in `req.models`.
 * @returns {Promise<Array>} An array of departments.
 */
const getAllDepartments = async (req) => {
    const { Department } = req.models;
    return await departmentModel.findAll(Department);
};

/**
 * Get a single department by its ID for the current tenant.
 * @param {object} req - The Express request object, containing `req.models` and the department ID in `req.params.id`.
 * @returns {Promise<Object>} The department object.
 * @throws {AppError} If the department is not found.
 */
const getDepartmentById = async (req) => {
    const { Department } = req.models;
    const { id } = req.params;
    const department = await departmentModel.findById(Department, id);

    if (!department) {
        throw new AppError("Department not found", 404);
    }
    return department;
};

/**
 * Create a new department for the current tenant.
 * @param {object} req - The Express request object, containing `req.models` and the department data in `req.body`.
 * @returns {Promise<Object>} The new department.
 */
const createDepartment = async (req) => {
    const { Department } = req.models;
    const departmentData = req.body;
    return departmentModel.create(Department, departmentData);
};

/**
 * Update a department for the current tenant.
 * @param {object} req - The Express request object, containing `req.models`, the department ID in `req.params.id`, and update data in `req.body`.
 * @returns {Promise<Object>} The updated department.
 * @throws {AppError} If the department is not found.
 */
const updateDepartment = async (req) => {
    const { Department } = req.models;
    const { id } = req.params;
    const updateData = req.body;
    const updatedDepartment = await departmentModel.update(Department, id, updateData);

    if (!updatedDepartment) {
        throw new AppError("Department not found", 404);
    }
    return updatedDepartment;
};

/**
 * Delete a department for the current tenant.
 * @param {object} req - The Express request object, containing `req.models` and the department ID in `req.params.id`.
 * @returns {Promise<void>}
 * @throws {AppError} If the department is not found.
 */
const deleteDepartment = async (req) => {
    const { Department } = req.models;
    const { id } = req.params;
    const wasDeleted = await departmentModel.remove(Department, id);

    if (!wasDeleted) {
        throw new AppError("Department not found", 404);
    }
};

const departmentService = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};

export default departmentService;