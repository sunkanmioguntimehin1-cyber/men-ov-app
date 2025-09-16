
import { useQuery } from "@tanstack/react-query";
import { getArticleApi } from ".";


export const useGetArticleApi = () => {
  return useQuery({
    queryKey: ["get-article"],
    queryFn: getArticleApi,
  });
};

// export const useGetUserApi = () => {
//   return useQuery({
//     queryKey: ["get-profile"],
//     queryFn: getProfile,
//   });
// };


