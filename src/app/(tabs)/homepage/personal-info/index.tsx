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


import CustomButton from "@/src/custom-components/CustomButton";
import Screen from "@/src/layout/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PersonalInfo = () => {
  const router = useRouter();
  return (
    <Screen className="pt-safe bg-white">
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
                opacity:0.2,
              }}
              contentFit="fill"
            />
          </View>

          {/* Doctor image in front */}
          <View
            className="absolute inset-0 items-center justify-end"
            style={{ top: 30, left: 0, }}
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

      <View className="my-5 p-8">
        <View>
          <CustomButton
            primary
            title="Add your personal informations"
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
            <MaterialIcons name="arrow-back-ios" size={20} color="#6F649A" />
          </View>
          <Text className="text-[#6F649A]">I will do this later</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default PersonalInfo;