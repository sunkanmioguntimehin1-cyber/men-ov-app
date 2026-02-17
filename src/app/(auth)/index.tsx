import { DisclaimerSheet } from "@/src/components/DisclaimerSheet";
import { GradientText } from "@/src/components/GradientText";
import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Platform, Pressable, Text, View } from "react-native";

export default function GetStarted() {
  const router = useRouter();
  const [storeData, setStoreData] = React.useState("");

  const snapPoints = useMemo(() => ["30%", "50%", "90%"], []);

  const DisclaimerBottomSheetRef = React.useRef<BottomSheet>(null);
  const handleDisclaimerBottomSheetOpen = (data: string) => {
    if (data === "signin") {
      setStoreData("signin");
      DisclaimerBottomSheetRef.current?.expand();
    } else {
      setStoreData("signup");
      DisclaimerBottomSheetRef.current?.expand();
    }
  };
  const handleDisclaimerBottomSheetClose = () =>
    DisclaimerBottomSheetRef.current?.close();

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/getstarted22.png")}
        style={{ flex: 1 }}
        contentFit="cover"
      >
        {/* Logo positioned at top-middle */}
        <View className="items-center justify-center pt-24 ">
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

        <View className="flex-1" />

        <View className="px-8 pb-[30px]  items-center">
          <Pressable
            className=" w-60 rounded-xl overflow-hidden"
            onPress={() => handleDisclaimerBottomSheetOpen("signup")}
            // onPress={() => console.log("signup")}
            // activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              // className="items-center justify-center py-4"
              style={{
                minHeight: 56,
                padding: Platform.OS === "ios" ? 16 : 16,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text className="text-white text-lg font-[PoppinsMedium]">
                Get started
              </Text>
            </LinearGradient>
          </Pressable>

          <View className="flex-row my-2 justify-center items-center">
            <Text className="text-white text-base">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => handleDisclaimerBottomSheetOpen("signin")}
            >
              <GradientText className="font-[PoppinsMedium] text-base ">
                Sign In
              </GradientText>
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-8  items-center mb-10">
          <GradientText className="font-[PoppinsMedium] text-sm ">
            Clinically informed • Built by women’s health experts
          </GradientText>
        </View>
      </ImageBackground>

      <BottomSheetScreen
        snapPoints={snapPoints}
        ref={DisclaimerBottomSheetRef}
        isBackdropComponent={true}
        enablePanDownToClose={true}
        index={-1}
        bgColor="#F0A29F"
        message={
          <DisclaimerSheet
            storeData={storeData}
            handleDisclaimerBottomSheetClose={handleDisclaimerBottomSheetClose}
          />
        }
      />
    </View>
  );
}
