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
  const getUploadUrlData = useGetUploadUrl(handleStoreData, publicUrl);
  const {
    uploadImage: imageUploadedSelected,
    imageData: itemImgData,
    isImageUploadPending: ImgIsPending,
    isImageUploadError: ImgIsError,
    resetImageData,
  } = useImageUpload(storeData);

  // Auto-trigger upload URL when image is selected
  React.useEffect(() => {
    if (imageSelected) {
      getUploadUrlData.mutate({
        fileName: imageSelected.fileName,
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
        imageUploadedSelected(result.assets[0].uri);
        setImageSelected(result.assets[0]);
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
