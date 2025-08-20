import {Department} from "../schemas"; // Assuming your Sequelize model definition is in /schemas

/**
 * Retrieves all departments from the database, ordered by name.
 * @returns {Promise<Array>} An array of all department objects.
 */
const findAll = async () => {
    return await Department.findAll({
        order: [["name", "ASC"]],
    });
};

/**
 * Finds a single department by its unique ID.
 * @param {number} id - The ID of the department to find.
 * @returns {Promise<Object|null>} The department object or null if not found.
 */
const findById = async (id) => {
    return await Department.findByPk(id);
};

/**
 * Creates a new department in the database.
 * @param {object} data - Department data including name and an optional description.
 * @returns {Promise<Object>} The newly created department object.
 */
const create = async (data) => {
    // Destructuring acts as a security whitelist
    const { name, description } = data;
    return await Department.create({name, description});
};

/**
 * Updates an existing department by its ID.
 * @param {number} id - The ID of the department to update.
 * @param {object} data - The fields to update.
 * @returns {Promise<Object|null>} The updated department object, or null if not found.
 */
const update = async (id, data) => {
    const department = await Department.findByPk(id);
    if (!department) {
        return null; // Signal that the department was not found
    }
    // Whitelist the fields that can be updated
    const { name, description } = data;
    await department.update({ name, description });
    return department;
};

/**
 * Deletes a department by its ID.
 * @param {number} id - The ID of the department to delete.
 * @returns {Promise<boolean>} True if a record was deleted, false otherwise.
 */
const remove = async (id) => {
    const rowsDeleted = await Department.destroy({ where: { id } });
    return rowsDeleted > 0;
};

export const departmentModel = {
    findAll,
    findById,
    create,
    update,
    remove,
};