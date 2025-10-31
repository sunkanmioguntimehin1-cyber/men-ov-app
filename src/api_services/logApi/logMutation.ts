import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { closeLogApi, createCycleTrackingApi, createLogApi, updateCycleTrackingApi, updateLogApi } from ".";

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

export const useCloseLogApi = (handleIsDone: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: closeLogApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({ queryKey: ["get-log"] });
      handleIsDone()
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
       queryClient.invalidateQueries({
         queryKey: ["get-cycle-tracking-latest"],
       });
      onCancel();
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useUpdateCycleTrackingApi = (onCancel: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCycleTrackingApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({
        queryKey: ["get-cycle-tracking"],
      });
       queryClient.invalidateQueries({
         queryKey: ["get-cycle-tracking-latest"],
       });
      
      onCancel();
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};



;
