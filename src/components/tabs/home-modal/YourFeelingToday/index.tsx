import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Symptoms from "./symptoms";

const YourFeelingToday = ({ onCancel }:any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tellUsHowYouFeel = ["Symptoms", "Triggers & Activities", "Add Note"];




  // Update handleSelectFeeling to set the index directly
  const handleSelectFeeling = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <View className=" w-96 p-5 bg-white rounded-lg  shadow-lg overflow-hidden">
      <View className=" flex-row items-center justify-between">
        <Text>How do you Feel today? </Text>
        <TouchableOpacity onPress={onCancel}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className=" flex-row items-center justify-between mt-5">
        {tellUsHowYouFeel.map((item, index) => (
          <>
            <TouchableOpacity
              key={index}
              className={` ${
                activeIndex === index ? " border-b border-[#42307D] p-2" : null
              }`}
              onPress={() => {
                handleSelectFeeling(index);
              }}
            >
              <Text
                className={`text-sm font-[PoppinsRegular]  ${
                  activeIndex === index ? "text-[#42307D]" : "text-[#D6BBFB]"
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          </>
        ))}
      </View>

      <View>{activeIndex === 0 && <Symptoms />}</View>
    </View>
  );
};

export default YourFeelingToday;
