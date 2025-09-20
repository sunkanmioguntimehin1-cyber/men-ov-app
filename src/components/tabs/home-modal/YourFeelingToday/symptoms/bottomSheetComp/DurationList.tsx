import CustomRadio from "@/src/custom-components/CustomRadio";
import React from "react";
import { Text, View } from "react-native";

const DurationList = ({
  handleDurationBottomSheetClose,
  durationData,
  setDurationData,
}: any) => {
  const durationDataList = [
    { label: "Less than 30 mins", value: "less than 30 mins" },
    { label: "Less than 60 mins", value: "less than 60 mins" },
    { label: "Less than 2 hours", value: "less than 2 hours" },
   
  ];


  return (
    <View className=" p-8">
      <View className=" items-center">
        <Text className=" text-lg font-[PoppinsSemiBold]">
          How long did it last?
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

export default DurationList;
