import {Permission, Role, User} from "../schemas";

/**
 * (PUBLIC-SAFE) Finds a user by their ID and returns only public-facing fields.
 * @param {number} id - The ID of the user to find.
 * @returns A user profile object without sensitive data, or null if not found.
 */
const findPublicById = async (id) => {
    return await User.findByPk(id, {
        attributes: { exclude: ["password", "refreshToken"] }, // also hide refreshToken
        include: {
            model: Role,
            as: "role",
            attributes: ["name"], // only fetch 'name' from Role },
        }
    });
};

/**
 * Finds a user by their unique ID.
 * @param {number} id - The ID of the user to find.
 * @returns The user object or null if not found.
 */
const findById = async (id) => {
    return User.findByPk(id, {
        include: {
            model: Role,
            as: "role",
            attributes: ["name"],
        },
    });
};

/**
 * Finds a user by their unique email address.
 * @param {string} email - The email of the user to find.
 * @returns The user object or null if not found.
 */
const findByEmail = async (email) => {
    return User.findOne({
        where: { email },
    });
};

/**
 * Finds a user by ID, including their role and all associated permissions.
 * This is the primary function for fetching a fully-hydrated user object for auth purposes.
 * @param {number} id - The ID of the user to find.
 * @returns {Promise<object|null>} The user object with their role and permissions, or null if not found.
 */
const findByIdWithPermissions = async (id) => {
    return User.findByPk(id, {
        attributes: { exclude: ["password", "refreshToken"] },
        include: [{
            model: Role,
            as: "role",
            attributes: ["name"], // Get the role's name

            include: { // Nested include to get the permissions for the role
                model: Permission,
                as: 'permissions',
                attributes: ['name'], // We only need the permission name (e.g., 'users:create')
                through: {attributes: []} // Crucial: Excludes the join table (RolePermissions) from the result
            },
        },
            {
                model: Permission,
                as: 'directPermissions',
                attributes: ['name'],
                through: { attributes: [] } // Exclude the UserPermissions join table
            }
        ]
    });
};

/**
 * Creates a new user in the database.
 * @param {object} data - The user data, including username, email, password, firstName, lastName, phone, roleId.
 * @returns The newly created user object.
 */
const createUser = async (data) => {
    const { username, email, password, firstName, lastName, phone, roleId, departmentId } = data;

    // 2. Pass departmentId to the create method
    const user = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
        phone,
        roleId,
        departmentId, // Added the new field
    });

    // 2️⃣ Fetch the user again including the role
    return await findPublicById(user.id);
};

/**
 * Updates a user by ID.
 * @param {number} id - The ID of the user to update.
 * @param {object} data - The fields to update (e.g. { firstName, lastName, phone }).
 * @returns {Promise<object|null>} The updated user object, or null if not found.
 */
const updateUser = async (id, data) => {
    const [rowsAffected] = await User.update(data, { where: { id } });

    if (rowsAffected > 0) {
        return await findPublicById(id); // Return the sanitized user
    }
    return null;
};

/**
 * Deletes a user by their ID.
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<boolean>} True if a record was deleted, false otherwise.
 */
const remove = async (id) => {
    await User.destroy({
        where: { id }
    });
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
