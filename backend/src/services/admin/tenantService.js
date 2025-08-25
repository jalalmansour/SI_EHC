import { tenantModel } from "@models/admin/tenantModel";
import { getTenantConnection } from "@utils/connectionManager";
import { AppError } from "@utils/errors";
import { getAdminModels } from "../../utils/connectionManager";

/**
 * Retrieves all tenants from the super-admin database.
 * @returns {Promise<Array>} An array of all tenant objects.
 */
const getAllTenants = async () => {
    const { Tenant } = getAdminModels();
    return await tenantModel.findAll(Tenant);
};

/**
 * Creates a new tenant, provisions their database, and syncs the schema.
 * @param {object} req - The Express request object, containing tenant data in `req.body`.
 * @returns {Promise<object>} The newly created tenant object.
 * @throws {AppError} If the tenant name already exists or if the database provisioning fails.
 */
const createTenant = async (req) => {
    const tenantData = req.body;
    const { Tenant } = getAdminModels();

    // 1. Check if a tenant with this name already exists.
    const existingTenant = await tenantModel.findByName(Tenant, tenantData.name);
    if (existingTenant) {
        throw new AppError("A tenant with this name already exists.", 409);
    }

    // 2. Create the tenant record in the super-admin database.
    const newTenant = await tenantModel.create(Tenant, tenantData);

    try {
        // 3. Get the connection for the new tenant (creates DB if not exists).
        const { sequelize } = await getTenantConnection(newTenant.id);

        // 4. Sync schema for the new tenant.
        await sequelize.sync();

        // (Optional) Seed default tenant data here if needed.
        // await seedDefaultTenantData(newTenant.id);

    } catch (error) {
        // Rollback: If any part of the provisioning fails, delete the tenant record.
        await tenantModel.remove(Tenant, newTenant.id);
        console.error("Failed to provision tenant database:", error);
        throw new AppError(
            "Could not create the tenant database. Operation rolled back.",
            500
        );
    }

    return newTenant;
};

const tenantService = {
    createTenant,
    getAllTenants,
};

export default tenantService;