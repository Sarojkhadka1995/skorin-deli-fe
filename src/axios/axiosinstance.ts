import axios from "axios";
import { getCookie } from "cookies-next";
import { API_CONFIG } from "@/config/app";
const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl, // Set the base URL for all requests
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("accessToken")}`,
  },
  // withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here
    // For example, you can add an auth token to the headers
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
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
    // if (error.response?.status === 401) {
    //   const errorMessage = error.response?.data?.message;
    //   if (errorMessage === "Token has expired") {
    //     try {
    //       // Attempt to refresh the token
    //       const response = await axios.post(
    //         `${config.baseUrl}/auth/refresh`,
    //         {},
    //         {
    //           // withCredentials: true,
    //           headers: {
    //             Authorization: `Bearer ${getCookie("refreshToken")}`,
    //           },
    //         },
    //       );

    //       // Update the access token
    //       const { accessToken } = response.data;
    //       // You might want to use a cookie setting utility here
    //       setCookie("accessToken", accessToken);

    //       // Retry the original request
    //       const originalRequest = error.config;
    //       originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
    //       return axios(originalRequest);
    //     } catch (refreshError) {
    //       // If refresh token fails, logout user
    //       window.location.href = "/login";
    //       return Promise.reject(refreshError);
    //     }
    //   } else {
    //     // Handle general unauthorized access
    //     deleteCookie("accessToken");
    //     deleteCookie("refreshToken");
    //     deleteCookie("isLoggedIn");
    //     localStorage.clear();
    //     window.location.href = "/login";
    //     return Promise.reject(error);
    //   }
    // }

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
