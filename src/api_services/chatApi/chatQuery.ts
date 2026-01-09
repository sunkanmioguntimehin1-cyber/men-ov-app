import { useQuery } from "@tanstack/react-query";
import { getChatHistory, getSessionWithAiStream } from ".";


export const useGetChatHistory = () => {
  return useQuery({
    queryKey: ["get-chat-history"],
    queryFn: getChatHistory,
  });
};

export const useGetSessionWithAiStream = (contentData:string) => {
  return useQuery({
    queryKey: ["get-chat-session", contentData],
    queryFn: () => getSessionWithAiStream(contentData),
  });
};
