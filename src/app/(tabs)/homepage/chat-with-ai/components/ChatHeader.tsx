import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ChatHeaderProps {
  title?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = "Chat with Ziena™",
}) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between py-4">
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-10 h-10 items-center justify-center"
      >
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-lg font-[PoppinsSemiBold] text-black">
        {title}
      </Text>
      <View className="w-10" />
    </View>
  );
};
