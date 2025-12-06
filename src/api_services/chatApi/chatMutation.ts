import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { talkToChatAi, talkToChatAiwithStream } from ".";

export const useTalkToChatAi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: talkToChatAi,
    async onSuccess(data: any) {
      queryClient.invalidateQueries({
        queryKey: ["get-chat-history"],
      });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useTalkToChatAiwithStream = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: talkToChatAiwithStream,
    async onSuccess(data: any) {
      queryClient.invalidateQueries({
        queryKey: ["get-chat-history"],
      });
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};
