import { GradientText } from "@/src/components/GradientText";
import Screen from "@/src/layout/Screen";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const YearlyPlanSuccessScreen = () => {
  const router = useRouter();

  // Placeholder for the date logic

  return (
    <Screen className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          className="mb-6 p-2 self-start"
          onPress={() => router.back()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>

        {/* Hero Section */}
        <View className="items-center mb-10">
          <View className="w-20 h-20 ">
            <Image
              source={require("@/assets/images/Menovia-Logo-Icon.png")}
              style={{ height: "100%", width: "100%" }}
              contentFit="contain"
            />
          </View>
          <GradientText className="font-[PoppinsSemibold] text-2xl text-center">
            You’re now on the Yearly Plan
          </GradientText>
        </View>

        {/* Main Information Text */}
        <View className="   items-center mb-12">
          <Text className="text-[#5F6368] text-base text-center font-[PoppinsRegular] leading-7">
            Your subscription has been successfully updated to the yearly plan.
            You’ll enjoy uninterrupted access to all Plus features for the next
            12 months.
          </Text>
        </View>
        <View className="absolute bottom-10 w-full items-center justify-center">
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)/homepage")}
            className="py-4 px-6"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <GradientText className=" font-[PoppinsSemibold] text-base underline">
              Back to homepage
            </GradientText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Contact Support Link */}
    </Screen>
  );
};

export default YearlyPlanSuccessScreen;
