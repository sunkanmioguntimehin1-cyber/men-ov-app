//

import { useUpdateNotificationDetails } from "@/src/api_services/notificationApi/notificationMutation";
import { useGetNotificationsApi } from "@/src/api_services/notificationApi/notificationQuery";
import SafeScreen from "@/src/components/SafeScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NotificationScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const getNotificationsDetails = useGetNotificationsApi();
  const updateNotificationData = useUpdateNotificationDetails();

  console.log("getNotificationsDetails", getNotificationsDetails?.data?.data);

  // Function to get icon based on category
  const getCategoryIcon = (category: any) => {
    const icons = {
      general: { set: "Ionicons", name: "notifications-outline" },
      ai: { set: "Ionicons", name: "happy-outline" },
      health: { set: "MaterialCommunityIcons", name: "chart-line-variant" },
      cycle_tracker: { set: "Ionicons", name: "chatbubbles-outline" },
      symptom_tracker: { set: "Ionicons", name: "medical-outline" },
      community: { set: "Ionicons", name: "alarm-outline" },
    };
    return icons[category] || icons.general;
  };

  // Function to calculate time ago
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  // Fetch notifications

  const renderIcon = (iconSet, iconName, size, color) => {
    if (iconSet === "Ionicons") {
      return <Ionicons name={iconName} size={size} color={color} />;
    }
    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
  };

  const handleUnread = (notificationId: string) => {
    updateNotificationData.mutate(notificationId);
  };

  return (
    <SafeScreen className="bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => {
            if (navigation?.canGoBack?.()) {
              navigation.goBack();
            } else {
              router.replace("/(tabs)/homepage");
            }
          }}
          className="p-1"
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-lg font-[PoppinsSemiBold] text-black">
          Notification
        </Text>

        <TouchableOpacity
          className="p-1"
          onPress={() =>
            router.push(
              "/(tabs)/homepage/notification-screen/notification-settings"
            )
          }
        >
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView className="flex-1">
        {getNotificationsDetails.isLoading ? (
          <View className="flex-1 items-center justify-center py-10">
            <ActivityIndicator size="large" color="#8B5CF6" />
          </View>
        ) : getNotificationsDetails?.data?.data.length === 0 ? (
          <View className="flex-1 items-center justify-center py-10">
            <Ionicons
              name="notifications-off-outline"
              size={48}
              color="#9CA3AF"
            />
            <Text className="text-gray-400 font-[Poppins] mt-4">
              No notifications yet
            </Text>
          </View>
        ) : (
          getNotificationsDetails?.data?.data.map((notification: any) => {
            const iconConfig = getCategoryIcon(notification.category);

            return (
              <TouchableOpacity
                key={notification._id}
                className="flex-row px-5 py-4 border-b border-gray-100"
                activeOpacity={0.7}
                onPress={() => {
                  // TODO: Handle notification click and mark as read
                  handleUnread(notification._id);
                }}
              >
                {/* Icon Container */}
                <View
                  style={{ backgroundColor: "#F3E8FF" }}
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                >
                  {renderIcon(iconConfig.set, iconConfig.name, 24, "#8B5CF6")}
                </View>

                {/* Content */}
                <View className="flex-1">
                  <View className="flex-row items-start justify-between mb-1">
                    <Text className="flex-1 text-sm font-[PoppinsMedium] text-gray-900 mr-2">
                      {notification.title}
                    </Text>
                    {!notification.isRead && (
                      <View className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                    )}
                  </View>

                  <Text className="text-sm font-[Poppins] text-gray-500 mb-2">
                    {notification.message}
                  </Text>

                  <Text className="text-xs font-[Poppins] text-gray-400">
                    {getTimeAgo(notification.createdAt)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeScreen>
  );
};

export default NotificationScreen;
