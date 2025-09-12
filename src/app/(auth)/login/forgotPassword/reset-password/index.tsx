import { useResetPasswordApi } from "@/src/api_services/authApi/authMutation";
import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import Screen from "@/src/layout/Screen";
import useAuthStore from "@/src/store/authStore";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

const ResetPassword = () => {
  const [isSecureEntry, setIsSecureEntry] = React.useState(true);
  const [comPassIsSecureEntry, setComPassIsSecureEntry] = React.useState(true);
  const userRegOtps = useAuthStore().userRegOtps;

  console.log("userRegOtps", userRegOtps);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const pwd = watch("password");

  const resetPasswordData = useResetPasswordApi();

  const onSubmit = async (data: any) => {
    const requestedPayload = {
      email: userRegOtps.email,
      new_password: data.password,
      passcode: userRegOtps.otp,
    };
    resetPasswordData.mutate(requestedPayload);
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
          <Controller
            control={control}
            name="password"
            rules={{
              required: "passowrd is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters long",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&.,]{8,}$/,
                message:
                  "Password must include uppercase, lowercase, and a number.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Password"
                placeholder="Enter your New Password"
                secureTextEntry={isSecureEntry}
                // iconPostion="left"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.password?.message}
                iconPostion="right"
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntry(!isSecureEntry);
                    }}
                  >
                    {isSecureEntry ? (
                      <Feather name="eye-off" size={24} color="#717171" />
                    ) : (
                      <Feather name="eye" size={24} color="#717171" />
                    )}
                  </TouchableOpacity>
                }
              />
            )}
          />
        </View>

        <View className=" my-5">
          <Controller
            control={control}
            name="password_confirmation"
            rules={{
              required: "confirm Password is required",
              validate: (value) => value === pwd || "Passwords do not match",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Re-type password"
                placeholder="confirm password"
                secureTextEntry={comPassIsSecureEntry}
                onChangeText={onChange}
                value={value}
                error={errors.password_confirmation?.message}
                iconPostion="right"
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setComPassIsSecureEntry(!comPassIsSecureEntry);
                    }}
                  >
                    {isSecureEntry ? (
                      <Feather name="eye-off" size={24} color="#717171" />
                    ) : (
                      <Feather name="eye" size={24} color="#717171" />
                    )}
                  </TouchableOpacity>
                }
              />
            )}
          />
        </View>
      </View>
      <View className=" p-8 my-5 ">
        <View>
          <CustomButton
            primary
            title="Confirm password"
            // onPress={() => {
            //   router.push("/(auth)/login")
            // }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Screen>
  );
};

export default ResetPassword;
