import CustomButton from "@/src/custom-components/CustomButton";
import useRevenueCat from "@/src/hooks/useRevenueCat";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Circle } from "lucide-react-native"; // Removed CheckCircle2 to use the solid purple circle from image
import { Skeleton } from "moti/skeleton";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Purchases from "react-native-purchases";

const PaywallScreen = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("annual");
  const { currentOffering, isProMember } = useRevenueCat(); // This is the trigger

  console.log("currentOffering:", currentOffering);

  const isLoading = !currentOffering;

  const calculateDiscount = () => {
    if (!currentOffering?.annual || !currentOffering?.monthly) return 0;

    const annualPrice = currentOffering.annual.product.price; // 143.99
    const monthlyPrice = currentOffering.monthly.product.price; // 14.99

    const totalMonthlyCost = monthlyPrice * 12; // 179.88
    const savings = totalMonthlyCost - annualPrice;

    const percentage = (savings / totalMonthlyCost) * 100;

    return Math.floor(percentage); // Returns 20 (or 19.95 if you use Math.floor)
  };

  const discountPercentage = calculateDiscount();

  const handleMonthlyPurchase = async () => {
    setSelectedPlan("monthly");
    if (!currentOffering?.monthly) {
      Alert.alert(
        "Monthly plan is not available at the moment. Please try again later.",
      );
      return;
    }

    const PurchaserInfo = await Purchases.purchasePackage(
      currentOffering.monthly,
    );
    console.log(
      "PurchaserInfo:",
      PurchaserInfo.customerInfo.entitlements.active,
    );
    if (PurchaserInfo.customerInfo.entitlements.active.pro) {
      Alert.alert(
        "Success",
        "You have successfully subscribed to the monthly plan!",
      );
      router.push("/homepage/welcome-plus");
    } else {
      Alert.alert(
        "Purchase failed",
        "Something went wrong with the purchase. Please try again.",
      );
    }
  };

  const handleYearlyPurchase = async () => {
    setSelectedPlan("annual");
    if (!currentOffering?.annual) {
      Alert.alert(
        "Annual plan is not available at the moment. Please try again later.",
      );
      return;
    }

    const PurchaserInfo = await Purchases.purchasePackage(
      currentOffering.annual,
    );
    console.log(
      "PurchaserInfo:",
      PurchaserInfo.customerInfo.entitlements.active,
    );
    if (PurchaserInfo.customerInfo.entitlements.active.pro) {
      Alert.alert(
        "Success",
        "You have successfully subscribed to the annual plan!",
      );
      router.push("/homepage/welcome-plus");
    } else {
      Alert.alert(
        "Purchase failed",
        "Something went wrong with the purchase. Please try again.",
      );
    }
  };

  const handleRestoreSubscription = async () => {
    try {
      const restoredInfo = await Purchases.restorePurchases();
      console.log("Restored PurchaserInfo:", restoredInfo.entitlements.active);
      if (restoredInfo.entitlements.active.pro) {
        Alert.alert(
          "Success",
          "Your subscription has been restored successfully!",
        );
        router.push("/homepage/welcome-plus");
      } else {
        Alert.alert(
          "No active subscription",
          "No active subscription found to restore.",
        );
      }
    } catch (error) {
      console.error("Error restoring purchases:", error);
      Alert.alert(
        "Restore failed",
        "An error occurred while restoring your subscription. Please try again.",
      );
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/paymentbg.png")}
        className="flex-1"
        resizeMode="cover"
      >
        {/* Header & Logo Section */}
        <View className="pt-16 px-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="items-center px-8 mt-4">
            <Image
              source={require("@/assets/images/Menovia-Logo-Icon.png")}
              style={{ width: 80, height: 60 }}
              contentFit="contain"
            />
            <Text className="text-white text-[28px] font-bold text-center tracking-tight">
              Try Plus free for 7 days
            </Text>
            <Text className="text-white text-base text-center mt-3 opacity-90 font-medium">
              Track symptoms, get personalized guidance, and feel supported
            </Text>
          </View>
        </View>

        <View className="flex-1 items-center justify-center">
          <View className="w-80 h-96">
            <Image
              source={require("@/assets/images/paymentziena.png")}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Bottom White Card */}
        <View className="bg-white rounded-t-[32px] px-6 pt-8 pb-6 shadow-2xl">
          {/* 1. Annual Plan Block */}
          <Skeleton show={isLoading} colorMode="light" radius={16} width="100%">
            <View className="relative w-full">
              {/* Badge - Rendered outside the Skeleton logic but inside the relative container */}
              {!isLoading && (
                <View className="absolute -top-3 right-4 z-20 bg-[#6d4c85] px-2 py-1 rounded-md">
                  <Text className="text-white text-[10px] font-bold">
                    {discountPercentage}% OFF
                  </Text>
                </View>
              )}

              <TouchableOpacity
                onPress={handleYearlyPurchase}
                className={`flex-row items-center justify-between p-4 rounded-2xl border ${
                  selectedPlan === "annual"
                    ? "border-[#c4a1d1] bg-[#f9f5ff]"
                    : "border-gray-200"
                } mb-4`}
              >
                <View className="flex-row items-center">
                  {selectedPlan === "annual" ? (
                    <View className="h-6 w-6 rounded-full border-2 border-[#8b4c8c] items-center justify-center">
                      <View className="h-3 w-3 rounded-full bg-[#8b4c8c]" />
                    </View>
                  ) : (
                    <Circle color="#d1d5db" size={24} />
                  )}
                  <View className="ml-4">
                    <Text className="font-bold text-[#4a2c52] text-lg">
                      Annual
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      Only{" "}
                      {currentOffering?.annual?.product.pricePerMonthString ||
                        "$11.99"}
                      /mo
                    </Text>
                  </View>
                </View>
                <Text className="font-bold text-[#4a2c52] text-base">
                  {currentOffering?.annual?.product.priceString || "$143.99"}
                  /year
                </Text>
              </TouchableOpacity>
            </View>
          </Skeleton>
          <View style={{ height: 12 }} /> {/* Spacer */}
          {/* 2. Monthly Plan Block */}
          <Skeleton show={isLoading} colorMode="light" radius={16} width="100%">
            <TouchableOpacity
              onPress={handleMonthlyPurchase}
              className={`flex-row items-center justify-between p-5 rounded-2xl border ${
                selectedPlan === "monthly"
                  ? "border-[#c4a1d1] bg-[#f9f5ff]"
                  : "border-gray-200"
              } mb-6`}
            >
              <View className="flex-row items-center">
                {selectedPlan === "monthly" ? (
                  <View className="h-6 w-6 rounded-full border-2 border-[#8b4c8c] items-center justify-center">
                    <View className="h-3 w-3 rounded-full bg-[#8b4c8c]" />
                  </View>
                ) : (
                  <Circle color="#d1d5db" size={24} />
                )}
                <Text className="ml-4 font-bold text-[#4a2c52] text-lg">
                  Monthly
                </Text>
              </View>
              <Text className="font-bold text-[#4a2c52] text-base">
                {currentOffering?.monthly?.product.priceString || "$14.99"}/mo
              </Text>
            </TouchableOpacity>
          </Skeleton>
          {/* 3. Button & Footer */}
          <View className="mt-2">
            <Skeleton
              show={isLoading}
              colorMode="light"
              // width="100%"
              // radius={24}
            >
              <CustomButton
                gradient
                // title={
                //   isProMember
                //     ? "Continue"
                //     : `${currentOffering?.monthly?.product.introPrice?.periodNumberOfUnits} ${currentOffering?.monthly?.product.introPrice?.periodUnit || "days"} free trial`
                // }
                title={isProMember ? "Continue" : `Start free trial`}
                onPress={() => router.push("/homepage/welcome-plus")}
              />
            </Skeleton>

            <View className="flex-row justify-around mb-8 mt-5 ">
              <TouchableOpacity>
                <Text className="text-[#8b4c8c] font-bold text-sm underline">
                  Terms
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleRestoreSubscription}>
                <Text className="text-[#8b4c8c] font-bold text-sm underline">
                  Restore Purchase
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text className="text-[#8b4c8c] font-bold text-sm underline">
                  Privacy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default PaywallScreen;
