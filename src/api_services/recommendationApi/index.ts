import axiosInstance from "@/src/lib/axiosInstance";

export const getRecommendationApi = async () => {
  try {
    const res = await axiosInstance.get(`/recommendation/me`);
    return res.data;
  } catch (error) {
    console.error("getRecommendation", error);
    throw error;
  }
};

// export const createLogApi = async (data: any) => {
//   console.log("data:", data);
//   try {
//     const res = await axiosInstance.post(`/log`, data);
//     return res.data;
//   } catch (error) {
//     console.error("createLogApi", error);
//     throw error;
//   }
// };

// export const updateLogApi = async (data: any) => {
//   console.log("data:", data);
//   try {
//     const res = await axiosInstance.patch(`/log`, data);
//     return res.data;
//   } catch (error) {
//     console.error("updateLogApi", error);
//     throw error;
//   }
// };
