import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import Screen from "@/src/layout/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ResetPassword = () => {
  return (
    <Screen className="">
      <TouchableOpacity
        className="px-8 my-4"
        onPress={() => {
          router.back();
        }}
      >
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      </TouchableOpacity>
      <View className=" items-center mb-20">
        <View className=" w-16 h-14 ">
          <Image
            source={require("@/assets/images/logo.png")}
            style={{
              height: "100%",
              width: "100%",
              // alignSelf: "center",
              // borderRadius: 100,
            }}
            contentFit="contain"
            onError={(error) => console.log("Image error:", error)}
          />
        </View>
        <View>
          <Text className=" font-[PoppinsMedium] text-[#42307D] text-xl">
            Forgot Password
          </Text>
        </View>
      </View>
      <View className="p-8 flex-1">
        <View className=" my-5">
          <CustomInput
            primary
            label="New Password"
            placeholder="Input Password"
          />
        </View>

        <View className=" my-5">
          <CustomInput
            primary
            label="Confirm New Password"
            placeholder="Input Password"
          />
        </View>
      </View>
      <View className=" p-8 my-5 ">
        <View>
          <CustomButton
            primary
            title="Confirm password"
            onPress={() => {
              // router.push("/(auth)/login")
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default ResetPassword;
