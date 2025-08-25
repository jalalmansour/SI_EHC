// src/controllers/admin/ehcUserController.js

import * as response from "@utils/response";
import { catchAsync } from "@utils/catchAsync";
import { ehcUserService } from "../../services/admin/ehcUserService";

/**
 * Handles updating an EHC user's details.
 */
const updateUser = catchAsync(async (req, res) => {
    // This calls the correct service function.
    const updatedUser = await ehcUserService.updateEhcUser(req);
    return response.success(res, updatedUser, "Admin user updated successfully.");
});


export const ehcUserController = {
    updateUser,
    // You might add other functions here later, like deleteUser, getUserById, etc.
};