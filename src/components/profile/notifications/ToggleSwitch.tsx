// import React, { useEffect, useRef } from "react";
// import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

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
//     outputRange: [2, 22], // knob movement
//   });

//   return (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       onPress={onToggle}
//       style={[
//         styles.container,
//         { backgroundColor: isOn ? "#B33288" : "#D1D5DB" }, // purple vs gray
//       ]}
//     >
//       <Animated.View
//         style={[
//           styles.knob,
//           {
//             transform: [{ translateX }],
//           },
//         ]}
//       >
//         <View style={styles.innerKnob} />
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: 44,
//     height: 24,
//     borderRadius: 12,
//     padding: 2,
//     justifyContent: "center",
//   },
//   knob: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: "white",
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 2,
//     elevation: 2, // Android shadow
//   },
//   innerKnob: {
//     flex: 1,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#E5E7EB", // subtle border
//   },
// });


import { LinearGradient } from "expo-linear-gradient";
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
    <TouchableOpacity activeOpacity={0.8} onPress={onToggle}>
      {isOn ? (
        <LinearGradient
          colors={["#6B5591", "#9F3E83"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
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
        </LinearGradient>
      ) : (
        <View style={[styles.container, styles.inactiveBackground]}>
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
        </View>
      )}
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
  inactiveBackground: {
    backgroundColor: "#D1D5DB",
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