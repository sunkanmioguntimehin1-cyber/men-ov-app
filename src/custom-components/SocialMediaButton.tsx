import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    ActivityIndicator,
    StyleProp,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
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
  icon?: React.ReactNode; // Enabled icon support
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const SocialMediaButton = ({
  title,
  disabled,
  primary,
  danger,
  loading,
  whiteBg,
  borderBn,
  gradient,
  icon,
  onPress,
  style,
}: ButtonType) => {
  const getButtonStyle = () => {
    if (disabled) return "bg-primaryLight";
    if (gradient) return "";
    if (primary) return "bg-primary";
    if (danger) return "bg-red-500";
    // Matching the image: White background with a light gray border
    if (borderBn) return "bg-white border border-gray-300";
    if (whiteBg) return "bg-white shadow-lg";
    return "bg-gray-200";
  };

  const getTextStyle = () => {
    if (disabled || gradient || primary || danger)
      return "text-white font-[PoppinsMedium]";
    // Darker text color to match the "Continue with Google" style
    return "text-[#1f2937] font-[PoppinsSemiBold]";
  };

  const buttonContent = (
    <View className="flex-row items-center justify-center px-4">
      {loading ? (
        <ActivityIndicator color={primary || gradient ? "white" : "#8A3FFC"} />
      ) : (
        <>
          {/* Render icon if provided */}
          {icon && <View className="mr-3">{icon}</View>}
          <Text className={`text-base ${getTextStyle()}`}>{title}</Text>
        </>
      )}
    </View>
  );

  if (gradient && !disabled) {
    return (
      <TouchableOpacity
        className="rounded-2xl overflow-hidden" // Increased rounding to match image
        style={[{ height: 56 }, style]}
        disabled={disabled}
        onPress={onPress}
      >
        <LinearGradient
          colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
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
      className={`rounded-2xl items-center justify-center ${getButtonStyle()}`}
      style={[{ height: 56 }, style]}
      disabled={disabled}
      onPress={onPress}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

export default SocialMediaButton;
