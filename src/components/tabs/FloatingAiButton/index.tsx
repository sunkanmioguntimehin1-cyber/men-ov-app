import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const FloatingAiButton = () => {
  return (
    <View>
      <TouchableOpacity className=" w-full bg-white my-3 border border-[#EAEAEA] p-4 rounded-2xl">
        <Text className=" text-[#101828] font-[PoppinsSemiBold] text-base">
          AI-Powered Tool
        </Text>

        <View className=" flex-row items-center justify-between ">
          <View>
            <AntDesign name="adduser" size={24} color="#8A3FFC" />
          </View>
          <View className=" mx-3 bg-[#F9FAFB] border border-[#EAECF0] p-4 rounded-lg">
            <Text className=" text-base font-[PoppinsRegulars]">
              Ask about your menopausal symptoms
            </Text>
          </View>

          <View>
            <MaterialIcons name="send" size={24} color="#8A3FFC" />
          </View>
        </View>

        <View className=" my-2">
          <Text>We care about your data in our privacy policy.</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default FloatingAiButton