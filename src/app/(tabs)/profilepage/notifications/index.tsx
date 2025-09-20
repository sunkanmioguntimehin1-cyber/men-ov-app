import SafeScreen from '@/src/components/SafeScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const NotificationsScreen = () => {
    const router = useRouter()
  return (
    <SafeScreen className="bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-lg font-[PoppinsSemiBold] text-black">
            Notification
          </Text>

          <View />
        </View>
        <View className="p-6">
          <View>
            <Text>How are you feeling today? </Text>
            <Text className=" text-[#737373] my-2">
              Tap to log a quick check-in{" "}
            </Text>
            <View>
              <Text>12 mins ago</Text>
            </View>
          </View>
          <View className=" h-0.5 bg-[#EAEAEA] my-2" />
        </View>

        
      </ScrollView>
    </SafeScreen>
  );
}

export default NotificationsScreen