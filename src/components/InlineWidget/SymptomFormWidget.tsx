// import DatePickerWidget from "@/src/widgets/DatePickerWidget";
import CustomButton from "@/src/custom-components/CustomButton";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import { GradientFeatherIcon } from "@/src/custom-components/GradientIcon";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
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
const WHITE_LIGHT = "#FFFFFF";

const SYMPTOM_OPTIONS = [
  "Hot flashes",
  "Night sweats",
  "Mood changes",
  "Sleep issues",
  "Fatigue",
  "Palpitations",
  "Anxiety",
  "Brain fog",
];
const triggers = [
  "Alcohol",
  "Caffeine",
  "Lack of Sleep",
  "Certain Food",
  "Hormonal Changes",
  "Medication",
  "Weather",
  "Physical Activity",
  "Mental load",
  "Anxiety",
];

// const PURPLE = "#6B5591";
const LIGHT_PURPLE_TRACK = "#E0C8F8";
const TEXT_GRAY = "#667085";
const LABEL_GRAY = "#98A2B3";
const SEVERITY_LABELS = ["Mild", "Moderate", "Severe"];

export const SymptomFormWidget: React.FC<{
  onSubmit: (payload: any) => void;
  submitted?: boolean;
  disabled?: boolean;
}> = ({ onSubmit, submitted = false, disabled }) => {
  const [severity, setSeverity] = useState(5);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (sym: string) => {
    if (submitted) return;
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym],
    );
  };

  const handleSubmit = () => {
    if (submitted) return;
    onSubmit({ severity, symptoms: selectedSymptoms });
  };

  const severityLabel =
    severity <= 3 ? "Mild" : severity <= 6 ? "Moderate" : "Severe";
  const severityColor =
    severity <= 3 ? "#4CAF50" : severity <= 6 ? "#FF9800" : "#F44336";

  return (
    <View style={CARD_STYLE}>
      <View className=" flex-row items-center mb-5">
        {/* <GradientFeatherIcon
          name="calendar"
          size={20}
          gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
        /> */}
        <Text
          className=" mx-3 font-[PoppinsBold] text-[#101828] text-base "
          // style={{ fontSize: rS(12) }}
        >
          Symptom Tracker
        </Text>
      </View>
      {/* Symptoms */}
      <Text
        style={{
          fontSize: 12,
          fontFamily: "PoppinsSemiBold",
          color: "#999",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 8,
        }}
      >
        Symptoms
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {SYMPTOM_OPTIONS.map((sym) => {
          const sel = selectedSymptoms.includes(sym);
          return (
            <TouchableOpacity
              key={sym}
              onPress={() => !submitted && toggleSymptom(sym)}
              disabled={submitted}
            >
              {sel ? (
                <LinearGradient
                  colors={["#6B5591", "#9F3E83"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontFamily: "PoppinsMedium",
                    }}
                  >
                    {sym}
                  </Text>
                </LinearGradient>
              ) : (
                <View
                  style={{
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderWidth: 1.5,
                    borderColor: submitted ? "#E8E8E8" : "#E0C8F8",
                    backgroundColor: submitted ? "#F8F8F8" : WHITE_LIGHT,
                  }}
                >
                  <Text
                    style={{
                      color: submitted ? "#bbb" : PURPLE,
                      fontSize: 12,
                      fontFamily: "PoppinsMedium",
                    }}
                  >
                    {sym}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Severity Section (Matching the Image) */}
      <View>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "PoppinsSemiBold",
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 8,
          }}
        >
          Severity
        </Text>

        <View style={styles.rangeLabelRow}>
          <Text style={styles.rangeText}>Mild</Text>
          <Text style={styles.rangeText}>Severe</Text>
        </View>

        <View style={styles.sliderWrapper}>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={severity}
            onValueChange={setSeverity}
            minimumTrackTintColor={LIGHT_PURPLE_TRACK}
            maximumTrackTintColor={LIGHT_PURPLE_TRACK}
            thumbTintColor={PURPLE} // Note: Use thumbImage for a real gradient thumb
            disabled={submitted}
          />
        </View>

        <View style={styles.scaleRow}>
          <Text style={styles.scaleText}>1</Text>
          <Text style={styles.scaleText}>5</Text>
          <Text style={styles.scaleText}>10</Text>
        </View>
      </View>

      <View>
        <View>
          <CustomSelectData
            // onPress={handleDateBottomSheetOpen}
            primary
            placeholder="MM / DD / YYYY"
            label="Date"
            // value={dateValue}
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
      </View>
      <View className="my-5">
        <Text
          style={{
            fontSize: 12,
            fontFamily: "PoppinsSemiBold",
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 8,
          }}
        >
          Triggers(Optional)
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {triggers.map((sym) => {
            const sel = selectedSymptoms.includes(sym);
            return (
              <TouchableOpacity
                key={sym}
                onPress={() => !submitted && toggleSymptom(sym)}
                disabled={submitted}
              >
                {sel ? (
                  <LinearGradient
                    colors={["#6B5591", "#9F3E83"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      borderRadius: 10,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontFamily: "PoppinsMedium",
                      }}
                    >
                      {sym}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View
                    style={{
                      borderRadius: 10,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderWidth: 1.5,
                      borderColor: submitted ? "#E8E8E8" : "#E0C8F8",
                      backgroundColor: submitted ? "#F8F8F8" : WHITE_LIGHT,
                    }}
                  >
                    <Text
                      style={{
                        color: submitted ? "#bbb" : PURPLE,
                        fontSize: 12,
                        fontFamily: "PoppinsMedium",
                      }}
                    >
                      {sym}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <CustomButton gradient title={"Submit"} />
      {/* <SubmitButton
        label={submitted ? "Symptom logged ✓" : "Log Symptom"}
        onPress={handleSubmit}
        disabled={submitted}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  rangeLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -5,
  },
  rangeText: { fontSize: 14, color: TEXT_GRAY, fontFamily: "PoppinsRegular" },
  sliderWrapper: { marginVertical: 0 },
  scaleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginTop: -8,
  },
  scaleText: {
    fontSize: 14,
    color: LABEL_GRAY,
    fontFamily: "PoppinsRegular",
  },
});
