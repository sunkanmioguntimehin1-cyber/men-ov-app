
import { useQuery } from "@tanstack/react-query";
import { getRecommendationApi } from ".";




export const useGetRecommendationApi = () => {
  return useQuery({
    queryKey: ["get-recommendation"],
    queryFn: getRecommendationApi,
  });
};




