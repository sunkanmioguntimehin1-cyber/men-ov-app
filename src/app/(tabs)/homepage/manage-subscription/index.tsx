// import Screen from "@/src/layout/Screen";
// import React from "react";
// import { Text } from "react-native";

// const ManageSubscription = () => {
//   return (
//     <Screen>
//       <Text>Manage Subscription</Text>
//     </Screen>
//   );
// };
// export default ManageSubscription;

import Screen from "@/src/layout/Screen";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native"; // Or your preferred icon library
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ManageSubscription = () => {
  const router = useRouter();
  return (
    <Screen contentClassName="px-4 pb-6 flex-1">
      {/* Header */}
      <View className="flex-row items-center py-4">
        <TouchableOpacity
          className="p-2"
          onPress={() => {
            router.back();
          }}
        >
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold text-slate-900 mr-8">
          Manage Subscription
        </Text>
      </View>

      {/* Subscription Card */}
      <View className="mt-6 bg-white rounded-2xl p-5 shadow-sm border border-slate-50 relative overflow-hidden">
        {/* Purple Indicator Strip */}
        <View className="absolute left-0 top-6 bottom-6 w-1 bg-purple-700 rounded-r-full" />

        <Text className="text-lg font-bold text-slate-900 mb-4 ml-2">
          Current Plan
        </Text>

        <View className="space-y-4 ml-2">
          <Row label="Plan Name" value="Monthly Plus" />
          <Row label="Price" value="$14.99/mo" />
          <Row label="Renewal date" value="10 Mar, 2026" />
          <Row label="Status" value="Active" isBadge />
        </View>
      </View>

      {/* Spacer to push buttons to bottom */}
      <View className="flex-1" />

      {/* Action Buttons */}
      <View className="flex-row space-x-4 pt-4">
        <TouchableOpacity className="flex-1 border border-red-500 py-4 rounded-2xl items-center">
          <Text className="text-red-600 font-bold text-lg">Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-purple-700 py-4 rounded-2xl items-center"
          style={{ backgroundColor: "#7C3AED" }} // Custom purple to match your gradient/brand
        >
          <Text className="text-white font-bold text-lg">Change Plan</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

/* Helper Component for Card Rows */
const Row = ({
  label,
  value,
  isBadge = false,
}: {
  label: string;
  value: string;
  isBadge?: boolean;
}) => (
  <View className="flex-row justify-between items-center py-3 border-b border-slate-100">
    <Text className="text-slate-400 text-base">{label}</Text>
    {isBadge ? (
      <View className="bg-purple-700 px-4 py-1 rounded-full">
        <Text className="text-white font-medium text-sm">{value}</Text>
      </View>
    ) : (
      <Text className="text-slate-900 font-semibold text-base">{value}</Text>
    )}
  </View>
);

export default ManageSubscription;
