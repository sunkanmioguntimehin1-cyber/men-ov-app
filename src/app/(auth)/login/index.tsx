import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import Screen from "@/src/layout/Screen";
import { rMS, rS } from "@/src/lib/responsivehandler";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const router = useRouter();
  return (
    <Screen className=" pt-safe">
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
            Welcome Back to
          </Text>
        </View>
      </View>

      <View className="p-8 flex-1">
        <View className=" my-5">
          <CustomInput primary label="Username" placeholder=" username" />
        </View>

        <View>
          <CustomInput primary label="Password" placeholder="Enter your password" />
        </View>
        <View>
          <TouchableOpacity
            className=" mb-10"
            onPress={() => {
              router.push("/(auth)/login/forgotPassword");
            }}
          >
            <Text
              className="text-right text-primary font-[PoppinsMedium]"
              style={{
                fontSize: rS(12),
                // marginBottom: rMS(20),
                marginTop: rMS(10),
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className=" p-8 ">
        <View>
          <CustomButton
            primary
            title="Log in"
            onPress={() => {
              router.push("/(auth)/personal-info");
            }}
          />
        </View>
        <View className="my-5">
          <CustomButton
            whiteBg
            title="Sign up"
            onPress={() => {
              router.push("/(auth)/sign-up");
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default LoginScreen;
