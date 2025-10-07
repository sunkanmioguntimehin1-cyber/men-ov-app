import { handleAxiosError } from "@/src/lib/handleAxiosError";
import { useMutation } from "@tanstack/react-query";
import React from "react";
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

const inferContentTypeFromUri = (uri: string | undefined): string | undefined => {
  if (!uri) return undefined;
  const pathname = uri.split("?")[0];
  const ext = pathname.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "heic":
      return "image/heic";
    case "heif":
      return "image/heif";
    default:
      return undefined;
  }
};

export const useImageUpload = (storeData: any) => {
  const lastFileToUploadRef = React.useRef<{ uri: string; contentType?: string } | null>(null);

  const { mutate, data, isPending, isError, reset, status } = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: () => {
      // Clear queued file on success so we don't re-upload
      lastFileToUploadRef.current = null;
    },
    onError: () => {
      // Keep the file queued for potential retry by caller
      // No-op
    },
  });

  console.log("status777", status);
  console.log("data777", data);
  console.log("isPending0000", isPending);

  const tryUploadIfReady = React.useCallback(() => {
    if (storeData?.uploadUrl && lastFileToUploadRef.current) {
      const { uri, contentType } = lastFileToUploadRef.current;
      mutate({
        uploadUrl: storeData.uploadUrl,
        fileUri: uri,
        publicUrl: storeData?.publicUrl,
        headers: storeData?.headers,
        contentType: contentType || inferContentTypeFromUri(uri),
      });
    }
  }, [mutate, storeData]);

  React.useEffect(() => {
    tryUploadIfReady();
  }, [tryUploadIfReady]);

  const uploadImage = async (imageUri: string, explicitContentType?: string) => {
    lastFileToUploadRef.current = {
      uri: imageUri,
      contentType: explicitContentType || inferContentTypeFromUri(imageUri),
    };
    tryUploadIfReady();
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
  };
};
