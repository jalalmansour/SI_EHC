/**
 * Finds a user by email.
 *
 * @param {object} models - An object containing the Sequelize models.
 * @param {string} email - The email address to search for.
 * @returns {Promise<TenantUser|null>} A promise that resolves to the user instance or null if not found.
 */
const findByEmail = async (models, email) => {
    return await models.TenantUser.findOne({ where: { email } });
};

// Export in the same style as your example
export const tenantUserModel = {
    findByEmail,
};