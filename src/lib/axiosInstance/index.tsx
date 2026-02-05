// import useAuthStore from "@/src/store/authStore";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios, {
//   AxiosInstance,
//   AxiosResponse,
//   InternalAxiosRequestConfig,
// } from "axios";

// const ROOT_URL = process.env.EXPO_PUBLIC_API_URL;
// const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
// const CUSTOM_BASE_URL =
//   "https://menovia-backend-285086043355.us-central1.run.app";

// // Create an axios instance
// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: ROOT_URL,
//   // timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     "api-key": API_KEY,
//   },
// });

// // Request interceptor for adding auth token
// axiosInstance.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       console.log("token:", token);
//       return config;
//     } catch (error) {
//       console.error("Error in request interceptor:", error);
//       return config;
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for handling 401 Unauthorized errors
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: any) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshTokenValue = await AsyncStorage.getItem("refresh_token");

//         if (refreshTokenValue) {
//           // Make the refresh token request directly with axios
//           // This avoids circular dependency with authApi
//           const response = await axios.post(
//             `${ROOT_URL}/auth/refresh-token`,
//             { refresh_token: refreshTokenValue },
//             {
//               headers: { "Content-Type": "application/json" },
//               timeout: 10000,
//             }
//           );

//           if (response.data.access_token) {
//             // Store new tokens
//             await AsyncStorage.setItem("token", response.data.access_token);
//             if (response.data.refresh_token) {
//               await AsyncStorage.setItem(
//                 "refresh_token",
//                 response.data.refresh_token
//               );
//             }

//             // Update the original request with new token
//             originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

//             // Retry the original request
//             return axiosInstance(originalRequest);
//           }
//         }

//         // If refresh fails or no refresh token, clear auth state
//         await useAuthStore.getState().clearAuthState();
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         // Clear auth state on refresh failure
//         await useAuthStore.getState().clearAuthState();
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import useAuthStore from "@/src/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const ROOT_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const CUSTOM_BASE_URL = "https://api.menoviahealth.com/api/v1/chat/messages";

//const CUSTOM_BASE_URL ="https://menovia-backend-285086043355.us-central1.run.app";

// Shared interceptor configuration function
const setupInterceptors = (instance: AxiosInstance, baseURL: string) => {
  // Request interceptor for adding auth token
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("token:", token);
        return config;
      } catch (error) {
        console.error("Error in request interceptor:", error);
        return config;
      }
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor for handling 401 Unauthorized errors
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: any) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshTokenValue = await AsyncStorage.getItem("refresh_token");

          if (refreshTokenValue) {
            // Make the refresh token request
            const response = await axios.post(
              `${ROOT_URL}/auth/refresh-token`,
              { refresh_token: refreshTokenValue },
              {
                headers: { "Content-Type": "application/json" },
                timeout: 10000,
              },
            );

            if (response.data.access_token) {
              // Store new tokens
              await AsyncStorage.setItem("token", response.data.access_token);
              if (response.data.refresh_token) {
                await AsyncStorage.setItem(
                  "refresh_token",
                  response.data.refresh_token,
                );
              }

              // Update the original request with new token
              originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

              // Retry the original request with the correct instance
              return instance(originalRequest);
            }
          }

          // If refresh fails or no refresh token, clear auth state
          await useAuthStore.getState().clearAuthState();
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Clear auth state on refresh failure
          await useAuthStore.getState().clearAuthState();
        }
      }

      return Promise.reject(error);
    },
  );
};

// Create primary axios instance (for ROOT_URL)
const axiosInstance: AxiosInstance = axios.create({
  baseURL: ROOT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create custom axios instance (for CUSTOM_BASE_URL)
const customAxiosInstance: AxiosInstance = axios.create({
  baseURL: CUSTOM_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

// Setup interceptors for both instances
setupInterceptors(axiosInstance, ROOT_URL);
setupInterceptors(customAxiosInstance, CUSTOM_BASE_URL);

// Export both instances
export default axiosInstance;
export { customAxiosInstance };
