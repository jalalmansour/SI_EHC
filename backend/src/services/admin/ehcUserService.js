import {AppError} from "@utils/errors";
import {getAdminModels} from "@utils/connectionManager";
import {ehcUserModel} from "@models/admin/ehcUserModel";

/**
 * --- PROTECTED: Updates an EHC user's details ---
 * This function contains the business logic for the update operation.
 */
const updateEhcUser = async (req) => {
    // 1. Get data from the request
    const { id } = req.params; // The ID of the user to update
    const validatedData = req.body; // The data is already clean thanks to Zod
    const adminModels = getAdminModels();

    // 2. Verify the user exists before trying to update
    const userToUpdate = await adminModels.EhcUser.findByPk(id);
    if (!userToUpdate) {
        throw new AppError("Admin user not found.", 404);
    }

    // 3. Enforce Business Rule: Check for uniqueness if username or email is being changed.
    if (validatedData.username || validatedData.email) {
        const existingUser = await ehcUserModel.findByUsernameOrEmailExcludingId(adminModels, {
            username: validatedData.username,
            email: validatedData.email,
            excludeId: id,
        });

        if (existingUser) {
            throw new AppError("Username or email is already in use by another account.", 409);
        }
    }

    // 4. Perform the Update using the correct model layer
    return await ehcUserModel.updateUser(adminModels, id, validatedData);
};

export const ehcUserService = {
    updateEhcUser,
};