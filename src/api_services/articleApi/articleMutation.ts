import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { likeArticleApi, unLikeArticleApi } from ".";

export const useLikeArticleApi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likeArticleApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({ queryKey: ["get-article"] });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useUnLikeArticleApi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unLikeArticleApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({ queryKey: ["get-article"] });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};
