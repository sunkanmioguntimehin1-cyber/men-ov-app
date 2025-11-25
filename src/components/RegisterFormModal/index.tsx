import { Entypo, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const RegisterFormModal = ({ onCancel, onAgree }: any) => {
  return (
    <View className="w-80 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Warning Icon and Title */}
      <View className=" p-4 items-center">
        {/* <Trash2 color="#dc2626" size={48} strokeWidth={1.5} /> */}
        <View>
          <Feather name="info" size={24} color="black" />
        </View>
        <Text className="font-[PoppinsBold] text-primary mt-2">
          Why We Need Your Information
        </Text>
      </View>

      {/* Description */}
      <View className="px-4">
        <Text className="text-center font-[PoppinsRegular] text-sm">
          To provide you with the best service, we require some personal
          information (full name and email). This helps us:
        </Text>

        <View className="flex-row items-center">
          <Entypo name="dot-single" size={20} color="black" />
          <Text className="font-[PoppinsBold] text-sm">
            Ensure secure account access
          </Text>
        </View>
        <View className="flex-row items-center">
          <Entypo name="dot-single" size={20} color="black" />
          <Text className=" font-[PoppinsBold] text-sm">
            Deliver important notifications
          </Text>
        </View>
        <View className=" ">
          <Text className=" font-[PoppinsRegular] text-center text-sm">
            Your information is securely stored and only used for
            transfer-related communications.
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between p-4  bg-white border-t border-gray-200">
        <TouchableOpacity
          className="flex-1  bg-gray-200 p-4  items-center rounded-md"
          onPress={onCancel}
        >
          <Text className="text-primary text-center font-[PoppinsBold] text-sm">
            Cancel
          </Text>
        </TouchableOpacity>

        <View className=" mx-1" />

        <TouchableOpacity
          className="flex-1   items-center justify-center rounded-md"
          onPress={onAgree}
        >
          <LinearGradient
            colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
             
              borderRadius: 6,
            }}
            // className="items-center justify-center rounded-md"
          >
            <Text className="font-[PoppinsBold] p-4 text-sm text-white">
              I Agree
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterFormModal;
