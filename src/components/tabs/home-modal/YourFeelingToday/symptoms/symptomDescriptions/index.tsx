import {
  useGetUploadUrl,
  useImageUpload,
} from "@/src/api_services/uploadApi/uploadMutations";
import CustomInput from "@/src/custom-components/CustomInput";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import useSymtomsStore from "@/src/store/symtomsStore";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Controller } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import SeverityLevel from "../severityLevel";

type Prop = {
  selectedList: string | null;
  errors?: any;
  control?: any;
  selected?: Item;
  setSelected?: () => void;
  selectedDate?: Date | any;
  handleDateBottomSheetOpen?: any;
  handleDurationBottomSheetOpen?: any;
  durationData?: string;
  selectedSeverityLevel?: number | null;
  setSelectedSeverityLevel?: () => void;
  setPublicUrls?: any;
};

interface Item {
  title: string;
  value: string;
  price?: string;
}

const SymptomsDescriptions = ({
  selectedList,
  selectedDate,
  handleDateBottomSheetOpen,
  handleDurationBottomSheetOpen,
  errors,
  control,
  durationData,
  selectedSeverityLevel,
  setSelectedSeverityLevel,
  setPublicUrls,
  selected,
  setSelected,
}: Prop) => {
  const [storeData, setStoreData] = React.useState<string | any>(null);

  const [imageSelected, setImageSelected] = React.useState<any>(null);

  const clearPublicUrls = useSymtomsStore().clearPublicUrls;
  const setSymtomsDataList = useSymtomsStore().setSymtomsDataList;
  const currentPublicUrls = useSymtomsStore().symtomsDataList.publicUrl;

  React.useEffect(() => {
    if (imageSelected) {
      getUploadUrlData.mutate({
        fileName: imageSelected.fileName,
      });
    }
  }, [imageSelected]);

  const handleStoreData = (data: any) => {
    console.log(data, "coming from the data")
    if(data){
    setStoreData(data);

    }
    if (data?.publicUrl) {
      setSymtomsDataList({
        publicUrl: [...currentPublicUrls, data.publicUrl],
      }); // keep track of only URLs
      setPublicUrls((prev: any) => [...prev, data.publicUrl]); // keep track of only URLs
    }
  };

  //UPLOADING
  const {
    uploadImage: imageUploadedSelected,
    imageData: itemImgData,
    isImageUploadPending: ImgIsPending,
    isImageUploadError: ImgIsError,
    resetImageData,
  } = useImageUpload(storeData);

  const getUploadUrlData = useGetUploadUrl(handleStoreData);

  console.log("storeDatacompone:", storeData);

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
      }
    } catch (error) {
      console.log("error from image upload", error);
    }
  };

 

  const handleCloseImage = () => {
    setImageSelected(null);
    resetImageData();
    clearPublicUrls();
  };
  return (
    <View>
      <View>
        <Controller
          control={control}
          name="symptoms"
          rules={{
            required: "Symptoms is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              primary
              label="Symptoms"
              // placeholder="Back Pain"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.symptoms?.message}
              //   value={selected || undefined}
            />
          )}
        />
      </View>

      <View className="my-3">
        <SeverityLevel
          selectedSeverityLevel={selectedSeverityLevel}
          setSelectedSeverityLevel={setSelectedSeverityLevel}
        />
      </View>

      <View className=" ">
        <View>
          <CustomSelectData
            onPress={handleDateBottomSheetOpen}
            primary
            placeholder="Pick a date"
            label="When did happen"
            value={selectedDate}
            icon={
              <TouchableOpacity onPress={handleDateBottomSheetOpen}>
                <AntDesign name="down" size={20} color="#1E1D2F" />
              </TouchableOpacity>
            }
          />
        </View>

        <View>
          <CustomSelectData
            onPress={handleDurationBottomSheetOpen}
            primary
            label="How long did it last"
            placeholder="Choose"
            value={durationData}
            icon={
              <TouchableOpacity onPress={handleDurationBottomSheetOpen}>
                <AntDesign name="down" size={20} color="#1E1D2F" />
              </TouchableOpacity>
            }
          />
        </View>
      </View>

      <View className="mt-5 ">
        {imageSelected ? (
          <View className="w-full h-56 border border-primary   items-center justify-center rounded-2xl">
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
                    contentFit="cover"
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
              {/* <View className=" my-3 w-[131px] flex-row items-center ml-2 bg-[#F9F5FF] rounded-full px-4 py-3"> */}
              <View className="">
                <Entypo name="image-inverted" size={15} color="#8A3FFC" />
              </View>
              <Text className="font-[PoppinsMedium] text-sm mx-2">
                Add image
              </Text>
              {/* </View> */}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default SymptomsDescriptions;
