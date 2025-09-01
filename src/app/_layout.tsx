import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import NetworkStatus from "../components/NetworkStatus";
import { useAppFocusManager } from "../lib/focusManager";
import { setupNetworkStatus } from "../lib/networkManager";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// Setup network status monitoring
setupNetworkStatus();

export default function RootLayout() {
  const isLoggedIn = true;

  const [loaded] = useFonts({
    PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    RobotoSemiBold: require("../../assets/fonts/Roboto-SemiBold.ttf"),
  });

  // Setup app focus management
  useAppFocusManager();


  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "759542327992-qs4vbi3gejg8gkgu5anov1igbffgmh5d.apps.googleusercontent.com",
      iosClientId:
        "759542327992-971ok5geank09ddh8kaeoglsk9mqg1fo.apps.googleusercontent.com",
        profileImageSize: 120,
    });
  }, []);

   useEffect(() => {
     if (loaded) {
       SplashScreen.hide();
     }
   }, [loaded]);

   if (!loaded) {
     return null;
   }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NetworkStatus />
            <KeyboardProvider>
              <Stack>
                <Stack.Protected guard={isLoggedIn}>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack.Protected>
                <Stack.Protected guard={!isLoggedIn}>
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                </Stack.Protected>
              </Stack>
            </KeyboardProvider>
            <StatusBar style="auto" />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </>
  );
}
