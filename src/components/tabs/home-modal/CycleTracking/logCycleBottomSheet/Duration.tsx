import CustomRadio from "@/src/custom-components/CustomRadio";
import React from "react";
import { Text, View } from "react-native";

const Duration = ({
  handleDurationBottomSheetClose,
  durationData,
  setDurationData,
}: any) => {
  const durationDataList = [
    { label: "3 days", value: 3 },
    { label: "5 days", value: 5 },
    { label: "10 days", value: 10 },
  ];

  return (
    <View className=" p-8">
      <View className=" items-center">
        <Text className=" text-lg font-[PoppinsSemiBold]">
          Duration?
        </Text>
      </View>
      <View>
        <View className=" my-3">
          <CustomRadio
            isBottomSheet={true}
            options={durationDataList}
            checkedValue={durationData}
            onChange={setDurationData}
            closeButton={handleDurationBottomSheetClose}
            // style={{ marginBottom: 15 }}
          />
        </View>
      </View>
    </View>
  );
};

export default Duration;
