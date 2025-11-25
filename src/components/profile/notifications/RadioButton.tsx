// import React from "react";
// import { TouchableOpacity, View } from "react-native";

// // Radio Button Component
// export const RadioButton = ({
//   isSelected,
//   onSelect,
// }: {
//   isSelected: boolean;
//   onSelect: () => void;
// }) => (
//   <TouchableOpacity
//     onPress={onSelect}
//     className={`w-5 h-5 rounded-full border-2 ${
//       isSelected ? "border-[#8A3FFC] bg-[#8A3FFC]" : "border-gray-300"
//     }`}
//   >
//     {isSelected && <View className=" " />}
//   </TouchableOpacity>
// );


import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const RadioButton = ({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.8}
      style={[
        styles.outerCircle,
        { borderColor: isSelected ? "#B33288" : "#9CA3AF" }, // purple or gray
      ]}
    >
      {isSelected && <View className="" style={styles.innerCircle} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#B33288", // purple fill
  },
});
