
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
 * @param {object} models - The admin database models object.
 * @param {object} data - The data for the new user.
 */
const createUser = async (models, data) => {
    const { username, email, password, role = "superadmin", ...rest } = data;

    const user = await models.EhcUser.create({
        username,
        email,
        password,
        role,
        ...rest
    });

    // Return the user without the password
    const userObject = user.get({ plain: true });
    delete userObject.password;

    return userObject;
};

export const ehcUserModel = {
    findById,
    findByEmail,
    createUser,
};