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



export const uploadImageApi = async (
  data: {
    uploadUrl: string;
    fileUri: string;
    publicUrl?: string;
    contentType?: string;
    headers?: Record<string, string>;
  }
) => {
  console.log("datazNew3000", data);
  try {
    // Read local file into a Blob
    const response = await fetch(data.fileUri);
    const blob = await response.blob();

    const resolvedContentType = data.contentType || blob.type || "application/octet-stream";

    // Merge any server-provided headers (e.g., x-amz-acl) with Content-Type
    const headers: Record<string, string> = {
      "Content-Type": resolvedContentType,
      ...(data.headers || {}),
    };

    // Upload to S3 using raw binary data with correct headers
    await axios.put(data.uploadUrl, blob, { headers });

    // Return the eventual public URL so callers can persist/use it
    return data.publicUrl;
  } catch (error) {
    console.error("Error upload Image Transaction:", error);
    throw error;
  }
};



