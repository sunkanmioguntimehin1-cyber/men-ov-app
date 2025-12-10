import { handleAxiosError } from "@/src/lib/handleAxiosError";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
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

// export const useTalkToChatAiwithStream = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: talkToChatAiwithStream,
//     async onSuccess(data: any) {
//       // queryClient.invalidateQueries({
//       //   queryKey: ["get-chat-history"],
//       // });
//     },
//     onError(error: any) {
//       handleAxiosError(error);
//     },
//   });
// };


// export const useTalkToChatAiwithStreamQuery = (data: any) => {
//   return streamedQuery({
//     queryKey: ["chat-stream", data],
//     queryFn: async ({ queryKey }) => {
//       const [, requestData] = queryKey;
//       let fullText = "";

//       await talkToChatAiwithStream(requestData, (chunk: string) => {
//         fullText += chunk;
//       });

//       return fullText;
//     },
//     enabled: !!data, // Only run when data is provided
//     refetchOnWindowFocus: false,
//     retry: false,
//   });
// };


export const useTalkToChatAiwithStream = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [streamedData, setStreamedData] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      setIsStreaming(true);
      setStreamedData(""); // Reset on new mutation

      return talkToChatAiwithStream(data, (chunk: string) => {
        // Update state with each chunk
        setStreamedData((prev) => prev + chunk);
      });
    },
    onSuccess(data: any) {
      setIsStreaming(false);
      queryClient.invalidateQueries({
        queryKey: ["get-chat-history"],
      });
    },
    onError(error: any) {
      setIsStreaming(false);
      setStreamedData("");
      handleAxiosError(error);
    },
  });

  return {
    ...mutation,
    streamedData,
    isStreaming,
  };
};