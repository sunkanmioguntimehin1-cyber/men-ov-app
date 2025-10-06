import { rS } from "@/src/lib/responsivehandler";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ICarouselInstance } from "react-native-reanimated-carousel";

const ImageUploadedDetails = ({
  imageSelected,
  setImageSelected,
  selectedLastSymptom,
  imageUploadedSelected,
  resetImageData,
}: any) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const ref = React.useRef<ICarouselInstance>(null);

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

        setImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.log("error from image upload", error);
    }
  };

  console.log(
    "selectedLastSymptom?.symptomImages[0]",
    selectedLastSymptom?.symptomImages[0]
  );

  const handleCloseImage = () => {
    setImageSelected(null);
    resetImageData();
  };
  return (
    <View>
      <Text className="font-[PoppinsMedium] " style={{ fontSize: rS(12) }}>
        symptom Images
      </Text>
      <View className=" ">
        {imageSelected || selectedLastSymptom?.symptomImages.length > 0 ? (
          <View className="w-full h-56  bg-white items-center justify-center rounded-2xl">
            {/* {imageSelected ? (
              <View>
                <ActivityIndicator size={40} />
              </View>
            ) : ( */}
            <View className=" flex-row ">
              <View className=" w-80 h-56 p-3">
                <Image
                  source={{
                    uri: selectedLastSymptom?.symptomImages[0],
                  }}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                  onError={(error) => console.log("Image error:", error)}
                />

                {/* <Carousel
                  ref={ref}
                  width={300}
                  height={220}
                  data={selectedLastSymptom?.symptomImages}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={{
                          uri: item,
                        }}
                        style={{ width: "100%", height: "100%" }}
                        contentFit="contain"
                        onError={(error) => console.log("Image error:", error)}
                      />
                    </View>
                  )}
                /> */}
              </View>

              <TouchableOpacity onPress={handleCloseImage} className="">
                <AntDesign name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
            {/* )} */}
          </View>
        ) : (
          <View>
            <TouchableOpacity
              className="my-3 w-[131px] flex-row items-center ml-2 bg-[#F9F5FF] rounded-full px-4 py-3 "
              onPress={handleImagePick}
            >
              {/* <View className=" my-3 w-[131px] flex-row items-center ml-2 bg-[#F9F5FF] rounded-full px-4 py-3"> */}
              <View className="">
                <Entypo name="image-inverted" size={20} color="#8A3FFC" />
              </View>
              <Text className="font-[PoppinsMedium] mx-2">Add image</Text>
              {/* </View> */}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ImageUploadedDetails;
