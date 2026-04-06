import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    ScrollView,
    StyleProp,
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

// ─── Submit Button ─────────────────────────────────────────────────────────────

const SubmitButton: React.FC<{
  label: string;
  onPress: () => void;
  disabled?: boolean;
}> = ({ label, onPress, disabled }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.85}
    style={{ marginTop: 12 }}
  >
    <LinearGradient
      colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ borderRadius: 12, paddingVertical: 11, alignItems: "center" }}
    >
      <Text
        style={{ color: "white", fontSize: 14, fontFamily: "PoppinsSemiBold" }}
      >
        {label}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

// ─── Date Picker Widget ────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

const DatePickerWidget: React.FC<{
  onSubmit: (payload: any) => void;
  submitted?: boolean;
  disabled?: boolean;
}> = ({ onSubmit, submitted = false, disabled }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
    setSelectedDay(null);
  };

  const handleSubmit = () => {
    if (!selectedDay || submitted) return;
    const date = new Date(year, month, selectedDay).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
    onSubmit({ date });
  };

  return (
    <View style={CARD_STYLE}>
      {/* Navigation */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <TouchableOpacity
          onPress={prevMonth}
          disabled={submitted}
          style={{ padding: 6 }}
        >
          <Text
            style={{
              color: PURPLE,
              fontSize: 18,
              fontFamily: "PoppinsSemiBold",
            }}
          >
            ‹
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "PoppinsSemiBold",
            color: "#1a1a2e",
          }}
        >
          {MONTH_NAMES[month]} {year}
        </Text>
        <TouchableOpacity
          onPress={nextMonth}
          disabled={submitted}
          style={{ padding: 6 }}
        >
          <Text
            style={{
              color: PURPLE,
              fontSize: 18,
              fontFamily: "PoppinsSemiBold",
            }}
          >
            ›
          </Text>
        </TouchableOpacity>
      </View>

      {/* Day headers */}
      <View style={{ flexDirection: "row", marginBottom: 4 }}>
        {DAY_LABELS.map((d, i) => (
          <View key={i} style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 11,
                color: "#999",
                fontFamily: "PoppinsMedium",
              }}
            >
              {d}
            </Text>
          </View>
        ))}
      </View>

      {/* Days grid */}
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <View
            key={`empty-${i}`}
            style={{ width: `${100 / 7}%`, aspectRatio: 1 }}
          />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;
          const isSelected = selectedDay === day;

          return (
            <TouchableOpacity
              key={day}
              onPress={() => !submitted && setSelectedDay(day)}
              disabled={submitted}
              style={{
                width: `${100 / 7}%`,
                aspectRatio: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isSelected ? (
                <LinearGradient
                  colors={["#6B5591", "#9F3E83"]}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                      fontFamily: "PoppinsSemiBold",
                    }}
                  >
                    {day}
                  </Text>
                </LinearGradient>
              ) : (
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isToday ? PURPLE_LIGHT : "transparent",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: isToday
                        ? "PoppinsSemiBold"
                        : "PoppinsRegular",
                      color: isToday ? PURPLE : "#1a1a2e",
                    }}
                  >
                    {day}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <SubmitButton
        label={
          submitted
            ? "Date logged ✓"
            : selectedDay
              ? `Confirm ${MONTH_NAMES[month]} ${selectedDay}`
              : "Pick a date"
        }
        onPress={handleSubmit}
        disabled={!selectedDay || submitted}
      />
    </View>
  );
};

// ─── Symptom Form Widget ───────────────────────────────────────────────────────

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
const SEVERITY_LABELS = ["Mild", "Moderate", "Severe"];

const SymptomFormWidget: React.FC<{
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
      {/* Severity */}
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
          style={{ fontSize: 11, color: "#aaa", fontFamily: "PoppinsRegular" }}
        >
          1
        </Text>
        {/* Custom slider using TouchableOpacity segments */}
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
          style={{ fontSize: 11, color: "#aaa", fontFamily: "PoppinsRegular" }}
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
                    borderColor: submitted ? "#E8E8E8" : "#E0C8F8",
                    backgroundColor: submitted ? "#F8F8F8" : PURPLE_LIGHT,
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

      <SubmitButton
        label={submitted ? "Symptom logged ✓" : "Log Symptom"}
        onPress={handleSubmit}
        disabled={submitted}
      />
    </View>
  );
};

// ─── Cycle Form Widget ─────────────────────────────────────────────────────────

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

      <SubmitButton
        label={submitted ? "Cycle logged ✓" : "Log Cycle"}
        onPress={handleSubmit}
        disabled={!flow || submitted}
      />
    </View>
  );
};

// ─── InlineWidget (router) ─────────────────────────────────────────────────────

interface InlineWidgetProps {
  type: Message["widget"];
  onSubmit: (payload: any) => void;
  /** Driven from the store – true once the user has submitted this widget */
  submitted?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const InlineWidget: React.FC<InlineWidgetProps> = ({
  type,
  onSubmit,
  submitted = false,
  disabled,
  style,
}) => {
  return (
    <View style={style}>
      {type === "date_picker" && (
        <DatePickerWidget
          onSubmit={onSubmit}
          submitted={submitted}
          disabled={disabled}
        />
      )}
      {type === "symptom_form" && (
        <SymptomFormWidget
          onSubmit={onSubmit}
          submitted={submitted}
          disabled={disabled}
        />
      )}
      {type === "cycle_form" && (
        <CycleFormWidget
          onSubmit={onSubmit}
          submitted={submitted}
          disabled={disabled}
        />
      )}
    </View>
  );
};
