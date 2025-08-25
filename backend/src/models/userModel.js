/**
 * (PUBLIC-SAFE) Finds a user by ID for the current tenant.
 */
const findPublicById = async (models, id) => {
    return await models.User.findByPk(id, {
        attributes: { exclude: ["password", "refreshToken"] },
        include: {
            model: models.Role,
            as: "role",
            attributes: ["name"],
        }
    });
};

/**
 * Finds a user by ID (includes role).
 */
const findById = async (models, id) => {
    return await models.User.findByPk(id, {
        include: {
            model: models.Role,
            as: "role",
            attributes: ["name"],
        },
    });
};

/**
 * Finds a user by email.
 */
const findByEmail = async (models, email) => {
    return await models.User.findOne({ where: { email } });
};

/**
 * Finds a user by ID with roles + permissions.
 */
const findByIdWithPermissions = async (models, id) => {
    return await models.User.findByPk(id, {
        attributes: { exclude: ["password", "refreshToken"] },
        include: [
            {
                model: models.Role,
                as: "role",
                attributes: ["name"],
                include: {
                    model: models.Permission,
                    as: "permissions",
                    attributes: ["name"],
                    through: { attributes: [] }
                },
            },
            {
                model: models.Permission,
                as: "directPermissions",
                attributes: ["name"],
                through: { attributes: [] }
            }
        ]
    });
};

/**
 * Creates a new user.
 */
const createUser = async (models, data) => {
    const { username, email, password, firstName, lastName, phone, roleId, departmentId } = data;

    const user = await models.User.create({
        username, email, password, firstName, lastName, phone, roleId, departmentId
    });

    return await findPublicById(models, user.id);
};

/**
 * Updates a user (whitelisted fields only).
 */
const updateUser = async (models, id, data) => {
    const [rowsAffected] = await models.User.update(data, { where: { id } });
    if (rowsAffected > 0) {
        return await findPublicById(models, id);
    }
    return null;
};

/**
 * Deletes a user.
 */
const remove = async (models, id) => {
    const rowsDeleted = await models.User.destroy({ where: { id } });
    return rowsDeleted > 0;
};

export const userModel = {
    findById,
    findByEmail,
    createUser,
    findPublicById,
    updateUser,
    findByIdWithPermissions,
    remove
};
