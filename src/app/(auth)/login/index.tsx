// import CustomButton from "@/src/custom-components/CustomButton";
// import CustomInput from "@/src/custom-components/CustomInput";
// import Screen from "@/src/layout/Screen";
// import { rMS, rS } from "@/src/lib/responsivehandler";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// const LoginScreen = () => {
//   const router = useRouter();
//   return (

//         <Screen scroll={true} className=" pt-safe">
//           <View className=" items-center mb-20">
//             <View className=" w-16 h-14 ">
//               <Image
//                 source={require("@/assets/images/logo.png")}
//                 style={{
//                   height: "100%",
//                   width: "100%",
//                   // alignSelf: "center",
//                   // borderRadius: 100,
//                 }}
//                 contentFit="contain"
//                 onError={(error) => console.log("Image error:", error)}
//               />
//             </View>
//             <View>
//               <Text className=" font-[PoppinsMedium] text-[#42307D] text-xl">
//                 Welcome Back to
//               </Text>
//             </View>
//           </View>

//           <View className="p-8 flex-1">
//             <View className=" my-5">
//               <CustomInput primary label="Username" placeholder=" username" />
//             </View>

//             <View>
//               <CustomInput
//                 primary
//                 label="Password"
//                 placeholder="Enter your password"
//               />
//             </View>
//             <View>
//               <TouchableOpacity
//                 className=" mb-10"
//                 onPress={() => {
//                   router.push("/(auth)/login/forgotPassword");
//                 }}
//               >
//                 <Text
//                   className="text-right text-primary font-[PoppinsMedium]"
//                   style={{
//                     fontSize: rS(12),
//                     // marginBottom: rMS(20),
//                     marginTop: rMS(10),
//                   }}
//                 >
//                   Forgot Password?
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View className=" p-8 ">
//             <View>
//               <CustomButton
//                 primary
//                 title="Log in"
//                 onPress={() => {
//                   router.push("/(auth)/personal-info");
//                 }}
//               />
//             </View>
//             <View className="my-5">
//               <CustomButton
//                 whiteBg
//                 title="Sign up"
//                 onPress={() => {
//                   router.push("/(auth)/sign-up");
//                 }}
//               />
//             </View>
//           </View>
//         </Screen>

//   );
// };

// export default LoginScreen;

import { useLoginUser } from "@/src/api_services/authApi/authMutation";
import { GradientText } from "@/src/components/GradientText";
import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import KeyboardAwareScreen from "@/src/layout/KeyboardAwareScreen";
import { rMS, rS } from "@/src/lib/responsivehandler";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const router = useRouter();
  const [isSecureEntry, setIsSecureEntry] = React.useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    Keyboard.dismiss();
    userLogin.mutate({
      email: data?.email.toLowerCase(),
      password: data?.password,
    });
  };

  const userLogin = useLoginUser();

  return (
    <KeyboardAwareScreen
      scroll={true}
      keyboardAware={true}
      className="pt-safe"
      extraScrollHeight={50}
    >
      <LoadingOverlay
        isOpen={userLogin.isPending} // Required: Controls visibility
        // message="Login..." // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />
      <View className="items-center mb-20">
        <View className="w-20 h-14">
          <Image
            source={require("@/assets/images/Menovia-Logo-Icon.png")}
            style={{
              height: "100%",
              width: "100%",
            }}
            contentFit="contain"
            onError={(error) => console.log("Image error:", error)}
          />
        </View>
        <View className=" mt-5">
          <GradientText className="font-[PoppinsMedium] text-xl">
            Welcome back!
          </GradientText>
        </View>
      </View>

      <View className="p-8 flex-1">
        <View className="my-5">
          <Controller
            control={control}
            name="email"
            rules={{
              required: "email is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Email"
                placeholder="Enter your email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.email?.message}
              />
            )}
          />
        </View>

        <View>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Password"
                placeholder="Create your password"
                secureTextEntry={isSecureEntry}
                value={value}
                error={errors.password?.message}
                onChangeText={onChange}
                iconPostion="right"
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntry(!isSecureEntry);
                    }}
                  >
                    {isSecureEntry ? (
                      <Ionicons
                        name="eye-off-outline"
                        size={24}
                        color="#717171"
                      />
                    ) : (
                      <Ionicons name="eye-outline" size={24} color="#717171" />
                    )}
                  </TouchableOpacity>
                }
              />
            )}
          />
        </View>
        <View>
          <TouchableOpacity
            className="mb-10"
            onPress={() => {
              router.push("/(auth)/login/forgotPassword");
            }}
          >
          
            <GradientText
              className="text-right font-[PoppinsRegular]"
              style={{
                fontSize: rS(12),
                marginTop: rMS(10),
              }}
            >
              Forgot Password?
            </GradientText>
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-8">
        <View>
          <CustomButton
            gradient
            title="Log in"
            // onPress={() => {
            //   router.push("/(auth)/personal-info");
            // }}
            disabled={userLogin.isPending}
            loading={userLogin.isPending}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View className="my-5">
          <CustomButton
            whiteBg
            title="Sign up"
            onPress={() => {
              router.push("/(auth)/sign-up");
            }}
          />
        </View>
      </View>
    </KeyboardAwareScreen>
  );
};

export default LoginScreen;
