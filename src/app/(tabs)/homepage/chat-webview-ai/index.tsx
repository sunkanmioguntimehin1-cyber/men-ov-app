import SafeScreen from "@/src/components/SafeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

interface NavState {
  url: string;
  // Add other properties if needed
}

const ChatWebviewAi = () => {
  const params = useLocalSearchParams();

  const newData = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

  const handleCloseCart = () => {
    router.back();
  };

  const onNavigationStateChange = (navState: NavState) => {
    console.log(navState, "navStatenavState");
    // const { url } = navState;

    // if (url.includes("transaction-success")) {
    //   router.push({
    //     pathname: "/transaction-successful",
    //     params: { reference: newData?.data?.reference }, // Passing reference ID if needed
    //   });
    // }
  };

  return (
    <SafeScreen>
      <View className="flex-1 mb-10">
        <View className=" flex-row px-4 items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>
          {/* <Text className="text-lg font-[PoppinsSemiBold] text-black">
            Talk with AI
          </Text> */}

          <View />
        </View>
        <WebView
          source={{ uri: newData }}
          onNavigationStateChange={onNavigationStateChange}
        />
      </View>
    </SafeScreen>
  );
};

export default ChatWebviewAi;
