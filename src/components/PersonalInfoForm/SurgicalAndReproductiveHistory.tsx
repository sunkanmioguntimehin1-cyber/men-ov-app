import YesNoSelector from "@/src/custom-components/YesNoSelector";
import { rS } from "@/src/lib/responsivehandler";
import React, { useState } from "react";
import { Text, View } from "react-native";

const SurgicalAndReproductiveHistory = () => {
   const [periodsStoppedAnswer, setPeriodsStoppedAnswer] = useState<"yes" | "no" | null>(null);
  return (
    <View>
      <View className=" items-center my-5">
        <Text className=" text-xl text-[#42307D] font-[PoppinsSemiBold]">
          Surgical & Reproductive History
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
            Have you had a hysterectomy?
          </Text>
          <YesNoSelector
            onSelectionChange={(value) => setPeriodsStoppedAnswer(value)}
            selectedValue={periodsStoppedAnswer}
            primaryColor="#6941C6" // Your brand purple
          />
        </View>

        <View className=" my-3">
          <Text
            className="mb-2 font-[PoppinsMedium] text-[#101828] "
            style={{ fontSize: rS(12) }}
          >
            Have you had your ovaries removed?
          </Text>
          <YesNoSelector
            onSelectionChange={(value) => setPeriodsStoppedAnswer(value)}
            selectedValue={periodsStoppedAnswer}
            primaryColor="#6941C6" // Your brand purple
          />
        </View>
      </View>
    </View>
  );
};

export default SurgicalAndReproductiveHistory;
