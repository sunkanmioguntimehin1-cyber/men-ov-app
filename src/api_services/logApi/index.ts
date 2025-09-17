import axiosInstance from "@/src/lib/axiosInstance";

export const getLogApi = async () => {
  try {
    const res = await axiosInstance.get(`/log`);
    return res.data;
  } catch (error) {
    console.error("getLogApi", error);
    throw error;
  }
};

export const createLogApi = async (data: any) => {
  console.log("data:", data);
  try {
    const res = await axiosInstance.post(`/log`, data);
    return res.data;
  } catch (error) {
    console.error("createLogApi", error);
    throw error;
  }
};
