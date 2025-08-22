import { z } from 'zod';

// Define a schema for a single budget allocation
const allocationSchema = z.object({
    trainingDomainId: z.number().int().positive(),
    allocatedBudget: z.number().positive(),
});

const createBudgetSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    year: z.number().int().min(2000),
    totalBudget: z.number().positive(),
    transversalPercentage: z.number().min(0).max(100),
    metierPercentage: z.number().min(0).max(100),
    description: z.string().optional(),
    allocations: z.array(allocationSchema).optional(),
});

const updateBudgetSchema = z.object({
    name: z.string().min(2).optional(),
    year: z.number().int().min(2000).optional(),
    totalBudget: z.number().positive().optional(),
    transversalPercentage: z.number().min(0).max(100).optional(),
    metierPercentage: z.number().min(0).max(100).optional(),
    description: z.string().optional(),
    // J'ai ajouté cette ligne. Elle permettra de mettre à jour le tableau "allocations".
    allocations: z.array(allocationSchema).optional(),
});

const budgetSchema = {
    create: createBudgetSchema,
    update: updateBudgetSchema,
};

export default budgetSchema;