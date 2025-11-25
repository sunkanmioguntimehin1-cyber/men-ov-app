import CustomRadio from "@/src/custom-components/CustomRadio";
import { rS } from "@/src/lib/responsivehandler";
import React from "react";
import { Text, View } from "react-native";
import { GradientText } from "../GradientText";

const CurrentStatus = ({ menopauseStage, setMenopauseStage }: any) => {
  const menopauseStageData = [
    // { label: "Premenopause", value: "premenopause" },
    // { label: "Perimenopause", value: "perimenopause" },
    // { label: "Postmenopause", value: "postmenopause" },
    { label: "Perimenopause", value: "perimenopause" },
    { label: "Menopause", value: "menopause" },
    { label: "Postmenopause", value: "postmenopause" },
  ];
  return (
    <View>
      <View className=" items-center my-5">
        <GradientText className="font-[PoppinsMedium] text-xl">
          Current Status
        </GradientText>

        <Text className="text-base font-[PoppinsRegular] my-2">
          Your data will be safe with us.
        </Text>
      </View>

      <View>
        <View className=" my-3">
          <Text
            className="mb-2 font-[PoppinsMedium] text-[#101828] "
            style={{ fontSize: rS(12) }}
          >
            Current menstrual status 
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
