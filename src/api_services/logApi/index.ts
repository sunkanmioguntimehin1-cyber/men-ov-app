import axiosInstance from "@/src/lib/axiosInstance";

export const getLogApi2 = async () => {
  try {
    const res = await axiosInstance.get(`/log`);
    return res.data;
  } catch (error) {
    console.error("getLogApi", error);
    throw error;
  }
};

export const getLogApi = async () => {
  try {
    const res = await axiosInstance.get(`/log/me/latest-by-symptom`);
    return res.data;
  } catch (error) {
    console.error("getLogApi", error);
    throw error;
  }
};

export const createLogApi = async (data: any) => {
  console.log("data:", data);
  try {
    const res = await axiosInstance.post(`/log`, data);
    return res.data;
  } catch (error) {
    console.error("createLogApi", error);
    throw error;
  }
};

export const updateLogApi = async (data: any) => {
  // extract id for the URL, keep the rest for the request body
  const { id, ...rest } = data;

  try {
    const res = await axiosInstance.patch(`/log/${id}`, rest);
    return res.data;
  } catch (error) {
    console.error("updateLogApi", error);
    throw error;
  }
};

export const closeLogApi = async (data: any) => {
  const { id, ...rest } = data;
  try {
    const res = await axiosInstance.patch(`/log/${id}/close`, rest);
    return res.data;
  } catch (error) {
    console.error("closeLogApi", error);
    throw error;
  }
};

export const createCycleTrackingApi = async (data: any) => {
  
  try {
    const res = await axiosInstance.post(`/cycle-track`, data);
    return res.data;
  } catch (error) {
    console.error("createCycleTrackingApi", error);
    throw error;
  }
};

export const getCycleTrackingApi = async (data: any) => {
  try {
    const res = await axiosInstance.get(`/cycle-track`, data);
    return res.data;
  } catch (error) {
    console.error("getCycleTrackingApi", error);
    throw error;
  }
};

export const getCycleTrackinglatestApi = async (data: any) => {
  try {
    const res = await axiosInstance.get(`/cycle-track/latest`, data);
    return res.data;
  } catch (error) {
    console.error("getCycleTrackinglatestApi", error);
    throw error;
  }
};