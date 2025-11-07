import { useContactUsApi } from "@/src/api_services/contactUsApi/contactMutation";
import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import KeyboardAwareScreen from "@/src/layout/KeyboardAwareScreen";
import { rS } from "@/src/lib/responsivehandler";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const ContactUs = () => {
  const router = useRouter();

  const contactUsDetails = useContactUsApi();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    contactUsDetails.mutate(data);
  };
  return (
    <KeyboardAwareScreen
      scroll={true}
      keyboardAware={true}
      extraScrollHeight={50}
    >
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-lg font-[PoppinsSemiBold] text-black">
          Contact Us
        </Text>

        <View />
      </View>
      <View className="p-8">
        <View className=" mt-3">
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: "firstName is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="First name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.firstName?.message}
              />
            )}
          />
        </View>
        <View className="my-3">
          <Controller
            control={control}
            name="lastName"
            rules={{
              required: "lastName is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Last name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.lastName?.message}
              />
            )}
          />
        </View>

        <View className="my-3">
          <Controller
            control={control}
            name="email"
            rules={{
              required: "email is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />
        </View>
        <View className="my-3">
          <Text
            className="mb-2 font-[PoppinsMedium] text-[#101828]"
            style={{ fontSize: rS(12) }}
          >
            Message
          </Text>
          <Controller
            control={control}
            name="message"
            rules={{
              required: "message is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="How can we help you"
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={8}
                textAlignVertical="top"
                className="font-[PoppinsRegular] text-base text-black border border-gray-300 rounded-xl px-4 py-3 "
                style={{ height: 150 }}
              />
            )}
          />
        </View>
      </View>
      <View className=" p-8 ">
        <CustomButton
          primary
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || contactUsDetails.isPending}
          loading={contactUsDetails.isPending}
        />
      </View>
    </KeyboardAwareScreen>
  );
};

export default ContactUs;
