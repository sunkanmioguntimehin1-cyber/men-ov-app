
import { useQuery } from "@tanstack/react-query";
import { getArticleApi } from ".";


export const useGetArticleApi = () => {
  return useQuery({
    queryKey: ["get-article"],
    queryFn: getArticleApi,
  });
};




