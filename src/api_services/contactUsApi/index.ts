import axiosInstance from "@/src/lib/axiosInstance";

export const contactUsApi = async (data:any) => {
  try {
    const res = await axiosInstance.post(`/settings/contact-admin`, data);
    return res.data;
  } catch (error) {
    console.error("contactUsApi:", error);
    throw error;
  }
};
