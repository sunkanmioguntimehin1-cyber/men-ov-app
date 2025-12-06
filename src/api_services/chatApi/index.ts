import axiosInstance, { customAxiosInstance } from "@/src/lib/axiosInstance";

export const getChatHistory = async () => {
  try {
    const res = await axiosInstance.get(`/chat?page=1&limit=50`);
    return res.data;
  } catch (error) {
    console.error("getChatHistoris", error);
    throw error;
  }
};


export const talkToChatAi = async (data:any) => {
  console.log("datadatadata", data);
  try {
    const res = await axiosInstance.post(`/chat/message`, data);
    return res.data;
  } catch (error) {
    console.error("talkToChatAi", error);
    throw error;
  }
};


export const talkToChatAiwithStream = async (data: any) => {
  console.log("datadatadata", data);
  try {
    const res = await customAxiosInstance.post(
      `/api/v1/chat/stream`,
      data
    );
    return res.data;
  } catch (error) {
    console.error("talkToChatAiwithStream", error);
    throw error;
  }
};