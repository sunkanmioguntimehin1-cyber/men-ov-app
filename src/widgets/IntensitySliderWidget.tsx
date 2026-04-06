import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onSubmit: (value: number) => void;
  disabled?: boolean;
};

const GRAD: [string, string, string, string] = [
  "#6B5591",
  "#6E3F8C",
  "#853385",
  "#9F3E83",
];

export default function IntensitySliderWidget({ onSubmit, disabled }: Props) {
  const [value, setValue] = React.useState(5);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    if (disabled || submitted) return;
    setSubmitted(true);
    onSubmit(Math.round(value));
  };

  return (
    <View style={styles.card}>
      <View style={styles.labelRow}>
        <Text style={styles.labelMild}>Mild</Text>
        <Text style={styles.labelSevere}>Severe</Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={value}
        onValueChange={setValue}
        minimumTrackTintColor="#9F3E83"
        maximumTrackTintColor="#E9D7FE"
        thumbTintColor="#712A87"
        disabled={submitted || disabled}
      />

      <View style={styles.tickRow}>
        {[1, 5, 10].map((t) => (
          <Text key={t} style={styles.tick}>
            {t}
          </Text>
        ))}
      </View>

      {!submitted ? (
        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.85}>
          <LinearGradient
            colors={GRAD}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Record — {Math.round(value)}/10</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View style={styles.btnDone}>
          <Text style={styles.btnTextDone}>
            Recorded: {Math.round(value)}/10 ✓
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E9D7FE",
    padding: 14,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  labelMild: { fontSize: 12, color: "#667085", fontFamily: "PoppinsRegular" },
  labelSevere: { fontSize: 12, color: "#667085", fontFamily: "PoppinsRegular" },
  slider: { width: "100%", height: 40 },
  tickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  tick: { fontSize: 11, color: "#667085", fontFamily: "PoppinsRegular" },
  btn: {
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  btnText: { fontSize: 14, color: "#fff", fontFamily: "PoppinsMedium" },
  btnDone: {
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#E9D7FE",
  },
  btnTextDone: { fontSize: 14, color: "#712A87", fontFamily: "PoppinsMedium" },
});
