// import React from "react";
// import { Text, View } from "react-native";

// const CancelSubscription = () => {
//   return (
//     <View>
//       <Text>CancelSubscription</Text>
//     </View>
//   );
// };

// export default CancelSubscription;

import { GradientText } from "@/src/components/GradientText";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const REASONS = [
  "Too expensive",
  "Didn't use it enough",
  "Didn't help my symptoms",
  "Technical issues",
  "Found another app",
  "Privacy concerns",
  "Other",
];

const CancelSubscription = () => {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState<string | null>(
    "Too expensive",
  );

  const handleSubmit = () => {
    if (!selectedReason) return;
    // Handle cancellation logic here
    // e.g. Linking.openURL("https://apps.apple.com/account/subscriptions");
  };

  return (
    <View className="flex-1 bg-[#F5F5F8]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          className="mt-12 mb-4 p-1 self-start"
          onPress={() => router.back()}
        >
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>

        {/* Title */}
        <GradientText className=" text-2xl font-[PoppinsSemiBold] text-center  mb-3">
          Cancel your Plus subscription?
        </GradientText>

        {/* Subtitle */}
        <Text className="text-slate-400 text-center font-[PoppinsRegular] text-lg leading-6 mb-6">
          {`Before you go, let us know what’s not working. Your feedback helps us improve your experience.`}
        </Text>

        {/* Question */}
        <Text className="text-slate-900 text-base font-[PoppinsMedium] mb-4">
          {`What's the main reason for canceling?`}
        </Text>

        {/* Reason Options */}
        <View className="gap-3">
          {REASONS.map((reason) => {
            const isSelected = selectedReason === reason;
            return (
              <TouchableOpacity
                key={reason}
                onPress={() => setSelectedReason(reason)}
                className="flex-row items-center px-4 rounded-2xl border"
                style={{
                  height: 56,
                  backgroundColor: isSelected ? "#F3EEFE" : "#FFFFFF",
                  borderColor: isSelected ? "#C4A1D1" : "#E5E7EB",
                }}
              >
                {/* Radio Button */}
                <View
                  className="items-center justify-center"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    borderWidth: 2,
                    borderColor: isSelected ? "#7C3AED" : "#D1D5DB",
                    backgroundColor: isSelected ? "#7C3AED" : "transparent",
                    marginRight: 12,
                  }}
                >
                  {isSelected && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "white",
                      }}
                    />
                  )}
                </View>

                <Text
                  style={{
                    color: isSelected ? "#7C3AED" : "#374151",
                    fontWeight: isSelected ? "600" : "400",
                    fontSize: 15,
                  }}
                >
                  {reason}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Buttons — fixed above keyboard */}
      <View className="absolute bottom-0 left-0 right-0 flex-row gap-4 px-5 pb-20 pt-4 bg-[#F5F5F8]">
        {/* Submit — outlined red */}
        <TouchableOpacity
          className="flex-1 border-2 border-red-500 rounded-2xl items-center justify-center"
          style={{ height: 56 }}
          onPress={handleSubmit}
        >
          <Text className="text-red-500 font-bold text-base">Submit</Text>
        </TouchableOpacity>

        {/* Keep my plan — gradient */}
        <Pressable
          className="flex-1 rounded-2xl overflow-hidden"
          style={{ height: 56 }}
          onPress={() => router.back()}
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
              Keep my plan
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

export default CancelSubscription;
