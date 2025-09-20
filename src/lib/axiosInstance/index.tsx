// Import axios and AsyncStorage
import { refreshToken } from "@/src/api_services/authApi";
import useAuthStore from "@/src/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

// Define the interface for the navigation params
interface NavigationParams {
  screen: string;
  tokenExpired: boolean;
}

// Define the API base URL
// const ROOT_URL = "https://dev-api.menovia.aviyatelemed.com";
const ROOT_URL = process.env.EXPO_PUBLIC_API_URL;

// Create an axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: ROOT_URL,
  timeout: 10000,
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
      console.log("token:", token)
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
          // Attempt to refresh the token
          const response = await refreshToken(refreshTokenValue);
          
          if (response.access_token) {
            // Store new tokens
            await AsyncStorage.setItem("token", response.access_token);
            if (response.refresh_token) {
              await AsyncStorage.setItem("refresh_token", response.refresh_token);
            }
            
            // Update the original request with new token
            originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
            
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
