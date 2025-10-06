import axiosInstance from "@/src/lib/axiosInstance";
import axios from "axios";

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


export const forgotPasswordApi = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/auth/forgot-password`, data);
    return res.data;
  } catch (error) {
    console.error("fogot PasswordApi", error);
    throw error;
  }
};

export const resetPasswordApi = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/auth/reset-password`, data);
    return res.data;
  } catch (error) {
    console.error("fogot PasswordApi", error);
    throw error;
  }
};


export const refreshToken = async (refreshTokenValue: string) => {
  try {
    const res = await axios.post(`/auth/refresh-token`, {
      refresh_token: refreshTokenValue
    });
    return res.data;
  } catch (error) {
    console.error("refreshToken", error);
    throw error;
  }
};
