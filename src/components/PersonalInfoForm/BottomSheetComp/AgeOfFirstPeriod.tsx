import CustomRadio from "@/src/custom-components/CustomRadio";
import React from "react";
import { Text, View } from "react-native";

const AgeOfFirstPeriod = ({
  handleFirstPeriodBottomSheetClose,
  setFirstPeriod,
  firstPeriod,
}: any) => {

  const firstPeriodData = [
    { label: "Before 10", value: "Before 10" },
    { label: "Around 12", value: "Around 12" },
    { label: "Around 13", value: "Around 13" },
    { label: "Early teens", value: "Early teens" },
    { label: "Late teens", value: "Late teens" },
    { label: "Don’t remember", value: "Don’t remember" },
    { label: "Not sure", value: "Not sure" },
  ];

  

  return (
    <View className=" p-8">
      <View className=" items-center">
        <Text className=" text-lg font-[PoppinsSemiBold]">
          Age of first period
        </Text>
      </View>
      <View>
        <View className=" my-3">
          <CustomRadio
            isBottomSheet={true}
            options={firstPeriodData}
            checkedValue={firstPeriod}
            onChange={setFirstPeriod}
            closeButton={handleFirstPeriodBottomSheetClose}
            // style={{ marginBottom: 15 }}
          />
        </View>
      </View>
    </View>
  );
};

export default AgeOfFirstPeriod;
