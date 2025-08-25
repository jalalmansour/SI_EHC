import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const serializeError = (error) => {
    return {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
    };
};

const axiosPublic = axios.create({ baseURL: BASE_URL });

axiosPublic.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(serializeError(error));
    }
);

export default axiosPublic;

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

let interceptorAttached = false;
let storeRef = null; // Store the store reference

export const setupInterceptors = (store) => {
    if (interceptorAttached) return;

    storeRef = store; // Store the reference

    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    await axiosPublic.post("/auth/refresh-token", {}, { withCredentials: true });
                    return axiosPrivate(originalRequest);
                } catch (refreshError) {
                    // Use the stored reference instead of dynamic import
                    if (storeRef && storeRef.dispatch) {
                        const { logout } = await import('../redux/thunks/authThunks');
                        storeRef.dispatch(logout());
                    }
                    return Promise.reject(serializeError(refreshError));
                }
            }

            return Promise.reject(serializeError(error));
        }
    );

    interceptorAttached = true;
};