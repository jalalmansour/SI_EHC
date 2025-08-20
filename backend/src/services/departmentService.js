import { departmentModel } from "@models/departmentModel";
import {AppError} from "../utils/errors";

/**
 * Get all departments.
 * @returns {Promise<Array>} An array of departments.
 */
const getAllDepartments = async () => {
    return await departmentModel.findAll();
};

/**
 * Get a single department by its ID.
 * @param {number} id - The department ID.
 * @returns {Promise<Object>} The department object.
 * @throws {AppError} If the department is not found.
 */
const getDepartmentById = async (id) => {
    const department = await departmentModel.findById(id);
    if (!department) {
        throw new AppError(404, "Department not found");
    }
    return department;
};

/**
 * Create a new department.
 * @param {object} departmentData - The data for the new department.
 * @returns {Promise<Object>} The new department.
 */
const createDepartment = async (departmentData) => {
    return departmentModel.create(departmentData);
};

/**
 * Update a department.
 * @param {number} id - The department ID.
 * @param {object} updateData - The data to update.
 * @returns {Promise<Object>} The updated department.
 * @throws {AppError} If the department is not found.
 */
const updateDepartment = async (id, updateData) => {
    const updatedDepartment = await departmentModel.update(id, updateData);
    if (!updatedDepartment) {
        throw new AppError(404, "Department not found");
    }
    return updatedDepartment;
};

/**
 * Delete a department.
 * @param {number} id - The department ID.
 * @returns {Promise<void>}
 * @throws {AppError} If the department is not found.
 */
const deleteDepartment = async (id) => {
    const wasDeleted = await departmentModel.remove(id);
    if (!wasDeleted) {
        throw new AppError(404, "Department not found");
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