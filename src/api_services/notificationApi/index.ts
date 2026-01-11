import axiosInstance from "@/src/lib/axiosInstance";



export const getNotificationsApi = async () => {
  try {
    const res = await axiosInstance.get(`/notification`);
    return res.data;
  } catch (error) {
    console.error("pushNotificationSyncDevice:", error);
    throw error;
  }
};


export const updateNotificationDetails = async (notificationId: string) => {
  try {
    const res = await axiosInstance.patch(
      `/notification/${notificationId}/read`
    );
    return res.data;
  } catch (error) {
    console.error("updateNotificationDetails:", error);
    throw error;
  }
};

export const getNotificationsCountApi = async () => {
  try {
    const res = await axiosInstance.get(`/notification/count`);
    return res.data;
  } catch (error) {
    console.error("getNotificationsCountApi:", error);
    throw error;
  }
};
