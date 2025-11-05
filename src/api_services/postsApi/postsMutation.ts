import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { commentPostApi, createPostApi, likePostApi, savePostApi, unLikePostApi, unSavePostApi } from ".";

// Mutation api call
export const useCreatePostApi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPostApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });

      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
      router.push("/(tabs)/communitypage")
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useSavePostApi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: savePostApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
      
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useLikePostApi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likePostApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useUnLikePostApi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unLikePostApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useUnSavePostApi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unSavePostApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({ queryKey: ["get-all-posts"] });
     
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useCommentPostApi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentPostApi,
    async onSuccess(data: any) {
      // showSuccessToast({
      //   message: data.message,
      // });
      queryClient.invalidateQueries({ queryKey: ["get-comment"] });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};