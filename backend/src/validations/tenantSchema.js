import { z } from 'zod';

const create = z.object({
    name: z.string().min(2, "Tenant name is required."),
    dbUri: z.string().url("A valid database URI is required."),
});

const tenantSchema = {
    create,
};

export default tenantSchema;