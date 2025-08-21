// src/app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import appConfig from "@config/appConfig";
import apiRoutes from "@routes/index";
import {errorHandler} from "./middlewares/errorHandler"; // Import the main router

/**
 * Creates and configures an Express application instance.
 * @returns The configured Express application.
 */
export const createApp = () => {
    const app = express();

    // --- Middlewares ---
    // Enable Cross-Origin Resource Sharing (CORS) with specific options
    app.use(cors({
        origin: 'http://localhost:3000', // Your frontend development URL
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        credentials: true,  // Allow cookies to be sent
        allowedHeaders: ["Content-Type", "Authorization"] // Explicitly allow these headers
    }));

    // Parse incoming JSON payloads
    app.use(express.json());

    // Parse cookies from incoming requests
    app.use(cookieParser());


    // --- Routes ---
    // Mount the main API router under the "/api" prefix
    app.use("/api", apiRoutes);

    // use this error handler middleware for all routes to catch errors
    app.use(errorHandler);
    return app;
};



/**
 * Starts the Express server on the configured host and port.
 * @param app - The Express application instance to start.
 */
export const startServer = (app) => {
    const { port, host } = appConfig;

    app.listen(port, host, () => {
        console.log(`🚀 Server is running on http://${host}:${port}`);
    });
};