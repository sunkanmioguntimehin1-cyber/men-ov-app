import type { WidgetName } from "@/src/store/chatStore";
import type { CyclePayload, SymptomPayload } from "@/src/widgets/messageParser";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CycleFormWidget } from "./CycleFormWidget";
import { DatePickerWidget } from "./DatePickerWidget";
import { SymptomFormWidget } from "./SymptomFormWidget";

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

// ─── InlineWidget (router) ─────────────────────────────────────────────────────

interface InlineWidgetProps {
  type: WidgetName;
  onSubmit: (payload: any) => void;
  submitted?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  messageId?: string;
  durationData?: string;
  selectedDate?: string;
  handleDateBottomSheetOpen?: () => void;
  handleDurationBottomSheetOpen?: () => void;
  initialDate?: string;
  initialCycle?: CyclePayload;
  initialSymptom?: SymptomPayload;
}

export const InlineWidget: React.FC<InlineWidgetProps> = ({
  type,
  onSubmit,
  submitted = false,
  disabled,
  style,
  messageId,
  selectedDate,
  durationData,
  handleDateBottomSheetOpen,
  handleDurationBottomSheetOpen,
  initialDate,
  initialCycle,
  initialSymptom,
}) => {
  return (
    <View style={style}>
      {type === "date_picker" && (
        <DatePickerWidget
          onSubmit={onSubmit}
          submitted={submitted}
          disabled={disabled}
          messageId={messageId}
          initialDate={initialDate}
        />
      )}
      {type === "symptom_form" && (
        <SymptomFormWidget
          onSubmit={onSubmit}
          submitted={submitted}
          disabled={disabled}
          messageId={messageId}
          selectedDate={selectedDate}
          handleDateBottomSheetOpen={handleDateBottomSheetOpen}
          initialSymptom={initialSymptom}
        />
      )}
      {type === "cycle_form" && (
        <CycleFormWidget
          onSubmit={onSubmit}
          submitted={submitted}
          disabled={disabled}
          selectedDate={selectedDate}
          durationData={durationData}
          handleDurationBottomSheetOpen={handleDurationBottomSheetOpen}
          handleDateBottomSheetOpen={handleDateBottomSheetOpen}
          messageId={messageId}
          initialCycle={initialCycle}
        />
      )}
    </View>
  );
};
