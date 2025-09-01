import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Triggers = () => {
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [customTrigger, setCustomTrigger] = useState("");

  const triggers = [
    "Alcohol",
    "Caffeine",
    "Lack of Sleep",
    "Certain Food",
    "Hormonal Changes",
    "Medication",
    "Weather",
    "Physical Activity",
    "Mental load",
    "Anxiety",
  ];

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(trigger)
        ? prev.filter((t) => t !== trigger)
        : [...prev, trigger]
    );
  };
  return (
    <View>
      <Text className=" my-3 text-sm font-[PoppinsMedium]">Triggers</Text>
      <View className="flex-row flex-wrap">
        {triggers.map((trigger) => (
          <TouchableOpacity
            key={trigger}
            onPress={() => toggleTrigger(trigger)}
            className={`px-4 py-2 m-1 rounded-full border ${
              selectedTriggers.includes(trigger)
                ? "bg-primary border-primary"
                : "bg-white border-gray-300"
            }`}
          >
            <Text
              className={`text-sm font-[PoppinsRegular] ${
                selectedTriggers.includes(trigger)
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              {trigger}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="mt-4 flex-row items-center">
        <View className="flex-1 h-12 border border-gray-300 rounded-lg px-3 flex-row items-center">
          <TextInput
            placeholder="Something else?"
            className=" font-[PoppinsRegular]"
          />
        </View>

        <TouchableOpacity className=" flex-row items-center ml-2 bg-primary rounded-lg px-4 py-3">
          <View>
            <AntDesign name="plus" size={20} color="white" />
          </View>
          <Text className="text-white font-[PoppinsMedium]"> Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Triggers;
