import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation } from "@tanstack/react-query";
import { getUploadUrl, uploadImageApi } from ".";

export const useGetUploadUrl = (handleStoreData: (data: any) => void) => {
  return useMutation({
    mutationFn: getUploadUrl,
    onSuccess(data: any) {
      if (data) {
        handleStoreData(data);
      }
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useImageUpload = (storeData: any) => {
  const { mutate, data, isPending, isError, reset, status } = useMutation({
    mutationFn: uploadImageApi,
  });

  const uploadImage = async (image: any) => {
    let fileInfo = {
      uri: image,
      type: "*/*",
      name: "file.jpg",
    };
    const formData = new FormData();
    formData.append("file", fileInfo as any);
    mutate({
      uploadUrl: storeData.uploadUrl,
      formData: formData,
    });
  };

  const resetImageData = () => {
    reset(); // This will reset the data to undefined
  };

  return {
    uploadImage,
    imageData: data,
    isImageUploadPending: isPending,
    isImageUploadError: isError,
    resetImageData,
  };
};
