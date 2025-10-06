import axiosInstance from "@/src/lib/axiosInstance";

export const getArticleApi = async (data: any) => {
  try {
    const res = await axiosInstance.get(`/article`);
    return res.data;
  } catch (error) {
    console.error("getArticleApi", error);
    throw error;
  }
};
