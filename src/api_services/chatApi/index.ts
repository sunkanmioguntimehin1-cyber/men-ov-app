import axiosInstance, { customAxiosInstance } from "@/src/lib/axiosInstance";

export const getChatHistory = async () => {
  try {
    const res = await axiosInstance.get(`/chat?page=1&limit=50`);
    return res.data;
  } catch (error) {
    console.error("getChatHistoris", error);
    throw error;
  }
};


export const talkToChatAi = async (data:any) => {
  console.log("datadatadata", data);
  try {
    const res = await axiosInstance.post(`/chat/message`, data);
    return res.data;
  } catch (error) {
    console.error("talkToChatAi", error);
    throw error;
  }
};


export const talkToChatAiwithStream2 = async (data: any) => {
  console.log("datadatadata01", data);
  try {
    const res = await customAxiosInstance.post(`/api/v1/chat/stream`, data);
    return res.data;
  } catch (error) {
    console.error("talkToChatAiwithStream", error);
    throw error;
  }
};

const BASE_URL = "https://menovia-backend-285086043355.us-central1.run.app";
export const talkToChatAiwithStream = async (
  data: any,
  onChunk: (chunk: string) => void
) => {
  console.log("datadatadata01", data);

  try {
    const response = await fetch(`${BASE_URL}/api/v1/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any auth headers from your customAxiosInstance
        "x-api-key": "wI8qBAFojF0UOIGW0iupDBlMRsJJoIFBO7yEX40ZlQ8",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTJmMTZjNzJkODFkMWZiNzFjOGZjMmEiLCJlbWFpbCI6Im9qbzIwQGdtYWlsLmNvbSIsInN0YXR1cyI6ImFjdGl2ZSIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzY1MTIzNDYwLCJleHAiOjE3NjUxMjcwNjB9.df2mrKXKS_xgUaAYzDFzNdi9v7HJI7ULFucxCdq1iMc`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("No reader available");
    }

    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;

      // Call the callback with each chunk
      onChunk(chunk);
    }

    return { data: fullText, success: true };
  } catch (error) {
    console.error("talkToChatAiwithStream", error);
    throw error;
  }
};

export const getSessionWithAiStream = async (data: any) => {
  console.log("datada3000", data);
  try {
    const res = await axiosInstance.get(
      `/chat/session/messages?content=${data}`,
      data
    );
    return res.data;
  } catch (error) {
    console.error("getSessionWithAiStream", error);
    throw error;
  }
};

