// import { GradientText } from "@/src/components/GradientText";
// import Screen from "@/src/layout/Screen";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import { ChevronLeft } from "lucide-react-native";
// import React from "react";
// import { ScrollView, TouchableOpacity, View } from "react-native";

// const CancellationPage = () => {
//   const router = useRouter();
//   return (
//     <Screen className="flex-1">
//       <ScrollView
//         className="flex-1"
//         contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Back Button */}
//         <TouchableOpacity
//           className=" mb-4 p-1 self-start"
//           onPress={() => router.back()}
//         >
//           <ChevronLeft color="#1A1C1E" size={24} />
//         </TouchableOpacity>
//         {/* Hero Section */}
//         <View className="items-center">
//           <View className="w-24 h-24 mb-2">
//             <Image
//               source={require("@/assets/images/Menovia-Logo-Icon.png")}
//               style={{ height: "100%", width: "100%" }}
//               contentFit="contain"
//             />
//           </View>
//           <GradientText className="font-[PoppinsSemibold] text-xl text-center">
//             Sorry to see you go
//           </GradientText>
//         </View>
//       </ScrollView>
//     </Screen>
//   );
// };
// export default CancellationPage;

import { GradientText } from "@/src/components/GradientText";
import Screen from "@/src/layout/Screen";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const CancellationPage = () => {
  const router = useRouter();

  // Placeholder for the date logic
  const billingEndDate = "October 24, 2024";

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
            Sorry to see you go
          </GradientText>
        </View>

        {/* Main Information Text */}
        <View className="   items-center mb-12">
          <Text className="text-[#5F6368] text-base text-center font-[PoppinsRegular] leading-7">
            Your Plus access will remain active until [billing end date]. You
            can continue enjoying all benefits until then, and you’re welcome
            back anytime.
          </Text>
        </View>

        {/* Resubscribe Text */}
        <View className=" flex-row items-center">
          <Text className="text-[#5F6368] text-base text-center font-[PoppinsRegular] leading-7">
            If you change your mind, you can resubscribe anytime from your {}
            <Text className="text-[#6D28D9] font-[PoppinsSemibold] text-base mt-2">
              Profile.
            </Text>
          </Text>
          {/* <TouchableOpacity className=""></TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* Bottom Contact Support Link */}
      <View className="absolute bottom-10 w-full items-center justify-center">
        <TouchableOpacity
          //   onPress={() => router.push("/support")} // Adjust route as needed
          className="py-4 px-6"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <GradientText className=" font-[PoppinsSemibold] text-base underline">
            Contact Support
          </GradientText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default CancellationPage;
