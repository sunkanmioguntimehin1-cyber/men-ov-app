import { GradientText } from "@/src/components/GradientText";
import Screen from "@/src/layout/Screen";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
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
  // const {
  //   currentOffering,
  //   customerInfo,
  //   isProMember,
  //   isCancelled,
  //   isPendingCancellation,
  // } = useRevenueCat();

  const [selectedReason, setSelectedReason] = useState<string | null>(
    "Too expensive",
  );

  const handleSubmit = () => {
    if (!selectedReason) return;
    // Handle cancellation logic here
    router.push(
      "/homepage/manage-subscription/cancel-subscription/cancellation-page",
    );
    // e.g. Linking.openURL("https://apps.apple.com/account/subscriptions");
  };

  return (
    <Screen className="flex-1 bg-[#F5F5F8]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          className=" mb-4 p-1 self-start"
          onPress={() => router.back()}
        >
          <ChevronLeft color="#1A1C1E" size={24} />
        </TouchableOpacity>

        {/* Title */}
        <GradientText className=" text-2xl font-[PoppinsSemiBold] text-center  mb-3">
          Cancel your Plus subscription?
        </GradientText>

        {/* Subtitle */}
        <Text className="text-slate-400 text-center font-[PoppinsRegular] text-lg  mb-4">
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
                className="flex-row items-center px-4 rounded-2xl "
                style={{
                  height: 48,
                  backgroundColor: isSelected ? "#f3e8ff" : "#FFFFFF",
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: "#e5e7eb",
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
                    borderColor: isSelected ? "#8b4c8c" : "#D1D5DB",
                    backgroundColor: isSelected ? "#8b4c8c" : "transparent",
                    marginRight: 12,
                  }}
                >
                  {isSelected && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        // backgroundColor: "white",
                      }}
                    />
                  )}
                </View>

                {isSelected ? (
                  <GradientText className="font-[PoppinsRegular] text-base">
                    {reason}
                  </GradientText>
                ) : (
                  <Text
                    className="font-[PoppinsRegular] text-base"
                    style={{
                      color: "#9ca3af",
                    }}
                  >
                    {reason}
                  </Text>
                )}
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
    </Screen>
  );
};

export default CancelSubscription;
