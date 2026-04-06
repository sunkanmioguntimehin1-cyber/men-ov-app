import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GRADIENT_COLORS } from "../types/chat";
import { renderFormattedText } from "../utils/formatText";

interface AIMessageBubbleProps {
  text: string;
  maxWidth: number;
}

export const AIMessageBubble: React.FC<AIMessageBubbleProps> = ({
  text,
  maxWidth,
}) => {
  return (
    <View
      className="rounded-2xl rounded-tl-none overflow-hidden"
      style={{ maxWidth }}
    >
      <LinearGradient
        colors={[...GRADIENT_COLORS]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 16 }}
      >
        {renderFormattedText(text)}
      </LinearGradient>
    </View>
  );
};
