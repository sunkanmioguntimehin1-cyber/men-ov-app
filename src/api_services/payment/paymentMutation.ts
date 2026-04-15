import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  cancelSubscriptionApi,
  manageSubscriptionApi,
  paymentSyncApi,
} from ".";

export const usePaymentSyncApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentSyncApi,
    onSuccess(data: any) {
      console.log("Payment sync successful:", data);
      // queryClient.invalidateQueries(["userData"]);
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useCancelSubscriptionApi = (handleCancelPress: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: cancelSubscriptionApi,
    onSuccess(data: any) {
      console.log("Payment cancel successful3000:", data);
      // queryClient.invalidateQueries(["userData"]);
      handleCancelPress();
      // router.push(
      //   "/homepage/manage-subscription/cancel-subscription/cancellation-page",
      // );
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useManageSubscriptionApi = (handleOpenModal: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: manageSubscriptionApi,
    // Optional: cache the result if needed elsewhere
    onSuccess: (data) => {
      handleOpenModal();
      console.log("dataManage:", data);
      queryClient.setQueryData(["manage-subscription"], data);
    },
  });
};
