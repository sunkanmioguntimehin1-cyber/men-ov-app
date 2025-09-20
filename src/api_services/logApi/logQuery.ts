
import { useQuery } from "@tanstack/react-query";
import { getLogApi } from ".";



export const useGetLogApi = () => {
  return useQuery({
    queryKey: ["get-log"],
    queryFn: getLogApi,
  });
};

// export const useGetUserApi = () => {
//   return useQuery({
//     queryKey: ["get-profile"],
//     queryFn: getProfile,
//   });
// };


