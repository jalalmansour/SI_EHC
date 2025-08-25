// src/app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import appConfig from "@config/appConfig";
import { errorHandler } from "./middlewares/errorHandler";

import tenantApiRouter from "@routes/index";
import adminApiRouter from "@routes/adminRoutes";


export const createApp = () => {
    const app = express();

    // --- Middlewares (These remain the same) ---
    app.use(cors({
        origin: ['http://localhost:3000', 'http://app.localhost:3000', 'http://admin.localhost:3000'], // Add all local frontend domains
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.use(express.json());
    app.use(cookieParser());

    // This middleware inspects the hostname and decides which router to use.
    // It replaces the old `app.use("/api", apiRoutes);` line.
    app.use("/api", (req, res, next) => {
        const hostname = req.hostname;

        // Check if the request is for the admin domain.
        if (hostname === 'admin.localhost' || hostname === 'admin.yourdomain.com') {
            // If it is, pass the request to the admin router.
            adminApiRouter(req, res, next);
        } else {
            // For any other hostname (like app.localhost), use the tenant router.
            tenantApiRouter(req, res, next);
        }
    });

    // This comes AFTER the routers, so it can catch errors from both.
    app.use(errorHandler);

    return app;
};

/**
 * Starts the Express server on the configured host and port.
 * (This function does not need any changes)
 */
export const startServer = (app) => {
    const { port, host } = appConfig;

    app.listen(port, host, () => {
        console.log(`🚀 Server is running on http://${host}:${port}`);
        console.log(`✅ Tenant API available via http://app.localhost:${port}/api`);
        console.log(`✅ Admin API available via http://admin.localhost:${port}/api`);
    });
};