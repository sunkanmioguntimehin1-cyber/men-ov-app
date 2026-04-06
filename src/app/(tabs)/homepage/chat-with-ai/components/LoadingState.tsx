import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading chat history...",
}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#000" />
      <Text className="mt-2 text-gray-500 font-[PoppinsRegular]">{message}</Text>
    </View>
  );
};
