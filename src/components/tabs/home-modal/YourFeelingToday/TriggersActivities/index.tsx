import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const TriggersActivities = ({ selectedTriggers, setSelectedTriggers }:any) => {
  
  const [customTrigger, setCustomTrigger] = useState("");

  const [triggers, setTriggers] = useState<string[]>([
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
  ]);

  

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers((prev:any) =>
      prev.includes(trigger)
        ? prev.filter((t:any) => t !== trigger)
        : [...prev, trigger]
    );
  };

  const addCustomTrigger = () => {
    const newTrigger = customTrigger.trim();

    if (newTrigger && !selectedTriggers.includes(newTrigger)) {
      setSelectedTriggers((prev:any) => [...prev, newTrigger]);
    }

    if (newTrigger && !triggers.includes(newTrigger)) {
      setTriggers((prev) => [...prev, newTrigger]); // add to main list too
    }

    setCustomTrigger(""); // clear input
  };

  console.log("selectedTriggers23:", selectedTriggers.length);
  return (
    <View>
      <View className=" mt-5 flex-row flex-wrap">
        {triggers.map((trigger) => (
          <TouchableOpacity
            key={trigger}
            onPress={() => toggleTrigger(trigger)}
            className={`px-2  items-center justify-center h-10 m-1 rounded-xl border ${
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
            value={customTrigger}
            onChangeText={setCustomTrigger}
            className="font-[PoppinsRegular] flex-1"
          />
        </View>

        <TouchableOpacity
          className=" flex-row items-center ml-2 bg-primary rounded-lg px-4 py-3"
          onPress={addCustomTrigger}
        >
          <View>
            <AntDesign name="plus" size={15} color="white" />
          </View>
          <Text className="text-white text-sm font-[PoppinsMedium]"> Add</Text>
        </TouchableOpacity>
      </View>

      {/* <View className="my-3">
        <CustomButton primary title="Next" />
      </View> */}
    </View>
  );
};

export default TriggersActivities;
