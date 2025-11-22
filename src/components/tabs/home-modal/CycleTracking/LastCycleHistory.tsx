import CustomSelectData from "@/src/custom-components/CustomSelectData";
import { Feather } from "@expo/vector-icons";
import { format, isValid } from "date-fns";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CycleTrackingAddnote from "./cycleTrackingAddnote";

const LastCycleHistory = ({
  selectedDate,
  handleDateBottomSheetOpen,
  handleDurationBottomSheetOpen,
  durationData,
  errors,
  control,
  notePublicUrls,
  setNotePublicUrls,
  getCycleTrackingLatest,
}: any) => {


    //date calculation with proper validation
  const getFormattedDate = () => {
    const start = getCycleTrackingLatest?.data?.start;
    if (!start) return null;

    const date = new Date(start);

    // Validate the date
    if (!isValid(date)) return null;

    try {
      // Format as "Apr 10"
      return format(date, "MMM d");
    } catch (error) {
      console.error("Error formatting date:", error);
      return null;
    }
  };

  const result = getFormattedDate();
  return (
    <View className="my-3">
      <Text
        className="mb-5 font-[PoppinsMedium] text-[#101828] text-sm "
        // style={{ fontSize: rS(12) }}
      >
        Last Cycle History
      </Text>
      <View className="my-2">
        <Text>
          Started: {result} - Lasted:{getCycleTrackingLatest.data?.duration} days
        </Text>
      </View>
      <View className="h-[0.5] bg-slate-400 mb-3" />

      <View>
        <CustomSelectData
          onPress={handleDateBottomSheetOpen}
          primary
          placeholder="MM / DD / YYYY"
          label="Start Date"
          value={selectedDate}
          icon={
            <TouchableOpacity onPress={handleDateBottomSheetOpen}>
              <Feather name="calendar" size={24} className="!text-primary" />
            </TouchableOpacity>
          }
        />

        {/* <View className="mt-3">
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
        </View> */}

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

export default LastCycleHistory;
