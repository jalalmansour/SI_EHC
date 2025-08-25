import * as response from "@utils/response";
import { catchAsync } from "@utils/catchAsync";
import tenantService from "@services/admin/tenantService";

/**
 * POST /api/tenants - Create a new tenant.
 */
const createTenant = catchAsync(async (req, res) => {
    const newTenant = await tenantService.createTenant(req);
    response.created(res, newTenant, "Tenant created and provisioned successfully.");
});

const getAllTenants = catchAsync(async (req, res) => {
    const tenants = await tenantService.getAllTenants();
    response.success(res, tenants, "Tenants retrieved successfully.");
});

export const tenantController = {
    createTenant,
    getAllTenants,
};