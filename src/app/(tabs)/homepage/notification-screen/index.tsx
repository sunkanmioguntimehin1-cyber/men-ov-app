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
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NOTIFICATION_ROUTES: Record<
  string,
  { route: string; params?: (actionData: any) => object } | null
> = {
  chat: {
    route: "/(tabs)/homepage/chat-with-ai",
    params: (actionData) => ({
      ...(actionData?.chat_message && {
        initialMessage: actionData.chat_message,
      }),
    }),
  },
  learn: {
    route: "/(tabs)/explorepage",
    params: (actionData) => ({
      ...(actionData?.article_url && { articleUrl: actionData.article_url }),
    }),
  },
  insights: {
    route: "/(tabs)/summarypage",
  },
  cycleTracking: {
    route: "/(tabs)/homepage?openCycleTrackingPopup=true",
  },
  homepage: {
    route: "/(tabs)/homepage",
  },
  log: {
    route: "/(tabs)/homepage?openLogPopup=true",
  },
  community: {
    route: "/(tabs)/communitypage",
  },
  profile: {
    route: "/(tabs)/profilepage/profile-screen",
  },
  updateIntakeInfo: {
    route: "/(tabs)/homepage/profilepage/profile-screen/intake-info",
  },
  createintakes: {
    route: "/(tabs)/homepage/personal-info",
  },
  subscription: {
    route: "/(tabs)/profilepage",
  },
  viewPost: {
    route: "/(tabs)/communitypage/view-post",
  },
  communityComments: {
    route: "/(tabs)/communitypage/comments",
  },
  editPost: {
    route: "/(tabs)/communitypage/edit-post",
  },
};

const NotificationScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const getNotificationsDetails = useGetNotificationsApi();
  const updateNotificationData = useUpdateNotificationDetails();

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
    const config = NOTIFICATION_ROUTES[action_data?.screen];

    if (config) {
      router.push(config.route as any);
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
      <FlatList
        data={
          getNotificationsDetails.data?.pages.flatMap(
            (page: any) => page.data,
          ) || []
        }
        keyExtractor={(item: any) => item.id}
        renderItem={({ item: notification }) => {
          const iconConfig = getCategoryIcon(notification.notification_type);
          return (
            <TouchableOpacity
              className="flex-row px-5 py-4 border-b border-gray-100"
              activeOpacity={0.7}
              onPress={() => handleNotificationPress(notification)}
            >
              {/* Icon Container */}
              <View className="relative w-10 h-10 rounded-full items-center justify-center mr-3">
                {renderIcon(iconConfig.set, iconConfig.name, 24)}
                {!notification.is_read && (
                  <View className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
                )}
              </View>

              {/* Content */}
              <View className="flex-1">
                <Text className="text-sm font-[Poppins] text-gray-500 mb-2">
                  {notification.chat_message || notification.notification_text}
                </Text>

                <Text className="text-xs font-[Poppins] text-gray-400">
                  {getTimeAgo(notification.created_at)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          getNotificationsDetails.isLoading ? (
            <View className="flex-1 items-center justify-center py-10">
              <ActivityIndicator size="large" color="#9F3E83" />
            </View>
          ) : (
            <View className="flex-1 items-center justify-center py-10">
              <GradientIoniconsIcon
                name="notifications-off-outline"
                size={20}
                gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
              />
              <Text className="text-gray-400 font-[Poppins] mt-4">
                No notifications yet
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          getNotificationsDetails.hasNextPage ? (
            <TouchableOpacity
              className="py-4 items-center"
              onPress={() => getNotificationsDetails.fetchNextPage()}
              disabled={getNotificationsDetails.isFetchingNextPage}
            >
              {getNotificationsDetails.isFetchingNextPage ? (
                <ActivityIndicator size="small" color="#9F3E83" />
              ) : (
                <Text className="text-[#9F3E83] font-[PoppinsMedium]">
                  Load More
                </Text>
              )}
            </TouchableOpacity>
          ) : null
        }
      />
    </SafeScreen>
  );
};

export default NotificationScreen;
