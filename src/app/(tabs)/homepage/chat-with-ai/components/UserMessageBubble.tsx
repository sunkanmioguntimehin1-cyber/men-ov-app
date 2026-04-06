import React from "react";
import { View, Text } from "react-native";

interface UserMessageBubbleProps {
  text: string;
  maxWidth: number;
}

export const UserMessageBubble: React.FC<UserMessageBubbleProps> = ({
  text,
  maxWidth,
}) => {
  return (
    <View
      className="px-4 py-3 rounded-2xl bg-secondary border border-[#FBC3F8] rounded-tr-none"
      style={{ maxWidth }}
    >
      <Text className="text-base font-[PoppinsRegular] text-titleText">
        {text}
      </Text>
    </View>
  );
};
