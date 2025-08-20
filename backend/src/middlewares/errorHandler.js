import {AppError} from "../utils/errors";
import * as response from "../utils/response";

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof AppError) {
        switch (err.statusCode) {
            case 400: return response.badRequest(res, null, err.message);
            case 401: return response.unauthorized(res, null, err.message);
            case 403: return response.forbidden(res, null, err.message);
            case 404: return response.notFound(res, null, err.message);
            case 422: return response.validationErrors(res, err.errors || {});
            default: return response.error(res, null, err.message);
        }
    }

    // fallback for unexpected errors
    return response.error(res, null, "Internal server error");
};
