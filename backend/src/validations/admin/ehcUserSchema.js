// src/validations/ehcUserSchema.js

import { z } from 'zod';

// --- Base Schema ---
// Defines the core fields and their constraints.
const baseSchema = z.object({
    email: z
        .string({ required_error: "Email is required." })
        .email({ message: "Invalid email address." }),
    username: z
        .string({ required_error: "Username is required." })
        .min(3, { message: "Username must be at least 3 characters long." }),
});


// --- Register Schema ---
// Extends the base schema and adds a strict password requirement.
const register = baseSchema.extend({
    password: z
        .string({ required_error: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters long." })
        // Example of a regex for password complexity
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character." }
        ),
});


// --- Update Schema ---
// Takes the base fields and makes them all optional for partial updates.
// Also adds the 'isActive' boolean field.
const update = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address." })
        .optional(),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .optional(),
    isActive: z
        .boolean()
        .optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field (email, username, or isActive) must be provided for an update."
});


export const ehcUserSchema = {
    register,
    update,
};