import { Sequelize } from 'sequelize';
import { LRUCache } from 'lru-cache';
import { initAdminModels, initTenantModels } from '../schemas';

// This cache will store active, ready-to-use connections for each tenant
const connectionCache = new LRUCache({ max: 100, ttl: 1000 * 60 * 30 }); // Cache for 30 mins

let adminConnection;
let adminModels;

/**
 * Initializes the connection to the main Admin database. This must be called once at server startup.
 */
export const initAdminConnection = async () => {
    console.log('Initializing Admin DB connection...');
    const sequelize = new Sequelize(process.env.DB_ADMIN_URI, { /* db options */ });
    await sequelize.authenticate();
    adminModels = initAdminModels(sequelize);
    adminConnection = sequelize;
    console.log('Admin DB connection established.');
};

/**
 * Gets the database connection for a specific tenant by their ID.
 * @param {number} tenantId - The ID of the tenant.
 * @returns {Promise<object|null>} The tenant's specific models.
 */
export const getTenantConnection = async (tenantId) => {
    if (connectionCache.has(tenantId)) {
        return connectionCache.get(tenantId);
    }

    // 2. Fetch tenant info from super-admin DB...
    const tenant = await adminModels.Tenant.findByPk(tenantId);
    if (!tenant) return null;

    // 3. Create the new connection and models...
    const sequelize = new Sequelize(tenant.dbUri);
    const models = initTenantModels(sequelize);

    // 4. Create the consistent object shape.
    const connectionData = { sequelize, models };

    // 5. Store the FULL object in the cache.
    connectionCache.set(tenantId, connectionData);

    // 6. Return the FULL object.
    return connectionData;
};
/**
 * Gets the initialized models for the Admin database.
 * @returns {object} The super-admin-specific models (Tenant, TenantUser).
 */
export const getAdminModels = () => {
    return adminModels;
};

/**
 * Gets the Sequelize instance for the Admin database connection.
 * @returns {Sequelize} The super-admin connection instance.
 * @throws {Error} If the connection has not been initialized.
 */
export const getAdminConnection = () => {
    if (!adminConnection) {
        throw new Error("Admin connection has not been initialized. Call initAdminConnection() first.");
    }
    return adminConnection;
};