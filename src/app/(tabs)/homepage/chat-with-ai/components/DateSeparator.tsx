import React from "react";
import { View, Text } from "react-native";

interface DateSeparatorProps {
  date: string;
}

export const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  return (
    <View className="items-center my-4">
      <View className="bg-gray-200 px-4 py-2 rounded-full">
        <Text className="text-xs font-[PoppinsSemiBold] text-gray-600">
          {date}
        </Text>
      </View>
    </View>
  );
};
