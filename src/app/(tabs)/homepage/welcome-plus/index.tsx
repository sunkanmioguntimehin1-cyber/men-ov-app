import { GradientText } from "@/src/components/GradientText";
import Screen from "@/src/layout/Screen";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const WelcomePlus = () => {
  const router = useRouter();

  const menuItems = [
    {
      title: "Chat with Ziena™",
      subtitle: "Get instant support anytime",
      icon: (
        <View className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            source={require("@/assets/images/ziena-profile-pic.png")}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        </View>
      ),
      onPress: () => router.push("/(tabs)/homepage/chat-with-ai"),
    },
    {
      title: "Track symptoms",
      subtitle: "Monitor your progress daily",
      icon: (
        <View className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            source={require("@/assets/images/track-symptoms.png")}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        </View>
      ),
      onPress: () => router.push("/(tabs)/homepage"),
    },
    {
      title: "View Plus benefits",
      subtitle: "Explore everything included in your plan",
      icon: (
        <View className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            source={require("@/assets/images/explore-1.png")}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        </View>
      ),
      onPress: () => router.push("/"),
    },
  ];

  return (
    <Screen className="px-6 flex-1 bg-white">
      {/* Header Navigation */}
      <View className="pt-2">
        <TouchableOpacity onPress={() => router.replace("/(tabs)/homepage")}>
          <Ionicons name="chevron-back" size={28} color="#4a2c52" />
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View className="items-center mt-4">
        <View className="w-24 h-24 mb-2">
          <Image
            source={require("@/assets/images/Menovia-Logo-Icon.png")}
            style={{ height: "100%", width: "100%" }}
            contentFit="contain"
          />
        </View>
        <GradientText className="font-[PoppinsBold] text-3xl text-center">
          Welcome to Plus
        </GradientText>
        <Text className="text-[#6b7280] text-lg text-center mt-4 font-[PoppinsRegular]">
          Your 7-day trial has started
        </Text>
      </View>

      {/* Menu Cards */}
      <View className="mt-10 space-y-4">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.onPress}
            className={
              "flex-row items-center border border-gray-200  p-4 rounded-3xl mb-4"
            }
            // className={"flex-row items-center border border-gray-100 bg-white shadow-sm p-4 rounded-3xl mb-4"}
            style={{ elevation: 2 }} // Added for a slight shadow effect on Android
          >
            <View className="w-12 items-center justify-center">
              {item.icon}
            </View>

            <View className="flex-1 ml-4">
              <Text className="font-[PoppinsSemiBold] text-[#1f2937] text-base">
                {item.title}
              </Text>
              <Text className="font-[PoppinsRegular] text-gray-500 text-sm">
                {item.subtitle}
              </Text>
            </View>

            <Entypo name="chevron-small-right" size={28} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <TouchableOpacity className="mt-6">
        <Text className="text-[#8b4c8c] text-center font-[PoppinsSemiBold] underline">
          Manage subscription
        </Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default WelcomePlus;
