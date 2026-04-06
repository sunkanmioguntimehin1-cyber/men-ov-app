import React from "react";
import { View } from "react-native";
import { TypingDots } from "@/src/custom-components/TypingDots";

export const TypingIndicator: React.FC = () => {
  return (
    <View className="flex-row space-x-1 py-1 items-center">
      <TypingDots />
    </View>
  );
};
