
import { useQuery } from "@tanstack/react-query";
import { getProfile } from ".";
// import { kycToken } from ".";


// export const useKycToken = (token:string) => {
//   return useQuery({
//     queryKey: ["get-kyc-token"],
//     queryFn: () => kycToken(token),
//     enabled: false,
//   });
// };

export const useGetUserApi = () => {
  return useQuery({
    queryKey: ["get-profile"],
    queryFn: getProfile,
  });
};


