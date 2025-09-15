import SafeScreen from '@/src/components/SafeScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const SummaryScreen = () => {
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
            Summary
          </Text>

          <View />
        </View>
      </ScrollView>
      <Text>SummaryScreen</Text>
    </SafeScreen>
  );
}

export default SummaryScreen