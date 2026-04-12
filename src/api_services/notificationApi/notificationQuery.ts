import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getNotificationsApi, getNotificationsCountApi } from ".";

export const useGetNotificationsApi = () => {
  return useInfiniteQuery({
    queryKey: ["get-notifications"],
    queryFn: ({ pageParam = 1 }) => getNotificationsApi(pageParam, 20),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};

export const useGetNotificationsCountApi = () => {
  return useQuery({
    queryKey: ["get-notifications-count"],
    queryFn: getNotificationsCountApi,
  });
};
