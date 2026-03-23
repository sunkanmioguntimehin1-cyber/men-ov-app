import { useGetUserChat } from "@/src/api_services/userApi/userQuery";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Easing,
  Linking,
  TouchableOpacity,
  View,
} from "react-native";

const PRIVACY_LINK = process.env.EXPO_PUBLIC_PRIVACY_LINK;

const FloatingAiButton = () => {
  const router = useRouter();
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  const getUserChatAi = useGetUserChat();

  const openReceiptInBrowser = async () => {
    try {
      // const result = await getReceipt.refetch(); // Manually fetch
      // const uri = result.data?.url;
      const uri = getUserChatAi.data.chatUrl;

      if (!uri) {
        Alert.alert("No  chat Url found");
        return;
      }

      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        Alert.alert("Can't open this URL:", uri);
      }
    } catch (error) {
      Alert.alert("Failed to fetch receipt.");
    }
  };

  const openWebView = () => {
    console.log("getUserChatAi.data", getUserChatAi.data);
    try {
      const uri = getUserChatAi.data?.chatUrl;

      if (!uri) {
        Alert.alert("No  chat Url found");
        return;
      }
      router.push({
        pathname: "/homepage/chat-webview-ai",
        params: { item: JSON.stringify(uri) },
      });
    } catch (error) {
      Alert.alert("Failed to fetch chat Url");
    }
  };

  const openChai = () => {
    router.push({
      pathname: "/(tabs)/homepage/chat-with-ai",
    });
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceAnim, pulseAnim]);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  const glowScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  const glowOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.28, 0.08],
  });

  const handleOpenPrivacyPolicy = async () => {
    // const uri = "https://menoviahealth.com/privacy.html";
    const uri: any = PRIVACY_LINK;
    try {
      await WebBrowser.openBrowserAsync(uri);
    } catch (error) {
      Alert.alert("Failed to fetch receipt.");
    }
  };

  return (
    <View>
      <Animated.View
        style={{
          transform: [{ translateY }],
        }}
      >
        <View style={{ position: "relative" }}>
          <Animated.View
            pointerEvents="none"
            style={{
              position: "absolute",
              left: -6,
              right: -6,
              top: -6,
              bottom: -6,
              borderRadius: 18,
              // backgroundColor: "rgba(138,63,252,0.25)",
              opacity: glowOpacity as unknown as number,
              transform: [{ scale: glowScale as unknown as number }],
            }}
          />

          <TouchableOpacity
            className="w-20 h-20"
            onPress={() => {
              router.push("/(tabs)/homepage/chat-with-ai");
            }}
          >
            <Image
              source={require("@/assets/images/xena-2.png")}
              style={{
                height: "100%",
                width: "100%",
                alignSelf: "center",
              }}
              contentFit="fill"
              onError={(error) => console.log("Image error:", error)}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default FloatingAiButton;
