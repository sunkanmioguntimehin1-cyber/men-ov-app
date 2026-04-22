// import DatePickerWidget from "@/src/widgets/DatePickerWidget";
import CustomButton from "@/src/custom-components/CustomButton";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import { GradientFeatherIcon } from "@/src/custom-components/GradientIcon";
import { rS, rV } from "@/src/lib/responsivehandler";
import type { CyclePayload } from "@/src/widgets/messageParser";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// import type { Message } from "../ChatWithAi";

// ─── Shared Styles ─────────────────────────────────────────────────────────────

const CARD_STYLE: ViewStyle = {
  backgroundColor: "white",
  maxWidth: rS(260),
  width: rS(260),
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
  initialCycle?: CyclePayload;
}> = ({
  onSubmit,
  submitted = false,
  disabled,
  selectedDate: selectedDateProp = "",
  durationData: durationDataProp = "",
  handleDateBottomSheetOpen,
  handleDurationBottomSheetOpen,
  messageId,
  initialCycle,
}) => {
  const [flow, setFlow] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [internalDate, setInternalDate] = useState(selectedDateProp);
  const [internalDuration, setInternalDuration] = useState(durationDataProp);

  useEffect(() => {
    if (initialCycle && submitted) {
      if (initialCycle.start_date) {
        setInternalDate(initialCycle.start_date);
      }
      if (initialCycle.duration) {
        setInternalDuration(initialCycle.duration);
      }
      if (initialCycle.note) {
        setNote(initialCycle.note);
      }
    } else {
      setInternalDate(selectedDateProp);
      setInternalDuration(durationDataProp);
    }
  }, [initialCycle, submitted, selectedDateProp, durationDataProp]);

  const selectedDate = internalDate;
  const durationData = internalDuration;

  const toggleSym = (s: string) => {
    if (submitted) return;
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  // Normalize date to ISO format (YYYY-MM-DD)
  const normalizeDate = (d: string): string => {
    if (!d) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
    const parsed = new Date(d);
    if (isNaN(parsed.getTime())) return "";
    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
  };
  const dateValue = selectedDate ? format(selectedDate, "dd-MM-yyy") : "";

  const handleSubmit = () => {
    if (!selectedDate || !durationData || submitted) return;
    const normalizedStartDate = normalizeDate(selectedDate);
    const payload = `[SYSTEM_PAYLOAD: FORM_SUBMITTED | type: cycle | start_date: ${normalizedStartDate} | duration: ${durationData} | note: ${note}]`;
    onSubmit({ cycleData: payload });
  };

  return (
    <View style={CARD_STYLE} className="  ">
      {/* Flow selector */}

      <View className=" flex-row items-center mb-5">
        <GradientFeatherIcon
          name="calendar"
          size={20}
          gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
        />
        <Text
          className=" mx-3 font-[PoppinsBold] text-[#101828] text-base "
          // style={{ fontSize: rS(12) }}
        >
          Cycle Tracker
        </Text>
      </View>

      {/* <ScrolView
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
      </ScrolView>  */}
      <View className=" ">
        <View>
          <CustomSelectData
            onPress={handleDateBottomSheetOpen}
            primary
            placeholder="MM / DD / YYYY"
            label="Start Date"
            value={dateValue}
            icon={
              <TouchableOpacity onPress={handleDateBottomSheetOpen}>
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
              <TouchableOpacity onPress={handleDurationBottomSheetOpen}>
                <MaterialIcons
                  name={"keyboard-arrow-down"}
                  size={24}
                  color={"#1E1D2F"}
                />
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
