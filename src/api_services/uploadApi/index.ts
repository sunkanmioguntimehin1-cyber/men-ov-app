import axiosInstance from "@/src/lib/axiosInstance";
import axios from "axios";

export const getUploadUrl = async (data: any) => {
  console.log("dataFilname:", data);
  try {
    const res = await axiosInstance.post(`/user/presigned-url`, data);
    return res.data;
  } catch (error) {
    console.error("getUploadUrl:", error);
    throw error;
  }
};

export const uploadImageApi = async (data: any) => {
  console.log("Starting binary upload to S3", data);

  try {
    // Fetch the file from the URI and convert to blob
    const response = await fetch(data.fileUri);
    const blob = await response.blob();

    // Get the file extension to determine content type
    const getContentType = (uri: string) => {
      const extension = uri.split(".").pop()?.toLowerCase();
      const mimeTypes: { [key: string]: string } = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        heic: "image/heic",
        heif: "image/heif",
      };
      return mimeTypes[extension || ""] || "image/jpeg";
    };

    const contentType = getContentType(data.fileUri);

    // Upload the blob directly to S3
    const res = await axios.put(data.uploadUrl, blob, {
      headers: {
        "Content-Type": contentType,
      },
      // Important: Don't let axios transform the data
      transformRequest: [(data) => data],
    });

    console.log("Upload status:", res.status);
    console.log("Upload response:", res.data);

    return res.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response:", error.response?.data);
      console.error("Status:", error.response?.status);
    }
    throw error;
  }
};
