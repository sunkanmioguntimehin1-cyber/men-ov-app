import CustomButton from "@/src/custom-components/CustomButton";
import React from "react";
import { View } from "react-native";
import SymptomsDescriptions from "./symptomDescriptions";
import SymptomsList from "./symptomLists";

const Symptoms = () => {
    const [selectedList, setSelectedList]= React.useState<string |null>(null)

    console.log("selected:", selectedList);
 
  return (
    <View className="mt-5">
      <View>
        {!selectedList && <SymptomsList setSelectedList={setSelectedList} />}

        <View>
          {selectedList && <SymptomsDescriptions selectedList={selectedList} />}
        </View>
      </View>
      <View className="my-3">
        <CustomButton primary title="Add" />
      </View>
    </View>
  );
};

export default Symptoms;
