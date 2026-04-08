// import DatePickerWidget from "@/src/widgets/DatePickerWidget";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    ScrollView,
    Text,
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

const CycleFormWidget: React.FC<{
  onSubmit: (payload: any) => void;
  submitted?: boolean;
  disabled?: boolean;
}> = ({ onSubmit, submitted = false, disabled }) => {
  const [flow, setFlow] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSym = (s: string) => {
    if (submitted) return;
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const handleSubmit = () => {
    if (!flow || submitted) return;
    const startDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    onSubmit({ startDate, flow, symptoms: selectedSymptoms });
  };

  return (
    <View style={CARD_STYLE}>
      {/* Flow selector */}
      <Text
        style={{
          fontSize: 12,
          fontFamily: "PoppinsSemiBold",
          color: "#999",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 10,
        }}
      >
        Flow
      </Text>
      <ScrollView
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
      </ScrollView>

      {/* Symptoms */}
      <Text
        style={{
          fontSize: 12,
          fontFamily: "PoppinsSemiBold",
          color: "#999",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginTop: 14,
          marginBottom: 8,
        }}
      >
        Symptoms (optional)
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {CYCLE_SYMPTOMS.map((sym) => {
          const sel = selectedSymptoms.includes(sym);
          return (
            <TouchableOpacity
              key={sym}
              onPress={() => !submitted && toggleSym(sym)}
              disabled={submitted}
            >
              {sel ? (
                <LinearGradient
                  colors={["#6B5591", "#9F3E83"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 20,
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
                    borderRadius: 20,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderWidth: 1.5,
                    borderColor: "#E0C8F8",
                    backgroundColor: PURPLE_LIGHT,
                  }}
                >
                  <Text
                    style={{
                      color: PURPLE,
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

      {/* <SubmitButton
        label={submitted ? "Cycle logged ✓" : "Log Cycle"}
        onPress={handleSubmit}
        disabled={!flow || submitted}
      /> */}
    </View>
  );
};
