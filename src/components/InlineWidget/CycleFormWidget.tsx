// import DatePickerWidget from "@/src/widgets/DatePickerWidget";
import CustomButton from "@/src/custom-components/CustomButton";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import { GradientFeatherIcon } from "@/src/custom-components/GradientIcon";
import { rS, rV } from "@/src/lib/responsivehandler";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";

// import type { Message } from "../ChatWithAi";

// ─── Shared Styles ─────────────────────────────────────────────────────────────

const CARD_STYLE: ViewStyle = {
  backgroundColor: "white",
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "rgba(107,85,145,0.15)",
  padding: 16,
  shadowColor: "#6B5591",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
};

const PURPLE = "#6B5591";
const PURPLE_LIGHT = "#F8F0FF";
const FLOW_OPTIONS = ["Spotting", "Light", "Moderate", "Heavy", "Very Heavy"];
const CYCLE_SYMPTOMS = [
  "Cramps",
  "Bloating",
  "Headache",
  "Fatigue",
  "Mood changes",
  "Back pain",
];

export const CycleFormWidget: React.FC<{
  onSubmit: (payload: any) => void;
  submitted?: boolean;
  disabled?: boolean;
  selectedDate?: string;
  durationData?: string;
  handleDateBottomSheetOpen?: () => void;
  handleDurationBottomSheetOpen?: () => void;
  messageId?: string;
}> = ({
  onSubmit,
  submitted = false,
  disabled,
  selectedDate = "",
  durationData = "",
  handleDateBottomSheetOpen,
  handleDurationBottomSheetOpen,
  messageId,
}) => {
  const [flow, setFlow] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const toggleSym = (s: string) => {
    if (submitted) return;
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const handleSubmit = () => {
    if (!selectedDate || !durationData || submitted) return;
    const payload = `[SYSTEM_PAYLOAD: FORM_SUBMITTED | type: cycle | start_date: ${selectedDate} | duration: ${durationData} | note: ${note}]`;
    onSubmit({ cycleData: payload });
  };

  const dateValue = selectedDate ? format(selectedDate, "dd-MM-yyy") : "";

  return (
    <View style={CARD_STYLE} className=" ">
      {/* Flow selector */}

      <View className=" flex-row items-center mb-5">
        <GradientFeatherIcon
          name="calendar"
          size={20}
          gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
        />
        <Text
          className=" mx-3 font-[PoppinsMedium] text-[#101828] text-sm "
          // style={{ fontSize: rS(12) }}
        >
          Cycle Tracker
        </Text>
      </View>

      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingBottom: 4 }}
      >
        {FLOW_OPTIONS.map((f) => {
          const sel = flow === f;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => !submitted && setFlow(f)}
              disabled={submitted}
            >
              {sel ? (
                <LinearGradient
                  colors={["#6B5591", "#9F3E83"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 20,
                    paddingHorizontal: 14,
                    paddingVertical: 7,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                      fontFamily: "PoppinsMedium",
                    }}
                  >
                    {f}
                  </Text>
                </LinearGradient>
              ) : (
                <View
                  style={{
                    borderRadius: 20,
                    paddingHorizontal: 14,
                    paddingVertical: 7,
                    borderWidth: 1.5,
                    borderColor: "#E0C8F8",
                    backgroundColor: PURPLE_LIGHT,
                  }}
                >
                  <Text
                    style={{
                      color: PURPLE,
                      fontSize: 13,
                      fontFamily: "PoppinsMedium",
                    }}
                  >
                    {f}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}
      <View className=" ">
        <View>
          <CustomSelectData
            onPress={handleDateBottomSheetOpen}
            primary
            placeholder="MM / DD / YYYY"
            label="Start Date"
            value={dateValue}
            icon={
              <TouchableOpacity onPress={() => {}}>
                {/* <Feather name="calendar" size={24} className="!text-primary" /> */}
                <GradientFeatherIcon
                  name="calendar"
                  size={24}
                  gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                />
              </TouchableOpacity>
            }
          />
        </View>

        <View className="mt-3">
          <CustomSelectData
            onPress={handleDurationBottomSheetOpen}
            primary
            label="Duration (days)"
            placeholder="0 days"
            value={durationData}
            icon={
              <TouchableOpacity onPress={() => {}}>
                <AntDesign name="down" size={20} color="#1E1D2F" />
              </TouchableOpacity>
            }
          />
        </View>

        <View className="mt-3 mb-5">
          <Text
            className="mb-2 font-[PoppinsMedium]"
            style={{ fontSize: rS(12) }}
          >
            Notes
          </Text>

          <View className="border border-[#B4B4B4] bg-white rounded-lg p-4">
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Add a note about how do you feel"
              placeholderTextColor="#9B9B9B"
              value={note}
              onChangeText={setNote}
              editable={!submitted}
              style={{
                fontSize: rS(10),
                color: "#000",
                textAlignVertical: "top",
                minHeight: rV(70),
              }}
            />
          </View>
        </View>
      </View>

      <CustomButton 
        gradient 
        title={"Send Cycle"} 
        onPress={handleSubmit}
        disabled={!selectedDate || !durationData || submitted}
      />

      {/* <SubmitButton
        label={submitted ? "Cycle logged ✓" : "Log Cycle"}
        onPress={handleSubmit}
        disabled={!flow || submitted}
      /> */}
    </View>
  );
};
