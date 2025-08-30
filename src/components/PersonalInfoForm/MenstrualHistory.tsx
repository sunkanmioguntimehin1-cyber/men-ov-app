import CustomInput from "@/src/custom-components/CustomInput";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import YesNoSelector from "@/src/custom-components/YesNoSelector";
import { rS } from "@/src/lib/responsivehandler";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const MenstrualHistory = ({
  handleFirstPeriodBottomSheetOpen,
  firstPeriod,
}: any) => {
  const [periodsStoppedAnswer, setPeriodsStoppedAnswer] = useState<
    "yes" | "no" | null
  >(null);


  return (
    <View>
      <View className=" items-center my-5">
        <Text className=" text-xl text-[#42307D] font-[PoppinsSemiBold]">
          Menstrual History
        </Text>
        <Text className=" text-base text-[#6941C6] font-[PoppinsRegular] my-2">
          Your data will be safe with us.
        </Text>
      </View>
      <View>
        <View>
          {/* <CustomInput primary label="Age of first period" /> */}
          <CustomSelectData
            primary
            label="Age of first period"
            placeholder="Choose"
            value={firstPeriod}
            icon={
              <TouchableOpacity onPress={handleFirstPeriodBottomSheetOpen}>
                <AntDesign name="down" size={20} color="#1E1D2F" />
              </TouchableOpacity>
            }
          />
        </View>

        <View className=" my-3">
          <CustomInput primary label="Date of last menstrual period " />
        </View>

        <View className=" my-3">
          <Text
            className="mb-2 font-[PoppinsMedium] text-[#101828] "
            style={{ fontSize: rS(12) }}
          >
            Have your periods stopped for 12 consecutive months?
          </Text>
          <YesNoSelector
            onSelectionChange={(value) => setPeriodsStoppedAnswer(value)}
            selectedValue={periodsStoppedAnswer}
            primaryColor="#6941C6" // Your brand purple
          />
        </View>

        <View className=" my-3">
          <CustomInput primary label="Estimated Date of Menopause Onset" />
        </View>
      </View>
    </View>
  );
};

export default MenstrualHistory;
