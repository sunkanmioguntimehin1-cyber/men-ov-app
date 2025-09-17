import axiosInstance from "@/src/lib/axiosInstance";
import axios from "axios";

export const getUploadUrl = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/user/presigned-url`, data);
    return res.data;
  } catch (error) {
    console.error("getUploadUrl:", error);
    throw error;
  }
};

export const uploadImageApi = async (data: any) => {
  try {
    const res = await axios.put(`${data?.uploadUrl}`, data?.formData, {
      headers: {
        "Content-Type": "multipart/form-data", // This is important for form data
      },
      // transformRequest: () => {
      //   // Return the form data as it is

      //   return data;
      // },
    });

    return res.data;
  } catch (error) {
    console.error("Error upload Image Transaction :", error);
    throw error;
  }
};
