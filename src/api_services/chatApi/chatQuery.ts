import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from ".";


export const useGetChatHistory = () => {
  return useQuery({
    queryKey: ["get-chat-history"],
    queryFn: getChatHistory,
  });
};