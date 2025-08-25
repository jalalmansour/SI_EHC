import * as response from "@utils/response";
import { catchAsync } from "@utils/catchAsync";
import userService from "@services/userService";

/**
 * Get the currently authenticated user's information for the current tenant.
 */
const getUser = catchAsync(async (req, res) => {
    const userProfile = await userService.getUserProfile(req);
    return response.success(res, userProfile);
});

const getAuthenticatedUser = catchAsync(async (req, res) => {
    const userProfile = await userService.getAuthenticatedUser(req);
    return response.success(res, userProfile);
});

/**
 * Update a user's profile for the current tenant.
 */
const updateUser = catchAsync(async (req, res) => {
    const updatedUser = await userService.updateUser(req);
    return response.success(res, updatedUser, "User profile updated successfully");
});

/**
 * Delete a user for the current tenant.
 */
const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUser(req);
    response.noContent(res);
});

/**
 * Sets the direct permissions for a user within the current tenant.
 */
const setUserPermissions = catchAsync(async (req, res) => {
    await userService.setDirectPermissions(req);
    response.success(res, null, "User permissions updated successfully.");
});

const userController = {
    getUser,
    updateUser,
    deleteUser,
    setUserPermissions,
    getAuthenticatedUser
};

export default userController;