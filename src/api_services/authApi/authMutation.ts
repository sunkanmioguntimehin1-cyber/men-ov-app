import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { showSuccessToast } from "@/src/lib/showSuccessToast";
import useAuthStore from "@/src/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  forgotPasswordApi,
  loginUser,
  registerUser,
  resetPasswordApi,
  verifyEmail,
} from ".";

// Mutation api call

export const useRegisterUser = () => {
  const router = useRouter();
  const setIsLoggedIn = useAuthStore().setIsLoggedIn;
  return useMutation({
    mutationFn: registerUser,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      // setAuthToken(data.access_token);
      await AsyncStorage.setItem("token", data.access_token);
      setIsLoggedIn(true)
      router.push("/(tabs)/homepage/personal-info");
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useVerifyEmail = (handleVerifyBottomSheetOpen: () => void) => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      handleVerifyBottomSheetOpen();
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useLoginUser = () => {
  const router = useRouter();
  const setIsLoggedIn = useAuthStore().setIsLoggedIn;

  return useMutation({
    mutationFn: loginUser,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      if (data) {
        await AsyncStorage.setItem("token", data.access_token);
        setIsLoggedIn(true);
        router.push("/(tabs)/homepage");
      
      }
    },
    onError(error: any) {
      console.log("login error", error.response?.status === 403);
      handleAxiosError(error);
    },
  });
};

export const useForgotPasswordApi = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: forgotPasswordApi,
    async onSuccess(data) {
      showSuccessToast({
        message: data.message,
      });
      if (data) {
        router.push("/(auth)/login/forgotPassword/enter-otp");
      }
    },
    onError(error) {
      console.log("forgot password error", error);
      handleAxiosError(error);
    },
  });
};

export const useResetPasswordApi = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPasswordApi,
    async onSuccess(data) {
      if (data) {
        router.push("/(auth)/login");
      }
    },
    onError(error) {
      console.log("Reset password error", error);
      handleAxiosError(error);
    },
  });
};
