import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";

interface ChatAvatarProps {
  size?: number;
}

export const ChatAvatar: React.FC<ChatAvatarProps> = ({ size = 128 }) => {
  return (
    <View className="items-center px-6">
      <View
        className="border border-[#EAEAEA] rounded-full overflow-hidden"
        style={{ width: size, height: size }}
      >
        <Image
          source={require("@/assets/images/ziena-ai.png")}
          style={{ width: "100%", height: "100%", borderRadius: size / 2 }}
          contentFit="contain"
        />
      </View>
    </View>
  );
};
