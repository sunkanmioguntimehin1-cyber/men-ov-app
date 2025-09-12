import ForgotPasswordOtp from "@/src/components/ForgotpasswordOtp";
import CustomButton from "@/src/custom-components/CustomButton";
import Screen from "@/src/layout/Screen";
import useAuthStore from "@/src/store/authStore";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const EnterOtp = () => {
  const [value, setValue] = React.useState("");
  const setUserRegOtps = useAuthStore().setUserRegOtps;

  const onSubmit = () => {
    console.log(value);
    if (value) {
      setUserRegOtps({
        otp: value,
      });
      router.push("/(auth)/login/forgotPassword/reset-password");
    }
  };
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
          {/* <CustomInput primary label="Enter Otp" placeholder="Input email" /> */}
          <ForgotPasswordOtp value={value} setValue={setValue} />
          <TouchableOpacity className=" items-end my-4">
            <Text className=" text-primary font-[PoppinsRegular]">
              Resent code
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity className="">
            <Text className=" text-[#CA2B30] font-[PoppinsRegular]">
              Wrong Code. Try again!
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View className=" p-8 my-5 ">
        <View>
          <CustomButton
            primary
            title="Request password reset code"
            // onPress={() => {
            //   router.push("/(auth)/login/forgotPassword/reset-password");
            // }}
            onPress={onSubmit}
          />
        </View>
      </View>
    </Screen>
  );
};

export default EnterOtp;
