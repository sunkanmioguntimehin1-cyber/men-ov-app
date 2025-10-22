import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
// import { Trash2, X } from "lucide-react"; // Using Lucide icons for a modern look

const InTakeModal = ({ onCancel }: any) => {
  const handleInTake = () => {
    router.push("/(tabs)/homepage/personal-info");
    onCancel();
  };
  return (
    <View className="w-80 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Warning Icon and Title */}
      <View className="bg-primary p-4 items-center">
        {/* <Trash2 color="#dc2626" size={48} strokeWidth={1.5} /> */}
        <Text className="text-xl font-bold text-white  mt-2">
          Personal In-takes
        </Text>
      </View>

      {/* Description */}
      <View className="p-4">
        <Text className="text-center font-[PoppinsRegular] text-base leading-relaxed">
          Personal In-take is required before you can view your profile
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          className="flex-1 mr-2 bg-primary p-3 rounded-lg items-center"
          //   onPress={onDelete}
          onPress={handleInTake}
        >
          <Text className="text-white font-bold text-base">Okay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 ml-2 bg-gray-200 p-3 rounded-lg items-center"
          onPress={onCancel}
        >
          <Text className=" font-bold text-base">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InTakeModal;
