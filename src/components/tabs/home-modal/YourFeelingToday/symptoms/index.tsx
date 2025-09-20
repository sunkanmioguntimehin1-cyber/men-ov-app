import React from "react";
import { View } from "react-native";
import SymptomsDescriptions from "./symptomDescriptions";
import SymptomsList from "./symptomLists";

const Symptoms = ({
  errors,
  control,
  handleDateBottomSheetOpen,
  handleDurationBottomSheetOpen,
  selectedDate,
  durationData,
  selectedList,
  setSelectedList,
  selectedSeverityLevel,
  setSelectedSeverityLevel,
  setPublicUrls,
}: any) => {
  return (
    <View className=" mt-5">
      <View>
        {!selectedList && <SymptomsList setSelectedList={setSelectedList} />}

        <View>
          {selectedList && (
            <SymptomsDescriptions
              errors={errors}
              control={control}
              selectedList={selectedList}
              selectedDate={selectedDate}
              durationData={durationData}
              selectedSeverityLevel={selectedSeverityLevel}
              setSelectedSeverityLevel={setSelectedSeverityLevel}
              handleDateBottomSheetOpen={handleDateBottomSheetOpen}
              handleDurationBottomSheetOpen={handleDurationBottomSheetOpen}
              setPublicUrls={setPublicUrls}
            />
          )}
        </View>
      </View>
      {/* <View className="my-3">
        <CustomButton primary title="Add" />
      </View> */}
    </View>
  );
};

export default Symptoms;
