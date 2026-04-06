import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    ScrollView,
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
}

/**
 * Renders a horizontal row of quick-reply pill buttons parsed from
 * the <<ACTIONS: [...]>> tag in an AI message.
 *
 * Tapping a pill:
 *  1. Highlights it with the brand gradient
 *  2. Calls onPress so the parent can send it as a user message
 *  3. Locks all pills so they can't be pressed again (one-shot)
 */
export const ActionPills: React.FC<ActionPillsProps> = ({
  actions,
  onPress,
  disabled = false,
  style,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handlePress = (action: string) => {
    if (disabled || selected !== null) return;
    setSelected(action);
    onPress(action);
  };

  return (
    <View style={style}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          gap: 8,
          paddingVertical: 2,
        }}
      >
        {actions.map((action) => {
          const isSelected = selected === action;
          const isLocked = selected !== null && !isSelected;

          return (
            <TouchableOpacity
              key={action}
              onPress={() => handlePress(action)}
              activeOpacity={0.75}
              disabled={disabled || selected !== null}
            >
              {isSelected ? (
                /* Selected pill – gradient fill */
                <LinearGradient
                  colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    paddingVertical: 7,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                      fontFamily: "PoppinsMedium",
                    }}
                  >
                    {action}
                  </Text>
                </LinearGradient>
              ) : (
                /* Unselected / locked pill – outlined */
                <View
                  style={{
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    paddingVertical: 7,
                    borderWidth: 1.5,
                    borderColor: isLocked ? "#D1C8E0" : "#6B5591",
                    backgroundColor: isLocked ? "#F9F6FF" : "white",
                  }}
                >
                  <Text
                    style={{
                      color: isLocked ? "#B0A8C0" : "#6B5591",
                      fontSize: 13,
                      fontFamily: "PoppinsMedium",
                    }}
                  >
                    {action}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
