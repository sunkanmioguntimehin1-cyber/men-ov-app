import FloatingAiButton from "@/src/components/tabs/FloatingAiButton";
import {
  getFocusedRouteNameFromRoute,
  useNavigationState,
} from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Image, Platform, View } from "react-native";
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
    "welcome-plus",
    "manage-subscription",
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
  "paywall-screen",
  "welcome-plus",
  "manage-subscription",
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
        bottom: Platform.OS === "ios" ? insets.bottom + 70 : 100,
        right: 50,
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
              <Image
                source={
                  focused
                    ? require("@/assets/images/homeActive.png")
                    : require("@/assets/images/homeInactive.png")
                }
                style={{ width: 24, height: 24 }}
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
              <Image
                source={
                  focused
                    ? require("@/assets/images/learnActive.png")
                    : require("@/assets/images/learnInactive.png")
                }
                style={{ width: 24, height: 24 }}
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
              <Image
                source={
                  focused
                    ? require("@/assets/images/communityActive.png")
                    : require("@/assets/images/communityInactive.png")
                }
                style={{ width: 24, height: 24 }}
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
              <Image
                source={
                  focused
                    ? require("@/assets/images/insightActive.png")
                    : require("@/assets/images/insightInactive.png")
                }
                style={{ width: 24, height: 24 }}
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
