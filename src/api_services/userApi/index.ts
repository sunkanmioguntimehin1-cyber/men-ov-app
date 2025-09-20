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
  try {
    const res = await axiosInstance.put(`/user/me`, data);
    return res.data;
  } catch (error) {
    console.error("EditUserDetails:", error);
    throw error;
  }
};

export const intakeDetailsApi = async (data: any) => {
  console.log("data22", data)
  try {
    const res = await axiosInstance.post(`/user/intake`, data);
    return res.data;
  } catch (error) {
    console.error("intakeDetailsApi", error);
    throw error;
  }
};


export const deleteUser = async () => {
  try {
    const res = await axiosInstance.delete(`/users/me`);
    return res.data;
  } catch (error) {
    console.error("DeleteUser:", error);
    throw error;
  }
};
