// src/models/role.model.js
import { Role } from "../schemas";

/**
 * Retrieves all roles from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of all role objects.
 */
const findAll = async () => {
    return await Role.findAll({
        order: [["id", "ASC"]], // optional: always return in id order
    });
};

/**
 * Finds a single role by its unique ID.
 * @param {number} id - The ID of the role to find.
 * @returns {Promise<Object|null>} A promise that resolves to the role object or null if not found.
 */
const findById = async (id) => {
    return await Role.findByPk(id);
};

/**
 * Creates a new role in the database.
 * @param {object} data - Role data including name and description.
 * @returns {Promise<Object>} The newly created role object.
 */
const create = async (data) => {
    const { name, description } = data;
    const role = await Role.create({ name, description });
    return role;
};

/**
 * Updates an existing role by ID.
 * @param {number} id - Role ID to update.
 * @param {object} data - Fields to update (name, description).
 * @returns {Promise<Object|null>} The updated role object, or null if not found.
 */
const update = async (id, data) => {
    const role = await Role.findByPk(id);
    if (!role) return null;

    await role.update(data);
    return role;
};

/**
 * Deletes a role by ID.
 * @param {number} id - Role ID to delete.
 * @returns {Promise<boolean>} True if deleted, false if not found.
 */
const remove = async (id) => {
    const deleted = await Role.destroy({ where: { id } });
    return deleted > 0;
};

export const roleModel = {
    findAll,
    findById,
    create,
    update,
    remove,
};
