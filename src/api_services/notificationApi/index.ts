import axiosInstance from "@/src/lib/axiosInstance";

export const getNotificationsApi = async (page = 1, limit = 20) => {
  try {
    const res = await axiosInstance.get(`/notification`, { params: { page, limit } });
    return res.data;
  } catch (error) {
    console.error("getNotificationsApi:", error);
    throw error;
  }
};

export const updateNotificationDetails = async (notificationId: string) => {
  console.log("Updating notification as read:", notificationId);
  try {
    const res = await axiosInstance.patch(
      `/notification/${notificationId}/read`,
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
