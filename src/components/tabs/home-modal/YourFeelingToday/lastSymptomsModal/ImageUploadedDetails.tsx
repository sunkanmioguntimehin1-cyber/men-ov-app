import {
  useGetUploadUrl,
  useImageUpload,
} from "@/src/api_services/uploadApi/uploadMutations";
import { rS } from "@/src/lib/responsivehandler";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const ImageUploadedDetails = ({
  setSymptomImgPublicUrls,
  selectedLastSymptom,
}: any) => {
  const [storeData, setStoreData] = React.useState<string | any>(null);
  const [imageSelected, setImageSelected] = React.useState<any>(null);

  const handleStoreData = (data: any) => {
    setStoreData(data);
    if (data?.publicUrl) {
      setSymptomImgPublicUrls((prev: any) => [...prev, data.publicUrl]);
    }
    // keep track of only URLs
  };

  //UPLOADING
  const {
    uploadImage: imageUploadedSelected,
    imageData: itemImgData,
    isImageUploadPending: ImgIsPending,
    isImageUploadError: ImgIsError,
    resetImageData,
  } = useImageUpload(storeData);

  console.log("ImgIsError:", ImgIsError);

  const getUploadUrlData = useGetUploadUrl(handleStoreData);

  React.useEffect(() => {
    if (storeData?.uploadUrl && imageSelected?.uri) {
      imageUploadedSelected(imageSelected.uri);
    }
  }, [storeData]);

  const handleImagePick = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setImageSelected(selectedAsset);

        // Request upload URL - this will trigger the useEffect above once complete
        getUploadUrlData.mutate({
          fileName: selectedAsset.fileName,
        });
      }
    } catch (error) {
      console.log("error from image upload", error);
    }
  };

  const handleCloseImage = () => {
    setImageSelected(null);
    resetImageData();
    setSymptomImgPublicUrls([]);
  };
  return (
    <View>
      <Text className="font-[PoppinsMedium] " style={{ fontSize: rS(12) }}>
        symptom Images
      </Text>

      <View className=" ">
        {imageSelected || selectedLastSymptom?.symptomImages?.length > 0 ? (
          <View className="w-full h-56 border border-primary   items-center justify-center rounded-2xl">
            {ImgIsPending ? (
              <View>
                <ActivityIndicator size={40} />
              </View>
            ) : (
              <View className=" flex-row ">
                {ImgIsError ? (
                  <View>
                    <Text className="text-red-500">
                      Upload Failed. Try Again.
                    </Text>
                  </View>
                ) : (
                  <View className=" w-80 h-56 p-3">
                    <Image
                      source={{
                        uri:
                          storeData?.publicUrl ||
                          selectedLastSymptom?.symptomImages[0],
                      }}
                      style={{ width: "100%", height: "100%" }}
                      contentFit="cover"
                    />
                  </View>
                )}

                {selectedLastSymptom?.symptomImages?.length > 0 ? null : (
                  <TouchableOpacity onPress={handleCloseImage} className="">
                    <AntDesign name="close" size={18} color="black" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        ) : (
          <View>
            <TouchableOpacity
              className="my-3 w-[131px] flex-row items-center ml-2 bg-[#F9F5FF] rounded-full px-4 py-3 "
              onPress={handleImagePick}
            >
              <View className="">
                <Entypo name="image-inverted" size={15} color="#8A3FFC" />
              </View>
              <Text className=" text-sm font-[PoppinsMedium] mx-2">
                Add image
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ImageUploadedDetails;
