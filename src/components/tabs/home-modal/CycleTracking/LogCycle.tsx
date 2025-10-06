import CustomSelectData from "@/src/custom-components/CustomSelectData";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CycleTrackingAddnote from "./cycleTrackingAddnote";

const LogCycle = ({
  selectedDate,
  handleDateBottomSheetOpen,
  handleDurationBottomSheetOpen,
  durationData,
  errors,
  control,
  notePublicUrls,
  setNotePublicUrls,
}: any) => {
  return (
    <View className="my-3">
      <Text
        className="mb-5 font-[PoppinsMedium] text-[#101828] text-sm "
        // style={{ fontSize: rS(12) }}
      >
        Log Cycle
      </Text>
      <View>
        <CustomSelectData
          onPress={handleDateBottomSheetOpen}
          primary
          placeholder="MM / DD / YYYY"
          label="Start Date"
          value={selectedDate}
          icon={
            <TouchableOpacity onPress={handleDateBottomSheetOpen}>
              {/* <AntDesign name="down" size={20} color="#1E1D2F" /> */}
              <Feather name="calendar" size={24} className="!text-primary" />
            </TouchableOpacity>
          }
        />

        <View className="my-3">
          <CustomSelectData
            onPress={handleDurationBottomSheetOpen}
            primary
            label="Duration (days)"
            placeholder="0 days"
            value={durationData}
            icon={
              <TouchableOpacity onPress={handleDurationBottomSheetOpen}>
                <AntDesign name="down" size={20} color="#1E1D2F" />
              </TouchableOpacity>
            }
          />
        </View>

        <View>
          <CycleTrackingAddnote
            errors={errors}
            control={control}
            notePublicUrls={notePublicUrls}
            setNotePublicUrls={setNotePublicUrls}
          />
        </View>
      </View>
    </View>
  );
};

export default LogCycle;
