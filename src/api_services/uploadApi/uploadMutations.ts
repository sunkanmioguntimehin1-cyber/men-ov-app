import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation } from "@tanstack/react-query";
import { getUploadUrl, uploadImageApi } from ".";

export const useGetUploadUrl = (handleStoreData: (data: any) => void) => {
  return useMutation({
    mutationFn: getUploadUrl,
    onSuccess(data: any) {
      if (data) {
        handleStoreData(data);
        console.log("daata:", data);
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
