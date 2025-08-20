import "tsconfig-paths/register";
import "dotenv/config";

import { createApp, startServer } from "./app";
import {sequelize} from "./schemas";

(async () => {
    try {
        // 1. Connect to DB
        await sequelize.authenticate();
        console.log("✅ Database connection established");

        // 2. Sync models (dev: alter, prod: sync without alter)
        await sequelize.sync();
        console.log("✅ Models synced");


        // 3. Create app
        const app = createApp();

        // 4. Start server
        startServer(app);
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
})();
