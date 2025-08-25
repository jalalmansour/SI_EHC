import * as response from "@utils/response";

/**
 * Creates a middleware to authorize users based on a required permission from their JWT payload.
 *
 * This middleware MUST run *after* the `authenticateUser` middleware, as it relies on
 * `req.userPermissions` being attached to the request object.
 *
 * @param {string} requiredPermission - The single permission string required to access the route (e.g., 'departments:delete').
 * @returns An Express middleware function.
 */
export const authorizeUser = (requiredPermission) => {
    // This is the actual middleware function that Express will execute.
    return (req, res, next) => {
        // 1. Get the permissions array that the `authenticateUser` middleware should have attached.
        // We default to an empty array for safety in case the token is malformed or the property is missing.
        const userPermissions = req.userPermissions || [];

        // 2. Check if the user's list of permissions includes the one required for this route.
        if (userPermissions.includes(requiredPermission)) {
            // 3. If they have the permission, everything is fine. Proceed to the next handler (the controller).
            return next();
        }

        // 4. If the check fails, the user is authenticated but not authorized for this specific action.
        // Send a 403 Forbidden response using your response utility.
        return response.forbidden(
            res,
            null,
            "You do not have permission to perform this action."
        );
    };
};


/**
 * Creates a middleware to authorize a user based on their single assigned role.
 *
 * This middleware MUST run *after* an authentication middleware that attaches the user's
 * information, including their role, to the request object (e.g., at `req.user.role`).
 *
 * @param {...string} allowedRoles - A list of role strings that are allowed to access the route (e.g., 'super-admin', 'manager').
 * @returns An Express middleware function that checks the user's role.
 */
export const authorizeRole = (...allowedRoles) => {
    // This is the actual middleware function that Express will execute.
    return (req, res, next) => {
        // 1. Get the user object that the authentication middleware should have attached.
        const user = req.user;

        // 2. Safely get the user's single role. It should be a string.
        // Default to null if user or role is not defined.
        const userRole = user?.role || null;

        // 3. Check if the user's role is included in the list of roles allowed for this route.
        if (userRole && allowedRoles.includes(userRole)) {
            // 4. If the user has a permitted role, they are authorized. Proceed to the next handler.
            return next();
        }

        // 5. If the check fails, the user is authenticated but not authorized.
        // Send a 403 Forbidden response.
        return response.forbidden(
            res,
            null,
            "You do not have the necessary role to perform this action."
        );
    };
};