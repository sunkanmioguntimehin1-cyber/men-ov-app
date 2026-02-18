// import FloatingAiButton from "@/src/components/tabs/FloatingAiButton";
// import {
//   FontAwesome6,
//   Ionicons,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
// import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
// import { Tabs } from "expo-router";
// import { Platform, View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// // Function to determine if tab bar should be hidden
// function getTabBarVisibility(route: any) {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? "index";

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

//   const shouldHide = hiddenRoutes.some(
//     (hiddenRoute) =>
//       routeName.includes(hiddenRoute) ||
//       route?.params?.screen?.includes(hiddenRoute),
//   );

//   return shouldHide;
// }

// // Determine if the FAB should be hidden on a given route
// function getFabVisibility(route: any) {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? "index";

//   // Hide FAB on these routes (same as tab bar, plus chat itself)
//   const hiddenRoutes = [
//     "chat-with-ai",
//     "chat-webview-ai",
//     "create-post",
//     "comments",
//     "contact-us",
//     "notification-screen",
//     "profilepage",
//     "profile-screen",
//     "personal-info",
//     "personal-info-form",
//     "searchpage",
//     "view-search-result",
//     "explore-webview",
//     "recommendations-webview",
//     "summary-screen",
//     "notifications",
//   ];

//   return hiddenRoutes.some(
//     (hiddenRoute) =>
//       routeName.includes(hiddenRoute) ||
//       route?.params?.screen?.includes(hiddenRoute),
//   );
// }

// export default function TabsLayout() {
//   const insets = useSafeAreaInsets();

//   return (
//     <View style={{ flex: 1 }}>
//       <Tabs
//         initialRouteName="homepage"
//         screenOptions={{
//           tabBarActiveTintColor: "#712A87",
//           tabBarInactiveTintColor: "#E4D9F7",
//           headerShown: false,
//           tabBarStyle: Platform.select({
//             ios: {
//               position: "absolute",
//             },
//             default: {},
//           }),
//         }}
//         backBehavior="history"
//       >
//         <Tabs.Screen
//           name="homepage"
//           options={({ route }) => ({
//             title: "Home",
//             tabBarIcon: ({ focused }) => (
//               <Ionicons
//                 name={focused ? "home" : "home-outline"}
//                 size={24}
//                 color={focused ? "#712A87" : "#E4D9F7"}
//               />
//             ),
//             tabBarStyle: getTabBarVisibility(route)
//               ? { display: "none" }
//               : Platform.select({
//                   ios: { position: "absolute" },
//                   default: {},
//                 }),
//           })}
//         />
//         <Tabs.Screen
//           name="explorepage"
//           options={({ route }) => ({
//             title: "Learn",
//             tabBarIcon: ({ focused }) => (
//               <Ionicons
//                 name="school-outline"
//                 size={24}
//                 color={focused ? "#712A87" : "#E4D9F7"}
//               />
//             ),
//             tabBarStyle: getTabBarVisibility(route)
//               ? { display: "none" }
//               : Platform.select({
//                   ios: { position: "absolute" },
//                   default: {},
//                 }),
//           })}
//         />
//         <Tabs.Screen
//           name="communitypage"
//           options={({ route }) => ({
//             title: "Community",
//             tabBarIcon: ({ focused }) => (
//               <FontAwesome6
//                 name="users"
//                 size={20}
//                 color={focused ? "#712A87" : "#E4D9F7"}
//               />
//             ),
//             tabBarStyle: getTabBarVisibility(route)
//               ? { display: "none" }
//               : Platform.select({
//                   ios: { position: "absolute" },
//                   default: {},
//                 }),
//           })}
//         />
//         <Tabs.Screen
//           name="summarypage"
//           options={({ route }) => ({
//             title: "Insights",
//             tabBarIcon: ({ focused }) => (
//               <MaterialCommunityIcons
//                 name="lightbulb-on-outline"
//                 size={24}
//                 color={focused ? "#712A87" : "#E4D9F7"}
//               />
//             ),
//             tabBarStyle: getTabBarVisibility(route)
//               ? { display: "none" }
//               : Platform.select({
//                   ios: { position: "absolute" },
//                   default: {},
//                 }),
//           })}
//         />
//       </Tabs>

//       {/* Global Floating AI Button — sits above the tab bar on all tabs */}
//       <FloatingAiButtonWrapper insets={insets} />
//     </View>
//   );
// }

// // Wrapper that always renders the FAB at a fixed position over the tab bar
// function FloatingAiButtonWrapper({ insets }: { insets: any }) {
//   return (
//     <View
//       pointerEvents="box-none"
//       style={{
//         position: "absolute",
//         bottom: Platform.OS === "ios" ? insets.bottom + 60 : 70,
//         right: 24,
//         zIndex: 999,
//       }}
//     >
//       <FloatingAiButton />
//     </View>
//   );
// }

import FloatingAiButton from "@/src/components/tabs/FloatingAiButton";
import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  getFocusedRouteNameFromRoute,
  useNavigationState,
} from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Routes where the tab bar should be hidden
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

  return hiddenRoutes.some(
    (hiddenRoute) =>
      routeName.includes(hiddenRoute) ||
      route?.params?.screen?.includes(hiddenRoute),
  );
}

// Routes where the FAB should be hidden
const FAB_HIDDEN_ROUTES = [
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

function useIsFabHidden() {
  // Walk the navigation state to get the deepest focused route name
  const routeName = useNavigationState((state) => {
    if (!state) return "";
    let current: any = state;
    let name = "";
    while (current) {
      const route = current.routes?.[current.index ?? 0];
      if (!route) break;
      name = route.name ?? name;
      current = route.state;
    }
    return name;
  });

  return FAB_HIDDEN_ROUTES.some((hidden) => routeName.includes(hidden));
}

function GlobalFab() {
  const insets = useSafeAreaInsets();
  const isFabHidden = useIsFabHidden();

  if (isFabHidden) return null;

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

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="homepage"
        screenOptions={{
          tabBarActiveTintColor: "#712A87",
          tabBarInactiveTintColor: "#E4D9F7",
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: { position: "absolute" },
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
              : Platform.select({ ios: { position: "absolute" }, default: {} }),
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
              : Platform.select({ ios: { position: "absolute" }, default: {} }),
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
              : Platform.select({ ios: { position: "absolute" }, default: {} }),
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
              : Platform.select({ ios: { position: "absolute" }, default: {} }),
          })}
        />
      </Tabs>

      {/* FAB renders globally but hides itself on excluded routes */}
      <GlobalFab />
    </View>
  );
}
