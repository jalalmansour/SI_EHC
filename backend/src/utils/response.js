// src/utils/response.js

/**
 * Sends a 200 OK success response.
 * @param res - The Express response object.
 * @param data - The payload to send in the response.
 * @param message - An optional descriptive message.
 */
export const success = (res, data, message = "success") => {
    res.status(200).json({
        ok: true,
        message,
        data
    });
};

/**
 * Sends a 500 Internal Server Error response.
 * Used for unexpected server-side errors.
 * @param res - The Express response object.
 * @param data - Optional error data or null.
 * @param message - An optional descriptive message.
 */
export const error = (res, data, message = "error") => {
    res.status(500).json({
        ok: false,
        message,
        data,
    });
};

/**
 * Sends a 404 Not Found response.
 * Used when a requested resource could not be found.
 * @param res - The Express response object.
 * @param data - Optional data or null.
 * @param message - An optional descriptive message.
 */
export const notFound = (res, data, message = "not found") => {
    res.status(404).json({
        ok: false,
        message,
        data,
    });
};

/**
 * Sends a 401 Unauthorized response.
 * Used when authentication is required but has failed or has not been provided.
 * @param res - The Express response object.
 * @param data - Optional data or null.
 * @param message - An optional descriptive message.
 */
export const unauthorized = (res, data, message = "unauthorized") => {
    res.status(401).json({
        ok: false,
        message,
        data,
    });
};

/**
 * Sends a 422 Unprocessable Entity response.
 * Used for validation errors.
 * @param res - The Express response object.
 * @param errors - An object containing field-specific validation errors.
 */
export const validationErrors = (res, errors) => {
    res.status(422).json({
        ok: false,
        message: "Validation error",
        errors,
    });
};

/**
 * Sends a 403 Forbidden response.
 * Used when the server understands the request but refuses to authorize it.
 * The user is authenticated, but lacks permission to access the resource.
 * @param res - The Express response object.
 * @param data - Optional data or null.
 * @param message - An optional descriptive message.
 */
export const forbidden = (res, data, message = "forbidden") => {
    res.status(403).json({
        ok: false,
        message,
        data,
    });
};

/**
 * Sends a 400 Bad Request response.
 * Used for malformed request syntax or other client-side errors.
 * @param res - The Express response object.
 * @param data - Optional data or null.
 * @param message - An optional descriptive message.
 */
export const badRequest = (res, data, message = "bad request") => {
    res.status(400).json({
        ok: false,
        message,
        data,
    });
};

/**
 * Sends a 201 Created response.
 * Used after a new resource has been successfully created.
 * @param res - The Express response object.
 * @param data - The newly created resource to send in the response.
 * @param message - An optional descriptive message.
 */
export const created = (res, data, message = "resource created successfully") => {
    res.status(201).json({
        ok: true,
        message,
        data
    });
};

/**
 * Sends a 204 No Content response.
 * Used after a successful operation that doesn't need to return any data (e.g., DELETE).
 * @param res - The Express response object.
 */
export const noContent = (res) => {
    res.status(204).send();
};

