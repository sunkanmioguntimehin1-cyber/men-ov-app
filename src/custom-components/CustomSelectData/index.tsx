import { rMS, rS, rV } from "@/src/lib/responsivehandler";
import React, { ReactNode } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

type InputType = {
  label?: string;
  icon?: ReactNode;
  iconPostion?: string;
  value?: string;
  primary?: boolean;
  whiteBg?: boolean;
  onPress?: () => void;
  error?: string;
  showImage?: boolean;
  isLoading?: boolean;
  placeholder?: string
};

const CustomSelectData = ({
  label,
  icon,
  iconPostion,
  value,
  primary,
  whiteBg,
  error,
  onPress,
 placeholder,
  isLoading,
}: InputType) => {
  const [focused, setFocused] = React.useState(false);
  const Spacer = ({ height = 16 }) => <View style={{ height }} />;

  const getFlexDirection = () => {
    if (!icon && !iconPostion) return "flex-row";
    if (iconPostion === "left") return "flex-row";
    if (iconPostion === "right") return "flex-row justify-between";
    return "flex-row";
  };

  const getBgColor = () => {
    if (primary)
      return `border bg-white border-[#EAEAEA] text-black ${
        error ? "border-red" : "border-divider"
      }`;
    if (whiteBg)
      return `border  text-primary ${error ? "border-red" : "border-divider"}`;
    return "";
  };

  const getDisplayText = () => {
    if (value) return value
    // if (displayValue) return displayValue;
    return `${placeholder}`;
  };

  // console.log("value200:", value);

  return (
    <View className="my-1">
      <>
        {label && (
          <Text
            className="mb-2 font-[PoppinsMedium] text-black"
            style={{ fontSize: Platform.OS === "android" ? rS(13) : rS(12) }}
          >
            {label}
          </Text>
        )}
      </>

      <TouchableOpacity
        className={`rounded-2xl ${getBgColor()} px-3 ${getFlexDirection()}`}
        style={{ height: rV(40) }}
        onPress={onPress}
      >
        <View className="flex-row items-center flex-1">
          <View className="flex-1">
            <Text
              className={`text-black ${whiteBg && "text-primary"}`}
              style={{
                fontSize: rMS(13),
              }}
            >
              {getDisplayText()}
            </Text>
          </View>
        </View>

        {icon && <View className="justify-center items-center">{icon}</View>}
      </TouchableOpacity>

      {error && (
        <Text
          className="text-red text-xs p-2 font-[PoppinsLight]"
          style={{ fontSize: rS(11) }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomSelectData;
