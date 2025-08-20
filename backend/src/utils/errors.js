// src/utils/errors.js
export class AppError extends Error {
    /**
     * @param {string} message - Human-readable error message
     * @param {number} statusCode - HTTP status code (default 400)
     */
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // marks it as a known error
        Error.captureStackTrace(this, this.constructor);
    }
}
