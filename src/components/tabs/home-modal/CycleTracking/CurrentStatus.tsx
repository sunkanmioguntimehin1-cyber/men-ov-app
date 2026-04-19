import CustomRadio from "@/src/custom-components/CustomRadio";
import { View } from "react-native";

const CurrentStatus = ({
  menopauseStage,
  setMenopauseStage,
  getIntakeDetails,
}: any) => {
  // console.log("getIntakeDetails", getIntakeDetails?.data);

  const menopauseStageData = [
    // { label: "Premenopause", value: "premenopause" },
    // { label: "Perimenopause", value: "perimenopause" },
    // { label: "Postmenopause", value: "postmenopause" },
    { label: "Perimenopause", value: "perimenopause" },
    { label: "Menopause", value: "menopause" },
    { label: "Postmenopause", value: "postmenopause" },
    { label: "Don't Know", value: "don't know" },
  ];

  // React.useEffect(() => {
  //   if (getIntakeDetails?.data) {
  //     setMenopauseStage(getIntakeDetails?.data?.menopauseStage || "");
  //   }
  // }, [getIntakeDetails?.data, setMenopauseStage]);
  return (
    <View>
      <View className=" my-3">
        {/* <Text
          className="mb-2 font-[PoppinsMedium] text-[#101828] text-sm "
        
        >
          Current menopause stage
        </Text> */}
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
