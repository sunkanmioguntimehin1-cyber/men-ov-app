

// import { LinearGradient } from "expo-linear-gradient";
// import React from "react";
// import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from "react-native";

// type ButtonType = {
//   title: string;
//   disabled?: boolean;
//   loading?: boolean;
//   primary?: boolean;
//   danger?: boolean;
//   whiteBg?: boolean;
//   borderBn?: boolean;
//   gradient?: boolean;
//   icon?: React.ReactNode;
//   iconPostion?: string;
//   onPress?: () => void;
//   style?: any;
// };

// const CustomButton = ({
//   title,
//   disabled,
//   primary,
//   danger,
//   loading,
//   whiteBg,
//   borderBn,
//   gradient,
//   onPress,
//   style,
// }: ButtonType) => {
//   const getButtonStyle = () => {
//     if (disabled) return "bg-primaryLight";
//     if (gradient) return ""; // No background needed for gradient
//     if (primary) return "bg-primary";
//     if (danger) return "bg-red-500";
//     if (borderBn) return "bg-white border border-gray-300";
//     if (whiteBg) return "bg-white shadow-lg";
//     return "bg-gray-200";
//   };

//   const getTextStyle = () => {
//     if (disabled) return "text-white font-[PoppinsMedium]";
//     if (gradient || primary) return "text-white font-[PoppinsMedium]";
//     if (danger) return "text-white font-[PoppinsMedium]";
//     if (whiteBg) return "text-[#6F649A] font-[PoppinsMedium]";
//     return "font-[PoppinsMedium]";
//   };

//   const buttonContent = (
//     <View className="w-full flex-row items-center justify-center">
//       {loading ? (
//         <ActivityIndicator color={primary || gradient ? "white" : "#8A3FFC"} />
//       ) : (
//         <Text className={`text-center font-medium text-base ${getTextStyle()}`}>
//           {title}
//         </Text>
//       )}
//     </View>
//   );

//   if (gradient && !disabled) {
//     return (
//       <TouchableOpacity
//         className="rounded-xl overflow-hidden"
//         style={[{ minHeight: 56 }, style]}
//         disabled={disabled}
//         onPress={onPress}
//       >
//         <LinearGradient
//           colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           // className="w-full px-6 py-4 items-center justify-center"
//           style={{
//             minHeight: 56,
//             padding: Platform.OS === "ios" ? 16 : 16,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {buttonContent}
//         </LinearGradient>
//       </TouchableOpacity>
//     );
//   }

//   return (
//     <TouchableOpacity
//       className={`px-6 py-4 rounded-xl items-center justify-center ${getButtonStyle()}`}
//       style={[{ minHeight: 56 }, style]}
//       disabled={disabled}
//       onPress={onPress}
//     >
//       {buttonContent}
//     </TouchableOpacity>
//   );
// };

// export default CustomButton;


import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type ButtonType = {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  primary?: boolean;
  danger?: boolean;
  whiteBg?: boolean;
  borderBn?: boolean;
  gradient?: boolean;
  icon?: React.ReactNode;
  iconPostion?: string;
  onPress?: () => void;
  style?: any;
};

const CustomButton = ({
  title,
  disabled,
  primary,
  danger,
  loading,
  whiteBg,
  borderBn,
  gradient,
  onPress,
  style,
}: ButtonType) => {
  const getButtonStyle = () => {
    if (disabled) return "bg-primaryLight";
    if (gradient) return "";
    if (primary) return "bg-primary";
    if (danger) return "bg-red-500";
    if (borderBn) return "bg-white border border-gray-300";
    if (whiteBg) return "bg-white shadow-lg";
    return "bg-gray-200";
  };

  const getTextStyle = () => {
    if (disabled || gradient || primary || danger)
      return "text-white font-[PoppinsMedium]";
    if (whiteBg) return "text-[#6F649A] font-[PoppinsMedium]";
    return "font-[PoppinsMedium]";
  };

  const buttonContent = (
    <View className="w-full flex-row items-center justify-center">
      {loading ? (
        <ActivityIndicator color={primary || gradient ? "white" : "#8A3FFC"} />
      ) : (
        <Text className={`text-center text-base ${getTextStyle()}`}>
          {title}
        </Text>
      )}
    </View>
  );

  if (gradient && !disabled) {
    return (
      <TouchableOpacity
        className="rounded-xl overflow-hidden"
        style={[{ height: 56 }, style]}
        disabled={disabled}
        onPress={onPress}
      >
        <LinearGradient
          colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            height: 56,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className={`rounded-xl items-center justify-center ${getButtonStyle()}`}
      style={[{ height: 56 }, style]}
      disabled={disabled}
      onPress={onPress}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

export default CustomButton;
