// import CustomButton from "@/src/custom-components/CustomButton";
// import useRevenueCat from "@/src/hooks/useRevenueCat";
// import { Ionicons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import { Circle } from "lucide-react-native"; // Removed CheckCircle2 to use the solid purple circle from image
// import { Skeleton } from "moti/skeleton";
// import React, { useState } from "react";
// import {
//   Alert,
//   ImageBackground,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Purchases from "react-native-purchases";

// const PaywallScreen = () => {
//   const router = useRouter();
//   const [selectedPlan, setSelectedPlan] = useState("annual");
//   const { currentOffering, customerInfo, isProMember } = useRevenueCat(); // This is the trigger

//   console.log("currentOffering:", currentOffering);
//   console.log("customerInfo:", customerInfo);

//   const isLoading = !currentOffering;

//   const calculateDiscount = () => {
//     if (!currentOffering?.annual || !currentOffering?.monthly) return 0;

//     const annualPrice = currentOffering.annual.product.price; // 143.99
//     const monthlyPrice = currentOffering.monthly.product.price; // 14.99

//     const totalMonthlyCost = monthlyPrice * 12; // 179.88
//     const savings = totalMonthlyCost - annualPrice;

//     const percentage = (savings / totalMonthlyCost) * 100;

//     return Math.floor(percentage); // Returns 20 (or 19.95 if you use Math.floor)
//   };

//   const discountPercentage = calculateDiscount();

//   const handleMonthlyPurchase = async () => {
//     setSelectedPlan("monthly");
//     if (!currentOffering?.monthly) {
//       Alert.alert(
//         "Monthly plan is not available at the moment. Please try again later.",
//       );
//       return;
//     }

//     const PurchaserInfo = await Purchases.purchasePackage(
//       currentOffering.monthly,
//     );
//     console.log(
//       "PurchaserInfo:",
//       PurchaserInfo.customerInfo.entitlements.active,
//     );
//     if (PurchaserInfo.customerInfo.entitlements.active.pro) {
//       Alert.alert(
//         "Success",
//         "You have successfully subscribed to the monthly plan!",
//       );
//       router.push("/homepage/welcome-plus");
//     } else {
//       Alert.alert(
//         "Purchase failed",
//         "Something went wrong with the purchase. Please try again.",
//       );
//     }
//   };

//   const testing =
//     Purchases.INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_INELIGIBLE;
//   console.log("Testing value:", testing);

//   const handleYearlyPurchase = async () => {
//     setSelectedPlan("annual");
//     if (!currentOffering?.annual) {
//       Alert.alert(
//         "Annual plan is not available at the moment. Please try again later.",
//       );
//       return;
//     }

//     const PurchaserInfo = await Purchases.purchasePackage(
//       currentOffering.annual,
//     );

//     console.log(
//       "PurchaserInfo:",
//       PurchaserInfo.customerInfo.entitlements.active,
//     );
//     if (PurchaserInfo.customerInfo.entitlements.active.pro) {
//       Alert.alert(
//         "Success",
//         "You have successfully subscribed to the annual plan!",
//       );
//       router.push("/homepage/welcome-plus");
//     } else {
//       Alert.alert(
//         "Purchase failed",
//         "Something went wrong with the purchase. Please try again.",
//       );
//     }
//   };

//   const handleRestoreSubscription = async () => {
//     try {
//       const restoredInfo = await Purchases.restorePurchases();
//       console.log("Restored PurchaserInfo:", restoredInfo.entitlements.active);
//       if (restoredInfo.entitlements.active.pro) {
//         Alert.alert(
//           "Success",
//           "Your subscription has been restored successfully!",
//         );
//         router.push("/homepage/welcome-plus");
//       } else {
//         Alert.alert(
//           "No active subscription",
//           "No active subscription found to restore.",
//         );
//       }
//     } catch (error) {
//       console.error("Error restoring purchases:", error);
//       Alert.alert(
//         "Restore failed",
//         "An error occurred while restoring your subscription. Please try again.",
//       );
//     }
//   };

//   return (
//     <View className="flex-1">
//       <ImageBackground
//         source={require("@/assets/images/paymentbg.png")}
//         className="flex-1"
//         resizeMode="cover"
//       >
//         {/* Header & Logo Section */}
//         <View className="pt-16 px-4">
//           <TouchableOpacity onPress={() => router.back()}>
//             <Ionicons name="chevron-back" size={24} color="white" />
//           </TouchableOpacity>
//           <View className="items-center px-8 mt-4">
//             <Image
//               source={require("@/assets/images/Menovia-Logo-Icon.png")}
//               style={{ width: 80, height: 60 }}
//               contentFit="contain"
//             />
//             <Text className="text-white text-[28px] font-bold text-center tracking-tight">
//               Try Plus free for 7 days
//             </Text>
//             <Text className="text-white text-base text-center mt-3 opacity-90 font-medium">
//               Track symptoms, get personalized guidance, and feel supported
//             </Text>
//           </View>
//         </View>

//         <View className="flex-1 items-center justify-center">
//           <View className="w-80 h-96">
//             <Image
//               source={require("@/assets/images/paymentziena.png")}
//               style={{ width: "100%", height: "100%" }}
//               contentFit="contain"
//             />
//           </View>
//         </View>

//         {/* Bottom White Card */}
//         <View className="bg-white rounded-t-[32px] px-6 pt-8 pb-6 shadow-2xl">
//           {/* 1. Annual Plan Block */}
//           <Skeleton show={isLoading} colorMode="light" radius={16} width="100%">
//             <View className="relative w-full">
//               {/* Badge - Rendered outside the Skeleton logic but inside the relative container */}
//               {!isLoading && (
//                 <View className="absolute -top-3 right-4 z-20 bg-[#6d4c85] px-2 py-1 rounded-md">
//                   <Text className="text-white text-[10px] font-bold">
//                     {discountPercentage}% OFF
//                   </Text>
//                 </View>
//               )}

//               <TouchableOpacity
//                 onPress={handleYearlyPurchase}
//                 className={`flex-row items-center justify-between p-4 rounded-2xl border ${
//                   selectedPlan === "annual"
//                     ? "border-[#c4a1d1] bg-[#f9f5ff]"
//                     : "border-gray-200"
//                 } mb-4`}
//               >
//                 <View className="flex-row items-center">
//                   {selectedPlan === "annual" ? (
//                     <View className="h-6 w-6 rounded-full border-2 border-[#8b4c8c] items-center justify-center">
//                       <View className="h-3 w-3 rounded-full bg-[#8b4c8c]" />
//                     </View>
//                   ) : (
//                     <Circle color="#d1d5db" size={24} />
//                   )}
//                   <View className="ml-4">
//                     <Text className="font-bold text-[#4a2c52] text-lg">
//                       Annual
//                     </Text>
//                     <Text className="text-gray-500 text-sm">
//                       Only{" "}
//                       {currentOffering?.annual?.product.pricePerMonthString ||
//                         "$11.99"}
//                       /mo
//                     </Text>
//                   </View>
//                 </View>
//                 <Text className="font-bold text-[#4a2c52] text-base">
//                   {currentOffering?.annual?.product.priceString || "$143.99"}
//                   /year
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </Skeleton>
//           <View style={{ height: 12 }} /> {/* Spacer */}
//           {/* 2. Monthly Plan Block */}
//           <Skeleton show={isLoading} colorMode="light" radius={16} width="100%">
//             <TouchableOpacity
//               onPress={handleMonthlyPurchase}
//               className={`flex-row items-center justify-between p-5 rounded-2xl border ${
//                 selectedPlan === "monthly"
//                   ? "border-[#c4a1d1] bg-[#f9f5ff]"
//                   : "border-gray-200"
//               } mb-6`}
//             >
//               <View className="flex-row items-center">
//                 {selectedPlan === "monthly" ? (
//                   <View className="h-6 w-6 rounded-full border-2 border-[#8b4c8c] items-center justify-center">
//                     <View className="h-3 w-3 rounded-full bg-[#8b4c8c]" />
//                   </View>
//                 ) : (
//                   <Circle color="#d1d5db" size={24} />
//                 )}
//                 <Text className="ml-4 font-bold text-[#4a2c52] text-lg">
//                   Monthly
//                 </Text>
//               </View>
//               <Text className="font-bold text-[#4a2c52] text-base">
//                 {currentOffering?.monthly?.product.priceString || "$14.99"}/mo
//               </Text>
//             </TouchableOpacity>
//           </Skeleton>
//           {/* 3. Button & Footer */}
//           <View className="mt-2">
//             <Skeleton
//               show={isLoading}
//               colorMode="light"
//               // width="100%"
//               // radius={24}
//             >
//               <CustomButton
//                 gradient
//                 title={
//                   isProMember
//                     ? "Continue"
//                     : `Start  ${currentOffering?.monthly?.product.introPrice?.periodNumberOfUnits} ${currentOffering?.monthly?.product.introPrice?.periodUnit.toLowerCase() || "days"} free trial`
//                 }
//                 // title={isProMember ? "Continue" : `Start free trial`}
//                 onPress={() => router.push("/homepage/welcome-plus")}
//               />
//             </Skeleton>

//             <View className="flex-row justify-around mb-8 mt-5 ">
//               <TouchableOpacity>
//                 <Text className="text-[#8b4c8c] font-bold text-sm underline">
//                   Terms
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={handleRestoreSubscription}>
//                 <Text className="text-[#8b4c8c] font-bold text-sm underline">
//                   Restore Purchase
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity>
//                 <Text className="text-[#8b4c8c] font-bold text-sm underline">
//                   Privacy
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };
// export default PaywallScreen;

import CustomButton from "@/src/custom-components/CustomButton";
import useRevenueCat from "@/src/hooks/useRevenueCat";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Circle } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import React, { useEffect, useState } from "react";
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
  const [isTrialEligible, setIsTrialEligible] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { currentOffering, customerInfo, isProMember } = useRevenueCat();
  console.log("currentOffering:", currentOffering);
  console.log("customerInfo:", customerInfo);
  console.log("isProMember:", isProMember);
  console.log(
    "Customer active subscriptions:",
    customerInfo?.entitlements.active.pro,
  );

  const isLoading = !currentOffering;

  // Check trial eligibility whenever plan or offering changes

  // useEffect(() => {
  //   const checkTrialEligibility = async () => {
  //     if (!currentOffering) return;

  //     const packageToPurchase =
  //       selectedPlan === "annual"
  //         ? currentOffering?.annual
  //         : currentOffering?.monthly;

  //     if (!packageToPurchase) return;

  //     const eligibility =
  //       await Purchases.checkTrialOrIntroductoryPriceEligibility([
  //         packageToPurchase.product.identifier,
  //       ]);

  //     const result =
  //       eligibility[packageToPurchase.product.identifier] ??
  //       eligibility[packageToPurchase.identifier];

  //     console.log("Eligibility result:", result);

  //     if (
  //       result?.status ===
  //       Purchases.INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_ELIGIBLE
  //     ) {
  //       // Confirmed eligible (iOS)
  //       setIsTrialEligible(true);
  //     } else if (
  //       result?.status ===
  //       Purchases.INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_UNKNOWN
  //     ) {
  //       // Android — fall back to checking if introPrice exists on the product
  //       const hasIntroOffer = !!packageToPurchase.product.introPrice;
  //       console.log("Android fallback - hasIntroOffer:", hasIntroOffer);
  //       setIsTrialEligible(hasIntroOffer);
  //     } else {
  //       // INELIGIBLE or NO_INTRO_OFFER_EXISTS
  //       setIsTrialEligible(false);
  //     }
  //   };

  //   checkTrialEligibility();
  // }, [selectedPlan, currentOffering]);

  // useEffect(() => {
  //   const checkTrialEligibility = async () => {
  //     if (!currentOffering) return;

  //     const packageToPurchase =
  //       selectedPlan === "annual"
  //         ? currentOffering?.annual
  //         : currentOffering?.monthly;
  //     console.log("am here now packageToPurchase", packageToPurchase);

  //     if (!packageToPurchase) return;

  //     // const eligibility =
  //     //   await Purchases.checkTrialOrIntroductoryPriceEligibility([
  //     //     packageToPurchase.product.identifier,
  //     //   ]);

  //     // Pass product identifier to the check
  //     const eligibility =
  //       await Purchases.checkTrialOrIntroductoryPriceEligibility([
  //         packageToPurchase.product.identifier, // "menovia_annual:menovia-annual-plus"
  //       ]);

  //     // Read result using product identifier
  //     const result = eligibility[packageToPurchase.product.identifier];

  //     console.log("Result:", result); // should no longer be undefined

  //     // const result =
  //     //   eligibility[packageToPurchase.product.identifier] ??
  //     //   eligibility[packageToPurchase.identifier];

  //     console.log("Eligibility result:", result);

  //     if (
  //       result?.status ===
  //       Purchases.INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_ELIGIBLE
  //     ) {
  //       // iOS — confirmed eligible
  //       setIsTrialEligible(true);
  //     } else if (
  //       result?.status ===
  //       Purchases.INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_UNKNOWN
  //     ) {
  //       // Android always lands here, iOS rarely does
  //       const hasIntroOffer = !!packageToPurchase.product.introPrice;

  //       // Check if user has EVER purchased your specific products before
  //       const allPurchased = customerInfo?.allPurchasedProductIdentifiers ?? [];

  //       const annualProductId = currentOffering?.annual?.product.identifier;
  //       const monthlyProductId = currentOffering?.monthly?.product.identifier;

  //       const hasEverSubscribed =
  //         allPurchased.includes(annualProductId ?? "") ||
  //         allPurchased.includes(monthlyProductId ?? "");

  //       // console.log("All purchased products:", allPurchased);
  //       // console.log("Has ever subscribed:", hasEverSubscribed);

  //       console.log("hasIntroOffer:", hasIntroOffer);
  //       console.log("hasEverSubscribed:", hasEverSubscribed);
  //       console.log("allPurchased:", allPurchased);
  //       console.log("annualProductId:", annualProductId);
  //       console.log("monthlyProductId:", monthlyProductId);

  //       // Only eligible for trial if introPrice exists AND never subscribed before
  //       setIsTrialEligible(hasIntroOffer && !hasEverSubscribed);
  //     } else {
  //       // INELIGIBLE or NO_INTRO_OFFER_EXISTS
  //       setIsTrialEligible(false);
  //     }
  //   };

  //   checkTrialEligibility();
  // }, [selectedPlan, currentOffering, customerInfo]);

  useEffect(() => {
    const checkTrialEligibility = async () => {
      if (!currentOffering || !customerInfo) return;

      const packageToPurchase =
        selectedPlan === "annual"
          ? currentOffering?.annual
          : currentOffering?.monthly;

      if (!packageToPurchase) return;

      // First check — has user EVER subscribed before (works on both iOS & Android)
      const allPurchased = customerInfo?.allPurchasedProductIdentifiers ?? [];
      const annualProductId = currentOffering?.annual?.product.identifier;
      const monthlyProductId = currentOffering?.monthly?.product.identifier;

      const hasEverSubscribed =
        allPurchased.includes(annualProductId ?? "") ||
        allPurchased.includes(monthlyProductId ?? "");

      console.log("allPurchased:", allPurchased);
      console.log("hasEverSubscribed:", hasEverSubscribed);

      // If they've ever subscribed, no trial — period. Don't even check eligibility
      if (hasEverSubscribed) {
        setIsTrialEligible(false);
        return;
      }

      // Only reach here for brand new users — then check eligibility
      const eligibility =
        await Purchases.checkTrialOrIntroductoryPriceEligibility([
          packageToPurchase.product.identifier,
        ]);

      const result = eligibility[packageToPurchase.product.identifier];
      console.log("Eligibility result:", result);

      if (
        result?.status ===
        Purchases.INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_ELIGIBLE
      ) {
        setIsTrialEligible(true);
      } else if (
        result?.status ===
        Purchases.INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_UNKNOWN
      ) {
        // Android fallback for brand new users
        const hasIntroOffer = !!packageToPurchase.product.introPrice;
        setIsTrialEligible(hasIntroOffer);
      } else {
        setIsTrialEligible(false);
      }
    };

    checkTrialEligibility();
  }, [selectedPlan, currentOffering, customerInfo]);

  const calculateDiscount = () => {
    if (!currentOffering?.annual || !currentOffering?.monthly) return 0;
    const annualPrice = currentOffering.annual.product.price;
    const monthlyPrice = currentOffering.monthly.product.price;
    const totalMonthlyCost = monthlyPrice * 12;
    const savings = totalMonthlyCost - annualPrice;
    const percentage = (savings / totalMonthlyCost) * 100;
    return Math.floor(percentage);
  };

  const discountPercentage = calculateDiscount();

  const selectedProduct =
    selectedPlan === "annual"
      ? currentOffering?.annual?.product
      : currentOffering?.monthly?.product;

  const trialDuration = `${selectedProduct?.introPrice?.periodNumberOfUnits} ${
    selectedProduct?.introPrice?.periodUnit?.toLowerCase() || "days"
  }`;

  const handleStartTrial = async () => {
    try {
      if (isProMember) {
        router.push("/homepage/welcome-plus");
        return;
      }

      const packageToPurchase =
        selectedPlan === "annual"
          ? currentOffering?.annual
          : currentOffering?.monthly;

      if (!packageToPurchase) {
        Alert.alert("Error", "No plan available. Please try again later.");
        return;
      }

      setIsPurchasing(true);

      const purchaserInfo = await Purchases.purchasePackage(packageToPurchase);

      if (purchaserInfo.customerInfo.entitlements.active.pro) {
        router.push("/homepage/welcome-plus");
      } else {
        Alert.alert(
          "Purchase failed",
          "Something went wrong. Please try again.",
        );
      }
    } catch (error: any) {
      if (!error.userCancelled) {
        Alert.alert("Error", error.message || "Purchase failed.");
      }
    } finally {
      setIsPurchasing(false);
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
        <View className="pt-16 px-4 mb-10">
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
              {isTrialEligible
                ? "Try Plus free for 7 days"
                : "Stay supported with Plus"}
            </Text>
            <Text className="text-white text-base text-center mt-3 opacity-90 font-medium">
              {isTrialEligible
                ? "Track symptoms, get personalized guidance, and feel supported"
                : "Keep unlimited access to Ziena guidance, insights, and personalized support."}
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
              {!isLoading && (
                <View className="absolute -top-3 right-4 z-20   rounded-md">
                  <LinearGradient
                    colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      //height: 56, // Match the height exactly
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 16,
                    }}
                  >
                    <Text className="text-white text-[10px] font-bold">
                      {discountPercentage}% OFF
                    </Text>
                  </LinearGradient>
                </View>
              )}

              {/* Tapping the card only selects the plan */}
              <TouchableOpacity
                onPress={() => setSelectedPlan("annual")}
                className={`flex-row items-center justify-between p-2 rounded-2xl   ${
                  selectedPlan === "annual"
                    ? " bg-purple-100"
                    : "border border-gray-200"
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

          <View style={{ height: 5 }} />

          {/* 2. Monthly Plan Block */}
          <Skeleton show={isLoading} colorMode="light" radius={16} width="100%">
            {/* Tapping the card only selects the plan */}
            <TouchableOpacity
              onPress={() => setSelectedPlan("monthly")}
              className={`flex-row items-center justify-between p-4 rounded-2xl border ${
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
          <View className="">
            <Skeleton show={isLoading} colorMode="light">
              <CustomButton
                gradient
                disabled={isPurchasing}
                // title={
                //   isProMember
                //     ? "Continue"
                //     : isTrialEligible
                //       ? `Start ${trialDuration} free trial`
                //       : `Subscribe ${
                //           selectedPlan === "annual" ? "Annually" : "Monthly"
                //         }`
                // }
                title={
                  isProMember
                    ? "Continue"
                    : isTrialEligible
                      ? `Start free trial`
                      : `Subscribe ${
                          selectedPlan === "annual" ? "Annually" : "Monthly"
                        }`
                }
                onPress={handleStartTrial}
              />
            </Skeleton>

            <View className="flex-row justify-around mb-8 mt-5">
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
