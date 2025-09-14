// Import axios and AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig
} from "axios";
// import useAuthStore from "@/src/stores/authStore";

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
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: any) => {
//     if (error.response?.status === 401) {
//       try {
//         // Clear token from storage
//         await AsyncStorage.removeItem("token");
//         // Logout user from store
//         useAuthStore.getState().clearAuthState();
//       } catch (error) {
//         console.error("Error in response interceptor:", error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
