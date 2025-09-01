import CustomInput from '@/src/custom-components/CustomInput';
import CustomSelect from '@/src/custom-components/CustomSelect';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";

type Prop = {
  selectedList: string | null;
};

interface Item {
  title: string;
  value: string;
  price?: string;
}

const SymptomsDescriptions = ({ selectedList }: Prop) => {
  const [selected, setSelected] = React.useState<Item | null>(null);
  const [openDropDown, setOpenDropDown] = React.useState(false);
  const [imageSelected, setImageSelected] = React.useState<any>(null);


  //UPLOADING
//   const {
//     uploadImage: imageUploadedSelected,
//     imageData: itemImgData,
//     isImageUploadPending: ImgIsPending,
//     isImageUploadError: ImgIsError,
//     resetImageData,
//   } = useImageUpload();

  const SeverityLevelData = [
    {
      level: "Lvl 1",
      levelColor: "#20D72A",
    },
    {
      level: "Lvl 2",
      levelColor: "#D7CE20",
    },
    {
      level: "Lvl 3",
      levelColor: "#D77F20",
    },
    {
      level: "Lvl 4",
      levelColor: "#D72020",
    },
  ];

  const dataItem = [
    { title: "Female", value: "female" },
    { title: "Male", value: "male" },
    { title: "Intersex", value: "Intersex" },
    // { title: "Farmer", value: "Farmer" },
  ];

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
        // imageUploadedSelected(result.assets[0].uri);

        setImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.log("error from image upload", error);
    }
  };

  const handleCloseImage = () => {
    setImageSelected(null);
    // resetImageData();
  };
  return (
    <View>
      <View>
        <CustomInput
          primary
          label="Symptoms"
          placeholder="Back Pain"
          //   value={selected || undefined}
        />
      </View>

      <View className="my-3">
        <Text>Severity Level</Text>

        <View className="flex-row items-center justify-between">
          {SeverityLevelData.map((item) => (
            <>
              <TouchableOpacity
                key={item.level}
                className=" w-20 h-12 items-center justify-center border border-[#D0D5DD] rounded-xl my-3"
              >
                <Text className=" font-[PoppinsRegular] text-[#667085]">
                  {item.level}
                </Text>
              </TouchableOpacity>
            </>
          ))}
        </View>
      </View>

      <View className=" flex-row items-center justify-between">
        <View>
          <CustomSelect
            label="When did happen"
            primary
            selected={selected}
            setSelected={setSelected}
            openDropDown={openDropDown}
            setOpenDropDown={setOpenDropDown}
            placeholder="Choose"
            dataItem={dataItem}
            // style={{ borderRadius: 100 }}
          />
        </View>

        <View>
          <CustomSelect
            label="How long did it last"
            primary
            selected={selected}
            setSelected={setSelected}
            openDropDown={openDropDown}
            setOpenDropDown={setOpenDropDown}
            placeholder="Choose"
            dataItem={dataItem}
            // style={{ borderRadius: 100 }}
          />
        </View>
      </View>

      <View className="mt-5 ">
        {imageSelected ? (
          <View className="w-full h-56  bg-white items-center justify-center rounded-2xl">
            {/* {imageSelected ? (
              <View>
                <ActivityIndicator size={40} />
              </View>
            ) : ( */}
            <View className=" flex-row ">
              <View className=" w-80 h-56 p-3">
                <Image
                  source={{ uri: imageSelected }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>

              <TouchableOpacity onPress={handleCloseImage} className=''>
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

export default SymptomsDescriptions