import {
  useAppleLoginUser,
  useGoogleLoginUser,
  useRegisterUser,
} from "@/src/api_services/authApi/authMutation";
import RegisterFormModal from "@/src/components/RegisterFormModal";
import TermsAndPrivacy from "@/src/components/TermsAndPrivacy";
import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import CustomModel from "@/src/custom-components/CustomModel";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import SocialMediaButton from "@/src/custom-components/SocialMediaButton";
import KeyboardAwareScreen from "@/src/layout/KeyboardAwareScreen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { GradientText } from "../../../components/GradientText";

const SignUp = () => {
  const router = useRouter();
  const [isSecureEntry, setIsSecureEntry] = React.useState(true);
  const [modelVisible, setModelVisible] = React.useState(false);
  const [hasAgreed, setHasAgreed] = React.useState(false);
  const registerUser = useRegisterUser();
  const googleLoginUser = useGoogleLoginUser();
  const appleLoginUser = useAppleLoginUser();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      //  username: "",
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

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        // setState({ userInfo: response.data });
        googleLoginUser.mutate({
          idToken: response.data.idToken,
        });
        // console.log("User Info --> ", response.data);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  // ... inside your screen component
  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(" apple login Success:", credential);
      const resquestedPayload = {
        identityToken: credential.identityToken,
        fullName: credential.fullName,
      };

      // console.log("resquestedPayload:", resquestedPayload);

      appleLoginUser.mutate(resquestedPayload);
    } catch (e: any) {
      console.log("Error or Cancelled", e);
    }
  };

  React.useEffect(() => {
    setModelVisible(true);
  }, []);

  const handleAgree = () => {
    setHasAgreed(true);
    setModelVisible(false);
  };

  const onCancel = () => {
    // router.push("/guess-home");
    setModelVisible(false);
  };

  return (
    <KeyboardAwareScreen
      scroll={true}
      keyboardAware={true}
      extraScrollHeight={50}
    >
      <CustomModel
        modelVisible={modelVisible}
        setModelVisible={setModelVisible}
        closeOnOutsideClick={false}
        message={
          <RegisterFormModal onCancel={onCancel} onAgree={handleAgree} />
        }
      />
      <LoadingOverlay
        isOpen={registerUser.isPending} // Required: Controls visibility
        // message="Login..." // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />
      <TouchableOpacity
        className="px-8 "
        onPress={() => {
          router.back();
        }}
      >
        <MaterialIcons name="arrow-back-ios" size={20} color="black" />
      </TouchableOpacity>

      <View className="items-center">
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
        <View className="mt-2">
          <GradientText className="font-[PoppinsMedium] text-xl">
            Join Menovia AI
          </GradientText>
        </View>
      </View>

      <View className="px-8">
        <View className="my-5">
          <Text className="text-center text-[#42307D] font-[PoppinsRegular]">
            Personalized support for perimenopause, menopause, and beyond.
          </Text>
        </View>
        <View className="">
          <Controller
            control={control}
            name="fullname"
            rules={{
              required: "Full name is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Full name"
                placeholder=" Enter full name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.fullname?.message}
              />
            )}
          />
        </View>

        <View className="">
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

      <View className="px-8 py-2">
        <View>
          <CustomButton
            gradient
            title="Sign up"
            disabled={registerUser.isPending}
            loading={registerUser.isPending}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View className=" my-5 flex-row items-center justify-center">
          <View className=" flex-1 h-0.5 bg-slate-400" />
          <Text className="mx-3">or</Text>
          <View className=" flex-1 h-0.5 bg-slate-400" />
        </View>

        <View className="my-2">
          <SocialMediaButton
            title={"Continue with Apple"}
            whiteBg
            loading={appleLoginUser.isPending}
            onPress={handleAppleLogin}
            icon={
              <Image
                source={require("@/assets/images/apple-icon.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            }
          />
        </View>
        <View className="my-2">
          <SocialMediaButton
            title="Continue with Google"
            whiteBg
            onPress={signIn}
            icon={
              <Image
                source={require("@/assets/images/google-icon.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            }
          />
        </View>

        <TouchableOpacity
          className=" items-center my-2"
          onPress={() => {
            router.push("/(auth)/login");
          }}
        >
          <Text>
            Already have an account?{" "}
            <Text className="font-[PoppinsMedium] text-[#B33288]">Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-2">
        <TermsAndPrivacy privacyText={"By continuing you agree to our"} />
      </View>
    </KeyboardAwareScreen>
  );
};

export default SignUp;
