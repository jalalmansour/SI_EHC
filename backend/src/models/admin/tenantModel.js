/**
 * Retrieves all tenant records from the super-admin database.
 * @param {object} model - The Sequelize Tenant model.
 * @returns {Promise<Array>} An array of all tenant objects.
 */
const findAll = async (model) => {
    return await model.findAll();
};

/**
 * Finds a single tenant by its unique primary key (ID).
 * @param {object} model - The Sequelize Tenant model.
 * @param {number} id - The ID of the tenant to find.
 * @returns {Promise<Object|null>} The tenant object or null if not found.
 */
const findById = async (model, id) => {
    return await model.findByPk(id);
};

/**
 * Finds a single tenant by its name.
 * @param {object} model - The Sequelize Tenant model.
 * @param {string} name - The name of the tenant.
 * @returns {Promise<Object|null>} The tenant object or null if not found.
 */
const findByName = async (model, name) => {
    return await model.findOne({ where: { name } });
};

/**
 * Creates a new tenant record in the super-admin database.
 * @param {object} model - The Sequelize Tenant model.
 * @param {object} data - An object containing tenant data, including `name` and `dbUri`.
 * @returns {Promise<Object>} The newly created tenant object.
 */
const create = async (model, data) => {
    const { name, dbUri } = data;
    return await model.create({ name, dbUri });
};

/**
 * Deletes a tenant record from the super-admin database by its ID.
 * @param {object} model - The Sequelize Tenant model.
 * @param {number} id - The ID of the tenant to delete.
 * @returns {Promise<boolean>} True if a record was deleted, false otherwise.
 */
const remove = async (model, id) => {
    const rowsDeleted = await model.destroy({ where: { id } });
    return rowsDeleted > 0;
};

export const tenantModel = {
    findAll,
    findById,
    findByName,
    create,
    remove,
};