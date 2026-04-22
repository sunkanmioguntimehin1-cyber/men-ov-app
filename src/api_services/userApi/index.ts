import axiosInstance from "@/src/lib/axiosInstance";

export const getUser = async () => {
  try {
    const res = await axiosInstance.get(`/user/me`);
    return res.data;
  } catch (error) {
    console.error("getUserApi:", error);
    throw error;
  }
};

export const editUserDetails = async (data: any) => {
  const requestPayload = {
    ...(data.address && { address: data.address }),
    ...(data.gender && { gender: data.gender }),
    ...(data.picture && { picture: data.gender }),
    dob: data.dob,
    fullname: data.fullname,
    gender: data.gender,
  };
  // console.log("requestPayload500:", requestPayload);

  try {
    const res = await axiosInstance.put(`/user/me`, requestPayload);
    return res.data;
  } catch (error) {
    console.error("EditUserDetails:", error);
    throw error;
  }
};

export const intakeDetailsApi = async (data: any) => {
  // console.log("data22445500", data);

  const requestPayload = {
    ...(data.dateOfLastPeriod && { dateOfLastPeriod: data.dateOfLastPeriod }),
    ...(data.isPeriodsStopped12Months && {
      isPeriodsStopped12Months: data.isPeriodsStopped12Months,
    }),
    ageOfFirstPeriod: data.ageOfFirstPeriod,
    isOnHormoneTherapy: data.isOnHormoneTherapy,
    isOvariesRemoved: data.isOvariesRemoved,
    ishysterectomy: data.ishysterectomy,
    menopauseStage: data.menopauseStage,
  };

  console.log("requestPayloadppp", requestPayload);
  try {
    const res = await axiosInstance.post(`/user/intake`, requestPayload);
    return res.data;
  } catch (error) {
    console.error("intakeDetailsApi", error);
    throw error;
  }
};
export const editIntakeDetailsApi = async (data: any) => {
  // console.log("data22", data)
  const requestPayload = {
    ...(data.dateOfLastPeriod && { dateOfLastPeriod: data.dateOfLastPeriod }),
    ...(data.isPeriodsStopped12Months && {
      isPeriodsStopped12Months: data.isPeriodsStopped12Months,
    }),
    ageOfFirstPeriod: data.ageOfFirstPeriod,
    isOnHormoneTherapy: data.isOnHormoneTherapy,
    isOvariesRemoved: data.isOvariesRemoved,
    ishysterectomy: data.ishysterectomy,
    menopauseStage: data.menopauseStage,
  };
  try {
    const res = await axiosInstance.put(`/user/intake`, requestPayload);
    return res.data;
  } catch (error) {
    console.error("editIntakeDetailsApi", error);
    throw error;
  }
};

export const getIntakeDetailsApi = async () => {
  try {
    const res = await axiosInstance.get(`/user/intake`);
    return res.data;
  } catch (error) {
    console.error("getIntakeDetailsApi", error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const res = await axiosInstance.delete(`/user/me`);
    return res.data;
  } catch (error) {
    console.error("DeleteUser:", error);
    throw error;
  }
};

export const updateNotificationSettings = async (data: any) => {
  try {
    const res = await axiosInstance.put(`/user/me/notifications`, data);
    return res.data;
  } catch (error) {
    console.error("updateNotificationSettings:", error);
    throw error;
  }
};

export const pushNotificationSyncDevice = async (data: any) => {
  console.log("dataTokenExpo", data);
  try {
    const res = await axiosInstance.patch(`/user/me/sync-device`, data);
    return res.data;
  } catch (error) {
    console.error("pushNotificationSyncDevice:", error);
    throw error;
  }
};

export const getUserChat = async () => {
  try {
    const res = await axiosInstance.get(`/user/chat?mode=chat-only`);
    return res.data;
  } catch (error) {
    console.error("getUserChat:", error);
    throw error;
  }
};
