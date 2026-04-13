// import { GradientText } from "@/src/components/GradientText";
// import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
// import useRevenueCat from "@/src/hooks/useRevenueCat";
// import Screen from "@/src/layout/Screen";
// import BottomSheet from "@gorhom/bottom-sheet";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { ChevronLeft, ChevronRight } from "lucide-react-native";
// import React, { useMemo } from "react";
// import { Pressable, Text, TouchableOpacity, View } from "react-native";
// import ManageSubscriptionBottonSheet from "./ManageSubscriptionBottonSheet";

// const ManageSubscription = () => {
//   const router = useRouter();
//   const { currentOffering, customerInfo, isProMember } = useRevenueCat();

//   // Derive real data from customerInfo
//   const activeSubscription = customerInfo?.activeSubscriptions?.[0];
//   const isAnnual =
//     activeSubscription?.toLowerCase().includes("annual") ||
//     activeSubscription?.toLowerCase().includes("yearly");

//   const planName = isProMember
//     ? isAnnual
//       ? "Annual Plus"
//       : "Monthly Plus"
//     : "No Active Plan";

//   const price = isProMember
//     ? isAnnual
//       ? `${currentOffering?.annual?.product.priceString || "$143.99"}/yr`
//       : `${currentOffering?.monthly?.product.priceString || "$14.99"}/mo`
//     : "—";

//   const renewalDate = customerInfo?.latestExpirationDate
//     ? new Date(customerInfo.latestExpirationDate).toLocaleDateString("en-US", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       })
//     : "—";

//   // Pending cancellation = has entitlement but no active auto-renewing sub
//   const isPendingCancellation =
//     !!customerInfo?.entitlements.active.pro &&
//     (customerInfo?.activeSubscriptions?.length ?? 0) === 0;

//   const statusLabel = isPendingCancellation
//     ? "Cancelled"
//     : isProMember
//       ? "Active"
//       : "Inactive";

//   const statusColor = isPendingCancellation
//     ? { bg: "bg-red-500", text: "text-white" }
//     : isProMember
//       ? { bg: "bg-[#7C3AED]", text: "text-white" }
//       : { bg: "bg-gray-300", text: "text-gray-700" };

//   // bottom sheet
//   const snapPoints = useMemo(() => ["10%", "30%"], []);

//   const managebottomSheetRef = React.useRef<BottomSheet>(null);
//   const handleManageBottomSheetOpen = () =>
//     managebottomSheetRef.current?.expand();
//   const handleManageBottomSheetClose = () =>
//     managebottomSheetRef.current?.close();

//   return (
//     <Screen contentClassName="px-4 pb-10 flex-1 ">
//       {/* Header */}
//       <View className="flex-row items-center py-4">
//         <TouchableOpacity className="p-2" onPress={() => router.back()}>
//           <ChevronLeft color="#1A1C1E" size={24} />
//         </TouchableOpacity>
//         <Text className="flex-1 text-center text-xl font-bold text-slate-900 mr-8">
//           Manage Subscription
//         </Text>
//       </View>

//       {/* Subscription Card */}
//       <View className="mt-4 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//         {/* Purple Left Border Strip */}
//         <View className="flex-row">
//           {/* <View className="w-1 bg-[#7C3AED] rounded-r-full my-4" /> */}

//           <View className="flex-1 p-5">
//             <Text className="text-lg font-[PoppinsSemiBold] text-slate-900 mb-2">
//               Current Plan
//             </Text>

//             <Row label="Plan Name" value={planName} />
//             <Row label="Price" value={price} />
//             <Row label="Renewal date" value={renewalDate} isLast={false} />
//             <Row
//               label="Status"
//               value={statusLabel}
//               // Use gradient only when Active, fall back to solid badge for Cancelled/Inactive
//               isGradientBadge={isProMember && !isPendingCancellation}
//               isBadge={!isProMember || isPendingCancellation}
//               badgeColor={statusColor.bg}
//               badgeTextColor={statusColor.text}
//               isLast
//             />
//           </View>
//         </View>
//       </View>

//       {planName.includes("No Active Plan") ? null : (
//         <TouchableOpacity
//           className="mt-6 flex-row items-center justify-between gap-2 px-4 py-3 border border-slate-200 rounded-2xl"
//           onPress={() => {}}
//         >
//           <GradientText>Switch to {planName.toLowerCase()}</GradientText>
//           <View className=" flex-row items-center">
//             {planName.includes("Annual") ? null : (
//               <LinearGradient
//                 colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={{
//                   paddingHorizontal: 16,
//                   paddingVertical: 4,
//                   borderRadius: 999,
//                 }}
//               >
//                 <Text className="font-[PoppinsSemiBold] text-white text-sm">
//                   Save 20%
//                 </Text>
//               </LinearGradient>
//             )}
//             <View className="ml-2">
//               <ChevronRight color="#1A1C1E" size={24} />
//             </View>
//           </View>
//         </TouchableOpacity>
//       )}

//       {/* Spacer */}
//       <View className="flex-1" />

//       <View className="flex-row gap-4 pt-4 pb-10 w-full">
//         {/* Cancel Button */}
//         <TouchableOpacity
//           className="flex-1 border-2 border-red-500 rounded-2xl items-center justify-center"
//           style={{ height: 56 }}
//           onPress={handleManageBottomSheetOpen}
//         >
//           <Text className="text-red-500 font-bold text-base">Cancel</Text>
//         </TouchableOpacity>

//         {/* Change Plan Button */}
//         <Pressable
//           className="flex-1" // Ensures it takes up the exact same 50% width as the Cancel button
//           onPress={() => {
//             router.push("/homepage/manage-subscription/choose-your-plan");
//           }}
//         >
//           <LinearGradient
//             colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={{
//               height: 56, // Match the height exactly
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: 16,
//             }}
//           >
//             <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
//               Change Plan
//             </Text>
//           </LinearGradient>
//         </Pressable>
//       </View>

//       <BottomSheetScreen
//         snapPoints={snapPoints}
//         ref={managebottomSheetRef}
//         isBackdropComponent={true}
//         enablePanDownToClose={true}
//         index={-1}
//         message={
//           <ManageSubscriptionBottonSheet
//             handleManageBottomSheetClose={handleManageBottomSheetClose}
//           />
//         }
//       />
//     </Screen>
//   );
// };

// const Row = ({
//   label,
//   value,
//   isBadge = false,
//   isGradientBadge = false, // 👈 new prop
//   badgeColor = "bg-[#7C3AED]",
//   badgeTextColor = "text-white",
//   isLast = false,
// }: {
//   label: string;
//   value: string;
//   isBadge?: boolean;
//   isGradientBadge?: boolean; // 👈 new prop
//   badgeColor?: string;
//   badgeTextColor?: string;
//   isLast?: boolean;
// }) => (
//   <View
//     className={`flex-row justify-between items-center py-3 ${
//       !isLast ? "border-b border-slate-100" : ""
//     }`}
//   >
//     <Text className="text-slate-400 font-[PoppinsRegular] text-sm">
//       {label}
//     </Text>
//     {isGradientBadge ? (
//       // 👇 Gradient badge
//       <LinearGradient
//         colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={{
//           paddingHorizontal: 16,
//           paddingVertical: 4,
//           borderRadius: 999,
//         }}
//       >
//         <Text className="font-[PoppinsSemiBold] text-white text-sm">
//           {value}
//         </Text>
//       </LinearGradient>
//     ) : isBadge ? (
//       <View className={`${badgeColor} px-4 py-1 rounded-full`}>
//         <Text className={`${badgeTextColor} font-semibold text-sm`}>
//           {value}
//         </Text>
//       </View>
//     ) : (
//       <Text className="text-slate-900 font-semibold text-sm">{value}</Text>
//     )}
//   </View>
// );

// export default ManageSubscription;

import { useGetUser } from "@/src/api_services/userApi/userQuery";
import { GradientText } from "@/src/components/GradientText";
import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
import useRevenueCat from "@/src/hooks/useRevenueCat";
import useWebPaywall from "@/src/hooks/useWebPaywall";
import Screen from "@/src/layout/Screen";
import BottomSheet from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useMemo } from "react";
import { Linking, Pressable, Text, TouchableOpacity, View } from "react-native";
import ManageSubscriptionBottonSheet from "./ManageSubscriptionBottonSheet";

const ManageSubscription = () => {
  const router = useRouter();
  const getUserData = useGetUser();
  const userId = getUserData?.data?.id;
  const { customerInfo, fetchCustomerInfo, isProMember } =
    useRevenueCat(userId);
  const { openWebPaywall, isPurchasing } = useWebPaywall(fetchCustomerInfo);

  console.log("customerInfo400", customerInfo);

  const handlePaywallOpen = async () => {
    if (!userId) return;
    await openWebPaywall(userId);
  };

  // 1. Identify the active subscription details from customerInfo
  const activeSubDetails = useMemo(() => {
    // Get the product ID currently granting the "pro" entitlement
    const proEntitlement = customerInfo?.entitlements?.pro;
    const productId = proEntitlement?.product_identifier;

    console.log("proEntitlement", proEntitlement);
    console.log("productId", productId);

    // Map to the specific subscription details in the subscriptions dictionary
    return productId ? customerInfo?.subscriptions?.[productId] : null;
  }, [customerInfo]);

  console.log("activeSubDetails23", activeSubDetails);

  // 2. Derive Plan Name (e.g., "Menovia Web Monthly")
  const planName =
    activeSubDetails?.display_name ||
    (isProMember ? "Pro Plan" : "No Active Plan");

  // 3. Format Price (e.g., "$0.99/mo")
  const priceLabel = useMemo(() => {
    if (!activeSubDetails?.price) return "—";
    const { amount, currency } = activeSubDetails.price;

    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);

    const isAnnual = activeSubDetails.displayName
      ?.toLowerCase()
      .includes("annual");
    return `${formattedPrice}${isAnnual ? "/yr" : "/mo"}`;
  }, [activeSubDetails]);

  // 4. Format Renewal/Expiration Date
  const expirationDate =
    activeSubDetails?.expires_date || customerInfo?.latestExpirationDate;
  const formattedDate = expirationDate
    ? new Date(expirationDate).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  // 5. Determine Status & Cancellation
  // If unsubscribe_detected_at exists, they have turned off auto-renew
  const isCancelled = !!activeSubDetails?.unsubscribeDetectedAt;

  const statusLabel = isCancelled
    ? "Cancelled"
    : isProMember
      ? "Active"
      : "Inactive";

  const statusColor = isCancelled
    ? { bg: "bg-red-500", text: "text-white" }
    : isProMember
      ? { bg: "bg-[#7C3AED]", text: "text-white" }
      : { bg: "bg-gray-300", text: "text-gray-700" };

  // Bottom sheet logic
  const snapPoints = useMemo(() => ["10%", "30%"], []);
  const managebottomSheetRef = React.useRef<BottomSheet>(null);

  const handleManageBottomSheetOpen = () =>
    managebottomSheetRef.current?.expand();
  const handleManageBottomSheetClose = () =>
    managebottomSheetRef.current?.close();

  // Helper to open Management URL if available
  const handleExternalManagement = () => {
    if (activeSubDetails?.managementUrl) {
      Linking.openURL(activeSubDetails.managementUrl);
    }
  };

  return (
    <Screen contentClassName="px-4 pb-10 flex-1 ">
      {/* Header */}
      <View className="flex-row items-center py-4">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold text-slate-900 mr-8">
          Manage Subscription
        </Text>
      </View>

      {/* Subscription Card */}
      <View className="mt-4 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <View className="flex-row">
          <View className="flex-1 p-5">
            <Text className="text-lg font-[PoppinsSemiBold] text-slate-900 mb-2">
              Current Plan
            </Text>

            <Row label="Plan Name" value={planName} />
            <Row label="Price" value={priceLabel} />
            <Row label="Renewal date" value={formattedDate} isLast={false} />
            <Row
              label="Status"
              value={statusLabel}
              isGradientBadge={isProMember && !isCancelled}
              isBadge={!isProMember || isCancelled}
              badgeColor={statusColor.bg}
              badgeTextColor={statusColor.text}
              isLast
            />
          </View>
        </View>
      </View>

      {/* Switch Plan / Upsell Logic */}
      {!isProMember || planName.includes("No Active Plan") ? null : (
        <TouchableOpacity
          className="mt-6 flex-row items-center justify-between gap-2 px-4 py-3 border border-slate-200 rounded-2xl"
          // onPress={() =>
          //   router.push("/homepage/manage-subscription/choose-your-plan")
          // }
        >
          <GradientText>
            {planName.toLowerCase().includes("annual")
              ? "View other plans"
              : "Switch to annual"}
          </GradientText>
          <View className=" flex-row items-center">
            {!planName.toLowerCase().includes("annual") && (
              <LinearGradient
                colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  borderRadius: 999,
                }}
              >
                <Text className="font-[PoppinsSemiBold] text-white text-sm">
                  Save 20%
                </Text>
              </LinearGradient>
            )}
            <View className="ml-2">
              <ChevronRight color="#1A1C1E" size={24} />
            </View>
          </View>
        </TouchableOpacity>
      )}

      <View className="flex-1" />

      {/* Actions */}
      <View className="flex-row gap-4 pt-4 pb-10 w-full">
        {isProMember && !isCancelled && (
          <TouchableOpacity
            className="flex-1 border-2 border-red-500 rounded-2xl items-center justify-center"
            style={{ height: 56 }}
            onPress={handleManageBottomSheetOpen}
          >
            <Text className="text-red-500 font-bold text-base">Cancel</Text>
          </TouchableOpacity>
        )}

        <Pressable
          className="flex-1"
          // onPress={() =>
          //   router.push("/homepage/manage-subscription/choose-your-plan")
          // }
          onPress={handlePaywallOpen}
          disabled={isPurchasing}
        >
          <LinearGradient
            colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              height: 56,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
              {`Change Plan`}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>

      <BottomSheetScreen
        snapPoints={snapPoints}
        ref={managebottomSheetRef}
        isBackdropComponent={true}
        enablePanDownToClose={true}
        index={-1}
        message={
          <ManageSubscriptionBottonSheet
            handleManageBottomSheetClose={handleManageBottomSheetClose}
          />
        }
      />
    </Screen>
  );
};

interface RowProps {
  label: string;
  value: string;
  isBadge?: boolean;
  isGradientBadge?: boolean;
  badgeColor?: string;
  badgeTextColor?: string;
  isLast?: boolean;
}

const Row = ({
  label,
  value,
  isBadge = false,
  isGradientBadge = false,
  badgeColor = "bg-[#7C3AED]",
  badgeTextColor = "text-white",
  isLast = false,
}: RowProps) => (
  <View
    className={`flex-row justify-between items-center py-3 ${!isLast ? "border-b border-slate-100" : ""}`}
  >
    <Text className="text-slate-400 font-[PoppinsRegular] text-sm">
      {label}
    </Text>
    {isGradientBadge ? (
      <LinearGradient
        colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 16, paddingVertical: 4, borderRadius: 999 }}
      >
        <Text className="font-[PoppinsSemiBold] text-white text-sm">
          {value}
        </Text>
      </LinearGradient>
    ) : isBadge ? (
      <View className={`${badgeColor} px-4 py-1 rounded-full`}>
        <Text className={`${badgeTextColor} font-semibold text-sm`}>
          {value}
        </Text>
      </View>
    ) : (
      <Text className="text-slate-900 font-semibold text-sm">{value}</Text>
    )}
  </View>
);

export default ManageSubscription;
