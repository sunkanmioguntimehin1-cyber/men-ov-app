import {
  useGetUploadUrl,
  useImageUpload,
} from "@/src/api_services/uploadApi/uploadMutations";
import { rS, rV } from "@/src/lib/responsivehandler";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddNote = ({
  errors,
  control,
  setNotePublicUrls,
  notePublicUrls,
}: any) => {
  const [storeData, setStoreData] = React.useState<string | any>(null);
  const [imageSelected, setImageSelected] = React.useState<any>(null);


  React.useEffect(() => {
    if (imageSelected) {
      getUploadUrlData.mutate({
        fileName: imageSelected.fileName,
      });
    }
  }, [imageSelected]);

  const handleStoreData = (data: any) => {
    setStoreData(data);
    if (data?.publicUrl) {
      setNotePublicUrls((prev: any) => [...prev, data.publicUrl]);
    }
    // keep track of only URLs
  };

  console.log("notePublicUrls2222", notePublicUrls);

  //UPLOADING
  const {
    uploadImage: imageUploadedSelected,
    imageData: itemImgData,
    isImageUploadPending: ImgIsPending,
    isImageUploadError: ImgIsError,
    resetImageData,
  } = useImageUpload(storeData);

  const getUploadUrlData = useGetUploadUrl(handleStoreData);

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
        imageUploadedSelected(result.assets[0].uri);

        setImageSelected(result.assets[0]);
        console.log("result2222", result.assets[0]);
      }
    } catch (error) {
      console.log("error from image upload", error);
    }
  };

  const handleCloseImage = () => {
    setImageSelected(null);
    resetImageData();
    setNotePublicUrls([]);
  };

  return (
    <ScrollView>
      <View className="mt-3 mb-5">
        <Text
          className="mb-2 font-[PoppinsMedium]"
          style={{ fontSize: rS(12) }}
        >
          Notes
        </Text>

        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="border border-[#B4B4B4] bg-white rounded-lg p-4">
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder="Add a note about how do you feel"
                placeholderTextColor="#9B9B9B"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{
                  fontSize: rS(14),
                  color: "#000",
                  textAlignVertical: "top",
                  minHeight: rV(100),
                }}
              />
            </View>
          )}
        />
      </View>
      {/* <TouchableOpacity className="w-[131px] flex-row items-center ml-2 bg-[#F9F5FF] rounded-full px-4 py-3">
        <Text className="font-[PoppinsMedium]">Add image</Text>
        <View className="mx-2">
          <Entypo name="image-inverted" size={24} color="#8A3FFC" />
        </View>
      </TouchableOpacity> */}

      <View className=" ">
        {imageSelected ? (
          <View className="w-full h-56  bg-white items-center justify-center rounded-2xl">
            {ImgIsPending ? (
              <View>
                <ActivityIndicator size={40} />
              </View>
            ) : (
              <View className=" flex-row ">
                <View className=" w-80 h-56 p-3">
                  <Image
                    source={{ uri: imageSelected.uri || storeData.publicUrl }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>

                <TouchableOpacity onPress={handleCloseImage} className="">
                  <AntDesign name="close" size={18} color="black" />
                </TouchableOpacity>
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
                <Entypo name="image-inverted" size={20} color="#8A3FFC" />
              </View>
              <Text className="font-[PoppinsMedium] mx-2">Add image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AddNote;
