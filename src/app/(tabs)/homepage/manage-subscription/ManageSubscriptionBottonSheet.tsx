// import { LinearGradient } from "expo-linear-gradient";
// import React from "react";
// import { Pressable, Text, TouchableOpacity, View } from "react-native";

// const ManageSubscriptionBottonSheet = ({
//   handleManageBottomSheetClose,
// }: any) => {
//   return (
//     <View>
//       <Text>ManageSubscriptionBottonSheet</Text>

//       <View className="flex-row gap-4 pt-4 w-full">
//         {/* Cancel Button */}
//         <TouchableOpacity
//           className="flex-1 border-2 border-red-500 rounded-2xl items-center justify-center"
//           style={{ height: 56 }}
//           onPress={() => {}}
//         >
//           <Text className="text-red-500 font-bold text-base">Cancel</Text>
//         </TouchableOpacity>

//         {/* Change Plan Button */}
//         <Pressable
//           className="flex-1" // Ensures it takes up the exact same 50% width as the Cancel button
//           onPress={() => {
//             /* router.push("/paywall") */
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
//             <Text className="text-white font-bold text-base">Change Plan</Text>
//           </LinearGradient>
//         </Pressable>
//       </View>
//     </View>
//   );
// };
// export default ManageSubscriptionBottonSheet;

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

const ManageSubscriptionBottomSheet = ({
  handleManageBottomSheetClose,
}: {
  handleManageBottomSheetClose: () => void;
}) => {
  const router = useRouter();

  const onConfirmCancel = () => {
    console.log("Subscription cancelled");
    handleManageBottomSheetClose();
    router.push("/(tabs)/homepage/manage-subscription/cancel-subscription"); // Close the bottom sheet after confirming cancellation
  };
  return (
    <View className="px-6 pt-4 pb-8">
      {/* Title */}
      <Text className="text-center text-xl font-bold text-slate-900 mb-3">
        Cancel Subscription
      </Text>

      {/* Subtitle */}
      <Text className="text-center text-base text-slate-400 mb-6 leading-6">
        Are you sure you want to cancel your subscription?
      </Text>

      {/* Buttons */}
      <View className="flex-row gap-4">
        {/* Yes, cancel — outlined red */}
        <TouchableOpacity
          className="flex-1 border-2 border-red-500 rounded-2xl items-center justify-center"
          style={{ height: 56 }}
          onPress={onConfirmCancel}
        >
          <Text className="text-red-500 font-bold text-base">Yes, cancel</Text>
        </TouchableOpacity>

        {/* No, keep my plan — gradient */}
        <Pressable
          className="flex-1 rounded-2xl overflow-hidden"
          style={{ height: 56 }}
          onPress={handleManageBottomSheetClose}
        >
          <LinearGradient
            colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700", fontSize: 15 }}>
              No, keep my plan
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

export default ManageSubscriptionBottomSheet;
