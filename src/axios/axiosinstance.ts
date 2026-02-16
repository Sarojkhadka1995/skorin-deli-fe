import axios from "axios";
import { getCookie } from "cookies-next";
import { API_CONFIG, COOKIE_CONFIG } from "@/config/app";
const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl, // Set the base URL for all requests
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Dynamically add auth token to headers for each request
    const token = getCookie(COOKIE_CONFIG.accessToken);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage === "Token has expired") {
        try {
          // Attempt to refresh the token
          const response = await axios.post(
            `${API_CONFIG.baseUrl}/auth/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${getCookie(COOKIE_CONFIG.refreshToken)}`,
              },
            },
          );

          // Update the access token
          const { access_token } = response.data;
          // Update the cookie with the new access token
          const { setCookie } = await import("cookies-next");
          setCookie(COOKIE_CONFIG.accessToken, access_token);

          // Retry the original request with the new token
          const originalRequest = error.config;
          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // If refresh token fails, logout user
          const { deleteCookie } = await import("cookies-next");
          deleteCookie(COOKIE_CONFIG.accessToken);
          deleteCookie(COOKIE_CONFIG.refreshToken);
          deleteCookie(COOKIE_CONFIG.loggedIn);
          window.location.href = "/account/login";
          return Promise.reject(refreshError);
        }
      } else {
        // Handle general unauthorized access
        const { deleteCookie } = await import("cookies-next");
        deleteCookie(COOKIE_CONFIG.accessToken);
        deleteCookie(COOKIE_CONFIG.refreshToken);
        deleteCookie(COOKIE_CONFIG.loggedIn);
        window.location.href = "/account/login";
        return Promise.reject(error);
      }
    }

    // Handle other errors as before
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
