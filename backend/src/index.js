import "tsconfig-paths/register";
import "dotenv/config";

import { createApp, startServer } from "./app";
import {sequelize} from "./schemas";
import {getAdminConnection, initAdminConnection} from "./utils/connectionManager";

(async () => {
    try {
        // 1. Connect to DB
        await initAdminConnection();

        // 2. Get the newly created super-admin connection instance.
        const adminConnection = getAdminConnection();

        // 3. Sync ONLY the models associated with the super-admin connection (Tenants, TenantUsers).
        await adminConnection.sync({alter: true}); // Use { alter: true } for development
        console.log("✅ Admin models synced successfully.");


        // 3. Create app
        const app = createApp();

        // 4. Start server
        startServer(app);
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
})();
