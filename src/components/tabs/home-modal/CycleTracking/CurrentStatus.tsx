import CustomRadio from "@/src/custom-components/CustomRadio";
import React from "react";
import { Text, View } from "react-native";

const CurrentStatus = ({
  menopauseStage,
  setMenopauseStage,
  getIntakeDetails,
}: any) => {
  // console.log("getIntakeDetails", getIntakeDetails?.data);

  const menopauseStageData = [
    { label: "Premenopause", value: "premenopause" },
    { label: "Perimenopause", value: "perimenopause" },
    { label: "Postmenopause", value: "postmenopause" },
  ];

  React.useEffect(() => {
    if (getIntakeDetails?.data) {
      setMenopauseStage(getIntakeDetails?.data?.menopauseStage || "");
    }
  }, [getIntakeDetails?.data, setMenopauseStage]);
  return (
    <View>
      <View className=" my-3">
        <Text
          className="mb-2 font-[PoppinsMedium] text-[#101828] text-sm "
          // style={{ fontSize: rS(12) }}
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

      {/* <View className="">
        <CustomButton primary title="Add" />
      </View> */}
    </View>
  );
};

export default CurrentStatus;
