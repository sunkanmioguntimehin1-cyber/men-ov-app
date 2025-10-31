import { useQuery } from "@tanstack/react-query";
import { getAllToics, getExplore, getPopularSearch, getSearchResult } from ".";

export const useGetAllToics = () => {
  return useQuery({
    queryKey: ["get-all-topics"],
    queryFn: getAllToics,
  });
};


export const useGetExplore = () => {
  return useQuery({
    queryKey: ["get-explore"],
    queryFn: getExplore,
  });
};



export const useGetPopularSearch = (data:string) => {
  return useQuery({
    queryKey: ["get-popular-searchh"],
    queryFn: () => getPopularSearch(data),
  });
};

export const useGetSearchResult = (data: string) => {
  return useQuery({
    queryKey: ["get-search-result"],
    queryFn: () => getSearchResult(data),
    enabled: !!data,
  });
};
