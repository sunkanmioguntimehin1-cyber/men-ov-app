import { useUpdateNotificationSettings } from "@/src/api_services/userApi/userMutation";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import { RadioButton } from "@/src/components/profile/notifications/RadioButton";
import { ToggleSwitch } from "@/src/components/profile/notifications/ToggleSwitch";
import SafeScreen from "@/src/components/SafeScreen";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const NotificationsScreen = () => {
  const router = useRouter();
  const getUserData = useGetUser();
  const notificationSettingsUpdate = useUpdateNotificationSettings();
  // State for toggle switches
  const [allowNotifications, setAllowNotifications] = useState(false);
  const [healthReminders, setHealthReminders] = useState(false);
  const [symptomTrackerReminders, setSymptomTrackerReminders] = useState(false);
  const [cycleTrackingAlerts, setCycleTrackingAlerts] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(false);
  const [communityEngagement, setCommunityEngagement] = useState(false);

  // State for frequency preferences
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const frequencyOptions = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  React.useEffect(() => {
    if (getUserData?.data?.notificationSettings) {
      const settings = getUserData.data?.notificationSettings;
      setAllowNotifications(settings.isAll);
      setHealthReminders(settings.isHealth);
      setSymptomTrackerReminders(settings.isSymptomTracker);
      setCycleTrackingAlerts(settings.isCycleTracker);
      setAiSuggestions(settings.isAi);
      setCommunityEngagement(settings.isCommunity);
      setSelectedFrequency(settings.frequency);
    }
  }, [getUserData?.data]);

const handleToggle = (
  setter: React.Dispatch<React.SetStateAction<boolean>>,
  key: string
) => {
  setter((prev) => {
    const newValue = !prev;
    notificationSettingsUpdate.mutate({
      isAll: key === "isAll" ? newValue : allowNotifications,
      isHealth: key === "isHealth" ? newValue : healthReminders,
      isSymptomTracker:
        key === "isSymptomTracker" ? newValue : symptomTrackerReminders,
      isCycleTracker: key === "isCycleTracker" ? newValue : cycleTrackingAlerts,
      isAi: key === "isAi" ? newValue : aiSuggestions,
      isCommunity: key === "isCommunity" ? newValue : communityEngagement,
      frequency: selectedFrequency,
    });
    return newValue;
  });
};


  return (
    <SafeScreen className="bg-white">
      <LoadingOverlay
        isOpen={getUserData.isPending} // Required: Controls visibility
        // message="Login..." // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-lg font-[PoppinsSemiBold] text-black">
            Notifications
          </Text>

          <View />
        </View>

        <View className="px-6 pb-8">
          {/* Allow Notifications Section */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between py-4">
              <Text className="text-base font-[PoppinsMedium] text-black">
                Allow Notifications
              </Text>
              <ToggleSwitch
                isOn={allowNotifications}
                onToggle={() => handleToggle(setAllowNotifications, "isAll")}
              />
            </View>
          </View>

          {/* Notifications Type Section */}
          <View className="mb-8">
            <Text className="text-lg font-[PoppinsSemiBold] text-black mb-4">
              Notifications type
            </Text>

            <View className="space-y-4">
              <View className="flex-row items-center justify-between py-2">
                <Text className="text-base font-[PoppinsMedium] text-black">
                  Health reminders
                </Text>
                <ToggleSwitch
                  isOn={healthReminders}
                  // onToggle={() => setHealthReminders(!healthReminders)}
                  onToggle={() => handleToggle(setHealthReminders, "isHealth")}
                />
              </View>

              <View className="flex-row items-center justify-between py-2">
                <Text className="text-base font-[PoppinsMedium] text-black">
                  Symptom tracker reminders
                </Text>
                <ToggleSwitch
                  isOn={symptomTrackerReminders}
                  onToggle={() =>
                    handleToggle(setSymptomTrackerReminders, "isSymptomTracker")
                  }
                />
              </View>

              <View className="flex-row items-center justify-between py-2">
                <Text className="text-base font-[PoppinsMedium] text-black">
                  Cycle tracking alerts
                </Text>
                <ToggleSwitch
                  isOn={cycleTrackingAlerts}
                  onToggle={() =>
                    handleToggle(setCycleTrackingAlerts, "isCycleTracker")
                  }
                />
              </View>

              <View className="flex-row items-center justify-between py-2">
                <Text className="text-base font-[PoppinsMedium] text-black">
                  AI suggestions
                </Text>
                <ToggleSwitch
                  isOn={aiSuggestions}
                  onToggle={() => handleToggle(setAiSuggestions, "isAi")}
                />
              </View>

              <View className="flex-row items-center justify-between py-2">
                <Text className="text-base font-[PoppinsMedium] text-black">
                  Community engagement
                </Text>
                <ToggleSwitch
                  isOn={communityEngagement}
                  onToggle={() =>
                    handleToggle(setCommunityEngagement, "isCommunity")
                  }
                />
              </View>
            </View>
          </View>

          {/* Frequency Preferences Section */}
          <View className="mb-8">
            <Text className="text-lg font-[PoppinsSemiBold] text-black mb-4">
              Frequency preferences
            </Text>

            <View className="space-y-4 flex-row flex-wrap justify-between">
              {frequencyOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  className="flex-row items-center space-x-2"
                >
                  <RadioButton
                    isSelected={selectedFrequency === opt.value}
                    // onSelect={() => setSelectedFrequency(opt.value)}
                    onSelect={() =>
                      handleToggle(setSelectedFrequency, opt.value)
                    }
                  />
                  <Text className="text-base mx-2 font-[PoppinsMedium] text-black">
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default NotificationsScreen;
