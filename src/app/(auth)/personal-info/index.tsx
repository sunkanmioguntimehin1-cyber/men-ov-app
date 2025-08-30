import CustomButton from "@/src/custom-components/CustomButton";
import Screen from "@/src/layout/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PersonalInfo = () => {
    const router = useRouter()
  return (
    <Screen className="  pt-safe">
      <View className=" items-center flex-1">
        <View className=" w-full h-[650px] ">
          <Image
            source={require("@/assets/images/bgimage.png")}
            style={{
              height: "100%",
              width: "100%",
              alignSelf: "center",
              // borderRadius: 100,
            }}
            contentFit="fill"
            onError={(error) => console.log("Image error:", error)}
          />
        </View>
      </View>

      <View className=" my-5 p-8">
        <View>
          <CustomButton primary title="Add your personal informations" onPress={()=>{
            router.push("/(auth)/personal-info/personal-info-form")
          }} />
        </View>

        <TouchableOpacity className="my-5 flex-row items-center justify-center" onPress={()=>{
          router.push("/(auth)/login")
        }}>
          <View>
            <MaterialIcons name="arrow-back-ios" size={20} color="#6F649A" />
          </View>
          <Text className="text-[#6F649A]">I will do this later</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default PersonalInfo;
