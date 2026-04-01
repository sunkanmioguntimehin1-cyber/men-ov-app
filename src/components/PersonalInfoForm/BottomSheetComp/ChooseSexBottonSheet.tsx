import ChooseSexRadio from "@/src/custom-components/ChooseSexRadio";
import { Text, View } from "react-native";

const ChooseSexBottonSheet = ({
  handleSexBottomSheetClose,
  selectedSex,
  setSelectedSex,
}: any) => {
  const ChooseSexData = [
    { label: "Female", value: "female" },
    { label: "Male", value: "male" },
    { label: "Intersex", value: "intersex" },
  ];

  return (
    <View className=" p-8">
      <View className=" items-center">
        <Text className=" text-lg text-primary font-[PoppinsSemiBold]">
          Sex
        </Text>
      </View>
      <View>
        <View className=" my-3">
          <ChooseSexRadio
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
