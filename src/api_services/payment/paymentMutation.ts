import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentSyncApi } from ".";

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
