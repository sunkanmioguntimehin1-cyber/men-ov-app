import { useQuery } from "@tanstack/react-query";
import { getAllChatAiHistory, getChatHistory, getSessionWithAiStream } from ".";

export const useGetChatHistory = () => {
  return useQuery({
    queryKey: ["get-chat-history"],
    queryFn: getChatHistory,
  });
};

export const useGetSessionWithAiStream = (contentData: string) => {
  return useQuery({
    queryKey: ["get-chat-session", contentData],
    queryFn: () => getSessionWithAiStream(contentData),
  });
};

export const useGetAllChatAiHistory = () => {
  return useQuery({
    queryKey: ["get-all-chat-history"],
    queryFn: getAllChatAiHistory,
    // enabled: true,
    // refetchOnMount: true,
    // staleTime: 1000 * 60 * 5,
  });
};
