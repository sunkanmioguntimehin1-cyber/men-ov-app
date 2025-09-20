import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Triggers = ({
  selectedLastSymptom,
  toggleTrigger,
  addCustomTrigger,
  selectedTriggers,
  customTrigger,
  setCustomTrigger,
}: any) => {
  const [openTrigger, setOpenTrigger] = React.useState(false);

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

  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Text className="my-3 text-sm font-[PoppinsMedium]">Triggers</Text>
        <TouchableOpacity onPress={() => setOpenTrigger(!openTrigger)}>
          <AntDesign name="down" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Show Selected */}
      {selectedTriggers.length > 0 && (
        <View className="flex-row flex-wrap mt-3">
          {selectedTriggers.map((trigger: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleTrigger(trigger)} // remove on press
              className="px-4 items-center justify-center h-10 m-1 rounded-xl border border-primary bg-primary"
            >
              <Text className="text-white text-sm">{trigger}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Divider */}
      <View className="bg-gray-300 h-0.5 my-2" />

      {openTrigger && (
        <>
          <View className="flex-row flex-wrap">
            {triggers.map((trigger) => {
              const isSelected = selectedTriggers.includes(trigger);
              return (
                <TouchableOpacity
                  key={trigger}
                  onPress={() => toggleTrigger(trigger)}
                  className={`px-4 items-center justify-center h-12 m-1 rounded-xl border ${
                    isSelected
                      ? "bg-primary border-primary"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text
                    className={`text-sm font-[PoppinsRegular] ${
                      isSelected ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {trigger}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Divider */}
          <View className="bg-gray-300 h-0.5 my-2" />

          {/* Custom Trigger Input */}
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
              onPress={addCustomTrigger}
              className="flex-row items-center ml-2 bg-primary rounded-lg px-4 py-3"
            >
              <AntDesign name="plus" size={20} color="white" />
              <Text className="text-white font-[PoppinsMedium] ml-1">Add</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Triggers;
