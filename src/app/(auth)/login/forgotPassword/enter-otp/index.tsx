import { useForgotPasswordApi } from "@/src/api_services/authApi/authMutation";
import ForgotPasswordOtp from "@/src/components/ForgotpasswordOtp";
import { GradientText } from "@/src/components/GradientText";
import CustomButton from "@/src/custom-components/CustomButton";
import Screen from "@/src/layout/Screen";
import useAuthStore from "@/src/store/authStore";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";

const EnterOtp = () => {
  const [value, setValue] = React.useState("");
  const setUserRegOtps = useAuthStore().setUserRegOtps;
  const userRegOtps = useAuthStore().userRegOtps;

  const forgotPasswordEmail = useForgotPasswordApi("resent-page");

  const recentPassword = (data: any) => {
    if (data) {
      Keyboard.dismiss();
      forgotPasswordEmail.mutate({
        email: userRegOtps.email,
      });
    }
  };

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
      <View className=" items-center">
        <View className=" w-16 h-14 ">
          <Image
            source={require("@/assets/images/Menovia-Logo-Icon.png")}
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
          <GradientText className="font-[PoppinsMedium] text-xl mt-5">
            Forgot Password
          </GradientText>
        </View>
      </View>
      <View className="px-8">
        <View className="mt-5 ">
          {/* <CustomInput primary label="Enter Otp" placeholder="Input email" /> */}
          <ForgotPasswordOtp value={value} setValue={setValue} />
          <TouchableOpacity
            className=" items-end my-4"
            onPress={recentPassword}
          >
            <GradientText className="font-[PoppinsRegular] mt-4">
              {forgotPasswordEmail.isPending ? "sending..." : "Resent code"}
            </GradientText>
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
            gradient
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
