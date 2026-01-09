import axiosInstance from "@/src/lib/axiosInstance";

export const getAllToics = async () => {
  try {
    const res = await axiosInstance.get(`/topics?isFeatured=true`);
    return res.data;
  } catch (error) {
    console.error("getAllToics:", error);
    throw error;
  }
};

export const getExplore = async () => {
  try {
    const res = await axiosInstance.get(`/explore`);
    return res.data;
  } catch (error) {
    console.error("getExplore:", error);
    throw error;
  }
};

export const getPopularSearch = async (data:string) => {
  try {
    const res = await axiosInstance.get(
      `/explore/search/popular-topics?filter=${data}`
    );
    return res.data;
  } catch (error) {
    console.error("getPopularSearch:", error);
    throw error;
  }
};

export const getSearchResult = async (data:string) => {
    console.log("data500", data)
  try {
    const res = await axiosInstance.get(`/explore/search?q=${data}`);
    return res.data;
  } catch (error) {
    console.error("getSearch:", error);
    throw error;
  }
};