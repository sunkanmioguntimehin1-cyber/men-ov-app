import { rS, rV } from "@/src/lib/responsivehandler";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface ActionPillsProps {
  actions: string[];
  onPress: (action: string) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  selectedButton?: string;
  setSelectedButton?: (action: string) => void;
  messageId?: string;
}

export const ActionPills: React.FC<ActionPillsProps> = ({
  actions,
  onPress,
  disabled = false,
  style,
  selectedButton,
  setSelectedButton,
}) => {
  const handlePress = (action: string) => {
    if (disabled || selectedButton !== undefined) return;
    setSelectedButton?.(action);
    onPress(action);
  };

  return (
    <View
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          alignSelf: "flex-start",
        },
        style,
      ]}
    >
      {actions.map((action) => {
        const isSelected = selectedButton === action;
        const isLocked = selectedButton !== undefined && !isSelected;

        const BUTTON_WIDTH = rS(120);
        const BUTTON_HEIGHT = rV(40);

        return (
          <TouchableOpacity
            key={action}
            onPress={() => handlePress(action)}
            activeOpacity={0.8}
            disabled={disabled || selectedButton !== undefined}
            style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT, padding: 2 }}
          >
            {isSelected ? (
              <LinearGradient
                colors={["#635B91", "#8B3D88", "#B54475"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                  flex: 1,
                  borderRadius: 18, // Slightly more squared as per image
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {action}
                </Text>
              </LinearGradient>
            ) : (
              <View
                style={{
                  flex: 1,
                  borderRadius: 18,
                  backgroundColor: isLocked ? "#F1EBF9" : "#EBE4F9",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: isLocked ? "#9A93B0" : "#5A5D72",
                    fontSize: 14,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {action}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
