import axiosInstance from "@/src/lib/axiosInstance";

export const paymentSyncApi = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/payment/sync`, data);
    return res.data;
  } catch (error) {
    console.error("paymentSyncApi:", error);
    throw error;
  }
};
