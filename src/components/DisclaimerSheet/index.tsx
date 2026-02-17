import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { GradientText } from "../GradientText";
import TermsAndPrivacy from "../TermsAndPrivacy";

const PRIVACY_LINK = process.env.EXPO_PUBLIC_PRIVACY_LINK;

export const DisclaimerSheet = ({
  handleDisclaimerBottomSheetClose,
  storeData,
}: any) => {
  const router = useRouter();
  const [isChecked, setChecked] = React.useState(false);
  const handleRoute = () => {
    if (storeData === "signin") {
      handleDisclaimerBottomSheetClose();
      router.push("/(auth)/login");
      return;
    } else if (storeData === "signup") {
      handleDisclaimerBottomSheetClose();
      router.push("/(auth)/sign-up");
      return;
    }
    // handleDisclaimerBottomSheetClose();
    // router.push("/(auth)/welcome");
  };

  const handleOpenPrivacyPolicy = async () => {
    // const uri = "https://menoviahealth.com/privacy.html";
    const uri: any = PRIVACY_LINK;
    try {
      await WebBrowser.openBrowserAsync(uri);
    } catch (error) {
      Alert.alert("Failed to fetch receipt.");
    }
  };
  return (
    <View className="flex-1 p-8  ">
      <View>
        <Text className=" font-[PoppinsSemiBold] text-white text-2xl">
          Disclaimer
        </Text>
        <Text className="font-[PoppinsSemiBold] text-white text-2xl w-56 max-w-56">{`Please read, it’s important!`}</Text>
      </View>
      <View className="mt-auto flex-1"></View>

      <View>
        <Text className=" font-[PoppinsRegular] text-white py-4 text-base">
          Menovia and Ziena™ (your AI companion) provide educational
          information, symptoms tracking, and access to expert-curated
          resources. They do not diagnose, treat, or replace care from your
          clinician.
        </Text>

        <Text className=" font-[PoppinsRegular] text-white py-4 text-base">
          Do not start, stop, or change any medication or HRT based on Menovia.
          Always seek advice from a qualified health professional about your
          personal situation.
        </Text>

        <Text className=" font-[PoppinsRegular] text-white py-4 text-base">
          If you’re unwell or think you may be experiencing an emergency,
          contact your doctor, go to the nearest hospital, or call your local
          emergency number immediately.
        </Text>

        <TouchableOpacity onPress={handleOpenPrivacyPolicy}>
          <Text className=" font-[PoppinsRegular] text-white py-4 text-base">
            By tapping “I agree”, you acknowledge this and agree to our {}
            <Text
              className=""
              style={{ color: "#B33288", textDecorationLine: "underline" }}
              // onPress={handleOpenPrivacyPolicy}
            >
              Terms & Privacy Policy.
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View className=" flex-row items-center">
        <Checkbox
          // style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#B33288" : "#fff"}
        />
        <Text className=" text-white mx-2">
          have read and understand the disclaimer above.
        </Text>
      </View>
      <TouchableOpacity
        // 1. Add the disabled prop
        disabled={!isChecked}
        // 2. Adjust styling to look disabled when !isChecked
        className={`rounded-xl w-56 h-14 items-center justify-center mx-auto mt-10 ${
          isChecked ? "bg-white" : "bg-black opacity-20"
        }`}
        style={{
          elevation: isChecked ? 8 : 0, // Optional: remove shadow when disabled
          shadowColor: "#000000",
        }}
        onPress={handleRoute}
        activeOpacity={0.8}
      >
        <GradientText className="font-[PoppinsMedium] text-xl">
          I Agree
        </GradientText>
      </TouchableOpacity>

      <View className="mt-4">
        <TermsAndPrivacy
          privacyText={"You may review our"}
          bottonPrivacyText={"at any time."}
        />
      </View>
    </View>
  );
};
