// import { GradientText } from "@/src/components/GradientText";
// import Screen from "@/src/layout/Screen";
// import { Entypo, Ionicons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// const PlusBenefit = () => {
//   const router = useRouter();

//   const menuItems = [
//     {
//       title: "Unlimited chat with Ziena™",
//       subtitle: "Ask questions anytime and get guided support",
//       icon: (
//         <View className="w-12 h-12 rounded-full overflow-hidden">
//           <Image
//             source={require("@/assets/images/ziena-profile-pic.png")}
//             style={{ width: "100%", height: "100%" }}
//             contentFit="cover"
//           />
//         </View>
//       ),
//       //   onPress: () => router.push("/(tabs)/homepage/chat-with-ai"),
//     },
//     {
//       title: "Pattern insights from tracking",
//       subtitle: "See triggers and trends behind your symptoms.",
//       icon: (
//         <View className="w-12 h-12 rounded-full overflow-hidden">
//           <Image
//             source={require("@/assets/images/plan-1.png")}
//             style={{ width: "100%", height: "100%" }}
//             contentFit="cover"
//           />
//         </View>
//       ),
//       //   onPress: () => router.push("/"),
//     },
//     {
//       title: "Weekly plan + progress summary",
//       subtitle: "A simple weekly routine tailored to you.",
//       icon: (
//         <View className="w-12 h-12 rounded-full overflow-hidden">
//           <Image
//             source={require("@/assets/images/insights-1.png")}
//             style={{ width: "100%", height: "100%" }}
//             contentFit="cover"
//           />
//         </View>
//       ),
//       //   onPress: () => router.push("/"),
//     },
//     {
//       title: "Clinician-ready summary",
//       subtitle: "Clear notes + better questions for visits.",
//       icon: (
//         <View className="w-12 h-12 rounded-full overflow-hidden">
//           <Image
//             source={require("@/assets/images/track-symptoms.png")}
//             style={{ width: "100%", height: "100%" }}
//             contentFit="cover"
//           />
//         </View>
//       ),
//       //   onPress: () => router.push("/(tabs)/homepage"),
//     },
//   ];

//   return (
//     <Screen className="px-6 flex-1 bg-white">
//       {/* Header Navigation */}
//       <View className="pt-2">
//         <TouchableOpacity onPress={() => router.replace("/(tabs)/homepage")}>
//           <Ionicons name="chevron-back" size={28} color="#4a2c52" />
//         </TouchableOpacity>
//       </View>

//       {/* Hero Section */}
//       <View className="items-center ">
//         <View className="w-24 h-24 mb-2">
//           <Image
//             source={require("@/assets/images/Menovia-Logo-Icon.png")}
//             style={{ height: "100%", width: "100%" }}
//             contentFit="contain"
//           />
//         </View>
//         <GradientText className="font-[PoppinsBold] text-3xl text-center">
//           What you get with Plus
//         </GradientText>
//         {/* <Text className="text-[#6b7280] text-lg text-center mt-4 font-[PoppinsRegular]">
//           Your 7-day trial has started
//         </Text> */}
//       </View>

//       {/* Menu Cards */}
//       <View className="mt-10 space-y-4">
//         {menuItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             // onPress={item.onPress}
//             className={
//               "flex-row items-center border border-gray-200  p-4 rounded-3xl mb-4"
//             }
//             // className={"flex-row items-center border border-gray-100 bg-white shadow-sm p-4 rounded-3xl mb-4"}
//             style={{ elevation: 2 }} // Added for a slight shadow effect on Android
//           >
//             <View className="w-12 items-center justify-center">
//               {item.icon}
//             </View>

//             <View className="flex-1 ml-4">
//               <Text className="font-[PoppinsSemiBold] text-[#1f2937] text-base">
//                 {item.title}
//               </Text>
//               <Text className="font-[PoppinsRegular] text-gray-500 text-sm">
//                 {item.subtitle}
//               </Text>
//             </View>

//             <Entypo name="chevron-small-right" size={28} color="#9ca3af" />
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Footer */}
//     </Screen>
//   );
// };

// export default PlusBenefit;

import Screen from "@/src/layout/Screen";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient"; // Ensure this is installed
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const PlusBenefit = () => {
  const router = useRouter();

  const menuItems = [
    {
      title: "Unlimited chat with Ziena™",
      subtitle: "Ask questions anytime and get guided support",
      icon: require("@/assets/images/ziena-profile-pic.png"),
    },
    {
      title: "Pattern insights from tracking",
      subtitle: "See triggers and trends behind your symptoms.",
      icon: require("@/assets/images/plan-1.png"),
    },
    {
      title: "Weekly plan + progress summary",
      subtitle: "A simple weekly routine tailored to you.",
      icon: require("@/assets/images/insights-1.png"),
    },
    {
      title: "Clinician-ready summary",
      subtitle: "Clear notes + better questions for visits.",
      icon: require("@/assets/images/track-symptoms.png"),
    },
  ];

  return (
    <Screen className="flex-1 bg-white px-6">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header Navigation */}
        <View className="pt-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="black" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View className="items-center mt-4">
          <View className="w-24 h-24 mb-4">
            <Image
              source={require("@/assets/images/Menovia-Logo-Icon.png")}
              style={{ height: "100%", width: "100%" }}
              contentFit="contain"
            />
          </View>
          <Text className="font-[PoppinsBold] text-3xl text-center text-[#5c3d64]">
            What you get with Plus
          </Text>
        </View>

        {/* Menu Cards */}
        <View className="mt-8">
          {menuItems.map((item, index) => (
            <View
              key={index}
              className="flex-row items-center border border-gray-100 p-4 rounded-[24px] mb-4 bg-white"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              <View className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  source={item.icon}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                />
              </View>

              <View className="flex-1 ml-4">
                <Text className="font-[PoppinsSemiBold] text-[#1f2937] text-[16px]">
                  {item.title}
                </Text>
                <Text className="font-[PoppinsRegular] text-gray-500 text-[14px] leading-5">
                  {item.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Subscription Info Badges */}
        <View className="flex-row justify-center space-x-2  mt-6">
          <Badge text="7 days free" />
          <Badge text="Then $14.99/mo" />
          <Badge text="Cancel anytime" />
        </View>

        {/* Call to Action Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="mt-8"
          onPress={() => console.log("Trial started")}
        >
          <LinearGradient
            colors={["#6b6bb3", "#b34e8d"]} // Matching the purple-to-pink gradient
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              borderRadius: 16,
              paddingVertical: 18,
              alignItems: "center",
            }}
          >
            <Text className="text-white font-[PoppinsBold] text-lg">
              Start free trial
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

// Helper component for the purple badges
const Badge = ({ text }: { text: string }) => (
  <View className="bg-[#f3ebff] mx-2 px-3 py-2 rounded-lg">
    <Text className="text-[#8e54e9] text-[12px] font-[PoppinsMedium]">
      {text}
    </Text>
  </View>
);

export default PlusBenefit;
