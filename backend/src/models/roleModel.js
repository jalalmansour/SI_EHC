/**
 * Retrieves all roles for the current tenant.
 * @param {object} models - Tenant-specific database models.
 * @returns {Promise<Array>} An array of all role objects.
 */
const findAll = async (models) => {
    return await models.Role.findAll({
        order: [["id", "ASC"]],
    });
};

/**
 * Finds a single role by its unique ID for the current tenant.
 * @param {object} models - Tenant-specific database models.
 * @param {number} id - The ID of the role to find.
 * @returns {Promise<Object|null>} The role object or null if not found.
 */
const findById = async (models, id) => {
    return await models.Role.findByPk(id);
};

/**
 * Creates a new role for the current tenant.
 * @param {object} models - Tenant-specific database models.
 * @param {object} data - Role data including name and description.
 * @returns {Promise<Object>} The newly created role object.
 */
const create = async (models, data) => {
    const { name, description } = data;
    return await models.Role.create({ name, description });
};

/**
 * Updates an existing role by ID for the current tenant.
 * @param {object} models - Tenant-specific database models.
 * @param {number} id - Role ID to update.
 * @param {object} data - Fields to update.
 * @returns {Promise<Object|null>} The updated role object, or null if not found.
 */
const update = async (models, id, data) => {
    const role = await models.Role.findByPk(id);
    if (!role) {
        return null;
    }
    await role.update(data);
    return role;
};

/**
 * Deletes a role by ID for the current tenant.
 * @param {object} models - Tenant-specific database models.
 * @param {number} id - Role ID to delete.
 * @returns {Promise<boolean>} True if deleted, false if not found.
 */
const remove = async (models, id) => {
    const rowsDeleted = await models.Role.destroy({ where: { id } });
    return rowsDeleted > 0;
};

export const roleModel = {
    findAll,
    findById,
    create,
    update,
    remove,
};
