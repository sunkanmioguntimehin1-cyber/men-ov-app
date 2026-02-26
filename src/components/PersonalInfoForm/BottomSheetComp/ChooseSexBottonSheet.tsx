import CustomRadio from "@/src/custom-components/CustomRadio";
import React from "react";
import { Text, View } from "react-native";

const ChooseSexBottonSheet = ({
  handleSexBottomSheetClose,
  selectedSex,
  setSelectedSex,
  ChooseSexData,
}: any) => {
  return (
    <View className=" p-8">
      <View className=" items-center">
        <Text className=" text-lg text-primary font-[PoppinsSemiBold]">
          Sex
        </Text>
      </View>
      <View>
        <View className=" my-3">
          <CustomRadio
            isBottomSheet={true}
            options={ChooseSexData}
            checkedValue={selectedSex}
            onChange={setSelectedSex}
            closeButton={handleSexBottomSheetClose}
            // style={{ marginBottom: 15 }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChooseSexBottonSheet;
