import { usePaymentSyncApi } from "@/src/api_services/payment/paymentMutation";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import { GradientText } from "@/src/components/GradientText";
import CustomButton from "@/src/custom-components/CustomButton";
import useRevenueCat from "@/src/hooks/useRevenueCat";
import Screen from "@/src/layout/Screen";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Check, ChevronLeft } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Purchases from "react-native-purchases";

const ChooseYourPlan = () => {
  const router = useRouter();
  const getUserData = useGetUser();
  const userId = getUserData?.data?.id;
  const { currentOffering, customerInfo, isProMember } = useRevenueCat();
  const paymentSync = usePaymentSyncApi(); // Add this line to use the mutation

  // Force selection to yearly by default
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Map RevenueCat Offerings to your UI structure
  const plans = useMemo(() => {
    if (!currentOffering) return [];

    return currentOffering.availablePackages
      .map((pkg) => {
        const isYearly = pkg.packageType === "ANNUAL";
        return {
          id: isYearly ? "yearly" : "monthly",
          rcPackage: pkg, // Store the full RC package for the purchase call
          title: isYearly ? "Yearly" : "Monthly",
          price: pkg.product.priceString,
          period: isYearly ? "/Year" : "/month",
          subtext: isYearly ? "Save 20% vs monthly" : "Billed monthly",
          badge: isYearly ? "Best Value" : "Current Plan",
        };
      })
      .sort((a) => (a.id === "yearly" ? -1 : 1)); // Ensure yearly is visually first if you prefer, or keep original order
  }, [currentOffering]);

  const benefits = [
    "Same plus benefits",
    "Cancel anytime",
    "Unused time credited automatically",
  ];

  const handleContinue = async () => {
    const planToPurchase = plans.find((p) => p.id === selectedPlan);
    if (!planToPurchase) return;

    try {
      setIsPurchasing(true);
      await Purchases.purchasePackage(planToPurchase.rcPackage);
      paymentSync.mutate({
        customerId: customerInfo?.originalAppUserId || "unknown",
      });
      router.push(
        "/(tabs)/homepage/manage-subscription/choose-your-plan/success-screen",
      );
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert("Error", "Could not process purchase. Please try again.");
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!currentOffering) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#9E3277" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          className="mb-4 p-1 self-start"
          onPress={() => router.back()}
        >
          <ChevronLeft color="#7C7C7C" size={24} />
        </TouchableOpacity>

        <GradientText className="text-2xl font-[PoppinsSemiBold] text-center mb-8">
          Choose your plan
        </GradientText>

        <View className="flex-row justify-between mb-8">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.9}
                className={`w-[48%] rounded-2xl border p-4 ${
                  isSelected
                    ? "bg-[#F4EBFF] border-[#D8B4FE]"
                    : "bg-white border-gray-200"
                }`}
                style={{ height: 180 }}
              >
                {plan.id === "yearly" ? (
                  <LinearGradient
                    colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 100,
                      marginBottom: 12,
                      alignSelf: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "700",
                        fontSize: 10,
                      }}
                    >
                      {plan.badge}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View className="self-start px-2 py-1 rounded-full mb-3 bg-[#F4EBFF]">
                    <Text className="text-[10px] font-bold text-[#9E3277]">
                      {plan.badge}
                    </Text>
                  </View>
                )}

                <Text className="text-xl font-bold text-[#1A1C1E] mb-2">
                  {plan.title}
                </Text>
                <View className="h-[1px] bg-gray-200 w-full mb-3" />

                <View className="flex-row items-baseline">
                  <GradientText className="text-xl font-[PoppinsSemiBold]">
                    {plan.price}
                  </GradientText>
                  <GradientText className="text-xs font-[PoppinsMedium]">
                    {plan.period}
                  </GradientText>
                </View>
                <Text className="text-[11px] text-gray-500 mt-1">
                  {plan.subtext}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="h-[1px] bg-gray-200 w-full mb-8" />

        <View className="space-y-5 mb-20">
          {benefits.map((benefit, index) => (
            <View key={index} className="flex-row items-center mb-4">
              <View className="bg-[#F4EBFF] rounded-full p-1 mr-3 w-5 h-5 items-center justify-center">
                <Check color="#9E3277" size={14} strokeWidth={3} />
              </View>
              <GradientText className="text-base font-[PoppinsMedium]">
                {benefit}
              </GradientText>
            </View>
          ))}
        </View>

        <View className="mt-40">
          <View className="mb-4">
            <CustomButton
              gradient
              title={isPurchasing ? "Processing..." : "Continue"}
              onPress={handleContinue}
              disabled={isPurchasing}
              //   onPress={() => {
              //     router.push(
              //       "/(tabs)/homepage/manage-subscription/choose-your-plan/success-screen",
              //     );
              //   }}
            />
          </View>
          <Text className="text-center text-gray-600 text-sm px-10 leading-5">
            A credit for unused time will be applied automatically by the App
            Store/Play Store.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ChooseYourPlan;

// import { usePaymentSyncApi } from "@/src/api_services/payment/paymentMutation";
// import { useGetUser } from "@/src/api_services/userApi/userQuery";
// import { GradientText } from "@/src/components/GradientText";
// import CustomButton from "@/src/custom-components/CustomButton";
// import useRevenueCat from "@/src/hooks/useRevenueCat";
// import Screen from "@/src/layout/Screen";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { Check, ChevronLeft } from "lucide-react-native";
// import React, { useMemo, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Purchases from "react-native-purchases";

// const ChooseYourPlan = () => {
//   const router = useRouter();
//   const getUserData = useGetUser();
//   const userId = getUserData?.data?.id;
//   const { currentOffering, customerInfo, isProMember } = useRevenueCat(userId);
//   const paymentSync = usePaymentSyncApi(); // Add this line to use the mutation

//   // Force selection to yearly by default
//   const [selectedPlan, setSelectedPlan] = useState("yearly");
//   const [isPurchasing, setIsPurchasing] = useState(false);

//   // Map RevenueCat Offerings to your UI structure
//   const plans = useMemo(() => {
//     if (!currentOffering) return [];

//     return currentOffering.availablePackages
//       .map((pkg) => {
//         const isYearly = pkg.packageType === "ANNUAL";
//         return {
//           id: isYearly ? "yearly" : "monthly",
//           rcPackage: pkg, // Store the full RC package for the purchase call
//           title: isYearly ? "Yearly" : "Monthly",
//           price: pkg.product.priceString,
//           period: isYearly ? "/Year" : "/month",
//           subtext: isYearly ? "Save 20% vs monthly" : "Billed monthly",
//           badge: isYearly ? "Best Value" : "Current Plan",
//         };
//       })
//       .sort((a) => (a.id === "yearly" ? -1 : 1)); // Ensure yearly is visually first if you prefer, or keep original order
//   }, [currentOffering]);

//   const benefits = [
//     "Same plus benefits",
//     "Cancel anytime",
//     "Unused time credited automatically",
//   ];

//   const handleContinue = async () => {
//     const planToPurchase = plans.find((p) => p.id === selectedPlan);
//     if (!planToPurchase) return;

//     try {
//       setIsPurchasing(true);
//       await Purchases.purchasePackage(planToPurchase.rcPackage);
//       paymentSync.mutate({
//         customerId: customerInfo?.originalAppUserId || "unknown",
//       });
//       router.push(
//         "/(tabs)/homepage/manage-subscription/choose-your-plan/success-screen",
//       );
//     } catch (e: any) {
//       if (!e.userCancelled) {
//         Alert.alert("Error", "Could not process purchase. Please try again.");
//       }
//     } finally {
//       setIsPurchasing(false);
//     }
//   };

//   if (!currentOffering) {
//     return (
//       <Screen>
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#9E3277" />
//         </View>
//       </Screen>
//     );
//   }

//   return (
//     <Screen>
//       <ScrollView
//         className="flex-1"
//         contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
//         showsVerticalScrollIndicator={false}
//       >
//         <TouchableOpacity
//           className="mb-4 p-1 self-start"
//           onPress={() => router.back()}
//         >
//           <ChevronLeft color="#7C7C7C" size={24} />
//         </TouchableOpacity>

//         <GradientText className="text-2xl font-[PoppinsSemiBold] text-center mb-8">
//           Choose your plan
//         </GradientText>

//         <View className="flex-row justify-between mb-8">
//           {plans.map((plan) => {
//             const isSelected = selectedPlan === plan.id;
//             return (
//               <TouchableOpacity
//                 key={plan.id}
//                 onPress={() => setSelectedPlan(plan.id)}
//                 activeOpacity={0.9}
//                 className={`w-[48%] rounded-2xl border p-4 ${
//                   isSelected
//                     ? "bg-[#F4EBFF] border-[#D8B4FE]"
//                     : "bg-white border-gray-200"
//                 }`}
//                 style={{ height: 180 }}
//               >
//                 {plan.id === "yearly" ? (
//                   <LinearGradient
//                     colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={{
//                       paddingHorizontal: 8,
//                       paddingVertical: 4,
//                       borderRadius: 100,
//                       marginBottom: 12,
//                       alignSelf: "flex-start",
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: "white",
//                         fontWeight: "700",
//                         fontSize: 10,
//                       }}
//                     >
//                       {plan.badge}
//                     </Text>
//                   </LinearGradient>
//                 ) : (
//                   <View className="self-start px-2 py-1 rounded-full mb-3 bg-[#F4EBFF]">
//                     <Text className="text-[10px] font-bold text-[#9E3277]">
//                       {plan.badge}
//                     </Text>
//                   </View>
//                 )}

//                 <Text className="text-xl font-bold text-[#1A1C1E] mb-2">
//                   {plan.title}
//                 </Text>
//                 <View className="h-[1px] bg-gray-200 w-full mb-3" />

//                 <View className="flex-row items-baseline">
//                   <GradientText className="text-xl font-[PoppinsSemiBold]">
//                     {plan.price}
//                   </GradientText>
//                   <GradientText className="text-xs font-[PoppinsMedium]">
//                     {plan.period}
//                   </GradientText>
//                 </View>
//                 <Text className="text-[11px] text-gray-500 mt-1">
//                   {plan.subtext}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <View className="h-[1px] bg-gray-200 w-full mb-8" />

//         <View className="space-y-5 mb-20">
//           {benefits.map((benefit, index) => (
//             <View key={index} className="flex-row items-center mb-4">
//               <View className="bg-[#F4EBFF] rounded-full p-1 mr-3 w-5 h-5 items-center justify-center">
//                 <Check color="#9E3277" size={14} strokeWidth={3} />
//               </View>
//               <GradientText className="text-base font-[PoppinsMedium]">
//                 {benefit}
//               </GradientText>
//             </View>
//           ))}
//         </View>

//         <View className="mt-40">
//           <View className="mb-4">
//             <CustomButton
//               gradient
//               title={isPurchasing ? "Processing..." : "Continue"}
//               onPress={handleContinue}
//               disabled={isPurchasing}
//               //   onPress={() => {
//               //     router.push(
//               //       "/(tabs)/homepage/manage-subscription/choose-your-plan/success-screen",
//               //     );
//               //   }}
//             />
//           </View>
//           <Text className="text-center text-gray-600 text-sm px-10 leading-5">
//             A credit for unused time will be applied automatically by the App
//             Store/Play Store.
//           </Text>
//         </View>
//       </ScrollView>
//     </Screen>
//   );
// };

// export default ChooseYourPlan;
