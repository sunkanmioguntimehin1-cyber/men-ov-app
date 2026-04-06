import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No messages yet. Start a conversation!",
  subtitle,
}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <MaterialIcons name="chat-bubble-outline" size={64} color="#D1D5DB" />
      <Text className="mt-4 text-gray-500 font-[PoppinsRegular] text-center">
        {title}
      </Text>
      {subtitle && (
        <Text className="mt-1 text-gray-400 font-[PoppinsRegular] text-center">
          {subtitle}
        </Text>
      )}
    </View>
  );
};
