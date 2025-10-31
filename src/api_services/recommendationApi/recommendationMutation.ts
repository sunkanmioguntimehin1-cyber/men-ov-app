import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { saveRecommendationApi } from ".";

// Mutation api call
export const useSaveRecommendationApi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveRecommendationApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });

      queryClient.invalidateQueries({ queryKey: ["get-recommendation"] });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

// export const useCloseLogApi = (handleIsDone: any) => {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: closeLogApi,
//     async onSuccess(data: any) {
//       // showSuccessToast({
//       //   message: data.message,
//       // });
//       queryClient.invalidateQueries({ queryKey: ["get-log"] });
//       handleIsDone()
//     },
//     onError(error: any) {
//       handleAxiosError(error);
//     },
//   });
// };
