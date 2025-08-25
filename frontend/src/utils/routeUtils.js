/**
 * Returns the full dashboard path for a user based on their role name.
 * @param {string} roleName - The name of the role (e.g., "SUPER ADMIN", "RRH").
 * @returns {string} The full, absolute path for that role's dashboard (e.g., "/super-admin/dashboard").
 */
export const getDashboardPathForRole = (roleName) => {
    // Normalize the role name to uppercase for consistent matching.
    const role = roleName?.toUpperCase();

    switch (role) {
        case 'RRH':
            return '/rrh/dashboard';
        case 'EMPLOYEE':
            return '/employee/dashboard';
        case 'MANAGER':
            return '/manager/dashboard';
        case 'RF':
            return '/responsable-formation/dashboard';
        case 'RH':
            return '/rh/dashboard';
        case 'FI':
            return '/formateur-interne/dashboard';
        case 'OF':
            return '/organism-formation/dashboard';
        case 'SUPER ADMIN':
            return '/super-admin/dashboard';
        default:
            return '/login';
    }
};