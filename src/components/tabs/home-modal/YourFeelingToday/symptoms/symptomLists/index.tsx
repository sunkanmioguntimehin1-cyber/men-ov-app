import useSymtomsStore from "@/src/store/symtomsStore";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Prop = {
  setSelectedList: (value: string | null) => void;
};

const SymptomsList = ({ setSelectedList }: Prop) => {
  const setSymtomsDataList = useSymtomsStore().setSymtomsDataList;

  const symptomsData = [
    {
      name: "Back Pain",
      img: require("@/assets/images/backpain.png"),
    },
    {
      name: "Headache",
      img: require("@/assets/images/headache.png"),
    },
    {
      name: "Heart Palpitations",
      img: require("@/assets/images/heart_palpitations.png"),
    },
    {
      name: "Anxiety",
      img: require("@/assets/images/anxiety.png"),
    },
    {
      name: "Describe how you feel",
      img: require("@/assets/images/general.png"),
    },
  ];

  const handleSelectedList = (item: string) => {
    console.log("item333:", item);
    setSelectedList(item);
    setSymtomsDataList({ symptomslist: item });
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
                source={item.img}
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
    </View>
  );
};

export default SymptomsList;
