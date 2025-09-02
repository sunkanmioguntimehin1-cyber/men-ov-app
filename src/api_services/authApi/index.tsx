import axiosInstance from "@/src/lib/axiosInstance";

export const registerUser = async (data: any) => {
    console.log("data66:", data);
  try {
    const res = await axiosInstance.post(`/auth/register`, data);
    return res.data;
  } catch (error) {
    console.error("register User777", error);
    throw error;
  }
};

export const verifyEmail = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/auth/verify-email`, data);
    return res.data;
  } catch (error) {
    console.error("address User Info", error);
    throw error;
  }
};

export const loginUser = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/auth/login`, data);
    return res.data;
  } catch (error) {
    console.error("Login User", error);
    throw error;
  }
};

export const getProfile = async (data: any) => {
  try {
    const res = await axiosInstance.get(`/profile`, data);
    return res.data;
  } catch (error) {
    console.error("getUserApi:", error);
    throw error;
  }
};

export const EditUserDetails = async (data: any) => {
  try {
    const res = await axiosInstance.patch(`/profile/update`, data);
    return res.data;
  } catch (error) {
    console.error("EditUserDetails:", error);
    throw error;
  }
};


