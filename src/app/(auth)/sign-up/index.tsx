// import CustomButton from "@/src/custom-components/CustomButton";
// import CustomInput from "@/src/custom-components/CustomInput";
// import Screen from "@/src/layout/Screen";
// import { MaterialIcons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";


// const SignUp = () => {
//     const router = useRouter();
//   return (
//     <Screen className="">
//       <TouchableOpacity
//         className="px-8 my-4"
//         onPress={() => {
//           router.back();
//         }}
//       >
//         <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//       </TouchableOpacity>
//       <View className=" items-center">
//         <View className=" w-16 h-14 ">
//           <Image
//             source={require("@/assets/images/logo.png")}
//             style={{
//               height: "100%",
//               width: "100%",
//               // alignSelf: "center",
//               // borderRadius: 100,
//             }}
//             contentFit="contain"
//             onError={(error) => console.log("Image error:", error)}
//           />
//         </View>
//         <View>
//           <Text className=" font-[PoppinsMedium] text-[#42307D] text-xl">
//             Create App account!
//           </Text>
//         </View>
//       </View>
//       <View className="p-8 flex-1">
//         <View className=" my-5">
//           <CustomInput primary label="Fullname" placeholder=" Fullname" />
//         </View>

//         <View>
//           <CustomInput primary label="Username" placeholder="Username" />
//         </View>
//         <View className=" my-5">
//           <CustomInput primary label="Email" placeholder=" Email" />
//         </View>

//         <View>
//           <CustomInput primary label="Password" placeholder="Password" />
//         </View>
//       </View>

//       <View className=" p-8  ">
//         <View>
//           <CustomButton
//             primary
//             title="Sign up"
//             onPress={() => {
//               // router.push("/(auth)/login")
//             }}
//           />
//         </View>
//         <View className="my-5">
//           <CustomButton
//             whiteBg
//             title="Log in"
//             onPress={() => {
//               router.push("/(auth)/login");
//             }}
//           />
//         </View>
//       </View>
//     </Screen>
//   );
// };

// export default SignUp;


import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import KeyboardAwareScreen from "@/src/layout/KeyboardAwareScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SignUp = () => {
  const router = useRouter();
  return (
    <KeyboardAwareScreen
      scroll={true}
      keyboardAware={true}
      extraScrollHeight={50}
    >
      <TouchableOpacity
        className="px-8 my-4"
        onPress={() => {
          router.back();
        }}
      >
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      </TouchableOpacity>

      <View className="items-center">
        <View className="w-16 h-14">
          <Image
            source={require("@/assets/images/logo.png")}
            style={{
              height: "100%",
              width: "100%",
            }}
            contentFit="contain"
            onError={(error) => console.log("Image error:", error)}
          />
        </View>
        <View>
          <Text className="font-[PoppinsMedium] text-[#42307D] text-xl">
            Create App account!
          </Text>
        </View>
      </View>

      <View className="p-8 flex-1">
        <View className="my-5">
          <CustomInput primary label="Fullname" placeholder="Fullname" />
        </View>

        <View>
          <CustomInput primary label="Username" placeholder="Username" />
        </View>

        <View className="my-5">
          <CustomInput
            primary
            label="Email"
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>

        <View>
          <CustomInput
            primary
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
      </View>

      <View className="p-8">
        <View>
          <CustomButton
            primary
            title="Sign up"
            onPress={() => {
              // router.push("/(auth)/login")
            }}
          />
        </View>
        <View className="my-5">
          <CustomButton
            whiteBg
            title="Log in"
            onPress={() => {
              router.push("/(auth)/login");
            }}
          />
        </View>
      </View>
    </KeyboardAwareScreen>
  );
};

export default SignUp;