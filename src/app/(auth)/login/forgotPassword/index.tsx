import { useForgotPasswordApi } from "@/src/api_services/authApi/authMutation";
import { GradientText } from "@/src/components/GradientText";
import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import Screen from "@/src/layout/Screen";
import useAuthStore from "@/src/store/authStore";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";

const EnterEmail = () => {
  const setUserRegOtps = useAuthStore().setUserRegOtps;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    if (data) {
      Keyboard.dismiss();
      forgotPasswordEmail.mutate({
        email: data?.email.toLowerCase(),
      });
      setUserRegOtps({
        email: data.email.toLowerCase(),
      });
    }
  };

  const forgotPasswordEmail = useForgotPasswordApi("forgotpassword-page");
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
      <View className=" items-center mb-5">
        <View className=" w-16 h-14">
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
      <View className="px-8 ">
        <View className="">
          <Text className="text-center text-[#42307D] font-[PoppinsRegular]">
            Personalized support for perimenopause, menopause, and beyond.
          </Text>
        </View>
        <View className=" mt-5">
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Email"
                placeholder=" Enter email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                error={errors.email?.message}
              />
            )}
          />
        </View>
      </View>
      <View className=" p-8  ">
        <View>
          <CustomButton
            gradient
            title="Submit"
            // onPress={() => {
            //   router.push("/(auth)/login/forgotPassword/enter-otp");
            // }}
            disabled={forgotPasswordEmail.isPending || !isValid}
            loading={forgotPasswordEmail.isPending}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Screen>
  );
};

export default EnterEmail;
