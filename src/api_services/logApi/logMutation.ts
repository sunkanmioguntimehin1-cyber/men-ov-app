import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { closeLogApi, createCycleTrackingApi, createLogApi, updateLogApi } from ".";

// Mutation api call
export const useCreateLogApi = (onCancel?: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLogApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });

      queryClient.invalidateQueries({ queryKey: ["get-log"] });
      onCancel();
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useUpdateLogApi = (onCancel:any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLogApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({ queryKey: ["get-log"] });
      onCancel()
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useCloseLogApi = (onCancel:any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: closeLogApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({ queryKey: ["get-log"] });
      onCancel()
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};


export const useCreateCycleTrackingApi = (onCancel: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCycleTrackingApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({ queryKey: ["get-cycle-tracking"] });
      onCancel();
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};
