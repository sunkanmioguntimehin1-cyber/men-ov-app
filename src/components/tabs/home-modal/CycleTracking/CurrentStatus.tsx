import CustomButton from "@/src/custom-components/CustomButton";
import CustomRadio from "@/src/custom-components/CustomRadio";
import React from "react";
import { Text, View } from "react-native";

const CurrentStatus = () => {
  const [size, setSize] = React.useState("");

  const sizeData = [
    { label: "Perimenopause", value: "Perimenopause" },
    { label: "Menopause", value: "Menopause" },
    { label: "Postmenopause", value: "Postmenopause" },
  ];
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
          options={sizeData}
          checkedValue={size}
          onChange={setSize}
          borderWidth={1}
          style={{ marginBottom: 15 }}
        />
      </View>

      <View className="">
        <CustomButton primary title="Add" />
      </View>
    </View>
  );
};

export default CurrentStatus;
