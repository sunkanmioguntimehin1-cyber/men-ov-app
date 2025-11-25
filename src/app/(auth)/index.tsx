

import { DisclaimerSheet } from "@/src/components/DisclaimerSheet";
import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
import BottomSheet from "@gorhom/bottom-sheet";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

export default function GetStarted() {
  const router = useRouter();
  const [storeData, setStoreData] = React.useState("");

    const snapPoints = useMemo(() => ["30%", "50%", "90%"], []);
  
    const DisclaimerBottomSheetRef = React.useRef<BottomSheet>(null);
    const handleDisclaimerBottomSheetOpen = (data:string) =>{
      if(data === 'signin'){
        setStoreData('signin');
        DisclaimerBottomSheetRef.current?.expand();
      }else{
        setStoreData('signup');
        DisclaimerBottomSheetRef.current?.expand();
      }
      
    }
    const handleDisclaimerBottomSheetClose = () =>
      DisclaimerBottomSheetRef.current?.close();

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/getstarted.png")}
        style={{ flex: 1 }}
        contentFit="cover"
      >
        <View className="mt-safe-or-10 items-center flex-1">
          {/* <View className="w-64 h-48">
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
          </View> */}
        </View>

        <View className="flex-1 mt-80" />

        <View className="p-8 mt-20 flex-1 items-center ">
          <TouchableOpacity
            className=" w-60 rounded-xl overflow-hidden"
            onPress={() => handleDisclaimerBottomSheetOpen("signup")}
            activeOpacity={0.8}
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
          </TouchableOpacity>

          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-white text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => handleDisclaimerBottomSheetOpen("signin")}
            >
              <Text className="text-[#712A87] font-[PoppinsMedium] text-sm underline">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
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
