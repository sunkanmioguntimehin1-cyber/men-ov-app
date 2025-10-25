import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const Communitypage = () => {
  return (
    <View className=" flex-1 justify-center items-center">
      <View className="w-20 h-20">
        <Image
          source={require("@/assets/images/logo.png")}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 100,
          }}
          contentFit="contain"
          onError={(error) => console.log("Image error:", error)}
        />
      </View>
      <Text>This Page is under construction </Text>
    </View>
  );
};

export default Communitypage;
