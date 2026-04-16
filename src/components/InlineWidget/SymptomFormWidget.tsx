import CustomButton from "@/src/custom-components/CustomButton";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import { GradientFeatherIcon } from "@/src/custom-components/GradientIcon";
import { rS, rV } from "@/src/lib/responsivehandler";
import type { SymptomPayload } from "@/src/widgets/messageParser";
import Slider from "@react-native-community/slider";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const CARD_STYLE: ViewStyle = {
  backgroundColor: "white",
  height: Platform.OS === "ios" ? null : rV(810),

  // maxWidth: rS(260),
  // width: rS(260),
  // height: rV(670),
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

const TRIGGERS = [
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

const LIGHT_PURPLE_TRACK = "#E0C8F8";
const TEXT_GRAY = "#667085";
const LABEL_GRAY = "#98A2B3";

export const SymptomFormWidget: React.FC<{
  onSubmit: (payload: any) => void;
  submitted?: boolean;
  disabled?: boolean;
  messageId?: string;
  selectedDate?: string;
  handleDateBottomSheetOpen?: () => void;
  initialSymptom?: SymptomPayload;
}> = ({
  onSubmit,
  submitted = false,
  disabled,
  selectedDate = "",
  handleDateBottomSheetOpen,
  initialSymptom,
}) => {
  const [severity, setSeverity] = useState(5);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (initialSymptom && submitted) {
      const sym = initialSymptom.symptoms?.[0] || null;
      setSelectedSymptom(sym);
      if (initialSymptom.severity_level === "Mild") setSeverity(2);
      else if (initialSymptom.severity_level === "Moderate") setSeverity(5);
      else if (initialSymptom.severity_level === "Severe") setSeverity(8);
      setSelectedTriggers(initialSymptom.triggers || []);
      if (initialSymptom.notes) setNote(initialSymptom.notes);
    }
  }, [initialSymptom, submitted]);

  const toggleSymptom = (sym: string) => {
    if (submitted) return;
    setSelectedSymptom((prev) => (prev === sym ? null : sym));
  };

  const toggleTrigger = (trigger: string) => {
    if (submitted) return;
    setSelectedTriggers((prev) =>
      prev.includes(trigger)
        ? prev.filter((t) => t !== trigger)
        : [...prev, trigger],
    );
  };

  const dateValue = selectedDate ? format(selectedDate, "dd-MM-yyy") : "";

  const handleSubmit = () => {
    if (submitted) return;
    const severityLabel =
      severity === 1 ? "Mild" : severity <= 3 ? "Moderate" : "Severe";
    const payload = `[SYSTEM_PAYLOAD: FORM_SUBMITTED | type: symptom | symptoms: ${selectedSymptom || "none"} | severity_level: ${severityLabel} | date_logged: ${selectedDate || "not_set"} | triggers: ${selectedTriggers.join(", ") || "none"} | notes: ${note}]`;
    onSubmit({ symptomData: payload });
  };

  const severityLabel =
    severity === 1 ? "Mild" : severity <= 3 ? "Moderate" : "Severe";
  const severityColor =
    severity === 1 ? "#4CAF50" : severity <= 3 ? "#FF9800" : "#F44336";

  return (
    <View style={CARD_STYLE}>
      <View className="flex-row items-center mb-5">
        <Text className="mx-3 font-[PoppinsBold] text-[#101828] text-base">
          Symptom Tracker
        </Text>
      </View>

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
          const sel = selectedSymptom === sym;
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

      <View style={{ marginTop: 16 }}>
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
            maximumValue={4}
            step={1}
            value={severity}
            onValueChange={setSeverity}
            minimumTrackTintColor={LIGHT_PURPLE_TRACK}
            maximumTrackTintColor={LIGHT_PURPLE_TRACK}
            thumbTintColor={PURPLE}
            disabled={submitted}
          />
        </View>

        <View style={styles.scaleRow}>
          <Text style={styles.scaleText}>1</Text>
          <Text style={styles.scaleText}>2</Text>
          <Text style={styles.scaleText}>3</Text>
          <Text style={styles.scaleText}>4</Text>
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <CustomSelectData
          onPress={handleDateBottomSheetOpen}
          primary
          placeholder="MM / DD / YYYY"
          label="Date"
          value={dateValue}
          icon={
            <TouchableOpacity onPress={handleDateBottomSheetOpen}>
              <GradientFeatherIcon
                name="calendar"
                size={24}
                gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
              />
            </TouchableOpacity>
          }
        />
      </View>

      <View style={{ marginTop: 12, marginBottom: 16 }}>
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
          Triggers (Optional)
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {TRIGGERS.map((trigger) => {
            const sel = selectedTriggers.includes(trigger);
            return (
              <TouchableOpacity
                key={trigger}
                onPress={() => !submitted && toggleTrigger(trigger)}
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
                      {trigger}
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
                      {trigger}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={{ marginTop: 4, marginBottom: 8 }}>
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
          Notes (Optional)
        </Text>
        <View className="border border-[#B4B4B4] bg-white rounded-lg p-4">
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="Add any additional notes"
            placeholderTextColor="#9B9B9B"
            value={note}
            onChangeText={setNote}
            editable={!submitted}
            style={{
              fontSize: rS(10),
              color: "#000",
              textAlignVertical: "top",
              minHeight: rV(60),
            }}
          />
        </View>
      </View>

      <CustomButton
        gradient
        title={"Submit"}
        onPress={handleSubmit}
        disabled={submitted}
      />
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
