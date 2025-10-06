import { useQuery } from "@tanstack/react-query";
import { getIntakeDetailsApi, getUser } from ".";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: getUser
    // enabled: false,
  });
};


export const useGetIntakeDetails = () => {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: getIntakeDetailsApi,
    // enabled: false,
  });
};