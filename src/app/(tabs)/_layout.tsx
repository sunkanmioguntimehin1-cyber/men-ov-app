// import { FontAwesome5, Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// import { Platform } from "react-native";

// export default function TabsLayout() {
//   // Function to determine if tab bar should be hidden

//   return (
//     <Tabs
//       initialRouteName="homepage"
//       screenOptions={{
//         tabBarActiveTintColor: "#8A3FFC",
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
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, focused }) => (
//             <Ionicons
//               name={focused ? "home" : "home-outline"}
//               size={24}
//               color={focused ? "black" : "#E4D9F7"}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explorepage/index"
//         options={{
//           title: "Explore",
//           // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="communitypage/index"
//         options={{
//           title: "Community",
//           // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="profilepage"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color, focused }) => (
//             <FontAwesome5
//               name={focused ? "user-alt" : "user"}
//               size={24}
//               color={focused ? "black" : "#E4D9F7"}
//             />
//           ),
          
//         }}
//       />
//     </Tabs>
//   );
// }


import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

// Function to determine if tab bar should be hidden
function getTabBarVisibility(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "index";

  // Hide tab bar for these specific routes
  const hiddenRoutes = ["personal-info", "personal-info-form"];

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
              color={focused ? "black" : "#E4D9F7"}
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
        name="explorepage/index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={focused ? "black" : "#E4D9F7"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="communitypage/index"
        options={{
          title: "Community",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={24}
              color={focused ? "black" : "#E4D9F7"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profilepage"
        options={({ route }) => ({
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user"}
              size={24}
              color={focused ? "black" : "#E4D9F7"}
            />
          ),
          // Also hide tabs for any nested profile routes that might need it
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