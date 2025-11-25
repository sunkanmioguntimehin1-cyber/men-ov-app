import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomRadio = ({
  options,
  checkedValue,
  onChange,
  style,
  borderWidth,
  closeButton,
  isBottomSheet = false,
}: any) => {
  return (
    <View style={[styles.container, style]}>
      {options.map((option: any) => {
        let active = checkedValue === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.radio,
              {
                borderWidth: borderWidth,
                borderColor: "#EAEAEA",
              },
              active && styles.activeRadio,
            ]}
            onPress={() => {
              if (isBottomSheet) {
                onChange(option.value);
                closeButton();
              } else {
                onChange(option.value);
              }
            }}
          >
            <MaterialIcons
              name={active ? "radio-button-checked" : "radio-button-unchecked"}
              size={24}
              color={active ? "#712A87" : "#EAEAEA"}
            />
            <Text
              style={[styles.text, active && styles.activeText]}
              className={`font-[PoppinsRegular]`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  radio: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    // backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  activeRadio: {
    backgroundColor: "#F4EBFF",
  },
  text: {
    fontSize: 12,
    marginLeft: 15,
    color: "#6b7280",
  },
  activeText: {
    color: "#712A87",
  },
});

export default CustomRadio;
