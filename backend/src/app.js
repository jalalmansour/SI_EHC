// src/app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import appConfig from "./config/appConfig.js";
import apiRoutes from "./routes/index.js"; // This now contains all your routes
import { errorHandler } from "./middlewares/errorHandler.js";

/**
 * Creates and configures an Express application instance.
 * @returns {Express.Application} The configured Express application.
 */
export const createApp = () => {
  const app = express();

  // --- Middlewares ---
  app.use(cors({
    origin: 'http://localhost:3000', // Frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  app.use(express.json());
  app.use(cookieParser());

  // --- Routes ---
  app.use("/api", apiRoutes); // All API routes are now consolidated here

  // --- Error handling ---
  app.use(errorHandler);

  return app;
};

/**
 * Starts the Express server.
 * @param {Express.Application} app - The Express application.
 */
export const startServer = (app) => {
  const { host, port } = appConfig;
  app.listen(port, host, () => {
    console.log(`🚀 Server running at http://${host}:${port}`);
  });
};