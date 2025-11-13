import { useQuery } from "@tanstack/react-query";
import { getNotificationsApi, getNotificationsCountApi } from ".";

export const useGetNotificationsApi = () => {
  return useQuery({
    queryKey: ["get-notifications"],
    queryFn: getNotificationsApi,
  });
};

export const useGetNotificationsCountApi = () => {
  return useQuery({
    queryKey: ["get-notifications-count"],
    queryFn: getNotificationsCountApi,
  });
};