import {Op} from "sequelize";

/**
 * Finds an EHC user by ID, excluding the password.
 * @param {object} models - The admin database models object.
 * @param {number} id - The ID of the EHC user.
 */
const findById = async (models, id) => {
    return await models.EhcUser.findByPk(id, {
        attributes: { exclude: ["password"] },
    });
};

/**
 * Finds an EHC user by email, including the password for authentication.
 * @param {object} models - The admin database models object.
 * @param {string} email - The email of the EHC user.
 */
const findByEmail = async (models, email) => {
    return await models.EhcUser.findOne({ where: { email } });
};


/**
 * Creates a new EHC user.
 * This function is now generic and does not set a default role.
 * @param {object} models - The admin database models object.
 * @param {object} data - The complete data for the new user, including the role.
 */
const createUser = async (models, data) => {
    // The function no longer de-structures or sets a default role.
    // It simply passes the provided data to the create method.
    const user = await models.EhcUser.create(data);

    // Return the user without the password
    const userObject = user.get({ plain: true });
    delete userObject.password;

    return userObject;
};

/**
 * Updates an EHC user by their ID.
 * @param {object} models - The admin database models object.
 * @param {number} id - The ID of the user to update.
 * @param {object} data - An object with the fields to update.
 * @returns {Promise<object|null>} The updated user object, or null if not found.
 */
const updateUser = async (models, id, data) => {
    const user = await models.EhcUser.findByPk(id);
    if (!user) {
        return null; // User not found
    }

    await user.update(data);

    // Return the updated user, excluding the password
    return await findById(models, id);
};

/**
 * Checks if a username or email is already taken by another user.
 * @param {object} models - The admin database models object.
 * @param {object} options - Contains username, email, and the userId to exclude.
 * @param {string} options.username - The username to check.
 * @param {string} options.email - The email to check.
 * @param {number} options.excludeId - The ID of the user to exclude from the search.
 * @returns {Promise<object|null>} The found user object, or null if none is found.
 */
const findByUsernameOrEmailExcludingId = async (models, { username, email, excludeId }) => {
    const queryConditions = [];
    if (username) queryConditions.push({ username });
    if (email) queryConditions.push({ email });

    if (queryConditions.length === 0) {
        return null; // Nothing to check
    }

    return await models.EhcUser.findOne({
        where: {
            [Op.or]: queryConditions,
            id: { [Op.ne]: excludeId } // Exclude the current user from the check
        }
    });
};


export const ehcUserModel = {
    findById,
    findByEmail,
    createUser,
    updateUser,
    findByUsernameOrEmailExcludingId
};