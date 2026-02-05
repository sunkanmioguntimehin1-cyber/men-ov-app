import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { GradientText } from "../GradientText";

export const DisclaimerSheet = ({
  handleDisclaimerBottomSheetClose,
  storeData,
}: any) => {
  const router = useRouter();
  const handleRoute = () => {
    if (storeData === "signin") {
      handleDisclaimerBottomSheetClose();
      router.push("/(auth)/login");
      return;
    } else if (storeData === "signup") {
      handleDisclaimerBottomSheetClose();
      router.push("/(auth)/welcome");
      return;
    }
    // handleDisclaimerBottomSheetClose();
    // router.push("/(auth)/welcome");
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

        <Text className=" font-[PoppinsRegular] text-white py-4 text-base">
          By tapping “I agree”, you acknowledge this and agree to our Terms &
          Privacy Policy.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-white rounded-xl h-14 items-center justify-center mt-10"
        style={{
          elevation: 8,
          shadowColor: "#000000",
        }}
        // onPress={() => router.push("/(auth)/welcome")}
        onPress={handleRoute}
        activeOpacity={0.8}
      >
        <GradientText className="font-[PoppinsMedium] text-xl">
          I Agree
        </GradientText>
      </TouchableOpacity>
    </View>
  );
};
