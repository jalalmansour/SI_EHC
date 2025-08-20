import { z } from 'zod';

// Schema for creating a new department
const create = z.object({
    name: z
        .string('Department name is required.')
        .min(2, { message: 'Department name must be at least 2 characters long.' }),
    description: z
        .string()
        .optional(),
});

// Schema for updating an existing department
const update = z.object({
    name: z
        .string()
        .min(2, { message: 'Department name must be at least 2 characters long.' })
        .optional(),
    description: z
        .string()
        .optional(),
});

const departmentSchema = {
    create,
    update,
};

export default departmentSchema;