// import CustomButton from "@/src/custom-components/CustomButton";
// import { Image, ImageBackground } from "expo-image";
// import { useRouter } from "expo-router";
// import { View } from "react-native";

// export default function GetStarted() {
//   const router = useRouter();

//   return (
//     <>
      
//         <View className="flex-1">
//           <ImageBackground
//             source={require("@/assets/images/getstarted.png")}
//             style={{
//               height: "50%",
//               width: "100%",
//             }}
//             contentFit="cover"
//           >
//             <View className=" items-center flex-1">
//               <View className=" w-52 h-64 ">
//                 <Image
//                   source={require("@/assets/images/Logo23.png")}
//                   style={{
//                     height: "100%",
//                     width: "100%",
//                     alignSelf: "center",
//                     // borderRadius: 100,
//                   }}
//                   contentFit="fill"
//                   onError={(error) => console.log("Image error:", error)}
//                 />
//               </View>
//             </View>

//             <View className=" p-8 ">
//               <View>
//                 <CustomButton
//                   primary
//                   title="Continue with email"
//                   onPress={() => {
//                     router.push("/(auth)/login");
//                   }}
//                 />
//               </View>
//               <View className="my-5">
//                 <CustomButton
//                   whiteBg
//                   title="Continue with google"
//                   // onPress={signIn}
//                 />
//               </View>
//             </View>
//           </ImageBackground>
//         </View>
     
//     </>
//   );
// }


// import { Image, ImageBackground } from "expo-image";
// import { useRouter } from "expo-router";
// import { Text, TouchableOpacity, View } from "react-native";

// export default function GetStarted() {
//   const router = useRouter();

//   return (
//     <View className="flex-1">
//       <ImageBackground
//         source={require("@/assets/images/getstarted.png")}
//         style={{ flex: 1 }} // Use flex instead of height percentage
//         contentFit="cover"
//       >
//         <View className=" mt-safe-or-28 items-center flex-1">
//           <View className="w-64 h-48">
//             <Image
//               source={require("@/assets/images/Menovia-Logo-Vertical.png")}
//               style={{
//                 height: "100%",
//                 width: "100%",
//                 alignSelf: "center",
//               }}
//               contentFit="fill"
//               onError={(error) => console.log("Image error:", error)}
//             />
//           </View>
//         </View>
//         <View className=" flex-1 mt-32 " />

//         <View className="p-8 flex-1 ">
         
//           <TouchableOpacity className=" w-60 h-10  bg-primary items-center justify-center rounded-lg">
//             <Text className=" text-white">Get started</Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// }



import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function GetStarted() {
  const router = useRouter();

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/getstarted.png")}
        style={{ flex: 1 }}
        contentFit="cover"
      >
        <View className="mt-safe-or-28 items-center flex-1">
          <View className="w-64 h-48">
            <Image
              source={require("@/assets/images/Menovia-Logo-Vertical.png")}
              style={{
                height: "100%",
                width: "100%",
                alignSelf: "center",
              }}
              contentFit="fill"
              onError={(error) => console.log("Image error:", error)}
            />
          </View>
        </View>

        <View className="flex-1 mt-80" />

        <View className="p-8 mt-20 flex-1 items-center ">
          <TouchableOpacity
            className="w-48 rounded-xl overflow-hidden"
            onPress={() => router.push("/(auth)/welcome")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="items-center justify-center py-4"
            >
              <Text className="text-white text-lg font-[PoppinsMedium]">
                Get started
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-white text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text className="text-[#712A87] font-[PoppinsMedium] text-sm underline">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}