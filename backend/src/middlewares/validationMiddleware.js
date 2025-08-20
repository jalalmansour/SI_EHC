import { ZodError } from "zod";
import * as response from "@utils/response";

export const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = {};

                error.issues.forEach((err) => {
                    const field = err.path.join(".");
                    if (!formattedErrors[field]) {
                        formattedErrors[field] = [];
                    }
                    formattedErrors[field].push(err.message);
                });

                return response.validationErrors(res, formattedErrors);
            }

            console.error("An unexpected validation error occurred:", error);
            return response.error(res, null, "Invalid request data");
        }
    };
};