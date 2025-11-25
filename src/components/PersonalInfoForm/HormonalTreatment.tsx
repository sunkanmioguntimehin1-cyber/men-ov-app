import YesNoSelector from "@/src/custom-components/YesNoSelector";
import { rS } from "@/src/lib/responsivehandler";
import React from "react";
import { Text, View } from "react-native";
import { GradientText } from "../GradientText";

const HormonalTreatment = ({
  isOnHormoneTherapy,
  setIsOnHormoneTherapy,
}: any) => {
  console.log("isOnHormoneTherapy", isOnHormoneTherapy);

  return (
    <View>
      <View className=" items-center my-5">
        <GradientText className="font-[PoppinsMedium] text-xl">
          Hormonal Treatment
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
            Are you currently using hormone therapy (HRT)?
          </Text>
          <YesNoSelector
            onSelectionChange={(value) => setIsOnHormoneTherapy(value)}
            selectedValue={isOnHormoneTherapy}
            useGradient={true}
          />
        </View>
      </View>
    </View>
  );
};

export default HormonalTreatment;
