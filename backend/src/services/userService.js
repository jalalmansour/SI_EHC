import { userModel } from "@models/userModel";
import {AppError} from "../utils/errors";

/**
 * Retrieves the public profile for a given user ID.
 * This service acts as an intermediary between the controller and the model.
 * @param id - The ID of the user.
 * @returns The user's public profile object.
 * @throws Will throw an error with the message "User not found" if the user does not exist.
 */
const getUserProfile = async (id) => {
    // 1. Call the model layer to fetch the user's public data.
    // The model guarantees this data is safe and contains no password.
    const userProfile = await userModel.findPublicById(id);

    // 2. Handle the business logic case where the user is not found.
    if (!userProfile) {
        throw new AppError("User not found", 404);
    }

    // 3. If found, return the clean profile.
    return userProfile;
};

const updateUser = async (id, data) => {
    const user = userModel.findPublicById(id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return await userModel.updateUser(id, data);
}

/**
 * Deletes a user by their ID.
 * @param {number} userId - The ID of the user to delete.
 * @returns {Promise<void>} Resolves if the deletion is successful.
 * @throws {AppError} If the user is not found.
 */
const deleteUser = async (userId) => {
    const wasDeleted = await userModel.remove(userId);

    // Throw a 404 Not Found error if user not found.
    if (!wasDeleted) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
};

/**
 * Overwrites the direct permissions for a specific user.
 * @param {number} userId - The ID of the user to modify.
 * @param {Array<number>} permissionIds - An array of Permission IDs to assign. An empty array will remove all direct permissions.
 * @returns {Promise<void>}
 */
const setDirectPermissions = async (userId, permissionIds) => {
    // 1. Find the user to ensure they exist.
    const user = await userModel.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    // 2. Use Sequelize's "setter" method for many-to-many associations.
    // This is a powerful method that automatically handles the join table.
    // It will add new entries and remove any that are not in the provided array.
    await user.setDirectPermissions(permissionIds);
};


const userService = {
    getUserProfile,
    updateUser,
    deleteUser,
    setDirectPermissions,
}

export default userService;