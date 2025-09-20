import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { createLogApi, updateLogApi } from ".";


// Mutation api call
export const useCreateLogApi = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: createLogApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      // setAuthToken(data.access_token);
      
      // router.push("/(tabs)/homepage/personal-info");
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};


export const useUpdateLogApi = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateLogApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      // setAuthToken(data.access_token);
      // router.push("/(tabs)/homepage/personal-info");
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

