import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ErrorStateProps {
  title?: string;
  subtitle?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Failed to load chat history",
  subtitle = "Please try again later",
}) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <MaterialIcons name="error-outline" size={48} color="#EF4444" />
      <Text className="mt-2 text-gray-700 font-[PoppinsSemiBold] text-center">
        {title}
      </Text>
      <Text className="mt-1 text-gray-500 font-[PoppinsRegular] text-center">
        {subtitle}
      </Text>
    </View>
  );
};
