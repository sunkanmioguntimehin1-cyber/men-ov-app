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

export const cancelSubscriptionApi = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/payment/cancel`, data);
    return res.data;
  } catch (error) {
    console.error("cancelSubscriptionApi:", error);
    throw error;
  }
};

export const manageSubscriptionApi = async () => {
  try {
    const res = await axiosInstance.get(`/payment/manage`);
    return res.data;
  } catch (error) {
    console.error("manageSubscriptionApi:", error);
    throw error;
  }
};
