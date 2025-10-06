
import { useQuery } from "@tanstack/react-query";
import { getCycleTrackingApi, getLogApi } from ".";



export const useGetLogApi = () => {
  return useQuery({
    queryKey: ["get-log"],
    queryFn: getLogApi,
  });
};

export const useCycleTrackingApi = () => {
  return useQuery({
    queryKey: ["get-cycle-tracking"],
    queryFn: getCycleTrackingApi,
  });
};


