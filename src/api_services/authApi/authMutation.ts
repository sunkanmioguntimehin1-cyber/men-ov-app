import { handleAxiosError } from "@/src/lib/handleAxiosError";
import useAuthStore from "@/src/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { EditUserDetails, loginUser, registerUser, verifyEmail } from ".";


// Mutation api call

export const useRegisterUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUser,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      // router.push("/(auth)/create-account/verification");
        router.push("/(auth)/personal-info");
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
        // await AsyncStorage.setItem("token", data.data.access_token.token);
        // setIsLoggedIn(true);
        // router.push("/(tabs)/homepage");
      console.log("data000:", data);

      }
    },
    onError(error: any) {
      console.log("login error", error.response?.status === 403);
      handleAxiosError(error);
    },
  });
};


export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EditUserDetails,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });

      queryClient.invalidateQueries({ queryKey: ["get-profile"] });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};
