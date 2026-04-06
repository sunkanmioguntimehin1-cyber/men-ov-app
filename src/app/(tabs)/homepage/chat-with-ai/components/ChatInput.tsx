import React from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import CustomInput from "@/src/custom-components/CustomInput";
import { GradientMaterialIcon } from "@/src/custom-components/GradientIcon";
import { GRADIENT_COLORS } from "../types/chat";

interface ChatInputProps {
  value: string;
  onChangeText: (text?: string) => void;
  onSend: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  disabled = false,
  loading = false,
}) => {
  const canSend = Boolean(value.trim()) && !disabled && !loading;

  return (
    <View className="flex-row items-center space-x-2">
      <View className="flex-1 mx-2">
        <CustomInput
          placeholder="Ask Ziena™..."
          value={value}
          onChangeText={onChangeText}
          primary
          returnKeyType="send"
          onSubmitEditing={onSend}
          autoCapitalize="sentences"
          editable={!disabled && !loading}
        />
      </View>
      <TouchableOpacity
        onPress={onSend}
        disabled={!canSend}
        className={`w-12 h-12 rounded-full items-center justify-center ${
          canSend ? "bg-primaryLight" : "bg-[#F4EBFF]"
        }`}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <GradientMaterialIcon
            name="send"
            size={20}
            gradientColors={[...GRADIENT_COLORS]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
