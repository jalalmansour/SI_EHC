import { roleModel } from "@models/roleModel";
import { AppError } from "@utils/errors"; // Assuming a shared error utility

/**
 * Get a single role by its ID for the current tenant.
 * @param {object} req - The Express request object, containing `req.models` and the role ID in `req.params.id`.
 * @returns {Promise<Object>} The role object.
 * @throws {AppError} If the role is not found.
 */
const getRole = async (req) => {
    const { models } = req;
    const { id } = req.params;

    const role = await roleModel.findById(models, id);
    if (!role) {
        throw new AppError("Role not found", 404);
    }
    return role;
};

/**
 * Get all roles for the current tenant.
 * @param {object} req - The Express request object, containing tenant-specific models in `req.models`.
 * @returns {Promise<Array>} An array of all role objects.
 */
const getRoles = async (req) => {
    const { models } = req;
    return await roleModel.findAll(models);
};

const roleService = {
    getRole,
    getRoles,
};

export default roleService;