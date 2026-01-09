import SafeScreen from "@/src/components/SafeScreen";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const NotificationSettings = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const dataSetList = [
    { name: "Daily Check-ins" },
    { name: "Cycle Alerts" },
    { name: "Community Posts" },
    { name: "Community Posts" },
  ];
  return (
    <SafeScreen className="bg-white">
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
          Notification Setting
        </Text>

        <TouchableOpacity className="p-1">
          <Ionicons name="checkmark" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView className="flex-1, p-4">
        {dataSetList.map((item, index) => (
          <View key={index}>
            <LinearGradient
              colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 5, flexDirection: "row", alignItems: "center", padding: 6, marginVertical: 5 }}
              //   className="rounded-xl p-4 mb-3"
            >
              <FontAwesome6 name="circle-check" size={24} color="#A5D39D" />

              <Text className="text-base font-[Poppins] text-white mx-3">
                {item.name}
              </Text>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
    </SafeScreen>
  );
};

export default NotificationSettings;
