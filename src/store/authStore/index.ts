import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

const authStore = (set: any) => ({
  authToken: null as any,
  refreshToken: null as any,
  userRegOtps: {
    phoneNumber: "",
    email: "",
    otp:"",
    regToken:""
  },
  isAuthenticated: false,
  isLoading: true,
  isLoggedIn: false,

  setAuthToken: (data: any) => {
    set((state: any) => ({
      ...state,
      authToken: data,
    }));
  },

  setRefreshToken: (data: any) => {
    set((state: any) => ({
      ...state,
      refreshToken: data,
    }));
  },

  setUserRegOtps: (data: any) => {
    set((state: any) => ({
      ...state,
      userRegOtps: { ...state.userRegOtps, ...data },
    }));
  },

  setIsLoggedIn: (loggedIn: any) => {
    console.log("loggedInStore", loggedIn);
    set((state: any) => ({
      ...state,
      isLoggedIn: loggedIn,
      isAuthenticated: loggedIn,
    }));
  },
  clearAuthState: async (queryClient?: QueryClient) => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("refresh_token");
    
    // Clear React Query cache to prevent data persistence between users
    if (queryClient) {
      queryClient.clear();
    }
    
    set({ authToken: null, refreshToken: null, isAuthenticated: false, isLoggedIn: false });
  },
 

  initializeAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      if (token) {
        set({
          authToken: token,
          refreshToken: refreshToken,
          isAuthenticated: true,
          isLoggedIn: true, // needs to change to true after testing
          isLoading: false,
        });
      } else {
        set({
          authToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoggedIn: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      // Even on error, we should stop loading
      set({
        authToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoggedIn: false,
        isLoading: false,
      });
    }
  },
});

const useAuthStore = create(authStore);
export default useAuthStore;
