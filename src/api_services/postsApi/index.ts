import axiosInstance from "@/src/lib/axiosInstance";

export const getAllPosts = async () => {
  try {
    const res = await axiosInstance.get(`/post`);
    return res.data;
  } catch (error) {
    console.error("getAllPosts", error);
    throw error;
  }
};

export const viewAPost = async (data:any) => {
  try {
    const res = await axiosInstance.get(`/post/${data}`);
    return res.data;
  } catch (error) {
    console.error("viewAPosts", error);
    throw error;
  }
};


export const createPostApi = async (data:any) => {
  console.log(data, "databb");
  try {
    const res = await axiosInstance.post(`/post`, data);
    return res.data;
  } catch (error) {
    console.error("getAllPosts", error);
    throw error;
  }
};
export const getMyPost = async () => {
  try {
    const res = await axiosInstance.get(`/post/me`);
    return res.data;
  } catch (error) {
    console.error("getMyPost", error);
    throw error;
  }
};

export const getTrendingPost = async () => {
  try {
    const res = await axiosInstance.get(`/post/trending`);
    return res.data;
  } catch (error) {
    console.error("getTrendingPost", error);
    throw error;
  }
};

export const updateAPost = async (data:any) => {
  try {
    const res = await axiosInstance.put(`/post/${data}`);
    return res.data;
  } catch (error) {
    console.error("updateAPost", error);
    throw error;
  }
};


export const getHashtag = async () => {
  try {
    const res = await axiosInstance.get(`/post/hashtag`);
    return res.data;
  } catch (error) {
    console.error("getHashtag", error);
    throw error;
  }
};


export const savePostApi = async (data:any) => {
  try {
    const res = await axiosInstance.post(`/post/${data.id}/save`);
    return res.data;
  } catch (error) {
    console.error("savePostApi", error);
    throw error;
  }
};

export const unSavePostApi = async (data: any) => {
  try {
    const res = await axiosInstance.delete(`/post/${data.id}/save`);
    return res.data;
  } catch (error) {
    console.error("unSavePostApi", error);
    throw error;
  }
};

export const likePostApi = async (data:any) => {
  try {
    const res = await axiosInstance.post(`/post/${data.id}/like`);
    return res.data;
  } catch (error) {
    console.error("likePostApi", error);
    throw error;
  }
};

export const unLikePostApi = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/post/${data.id}/unlike`);
    return res.data;
  } catch (error) {
    console.error("unLikePostApi", error);
    throw error;
  }
};


export const getCommentPostApi = async (data: any) => {
  try {
    const res = await axiosInstance.get(`/post/${data}/comments`);
    return res.data;
  } catch (error) {
    console.error("getCommentPostApi", error);
    throw error;
  }
};

export const commentPostApi = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/post/${data.id}/comment`);
    return res.data;
  } catch (error) {
    console.error("commentPostApi", error);
    throw error;
  }
};

