// // Import axios and AsyncStorage
// import { refreshToken } from "@/src/api_services/authApi";
// import useAuthStore from "@/src/store/authStore";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios, {
//   AxiosInstance,
//   AxiosResponse,
//   InternalAxiosRequestConfig
// } from "axios";

// // Define the interface for the navigation params
// interface NavigationParams {
//   screen: string;
//   tokenExpired: boolean;
// }

// // Define the API base URL
// // const ROOT_URL = "https://dev-api.menovia.aviyatelemed.com";
// const ROOT_URL = process.env.EXPO_PUBLIC_API_URL;

// // Create an axios instance
// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: ROOT_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
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
//       console.log("token:", token)
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
//           // Attempt to refresh the token
//           const response = await refreshToken(refreshTokenValue);
          
//           if (response.access_token) {
//             // Store new tokens
//             await AsyncStorage.setItem("token", response.access_token);
//             if (response.refresh_token) {
//               await AsyncStorage.setItem("refresh_token", response.refresh_token);
//             }
            
//             // Update the original request with new token
//             originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
            
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


// // src/lib/axiosInstance/index.ts
// import { refreshToken } from "@/src/api_services/authApi";
// import useAuthStore from "@/src/store/authStore";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios, {
//   AxiosInstance,
//   AxiosResponse,
//   InternalAxiosRequestConfig
// } from "axios";

// // Define the API base URL
// const ROOT_URL = process.env.EXPO_PUBLIC_API_URL;

// // Create an axios instance
// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: ROOT_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
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
//       return config;
//     } catch (error) {
//       console.error("Error in request interceptor:", error);
//       return config;
//     }
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for handling 401 Unauthorized errors
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: any) => {
//     const originalRequest = error.config;

//     // Handle only 401 errors once
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshTokenValue = await AsyncStorage.getItem("refresh_token");

//         if (refreshTokenValue) {
//           // Call raw axios refresh API
//           const response = await refreshToken(refreshTokenValue);

//           if (response.access_token) {
//             // Store new tokens
//             await AsyncStorage.setItem("token", response.access_token);
//             if (response.refresh_token) {
//               await AsyncStorage.setItem("refresh_token", response.refresh_token);
//             }

//             // Update the original request with new token
//             originalRequest.headers.Authorization = `Bearer ${response.access_token}`;

//             // Retry the original request with updated token
//             return axiosInstance(originalRequest);
//           }
//         }

//         // If no refresh token or refresh fails, clear auth state
//         await useAuthStore.getState().clearAuthState();
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
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

// Create an axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: ROOT_URL,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
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
  }
);

// Response interceptor for handling 401 Unauthorized errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenValue = await AsyncStorage.getItem("refresh_token");

        if (refreshTokenValue) {
          // Make the refresh token request directly with axios
          // This avoids circular dependency with authApi
          const response = await axios.post(
            `${ROOT_URL}/auth/refresh-token`,
            { refresh_token: refreshTokenValue },
            {
              headers: { "Content-Type": "application/json" },
              timeout: 10000,
            }
          );

          if (response.data.access_token) {
            // Store new tokens
            await AsyncStorage.setItem("token", response.data.access_token);
            if (response.data.refresh_token) {
              await AsyncStorage.setItem(
                "refresh_token",
                response.data.refresh_token
              );
            }

            // Update the original request with new token
            originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

            // Retry the original request
            return axiosInstance(originalRequest);
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
  }
);

export default axiosInstance;