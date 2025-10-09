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

export const uploadImageApi2 = async (data: any) => {
  console.log("dataVVV", data);

  try {
    const res = await axiosInstance.put(`${data?.uploadUrl}`, data?.formData, {
      headers: {
        "Content-Type": "multipart/form-data", // This is important for form data
      },
      transformRequest: () => {
        // Return the form data as it is

        return data;
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error upload Image Transaction :", error);
    throw error;
  }
};

export const uploadImageApi23 = async (data: any) => {
  console.log("datazNew3000", data);
  try {
    // Fetch the file from the URI and convert to blob
    const response = await fetch(data.fileUri);
    const blob = await response.blob();

    console.log("blob1111", blob);
    console.log("response999999", response);

    const headers = {
      "Content-Type": "application/octet-stream",
    };

    console.log("headers400", headers);

    // Upload to S3 using raw binary data (NOT FormData)
    const res = await axios.put(data.uploadUrl, blob, { headers });

    return res.data;
  } catch (error) {
    console.error("Error upload Image Transaction:", error);
    throw error;
  }
};

export const uploadImageApi = async (data: any) => {
  console.log("datazNew3000", data);
  try {
    // Fetch the file from the URI and convert to blob

    let fileInfo = {
      uri: data,
      type: "*/*",
      name: "icon.png",
    };
    const headers = {
      "Content-Type": "application/octet-stream",
    };

    console.log("headers400", headers);

    const res = await axios.put(data.uploadUrl, fileInfo, { headers });

    return res.data;
  } catch (error) {
    console.error("Error upload Image Transaction:", error);
    throw error;
  }
};
