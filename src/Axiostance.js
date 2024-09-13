import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com", // Replace with your API base URL
    timeout: 15000, // Request timeout in milliseconds
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Optionally set a loading state here if you want to manage loading globally
        Store.dispatch(setDisplayOfLoadingState("flex")); // Dispatch action to set loading to true
        return config;
    },
    (error) => {
        // Handle the request error
        console.log("Request Error");
        Store.dispatch(setDisplayOfLoadingState("none")); // Dispatch action to set loading to true
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle the response
        Store.dispatch(setDisplayOfLoadingState("none"));
        return response;
    },
    (error) => {
        // Handle global errors
        if (!error.response) {
            console.error("Network error:", error.message);
            Store.dispatch(
                setDisplayOfErrorPage({
                    state: "flex",
                    errorStatusCode: null,
                    errorStatusText: "",
                    errorMessage: "Network Error Occurred",
                })
            );
        } else {
            console.error(error.response.statusText, error.response.data.message);
            Store.dispatch(
                setDisplayOfErrorPage({
                    state: "flex",
                    errorStatusCode: error.response.status,
                    errorStatusText: error.response.statusText,
                    errorMessage: error.response.data.message,
                })
            );
        }
        Store.dispatch(setDisplayOfLoadingState("none"));
        return Promise.reject(error);
    }
);

export default axiosInstance;