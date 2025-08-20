import { z } from "zod";

// Password validation
const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(/[@$!%*?&]/, "Password must include at least one special character");

// Username validation
const usernameSchema = z.string()
    .min(6, "Username must be at least 6 characters long")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores")
    .refine((value) => !/^\d+$/.test(value), { message: "Username cannot be only numbers" })
    .refine((value) => !/[@$!%*?&]/.test(value), { message: "Username cannot contain special characters like @$!%*?&" });

// Name validation
const nameSchema = z.string()
    .min(1, "This field is required")
    .max(50, "Cannot exceed 50 characters")
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/, "Can only contain letters and basic punctuation");

// Phone validation
const phoneSchema = z.string()
    .min(8, "Phone must be at least 8 digits")
    .max(20, "Phone cannot exceed 20 digits")
    .regex(/^[0-9+()-]+$/, "Phone can only contain numbers, +, -, (, )");

// Login schema
const login = z.object({
    email: z.string().trim().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long")
});

// Register schema
const register = z.object({
    username: usernameSchema,
    email: z.string().trim().min(1, "Email is required").email("Invalid email format"),
    firstName: nameSchema,
    lastName: nameSchema,
    phone: phoneSchema,
    roleId: z.number()
        .int("Role ID must be an integer")
        .positive("Role ID must be a positive number")
        .refine((val) => !isNaN(val), { message: "Role ID must be a number" }),
    departmentId: z.number()
        .int("Role ID must be an integer")
        .positive("Role ID must be a positive number")
        .refine((val) => !isNaN(val), { message: "Role ID must be a number" }),
});

// Reset password schema
const setPassword = z.object({
    password: passwordSchema,
    confirmPassword: passwordSchema
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

// Change password (authenticated user)
const changePassword = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: passwordSchema,
});

const authSchema = {
    login,
    register,
    setPassword,
    changePassword
};

export default authSchema;
