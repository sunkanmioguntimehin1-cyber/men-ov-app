import { useGetUploadUrl, useImageUpload } from "@/src/api_services/uploadApi/uploadMutations";
import useSymtomsStore from "@/src/store/symtomsStore";
import * as ImagePicker from "expo-image-picker";
import React from "react";

// Custom hook that can be used in any component
export const useImageUploadWithStore = () => {
  const [storeData, setStoreData] = React.useState<string | any>(null);
  const [imageSelected, setImageSelected] = React.useState<any>(null);

  // Get current state from store
  const { symtomsDataList, setSymtomsDataList } = useSymtomsStore();
  const { uploadUrl, publicUrl } = symtomsDataList;

  // Handle store data
  const handleStoreData = React.useCallback((data: any) => {
    setStoreData(data);
  }, []);

  // Initialize hooks with current publicUrl
  const getUploadUrlData = useGetUploadUrl(handleStoreData);
  const {
    uploadImage: imageUploadedSelected,
    imageData: itemImgData,
    isImageUploadPending: ImgIsPending,
    isImageUploadError: ImgIsError,
    resetImageData,
  } = useImageUpload(storeData);

  // Auto-trigger upload URL when image is selected
  const inferType = (fileName?: string) => {
    if (!fileName) return undefined;
    const ext = fileName.split(".").pop()?.toLowerCase();
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

  React.useEffect(() => {
    if (imageSelected) {
      getUploadUrlData.mutate({
        fileName: imageSelected.fileName,
        contentType: inferType(imageSelected.fileName),
      });
    }
  }, [imageSelected, getUploadUrlData]);

  // Image picker function
  const handleImagePick = React.useCallback(async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const picked = result.assets[0];
        imageUploadedSelected(picked.uri, inferType(picked.fileName));
        setImageSelected(picked);
      }
    } catch (error) {
      console.log("error from image upload", error);
    }
  }, [imageUploadedSelected]);

  // Clear image function
  const handleClearImage = React.useCallback(() => {
    setImageSelected(null);
  }, []);

  return {
    imageSelected,
    storeData,
    publicUrl, // Array of all uploaded images
    uploadUrl,
    ImgIsPending,
    ImgIsError,
    handleImagePick,
    handleClearImage,
    resetImageData,
  };
};
