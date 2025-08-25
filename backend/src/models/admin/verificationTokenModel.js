import { Op } from "sequelize";

/**
 * Finds a verification token by its value in the ADMIN database.
 * @param {object} models - The ADMIN database models.
 * @param {string} token - The token string to search for.
 * @returns {Promise<Object|null>} The token object including the associated TenantUser.
 */
const findByToken = async (models, token) => {
    // Uses the VerificationToken and TenantUser models from the passed-in super-admin models object
    return await models.VerificationToken.findOne({
        where: { token },
        include: { model: models.TenantUser, as: "tenantUser" },
    });
};

/**
 * Creates a new verification token in the ADMIN database.
 * @param {object} models - The ADMIN database models.
 * @param {object} data - Token data including tenantUserId, token, type, and expiresAt.
 * @returns {Promise<Object>} The newly created verification token object.
 */
const create = async (models, data) => {
    // Destructure to ensure we only use the fields we expect
    const { tenantUserId, token, type, expiresAt } = data;
    return await models.VerificationToken.create({
        tenantUserId,
        token,
        type,
        expiresAt,
    });
};

/**
 * Deletes expired tokens from the ADMIN database.
 * @param {object} models - The ADMIN database models.
 * @returns {Promise<number>} The number of deleted tokens.
 */
const deleteExpired = async (models) => {
    const now = new Date();
    return await models.VerificationToken.destroy({
        where: {
            expiresAt: { [Op.lt]: now },
        },
    });
};

const verificationTokenModel = {
    findByToken,
    create,
    deleteExpired,
};

export default verificationTokenModel;
