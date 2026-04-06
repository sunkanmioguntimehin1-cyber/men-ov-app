import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  options: string[];
  onSelect: (option: string) => void;
  disabled?: boolean;
};

const GRADIENT: [string, string, string, string] = [
  "#6B5591",
  "#6E3F8C",
  "#853385",
  "#9F3E83",
];

export default function ActionsWidget({ options, onSelect, disabled }: Props) {
  const [selected, setSelected] = React.useState<string | null>(null);

  const handlePress = (opt: string) => {
    if (disabled || selected) return;
    setSelected(opt);
    onSelect(opt);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {options.map((opt) => {
        const isSelected = selected === opt;
        if (isSelected) {
          return (
            <LinearGradient
              key={opt}
              colors={GRADIENT}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.chipGrad}
            >
              <Text style={styles.chipTextSelected}>{opt}</Text>
            </LinearGradient>
          );
        }
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.chip, disabled && styles.chipDisabled]}
            onPress={() => handlePress(opt)}
            activeOpacity={0.75}
          >
            <Text style={styles.chipText}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#712A87",
    backgroundColor: "#fff",
  },
  chipGrad: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  chipText: {
    fontSize: 13,
    color: "#712A87",
    fontFamily: "PoppinsRegular",
  },
  chipTextSelected: {
    fontSize: 13,
    color: "#fff",
    fontFamily: "PoppinsRegular",
  },
});
