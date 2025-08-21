/**
 * A universal utility to process API errors from a Redux thunk and apply them to a React Hook Form instance.
 *
 * @param {object} error The serialized error object from a thunk's `rejectWithValue`.
 * @param {Function} setError The `setError` function from `useForm` to apply field-specific errors.
 * @returns {string} A user-friendly error message suitable for a global notification (e.g., a toast).
 */
export const handleApiError = (error, setError) => {
    // Case 1: Handle backend validation errors (HTTP 422)
    if (error.status === 422 && error.data?.errors) {
        const backendErrors = error.data.errors;

        // Apply each validation error to its corresponding form field
        Object.entries(backendErrors).forEach(([fieldName, messages]) => {
            setError(fieldName, {
                type: 'server', // Use 'server' or 'manual' to indicate the source
                message: messages[0], // React Hook Form typically displays one message per field
            });
        });

        // Return a generic message for the toast, as fields are now highlighted
        return "Validation failed. Please check the fields for errors.";
    }

    // Case 2: Handle all other types of errors (e.g., 401, 403, 500)
    // Return the primary message from the API response for the toast.
    return error.message || 'An unexpected error occurred. Please try again.';
};