// import React from "react";
// import { StyleSheet, TouchableOpacity, View } from "react-native";

// export const RadioButton = ({
//   isSelected,
//   onSelect,
// }: {
//   isSelected: boolean;
//   onSelect: () => void;
// }) => {
//   return (
//     <TouchableOpacity
//       onPress={onSelect}
//       activeOpacity={0.8}
//       style={[
//         styles.outerCircle,
//         { borderColor: isSelected ? "#B33288" : "#9CA3AF" }, // purple or gray
//       ]}
//     >
//       {isSelected && <View className="" style={styles.innerCircle} />}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   outerCircle: {
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     borderWidth: 2,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   innerCircle: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#B33288", // purple fill
//   },
// });


import { LinearGradient } from "expo-linear-gradient";
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
    <TouchableOpacity onPress={onSelect} activeOpacity={0.8}>
      {isSelected ? (
        // Selected state with gradient border
        <LinearGradient
          colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientOuter}
        >
          <View style={styles.innerWhite}>
            <LinearGradient
              colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.innerCircle}
            />
          </View>
        </LinearGradient>
      ) : (
        // Unselected state with gray border
        <View style={[styles.outerCircle, styles.unselectedBorder]} />
      )}
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
  unselectedBorder: {
    borderColor: "#9CA3AF",
  },
  gradientOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    padding: 2, // This creates the border width
    alignItems: "center",
    justifyContent: "center",
  },
  innerWhite: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});