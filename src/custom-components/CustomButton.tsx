import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ButtonType = {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  primary?: boolean;
  danger?: boolean;
  whiteBg?: boolean;
  borderBn?: boolean;
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
  onPress,
  style,
}: ButtonType) => {
  const getButtonStyle = () => {
    if (disabled) return "bg-primaryLight";
    if (primary) return "bg-primary";
    if (danger) return "bg-red-500";
    if (whiteBg && borderBn) return "bg-white border border-gray-300";
    if (whiteBg) return "bg-white shadow-lg";
    return "bg-gray-200";
  };

  const getTextStyle = () => {
    if (disabled) return "text-white font-[PoppinsMedium]";
    if (primary) return "text-white font-[PoppinsMedium]";
    if (danger) return "text-white font-[PoppinsMedium]";
    if (whiteBg) return "text-[#6F649A] font-[PoppinsMedium]";
    return "font-[PoppinsMedium]";
  };

  return (
    <TouchableOpacity
      className={`px-6 py-4 rounded-xl items-center justify-center ${getButtonStyle()}`}
      style={[{ minHeight: 56 }, style]}
      disabled={disabled}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <ActivityIndicator color={primary ? "white" : "#8A3FFC"} />
        ) : (
          <Text
            className={`font-medium text-base ${getTextStyle()}`}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
