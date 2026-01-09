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


export const likeArticleApi = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/article/${data.id}/like`);
    return res.data;
  } catch (error) {
    console.error("likeArticleApi", error);
    throw error;
  }
};

export const unLikeArticleApi = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/article/${data.id}/unlike`);
    return res.data;
  } catch (error) {
    console.error("unLikeArticleApi", error);
    throw error;
  }
};
