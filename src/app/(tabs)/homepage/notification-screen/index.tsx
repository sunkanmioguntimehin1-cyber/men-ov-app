import { useUpdateNotificationDetails } from "@/src/api_services/notificationApi/notificationMutation";
import { useGetNotificationsApi } from "@/src/api_services/notificationApi/notificationQuery";
import SafeScreen from "@/src/components/SafeScreen";
import {
  GradientIoniconsIcon,
  GradientMaterialCommunityIcons,
} from "@/src/custom-components/GradientIcon";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NOTIFICATION_ROUTES: Record<
  string,
  { route: string; params?: (actionData: any) => object } | null
> = {
  chat_with_ziena: {
    route: "/(tabs)/homepage/chat-with-ai",
    params: (actionData) => ({
      ...(actionData?.chat_message && {
        initialMessage: actionData.chat_message,
      }),
    }),
  },
  read_article: {
    route: "/(tabs)/homepage/articles-webview",
  },
  log_symptom: {
    route: "/(tabs)/homepage",
  },
  complete_profile: {
    route: "/(tabs)/homepage/profilepage/profile-screen",
    params: () => ({ openIntake: true }),
  },
};

const NotificationScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const getNotificationsDetails = useGetNotificationsApi();
  const updateNotificationData = useUpdateNotificationDetails();

  // console.log("getNotificationsDetails", getNotificationsDetails?.data?.data);

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
    // return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    return (
      <GradientMaterialCommunityIcons
        name={iconName}
        size={size}
        gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
      />
    );
  };

  const handleUnread = (notificationId: string) => {
    updateNotificationData.mutate(notificationId);
  };

  const handleNotificationPress = (notification: any) => {
    handleUnread(notification.id);
    const { action_data } = notification;
    const config = NOTIFICATION_ROUTES[action_data?.action_type];

    if (config) {
      const params = config.params?.(action_data) || {};
      router.push(config.route as any, params);
    }
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
              "/(tabs)/homepage/notification-screen/notification-settings",
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
            <ActivityIndicator size="large" color="#9F3E83" />
          </View>
        ) : getNotificationsDetails?.data?.data.length === 0 ? (
          <View className="flex-1 items-center justify-center py-10">
            {/* <Ionicons
              name="notifications-off-outline"
              size={48}
              color="#9CA3AF"
            /> */}
            <GradientIoniconsIcon
              name="notifications-off-outline"
              size={20}
              gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
            />
            <Text className="text-gray-400 font-[Poppins] mt-4">
              No notifications yet
            </Text>
          </View>
        ) : (
          getNotificationsDetails?.data?.data.map((notification: any) => {
            const iconConfig = getCategoryIcon(notification.notification_type);

            return (
              <TouchableOpacity
                key={notification.id}
                className="flex-row px-5 py-4 border-b border-gray-100"
                activeOpacity={0.7}
                onPress={() => handleNotificationPress(notification)}
              >
                {/* Icon Container */}
                <View
                  // style={{ backgroundColor: "#6E3F8C" }}
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                >
                  {renderIcon(iconConfig.set, iconConfig.name, 24)}
                </View>

                {/* Content */}
                <View className="flex-1">
                  {/* <View className="flex-row items-start justify-between mb-1">
                    <Text className="flex-1 text-sm font-[PoppinsMedium] text-gray-900 mr-2">
                      {notification.notification_text}
                    </Text>
                    {!notification.is_read && (
                      <View className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                    )}
                  </View> */}

                  <Text className="text-sm font-[Poppins] text-gray-500 mb-2">
                    {notification.chat_message ||
                      notification.notification_text}
                  </Text>

                  <Text className="text-xs font-[Poppins] text-gray-400">
                    {getTimeAgo(notification.created_at)}
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
