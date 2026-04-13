import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { cancelSubscriptionApi, paymentSyncApi } from ".";

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

export const useCancelSubscriptionApi = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: cancelSubscriptionApi,
    onSuccess(data: any) {
      console.log("Payment cancel successful3000:", data);
      // queryClient.invalidateQueries(["userData"]);
      router.push(
        "/homepage/manage-subscription/cancel-subscription/cancellation-page",
      );
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};
