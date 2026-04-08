// import DatePickerWidget from "@/src/widgets/DatePickerWidget";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import { CustomSlider } from "@/src/custom-components/CustomSlider";
import { GradientFeatherIcon } from "@/src/custom-components/GradientIcon";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
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
      {/* <View className=" mt-5">
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              color: "#aaa",
              fontFamily: "PoppinsRegular",
            }}
          >
            1
          </Text>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                height: 6,
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "#F0E8FF",
              }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <TouchableOpacity
                  key={i}
                  disabled={submitted}
                  onPress={() => setSeverity(i + 1)}
                  style={{
                    flex: 1,
                    backgroundColor: i < severity ? PURPLE : "transparent",
                    marginHorizontal: 1,
                    borderRadius: 2,
                  }}
                />
              ))}
            </View>
          </View>
          <Text
            style={{
              fontSize: 11,
              color: "#aaa",
              fontFamily: "PoppinsRegular",
            }}
          >
            10
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontFamily: "PoppinsSemiBold",
              color: severityColor,
            }}
          >
            {severity}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "PoppinsRegular",
              color: severityColor,
            }}
          >
            {severityLabel}
          </Text>
        </View>
      </View> */}

      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "PoppinsSemiBold",
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 12,
          }}
        >
          Severity
        </Text>

        <CustomSlider
          min={1}
          max={10}
          step={1}
          value={severity}
          onValueChange={setSeverity}
          disabled={submitted}
          trackColor="#F0E8FF"
          fillColor="#8B5CF6"
          thumbColor="#8B5CF6"
        />

        {/* Value badge */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              backgroundColor: severityColor + "20",
              paddingHorizontal: 14,
              paddingVertical: 5,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "PoppinsSemiBold",
                color: severityColor,
              }}
            >
              {severity}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "PoppinsRegular",
                color: severityColor,
              }}
            >
              {severityLabel}
            </Text>
          </View>
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
      {/* <SubmitButton
        label={submitted ? "Symptom logged ✓" : "Log Symptom"}
        onPress={handleSubmit}
        disabled={submitted}
      /> */}
    </View>
  );
};
