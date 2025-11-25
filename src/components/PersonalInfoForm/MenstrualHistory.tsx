import CustomSelectData from "@/src/custom-components/CustomSelectData";
import YesNoSelector from "@/src/custom-components/YesNoSelector";
import { rS } from "@/src/lib/responsivehandler";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GradientText } from "../GradientText";

const MenstrualHistory = ({
  handleFirstPeriodBottomSheetOpen,
  handleLastPeriodOpen,
  firstPeriod,
  selectedDate,
  setSelected,
  periodsStoppedAnswer,
  setPeriodsStoppedAnswer,
}: any) => {

  return (
    <View>
      <View className=" items-center my-5">
      
        <GradientText className="font-[PoppinsMedium] text-xl">
          Menstrual History
        </GradientText>

        <Text className="text-base font-[PoppinsRegular] my-2">
          Your data will be safe with us.
        </Text>
      </View>
      <View>
        <View>
          {/* <CustomInput primary label="Age of first period" /> */}
          <CustomSelectData
            onPress={handleFirstPeriodBottomSheetOpen}
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
          {/* <CustomInput primary label="Date of last menstrual period " /> */}
          <CustomSelectData
            onPress={handleLastPeriodOpen}
            primary
            placeholder="Date of last menstrual period"
            label="Date of last menstrual period "
            value={selectedDate}
            icon={
              <TouchableOpacity onPress={handleLastPeriodOpen}>
                <AntDesign name="down" size={20} color="#1E1D2F" />
              </TouchableOpacity>
            }
          />
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
            useGradient={true}
            // gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
          />
        </View>
      </View>
    </View>
  );
};

export default MenstrualHistory;
