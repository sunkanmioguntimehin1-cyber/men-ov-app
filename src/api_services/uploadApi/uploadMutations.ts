import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation } from "@tanstack/react-query";
import { getUploadUrl, uploadImageApi } from ".";

export const useGetUploadUrl = (handleStoreData: (data: any) => void) => {
  return useMutation({
    mutationFn: getUploadUrl,
    onSuccess(data: any) {
      console.log("daata0999:", data);

      if (data) {
        handleStoreData(data);
        console.log("daata0111:", data);
      }
    },
    onError(error: any) {
      handleAxiosError(error);
    },
  });
};

export const useImageUpload2 = (storeData: any) => {
  const { mutate, data, isPending, isError, reset, status } = useMutation({
    mutationFn: uploadImageApi,
  });

  console.log("status777", status);
  console.log("data777", data);
  console.log("isPending0000", isPending);

  const uploadImage = async (image: any) => {
    console.log("storeDataNew20004", storeData);
    // console.log("publicUrlNew300", storeData.uploadUrl);
    console.log("imageAssetNew6000", image);
    if (storeData) {
      mutate({
        uploadUrl: storeData?.uploadUrl,
        // formData: formData,
        fileUri: image,
      });
    }
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

export const useImageUpload = (storeData: any) => {
  const { mutate, data, isPending, isError, reset, status } = useMutation({
    mutationFn: uploadImageApi,
  });

  const uploadImage = async (image: string) => {
    mutate({
      uploadUrl: storeData?.uploadUrl,
      fileUri: image,
    });
  };

  const resetImageData = () => {
    reset();
  };

  return {
    uploadImage,
    imageData: data,
    isImageUploadPending: isPending,
    isImageUploadError: isError,
    resetImageData,
    status, // Good for debugging
  };
};
