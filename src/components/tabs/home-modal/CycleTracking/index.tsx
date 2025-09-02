import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CurrentStatus from './CurrentStatus';

const CycleTracking = ({ onCancel }:any) => {
  return (
    <View className=" w-96 p-5 bg-white rounded-lg  shadow-lg overflow-hidden">
      <View className=" flex-row items-center justify-between">
        <Text className=" text-base font-[PoppinsSemiBold]">
          Cycle Tracking{" "}
        </Text>
        <TouchableOpacity onPress={onCancel}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <CurrentStatus />
      </View>
    </View>
  );
};

export default CycleTracking