import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const authStore = (set: any) => ({
  authToken: null as any,
  userRegOtps: {
    phoneNumber: "",
    email: "",
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

  setUserRegOtps: (otps: any) => {
    set((state: any) => ({
      ...state,
      userRegOtps: { ...state.userRegOtps, ...otps },
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
  clearAuthState: async () => {
    await AsyncStorage.removeItem("token");
    set({ authToken: null, isAuthenticated: false, isLoggedIn: false });
  },
 

  initializeAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        set({
          authToken: token,
          isAuthenticated: true,
          isLoggedIn: true, // needs to change to true after testing
          isLoading: false,
        });
      } else {
        set({
          authToken: null,
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
        isAuthenticated: false,
        isLoggedIn: false,
        isLoading: false,
      });
    }
  },
});

const useAuthStore = create(authStore);
export default useAuthStore;
