import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";


type Prop = {
  setSelectedList: (value: string | null) => void;
};

const SymptomsList = ({ setSelectedList }: Prop) => {
  const symptomsData = [
    {
      name: "Back Pain",
      img: require("@/assets/images/backpain.png"),
    },
    {
      name: "Headache",
      img: require("@/assets/images/backpain.png"),
    },
    {
      name: "Heart Palpitations",
      img: require("@/assets/images/backpain.png"),
    },
    {
      name: "Anxiety",
      img: require("@/assets/images/backpain.png"),
    },
    {
      name: "Describe how you feel",
      img: require("@/assets/images/backpain.png"),
    },
  ];

  const handleSelectedList = (item: string) => {
    console.log("item:", item);
    setSelectedList(item);
  };
  return (
    <View className="">
      {symptomsData.map((item) => (
        <>
          <TouchableOpacity
            className="flex-row items-center h-14 rounded-xl  bg-[#F9FAFB] my-1"
            onPress={() => handleSelectedList(item.name)}
          >
            <View className=" w-6 h-6 ml-2 ">
              <Image
                source={require("@/assets/images/backpain.png")}
                style={{
                  height: "100%",
                  width: "100%",
                  // alignSelf: "center",
                  borderRadius: 100,
                }}
                contentFit="contain"
                onError={(error) => console.log("Image error:", error)}
              />
            </View>
            <Text className=" text-sm mx-3 font-[PoppinsMedium]">
              {item.name}
            </Text>
          </TouchableOpacity>
        </>
      ))}
      {/* <View className="my-3">
        <CustomButton primary title="Add" />
      </View> */}
    </View>
  );
};

export default SymptomsList;
