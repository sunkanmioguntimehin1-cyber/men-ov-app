import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { showSuccessToast } from "@/src/lib/showSuccessToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { contactUsApi } from ".";

export const useContactUsApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactUsApi,
    onSuccess(data: any) {
      showSuccessToast({
        message: data.message,
      });
     router.back()
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};
