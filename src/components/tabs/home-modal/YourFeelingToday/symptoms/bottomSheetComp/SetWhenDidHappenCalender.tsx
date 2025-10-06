import CalenderModal from '@/src/custom-components/Calender';
import React from 'react';
import { View } from 'react-native';

const SetWhenDidHappenCalender = ({
  handleDateBottomSheetClose,
  setSelectedDate,
  selectedDate,
}:any) => {
  return (
    <View className=" items-center pb-20">
      <CalenderModal
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleDateBottomSheetClose={handleDateBottomSheetClose}
      />
    </View>
  );
};

export default SetWhenDidHappenCalender