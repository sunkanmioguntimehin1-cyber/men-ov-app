import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type YesNoSelectorProps = {
  onSelectionChange?: (value: "yes" | "no" | null) => void;
  selectedValue?: "yes" | "no" | null;
  disabled?: boolean;
  yesText?: string;
  noText?: string;
  primaryColor?: string;
  borderColor?: string;
  textColor?: string;
  unselectedTextColor?: string;
  iconSize?: number;
};

const YesNoSelector = ({
  onSelectionChange,
  selectedValue: controlledValue,
  disabled = false,
  yesText = "Yes",
  noText = "No",
  primaryColor = "#6941C6", // Default purple
  borderColor = "#D0D5DD",
  textColor = "#344054",
  unselectedTextColor = "#6B7280",
  iconSize = 20,
}: YesNoSelectorProps) => {
  // Internal state for uncontrolled usage
  const [internalSelected, setInternalSelected] = useState<"yes" | "no" | null>(
    null
  );

  // Use controlled value if provided, otherwise use internal state
  const selectedValue =
    controlledValue !== undefined ? controlledValue : internalSelected;

  const handleSelection = (value: "yes" | "no") => {
    if (disabled) return;

    const newValue = selectedValue === value ? null : value;

    // Update internal state if not controlled
    if (controlledValue === undefined) {
      setInternalSelected(newValue);
    }

    // Call external handler
    onSelectionChange?.(newValue);
  };

  const options = [
    {
      value: "yes" as const,
      title: yesText,
      icon: "check" as const,
    },
    {
      value: "no" as const,
      title: noText,
      icon: "close" as const,
    },
  ];

  return (
    <View className="flex-row">
      {options.map((item, index) => {
        const isSelected = selectedValue === item.value;
        const isDisabled = disabled;

        return (
          <React.Fragment key={item.value}>
            <TouchableOpacity
              className={`flex-1 h-14 flex-row items-center justify-center border rounded-lg ${
                isSelected ? "bg-primary border-primary" : "bg-white"
              } ${isDisabled ? "opacity-50" : ""}`}
              style={{
                backgroundColor: isSelected ? primaryColor : "white",
                borderColor: isSelected ? primaryColor : borderColor,
              }}
              onPress={() => handleSelection(item.value)}
              disabled={isDisabled}
              activeOpacity={0.7}
            >
              <Text
                className={`mx-3 ${isSelected ? "text-white" : ""}`}
                style={{
                  color: isSelected ? "white" : textColor,
                }}
              >
                {item.title}
              </Text>
              <AntDesign
                name={item.icon}
                size={iconSize}
                color={isSelected ? "white" : unselectedTextColor}
              />
            </TouchableOpacity>
            {index < options.length - 1 && <View className="flex-[.03]" />}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default YesNoSelector;
