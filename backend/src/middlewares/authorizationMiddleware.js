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