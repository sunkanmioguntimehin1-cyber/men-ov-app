// import React, { useEffect, useRef } from "react";
// import { Animated, TouchableOpacity } from "react-native";

// export const ToggleSwitch = ({
//   isOn,
//   onToggle,
// }: {
//   isOn: boolean;
//   onToggle: () => void;
// }) => {
//   const animatedValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;

//   useEffect(() => {
//     Animated.timing(animatedValue, {
//       toValue: isOn ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   }, [isOn]);

//   const translateX = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [2, 24], // knob moves left to right
//   });

//   return (
//     <TouchableOpacity
//       onPress={onToggle}
//       activeOpacity={0.8}
//       style={{
//         width: 48,
//         height: 28,
//         borderRadius: 14,
//         backgroundColor: isOn ? "#8A3FFC" : "#D1D5DB", // gray-300
//         padding: 2,
//         justifyContent: "center",
//       }}
//     >
//       <Animated.View
//         style={{
//           width: 24,
//           height: 24,
//           borderRadius: 12,
//           backgroundColor: "white",
//           transform: [{ translateX }],
//         }}
//       />
//     </TouchableOpacity>
//   );
// };


import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

export const ToggleSwitch = ({
  isOn,
  onToggle,
}: {
  isOn: boolean;
  onToggle: () => void;
}) => {
  const animatedValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // knob movement
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={[
        styles.container,
        { backgroundColor: isOn ? "#8A3FFC" : "#D1D5DB" }, // purple vs gray
      ]}
    >
      <Animated.View
        style={[
          styles.knob,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.innerKnob} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: "center",
  },
  knob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  innerKnob: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB", // subtle border
  },
});
