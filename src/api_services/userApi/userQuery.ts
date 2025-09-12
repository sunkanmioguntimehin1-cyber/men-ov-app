import { useQuery } from "@tanstack/react-query";
import { getUser } from ".";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: getUser
    // enabled: false,
  });
};
