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


import { useRegisterUser } from "@/src/api_services/authApi/authMutation";
import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import KeyboardAwareScreen from "@/src/layout/KeyboardAwareScreen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

const SignUp = () => {
  const router = useRouter();
    const [isSecureEntry, setIsSecureEntry] = React.useState(true);
     const registerUser = useRegisterUser();
  

   const {
     control,
     handleSubmit,
     formState: { errors, isValid },
   } = useForm({
     mode: "onChange",
     defaultValues: {
       username: "",
       password: "",
       email: "",
       fullname: "",
      
     },
   });

   const onSubmit = (data: any) => {
     if (data) {
       registerUser.mutate(data);
      //  setUserRegOtps({
      //    email: data.email.toLowerCase(),
      //  });
       console.log("testing234: ", data);
     }
   };

   console.log("registerUser:", registerUser);
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
          <Controller
            control={control}
            name="fullname"
            rules={{
              required: "username is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Fullname"
                placeholder="Fullname"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.fullname?.message}
              />
            )}
          />
        </View>

        <View>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "username is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Username"
                placeholder="username"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.username?.message}
              />
            )}
          />
        </View>

        <View className="my-5">
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Email"
                placeholder="Email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
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
      </View>

      <View className="p-8">
        <View>
          <CustomButton
            primary
            title="Sign up"
            disabled={registerUser.isPending}
            loading={registerUser.isPending}
            onPress={handleSubmit(onSubmit)}
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