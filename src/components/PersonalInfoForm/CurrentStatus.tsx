import CustomRadio from "@/src/custom-components/CustomRadio";
import { rS } from "@/src/lib/responsivehandler";
import React from "react";
import { Text, View } from "react-native";

const CurrentStatus = ({ menopauseStage, setMenopauseStage }:any) => {
 

  const menopauseStageData = [
    { label: "Premenopause", value: "premenopause" },
    { label: "Perimenopause", value: "perimenopause" },
    { label: "Postmenopause", value: "postmenopause" },
  ];
  return (
    <View>
      <View className=" items-center my-5">
        <Text className=" text-xl text-[#42307D] font-[PoppinsSemiBold]">
          Current Status
        </Text>
        <Text className=" text-base text-[#6941C6] font-[PoppinsRegular] my-2">
          Your data will be safe with us.
        </Text>
      </View>

      <View>
        <View className=" my-3">
          <Text
            className="mb-2 font-[PoppinsMedium] text-[#101828] "
            style={{ fontSize: rS(12) }}
          >
            Current menopause stage
          </Text>
          <CustomRadio
            options={menopauseStageData}
            checkedValue={menopauseStage}
            onChange={setMenopauseStage}
            borderWidth={1}
            style={{ marginBottom: 15 }}
          />
        </View>
      </View>
    </View>
  );
};

export default CurrentStatus;
