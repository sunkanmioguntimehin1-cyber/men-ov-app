import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { showSuccessToast } from "@/src/lib/showSuccessToast";
import useAuthStore from "@/src/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { editUserDetails, intakeDetailsApi } from ".";

export const useEditUser = (handleNextBtn: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editUserDetails,
    onSuccess(data: any) {
      showSuccessToast({
        message: data.message,
      });
      handleNextBtn();
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useIntakeDetailsApi = () => {
  const queryClient = useQueryClient();
  const setIsLoggedIn = useAuthStore().setIsLoggedIn;
  const router = useRouter()
  return useMutation({
    mutationFn: intakeDetailsApi,
    onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      
      console.log("data300", data)
      setIsLoggedIn(true);
      router.push("/(tabs)/homepage");
      // queryClient.invalidateQueries({ queryKey: ["get-user"] });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};
