// import { LinearGradient } from "expo-linear-gradient";
// import React, { useState } from "react";
// import {
//   StyleProp,
//   Text,
//   TouchableOpacity,
//   View,
//   ViewStyle,
// } from "react-native";

// interface ActionPillsProps {
//   actions: string[];
//   onPress: (action: string) => void;
//   disabled?: boolean;
//   style?: StyleProp<ViewStyle>;
// }

// export const ActionPills: React.FC<ActionPillsProps> = ({
//   actions,
//   onPress,
//   disabled = false,
//   style,
// }) => {
//   const [selected, setSelected] = useState<string | null>(null);

//   const handlePress = (action: string) => {
//     if (disabled || selected !== null) return;
//     setSelected(action);
//     onPress(action);
//   };

//   return (
//     <View
//       style={[
//         {
//           flexDirection: "row",
//           flexWrap: "wrap", // wrap pills to next line
//           gap: 8,
//           alignSelf: "flex-start", // KEY FIX: don't stretch full width
//         },
//         style,
//       ]}
//     >
//       {actions.map((action) => {
//         const isSelected = selected === action;
//         const isLocked = selected !== null && !isSelected;

//         return (
//           <TouchableOpacity
//             key={action}
//             onPress={() => handlePress(action)}
//             activeOpacity={0.75}
//             disabled={disabled || selected !== null}
//           >
//             {isSelected ? (
//               <LinearGradient
//                 colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={{
//                   borderRadius: 20,
//                   paddingHorizontal: 16,
//                   paddingVertical: 7,
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "white",
//                     fontSize: 13,
//                     fontFamily: "PoppinsMedium",
//                   }}
//                 >
//                   {action}
//                 </Text>
//               </LinearGradient>
//             ) : (
//               <View
//                 style={{
//                   borderRadius: 20,
//                   paddingHorizontal: 16,
//                   paddingVertical: 7,
//                   borderWidth: 1.5,
//                   borderColor: isLocked ? "#D1C8E0" : "#6B5591",
//                   backgroundColor: isLocked ? "#F9F6FF" : "white",
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: isLocked ? "#B0A8C0" : "#6B5591",
//                     fontSize: 13,
//                     fontFamily: "PoppinsMedium",
//                   }}
//                 >
//                   {action}
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

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

        const BUTTON_WIDTH = 140;
        const BUTTON_HEIGHT = 52;

        return (
          <TouchableOpacity
            key={action}
            onPress={() => handlePress(action)}
            activeOpacity={0.8}
            disabled={disabled || selectedButton !== undefined}
            style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
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

// import { LinearGradient } from "expo-linear-gradient";
// import React, { useState } from "react";
// import {
//   StyleProp,
//   Text,
//   TouchableOpacity,
//   View,
//   ViewStyle,
// } from "react-native";

// interface ActionPillsProps {
//   actions: string[];
//   onPress: (action: string) => void;
//   disabled?: boolean;
//   style?: StyleProp<ViewStyle>;
// }

// export const ActionPills: React.FC<ActionPillsProps> = ({
//   actions,
//   onPress,
//   disabled = false,
//   style,
// }) => {
//   const [selected, setSelected] = useState<string | null>(null);

//   const handlePress = (action: string) => {
//     if (disabled || selected !== null) return;
//     setSelected(action);
//     onPress(action);
//   };

//   // Dimensions to match your request
//   const BUTTON_WIDTH = 145; // Adjusted to ensure 2-per-row layout
//   const BUTTON_HEIGHT = 42; // Set to 30 if you want it very slim

//   return (
//     <View
//       style={[
//         {
//           flexDirection: "row",
//           flexWrap: "wrap",
//           justifyContent: "flex-start",
//           gap: 12, // Space between buttons
//           width: "100%",
//         },
//         style,
//       ]}
//     >
//       {actions.map((action) => {
//         const isSelected = selected === action;
//         const isLocked = selected !== null && !isSelected;

//         return (
//           <TouchableOpacity
//             key={action}
//             onPress={() => handlePress(action)}
//             activeOpacity={0.8}
//             disabled={disabled || selected !== null}
//             style={{
//               width: BUTTON_WIDTH,
//               height: BUTTON_HEIGHT,
//             }}
//           >
//             {isSelected ? (
//               /* ACTIVE: Gradient background */
//               <LinearGradient
//                 colors={["#635B91", "#8B3D88", "#B54475"]}
//                 start={{ x: 0, y: 0.5 }}
//                 end={{ x: 1, y: 0.5 }}
//                 style={{
//                   flex: 1,
//                   borderRadius: 20,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   paddingHorizontal: 8,
//                 }}
//               >
//                 <Text
//                   numberOfLines={1}
//                   style={{
//                     color: "white",
//                     fontSize: 13,
//                     fontWeight: "500",
//                   }}
//                 >
//                   {action}
//                 </Text>
//               </LinearGradient>
//             ) : (
//               /* INACTIVE: Soft purple background */
//               <View
//                 style={{
//                   flex: 1,
//                   borderRadius: 20,
//                   backgroundColor: isLocked ? "#F3EFFF" : "#EBE4F9",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   paddingHorizontal: 8,
//                 }}
//               >
//                 <Text
//                   numberOfLines={1}
//                   style={{
//                     color: isLocked ? "#B0A8C0" : "#5A5D72",
//                     fontSize: 13,
//                     fontWeight: "500",
//                   }}
//                 >
//                   {action}
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };
