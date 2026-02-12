// import CustomButton from "@/src/custom-components/CustomButton";
// import Screen from "@/src/layout/Screen";
// import { MaterialIcons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// const PersonalInfo = () => {
//     const router = useRouter()
//   return (
//     <Screen className="  pt-safe">
//       <View className=" items-center flex-1">
//         <View className=" w-full h-[600px] ">
//           <Image
//             source={require("@/assets/images/bgimage.png")}
//             style={{
//               height: "100%",
//               width: "100%",
//               alignSelf: "center",
//               // borderRadius: 100,
//             }}
//             contentFit="fill"
//             onError={(error) => console.log("Image error:", error)}
//           />
//         </View>
//       </View>

//       <View className=" my-5 p-8">
//         <View>
//           <CustomButton
//             primary
//             title="Add your personal informations"
//             onPress={() => {
//               router.push("/homepage/personal-info/personal-info-form");
//             }}
//           />
//         </View>

//         <TouchableOpacity
//           className="my-5 flex-row items-center justify-center"
//           onPress={() => {
//             router.push("/homepage");
//           }}
//         >
//           <View>
//             <MaterialIcons name="arrow-back-ios" size={20} color="#6F649A" />
//           </View>
//           <Text className="text-[#6F649A]">I will do this later</Text>
//         </TouchableOpacity>
//       </View>
//     </Screen>
//   );
// };

// export default PersonalInfo;

import { GradientText } from "@/src/components/GradientText";
import CustomButton from "@/src/custom-components/CustomButton";
import { GradientFontistoIcon } from "@/src/custom-components/GradientIcon";
import Screen from "@/src/layout/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PersonalInfo = () => {
  const router = useRouter();
  return (
    <Screen className="bg-white">
      <View className="items-center flex-1">
        <View className="relative w-full" style={{ height: "100%" }}>
          {/* Background logo - purple lotus */}
          <View
            className="absolute inset-0 items-center"
            style={{ top: 0, left: 0 }}
          >
            <Image
              source={require("@/assets/images/Menovia-Logo-Vertical.png")}
              style={{
                height: 200,
                width: 250,
                // opacity: 0.2,
              }}
              contentFit="fill"
            />
          </View>

          {/* Doctor image in front */}
          <View
            className="absolute inset-0 items-center justify-end"
            style={{ top: 40, left: 0 }}
          >
            <Image
              source={require("@/assets/images/bgimg2.png")}
              style={{
                height: "100%",
                width: "100%",
              }}
              contentFit="contain"
              onError={(error) => console.log("Image error:", error)}
            />
          </View>
        </View>
      </View>
      <View className=" items-center">
        <View>
          <GradientText className="font-[PoppinsMedium] text-2xl">
            Complete your health profile
          </GradientText>
        </View>
        <View>
          <GradientText className=" text-center mt-3">
            This helps personalize your care, insights and recommendations
          </GradientText>
        </View>
      </View>

      <View className=" p-8">
        <View>
          <CustomButton
            gradient
            title="Complete my profile"
            onPress={() => {
              router.push("/homepage/personal-info/personal-info-form");
            }}
          />
        </View>

        <TouchableOpacity
          className="my-5 flex-row items-center justify-center"
          onPress={() => {
            router.push("/homepage");
          }}
        >
          <View>
            <MaterialIcons name="arrow-back-ios" size={20} color="#712A87" />
          </View>
          <Text className="text-primary">I will do this later</Text>
        </TouchableOpacity>

        <View className=" flex-row justify-between items-center">
          <View>
            <GradientFontistoIcon
              name="locked"
              size={24}
              gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
            />
          </View>
          <View className=" w-96">
            <Text className=" text-center text-base">
              Your information is private, secure, and never shared without
              consent.
            </Text>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default PersonalInfo;
