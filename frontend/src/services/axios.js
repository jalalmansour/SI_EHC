import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

// This function takes a raw Axios error and converts it into our clean, serializable format.
const serializeError = (error) => {
    return {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
    };
};

// --- 1. The PUBLIC Axios Instance ---
const axiosPublic = axios.create({ baseURL: BASE_URL });

// Give the public instance its own simple interceptor for error serialization.
axiosPublic.interceptors.response.use(
    (response) => response,
    (error) => {
        // When a public request fails, serialize the error and reject with it.
        return Promise.reject(serializeError(error));
    }
);

export default axiosPublic;


// --- 2. The PRIVATE Axios Instance ---
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

let interceptorAttached = false;

export const setupInterceptors = (store) => {
    if (interceptorAttached) return;

    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // Handle token refresh for 401s
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    await axiosPublic.post("/auth/refresh-token", {}, { withCredentials: true });
                    return axiosPrivate(originalRequest);
                } catch (refreshError) {
                    const { logout } = await import('../redux/thunks/authThunks');
                    store.dispatch(logout());
                    // Serialize the refresh error before rejecting
                    return Promise.reject(serializeError(refreshError));
                }
            }

            // For all other errors on the private instance, use the same serializer.
            return Promise.reject(serializeError(error));
        }
    );

    interceptorAttached = true;
};