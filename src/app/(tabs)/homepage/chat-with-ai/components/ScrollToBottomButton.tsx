import React from "react";
import { TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ScrollToBottomButtonProps {
  visible: boolean;
  onPress: () => void;
  opacity: Animated.Value;
}

export const ScrollToBottomButton: React.FC<ScrollToBottomButtonProps> = ({
  visible,
  onPress,
  opacity,
}) => {
  if (!visible) return null;

  return (
    <Animated.View
      className="absolute bottom-4 right-4"
      style={{ opacity }}
    >
      <TouchableOpacity
        onPress={onPress}
        className="bg-white rounded-full shadow-lg p-3 border border-gray-200"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <MaterialIcons name="keyboard-arrow-down" size={28} color="#6B5591" />
      </TouchableOpacity>
    </Animated.View>
  );
};
