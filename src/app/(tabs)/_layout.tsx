import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

// Function to determine if tab bar should be hidden
function getTabBarVisibility(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "index";

  // Hide tab bar for these specific routes
  const hiddenRoutes = [
    "personal-info",
    "personal-info-form",
    "notifications",
    "profile-screen",
    "summary-screen",
    "chat-with-ai",
    "chat-webview-ai",
    "recommendations-webview",
    "searchpage",
    "view-search-result",
    "explore-webview",
    "create-post",
    "comments",
    "contact-us",
    "notification-screen",
    "profilepage",
  ];

  // Check if the current route or any part of it matches hidden routes
  const shouldHide = hiddenRoutes.some(
    (hiddenRoute) =>
      routeName.includes(hiddenRoute) ||
      route?.params?.screen?.includes(hiddenRoute)
  );

  return shouldHide;
}

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="homepage"
      screenOptions={{
        tabBarActiveTintColor: "#8A3FFC",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="homepage"
        options={({ route }) => ({
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "#712A87" : "#E4D9F7"}
            />
          ),
          tabBarStyle: getTabBarVisibility(route)
            ? { display: "none" }
            : Platform.select({
                ios: {
                  position: "absolute",
                },
                default: {},
              }),
        })}
      />
      <Tabs.Screen
        name="explorepage"
        options={({ route }) => ({
          title: "Learn",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "school-outline" : "school-outline"}
              size={24}
              color={focused ? "#712A87" : "#E4D9F7"}
            />
          ),
          tabBarStyle: getTabBarVisibility(route)
            ? { display: "none" }
            : Platform.select({
                ios: {
                  position: "absolute",
                },
                default: {},
              }),
        })}
      />
      <Tabs.Screen
        name="communitypage"
        options={({ route }) => ({
          title: "connect",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubble-outline" : "chatbubble-outline"}
              size={24}
              color={focused ? "#712A87" : "#E4D9F7"}
            />
          ),
          tabBarStyle: getTabBarVisibility(route)
            ? { display: "none" }
            : Platform.select({
                ios: {
                  position: "absolute",
                },
                default: {},
              }),
        })}
      />
      <Tabs.Screen
        name="summarypage"
        options={({ route }) => ({
          title: "Insights",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "lightbulb-on-outline" : "lightbulb-on-outline"}
              size={24}
              color={focused ? "#712A87" : "#E4D9F7"}
            />
          ),
          // Use the same tab bar visibility logic as homepage
          tabBarStyle: getTabBarVisibility(route)
            ? { display: "none" }
            : Platform.select({
                ios: {
                  position: "absolute",
                },
                default: {},
              }),
        })}
      />
    </Tabs>
  );
}
