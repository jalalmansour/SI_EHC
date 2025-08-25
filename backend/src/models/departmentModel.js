/**
 * Retrieves all departments for the current tenant, ordered by name.
 * @param {object} models - Tenant-specific database models.
 * @returns {Promise<Array>} An array of all department objects.
 */
const findAll = async (models) => {
    return await models.Department.findAll({
        order: [["name", "ASC"]],
    });
};

/**
 * Finds a single department by its unique ID for the current tenant.
 * @param {object} models - Tenant-specific database models.
 * @param {number} id - The ID of the department to find.
 * @returns {Promise<Object|null>} The department object or null if not found.
 */
const findById = async (models, id) => {
    return await models.Department.findByPk(id);
};

/**
 * Creates a new department in the current tenant's database.
 * @param {object} models - Tenant-specific database models.
 * @param {object} data - Department data including name and an optional description.
 * @returns {Promise<Object>} The newly created department object.
 */
const create = async (models, data) => {
    const { name, description } = data;
    return await models.Department.create({ name, description });
};

/**
 * Updates an existing department by its ID for the current tenant.
 * @param {object} model - Tenant-specific database model.
 * @param {number} id - The ID of the department to update.
 * @param {object} data - The fields to update.
 * @returns {Promise<Object|null>} The updated department object, or null if not found.
 */
const update = async (model, id, data) => {
    const department = await model.findByPk(id);
    if (!department) {
        return null;
    }
    const { name, description } = data;
    await department.update({ name, description });
    return department;
};

/**
 * Deletes a department by its ID for the current tenant.
 * @param {object} model - Tenant-specific database model.
 * @param {number} id - The ID of the department to delete.
 * @returns {Promise<boolean>} True if a record was deleted, false otherwise.
 */
const remove = async (model, id) => {
    const rowsDeleted = await model.Department.destroy({ where: { id } });
    return rowsDeleted > 0;
};

export const departmentModel = {
    findAll,
    findById,
    create,
    update,
    remove,
};
