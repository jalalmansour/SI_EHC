import { userModel } from "@models/userModel";
import { AppError } from "../utils/errors";

/**
 * Retrieves the public profile for the currently authenticated user.
 * @param {object} req - The Express request object, containing `req.models` and the user's ID in `req.userId`.
 * @returns {Promise<Object>} The user's public profile object.
 * @throws {AppError} If the user is not found.
 */
const getAuthenticatedUser = async (req) => {
    const { models, userId: id } = req;
    const userProfile = await userModel.findPublicById(models, id);

    if (!userProfile) {
        throw new AppError("User not found", 404);
    }
    return userProfile;
};


const getUserProfile = async (req) => {
    const { models } = req;
    const { id } = req.params;
    const userProfile = await userModel.findById(models, id);
    if (!userProfile) {
        throw new AppError("User not found", 404);
    }
    return userProfile;
}

/**
 * Updates the profile for the currently authenticated user.
 * @param {object} req - The Express request object, containing `req.models`, `req.userId`, and the update data in `req.body`.
 * @returns {Promise<Object>} The updated user profile.
 * @throws {AppError} If the user is not found.
 */
const updateUser = async (req) => {
    const { models } = req;
    const { id } = req.params;
    const data = req.body;

    console.log(id);
    // The updateUser model function should return the updated user object.
    const updatedUser = await userModel.updateUser(models, id, data);

    if (!updatedUser) {
        throw new AppError("User not found", 404);
    }
    return updatedUser;
};

/**
 * Deletes a user specified by an ID in the request parameters.
 * @param {object} req - The Express request object, containing `req.models` and the user ID in `req.params.id`.
 * @returns {Promise<void>}
 * @throws {AppError} If the user is not found.
 */
const deleteUser = async (req) => {
    const { models } = req;
    const { id } = req.params; // Assuming ID comes from route params like /users/:id
    const wasDeleted = await userModel.remove(models, id);

    if (!wasDeleted) {
        throw new AppError("User not found", 404);
    }
};

/**
 * Overwrites the direct permissions for a specific user.
 * @param {object} req - The Express request object, containing `req.models`, the user ID in `req.params.id`, and permission IDs in `req.body.permissionIds`.
 * @returns {Promise<void>}
 * @throws {AppError} If the user is not found.
 */
const setDirectPermissions = async (req) => {
    const { models } = req;
    const { id } = req.params;
    const { permissionIds } = req.body;

    if (!Array.isArray(permissionIds)) {
        // This should ideally be handled in a validation middleware,
        // but throwing an error here is also valid.
        throw new AppError("permissionIds must be an array.", 400);
    }

    const user = await userModel.findById(models, id);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    await user.setDirectPermissions(permissionIds);
};

const userService = {
    getUserProfile,
    updateUser,
    deleteUser,
    setDirectPermissions,
    getAuthenticatedUser
};

export default userService;