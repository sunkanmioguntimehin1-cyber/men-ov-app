// import { useEffect, useRef } from "react";
// import { Animated, View } from "react-native";

// export const TypingDots = () => {
//   const dot1 = useRef(new Animated.Value(0)).current;
//   const dot2 = useRef(new Animated.Value(0)).current;
//   const dot3 = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const animateDot = (dot: Animated.Value, delay: number) => {
//       return Animated.loop(
//         Animated.sequence([
//           Animated.delay(delay),
//           Animated.timing(dot, {
//             toValue: 1,
//             duration: 400,
//             useNativeDriver: true,
//           }),
//           Animated.timing(dot, {
//             toValue: 0,
//             duration: 400,
//             useNativeDriver: true,
//           }),
//         ])
//       );
//     };

//     const animation = Animated.parallel([
//       animateDot(dot1, 0),
//       animateDot(dot2, 150),
//       animateDot(dot3, 300),
//     ]);

//     animation.start();

//     return () => animation.stop();
//   }, []);

//   const animatedStyle = (dot: Animated.Value) => ({
//     opacity: dot.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0.3, 1],
//     }),
//     transform: [
//       {
//         translateY: dot.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0, -4],
//         }),
//       },
//     ],
//   });

//   return (
//     <View className="flex-row space-x-1 items-center">
//       <Animated.View
//         style={[animatedStyle(dot1)]}
//         className="w-2 h-2 bg-gray-600 rounded-full"
//       />
//       <Animated.View
//         style={[animatedStyle(dot2)]}
//         className="w-2 h-2 bg-gray-600 rounded-full"
//       />
//       <Animated.View
//         style={[animatedStyle(dot3)]}
//         className="w-2 h-2 bg-gray-600 rounded-full"
//       />
//     </View>
//   );
// };


import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export const TypingDots = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation = Animated.parallel([
      animateDot(dot1, 0),
      animateDot(dot2, 150),
      animateDot(dot3, 300),
    ]);

    animation.start();

    return () => animation.stop();
  }, []);

  const animatedStyle = (dot: Animated.Value) => ({
    opacity: dot.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        translateY: dot.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -4],
        }),
      },
    ],
  });

  return (
    <View className="flex-row space-x-1 items-center">
      <Animated.View
        style={[animatedStyle(dot1), { backgroundColor: "#86DBC0" }]}
        className="w-3 h-3 rounded-full"
      />
      <Animated.View
        style={[animatedStyle(dot2), { backgroundColor: "#FBC3F8" }]}
        className="w-3 h-3 mx-2 rounded-full"
      />
      <Animated.View
        style={[animatedStyle(dot3), { backgroundColor: "#F0A29F" }]}
        className="w-3 h-3 rounded-full"
      />
    </View>
  );
};

