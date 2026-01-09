import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotificationDetails } from ".";

export const useUpdateNotificationDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationDetails,
    onSuccess(data: any) {
      queryClient.invalidateQueries({ queryKey: ["get-notifications"] });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};
