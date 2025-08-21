// src/controllers/user.js
import * as response from "@utils/response";
import { catchAsync } from "@utils/catchAsync";
import userService from "@services/userService";

/**
 * Get the currently authenticated user's information.
 * Delegates all logic to the service layer and handles the final HTTP response.
 */
const getUser = catchAsync(async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return response.unauthorized(res, null, "Invalid token claims");
    }

    // Delegate to service
    const userProfile = await userService.getUserProfile(userId);

    return response.success(res, userProfile);
});

 const updateUser = catchAsync(async (req, res) => {
     // 1. Get the user ID from the route parameters.
     const { id } = req.params;
     if (!id) {
        return response.unauthorized(res, null, "Unauthorized: Invalid token claims");
    }

    // Delegate to service
    const updatedUser = await userService.updateUser(userId, req.body);

    return response.success(res, updatedUser, "User profile updated successfully");
});

const deleteUser = catchAsync(async (req, res) => {
    // 1. Get the user ID from the route parameters.
    const { id } = req.params;

    await userService.deleteUser(id);

    // 3. On success, send a 204 No Content response.
    response.noContent(res);
});

/**
 * Handles the PUT /api/users/:id/permissions request.
 * Sets the direct permissions for a user.
 */
const setUserPermissions = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const { permissionIds } = req.body; // Expects an array of IDs in the body

    if (!Array.isArray(permissionIds)) {
        response.badRequest(res, null, "permissionIds must be an array.");
    }

    await userService.setDirectPermissions(userId, permissionIds);
    response.success(res, null, "User permissions updated successfully.");
});


const userController = {
    getUser,
    updateUser,
    deleteUser,
    setUserPermissions
 }

export default userController;