// import {
//   FontAwesome6,
//   Ionicons,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
// import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
// import { Tabs } from "expo-router";
// import { Platform } from "react-native";

// // Function to determine if tab bar should be hidden
// function getTabBarVisibility(route: any) {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? "index";

//   // Hide tab bar for these specific routes
//   const hiddenRoutes = [
//     "personal-info",
//     "personal-info-form",
//     "notifications",
//     "profile-screen",
//     "summary-screen",
//     "chat-with-ai",
//     "chat-webview-ai",
//     "recommendations-webview",
//     "searchpage",
//     "view-search-result",
//     "explore-webview",
//     "create-post",
//     "comments",
//     "contact-us",
//     "notification-screen",
//     "profilepage",
//   ];

//   // Check if the current route or any part of it matches hidden routes
//   const shouldHide = hiddenRoutes.some(
//     (hiddenRoute) =>
//       routeName.includes(hiddenRoute) ||
//       route?.params?.screen?.includes(hiddenRoute),
//   );

//   return shouldHide;
// }

// export default function TabsLayout() {
//   return (
//     <Tabs
//       initialRouteName="homepage"
//       screenOptions={{
//         tabBarActiveTintColor: "#712A87",
//         tabBarInactiveTintColor: "#E4D9F7",
//         headerShown: false,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: "absolute",
//           },
//           default: {},
//         }),
//       }}
//       backBehavior="history"
//     >
//       <Tabs.Screen
//         name="homepage"
//         options={({ route }) => ({
//           title: "Home",
//           tabBarIcon: ({ color, focused }) => (
//             <Ionicons
//               name={focused ? "home" : "home-outline"}
//               size={24}
//               color={focused ? "#712A87" : "#E4D9F7"}
//             />
//           ),
//           tabBarStyle: getTabBarVisibility(route)
//             ? { display: "none" }
//             : Platform.select({
//                 ios: {
//                   position: "absolute",
//                 },
//                 default: {},
//               }),
//         })}
//       />
//       <Tabs.Screen
//         name="explorepage"
//         options={({ route }) => ({
//           title: "Learn",
//           tabBarIcon: ({ color, focused }) => (
//             <Ionicons
//               name={focused ? "school-outline" : "school-outline"}
//               size={24}
//               color={focused ? "#712A87" : "#E4D9F7"}
//             />
//           ),
//           tabBarStyle: getTabBarVisibility(route)
//             ? { display: "none" }
//             : Platform.select({
//                 ios: {
//                   position: "absolute",
//                 },
//                 default: {},
//               }),
//         })}
//       />
//       <Tabs.Screen
//         name="communitypage"
//         options={({ route }) => ({
//           title: "Community",
//           tabBarIcon: ({ color, focused }) => (
//             // <Ionicons
//             //   name={focused ? "chatbubble-outline" : "chatbubble-outline"}
//             //   size={24}
//             //   color={focused ? "#712A87" : "#E4D9F7"}
//             // />
//             <FontAwesome6
//               name={focused ? "users" : "users"}
//               size={20}
//               color={focused ? "#712A87" : "#E4D9F7"}
//             />
//           ),
//           tabBarStyle: getTabBarVisibility(route)
//             ? { display: "none" }
//             : Platform.select({
//                 ios: {
//                   position: "absolute",
//                 },
//                 default: {},
//               }),
//         })}
//       />
//       <Tabs.Screen
//         name="summarypage"
//         options={({ route }) => ({
//           title: "Insights",
//           tabBarIcon: ({ color, focused }) => (
//             <MaterialCommunityIcons
//               name={focused ? "lightbulb-on-outline" : "lightbulb-on-outline"}
//               size={24}
//               color={focused ? "#712A87" : "#E4D9F7"}
//             />
//           ),
//           // Use the same tab bar visibility logic as homepage
//           tabBarStyle: getTabBarVisibility(route)
//             ? { display: "none" }
//             : Platform.select({
//                 ios: {
//                   position: "absolute",
//                 },
//                 default: {},
//               }),
//         })}
//       />
//     </Tabs>
//   );
// }

import FloatingAiButton from "@/src/components/tabs/FloatingAiButton";
import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Function to determine if tab bar should be hidden
function getTabBarVisibility(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "index";

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

  const shouldHide = hiddenRoutes.some(
    (hiddenRoute) =>
      routeName.includes(hiddenRoute) ||
      route?.params?.screen?.includes(hiddenRoute),
  );

  return shouldHide;
}

// Determine if the FAB should be hidden on a given route
function getFabVisibility(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "index";

  // Hide FAB on these routes (same as tab bar, plus chat itself)
  const hiddenRoutes = [
    "chat-with-ai",
    "chat-webview-ai",
    "create-post",
    "comments",
    "contact-us",
    "notification-screen",
    "profilepage",
    "profile-screen",
    "personal-info",
    "personal-info-form",
    "searchpage",
    "view-search-result",
    "explore-webview",
    "recommendations-webview",
    "summary-screen",
    "notifications",
  ];

  return hiddenRoutes.some(
    (hiddenRoute) =>
      routeName.includes(hiddenRoute) ||
      route?.params?.screen?.includes(hiddenRoute),
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="homepage"
        screenOptions={{
          tabBarActiveTintColor: "#712A87",
          tabBarInactiveTintColor: "#E4D9F7",
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
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
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#712A87" : "#E4D9F7"}
              />
            ),
            tabBarStyle: getTabBarVisibility(route)
              ? { display: "none" }
              : Platform.select({
                  ios: { position: "absolute" },
                  default: {},
                }),
          })}
        />
        <Tabs.Screen
          name="explorepage"
          options={({ route }) => ({
            title: "Learn",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="school-outline"
                size={24}
                color={focused ? "#712A87" : "#E4D9F7"}
              />
            ),
            tabBarStyle: getTabBarVisibility(route)
              ? { display: "none" }
              : Platform.select({
                  ios: { position: "absolute" },
                  default: {},
                }),
          })}
        />
        <Tabs.Screen
          name="communitypage"
          options={({ route }) => ({
            title: "Community",
            tabBarIcon: ({ focused }) => (
              <FontAwesome6
                name="users"
                size={20}
                color={focused ? "#712A87" : "#E4D9F7"}
              />
            ),
            tabBarStyle: getTabBarVisibility(route)
              ? { display: "none" }
              : Platform.select({
                  ios: { position: "absolute" },
                  default: {},
                }),
          })}
        />
        <Tabs.Screen
          name="summarypage"
          options={({ route }) => ({
            title: "Insights",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="lightbulb-on-outline"
                size={24}
                color={focused ? "#712A87" : "#E4D9F7"}
              />
            ),
            tabBarStyle: getTabBarVisibility(route)
              ? { display: "none" }
              : Platform.select({
                  ios: { position: "absolute" },
                  default: {},
                }),
          })}
        />
      </Tabs>

      {/* Global Floating AI Button — sits above the tab bar on all tabs */}
      <FloatingAiButtonWrapper insets={insets} />
    </View>
  );
}

// Wrapper that always renders the FAB at a fixed position over the tab bar
function FloatingAiButtonWrapper({ insets }: { insets: any }) {
  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        bottom: Platform.OS === "ios" ? insets.bottom + 60 : 70,
        right: 24,
        zIndex: 999,
      }}
    >
      <FloatingAiButton />
    </View>
  );
}
