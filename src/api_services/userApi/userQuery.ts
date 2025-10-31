import { useQuery } from "@tanstack/react-query";
import { getIntakeDetailsApi, getUser, getUserChat } from ".";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: getUser
    // enabled: false,
  });
};


export const useGetIntakeDetails = () => {
  return useQuery({
    queryKey: ["get-intakes"],
    queryFn: getIntakeDetailsApi,
  });
};

export const useGetUserChat = () => {
  return useQuery({
    queryKey: ["get-user-chat"],
    queryFn: getUserChat,
    // enabled: false,
  });
};