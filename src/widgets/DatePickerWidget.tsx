import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onDateSelected: (dateStr: string) => void;
  disabled?: boolean;
};

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const GRAD: [string, string, string, string] = [
  "#6B5591",
  "#6E3F8C",
  "#853385",
  "#9F3E83",
];

export default function DatePickerWidget({ onDateSelected, disabled }: Props) {
  const today = new Date();
  const [year, setYear] = React.useState(today.getFullYear());
  const [month, setMonth] = React.useState(today.getMonth());
  const [selected, setSelected] = React.useState<number | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells: { day: number; current: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ day: prevMonthDays - i, current: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true });
  while (cells.length % 7 !== 0)
    cells.push({
      day: cells.length - daysInMonth - firstDay + 1,
      current: false,
    });

  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const handleSelect = (day: number) => {
    if (disabled || selected) return;
    setSelected(day);
    const date = new Date(year, month, day);
    const str = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    onDateSelected(str);
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handlePrev}
          style={styles.navBtn}
          disabled={!!disabled}
        >
          <Text style={styles.navText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthLabel}>
          {MONTHS[month]} {year}
        </Text>
        <TouchableOpacity
          onPress={handleNext}
          style={styles.navBtn}
          disabled={!!disabled}
        >
          <Text style={styles.navText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Day labels */}
      <View style={styles.grid}>
        {DAYS.map((d, i) => (
          <Text key={i} style={styles.dayLabel}>
            {d}
          </Text>
        ))}

        {/* Day cells */}
        {cells.map((cell, i) => {
          const isSelected = cell.current && selected === cell.day;
          const isTod = cell.current && isToday(cell.day);

          if (isSelected) {
            return (
              <LinearGradient
                key={i}
                colors={GRAD}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cellGrad}
              >
                <Text style={styles.cellTextSelected}>{cell.day}</Text>
              </LinearGradient>
            );
          }

          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.cell,
                isTod && styles.cellToday,
                !cell.current && styles.cellOther,
              ]}
              onPress={() => cell.current && handleSelect(cell.day)}
              disabled={!cell.current || !!disabled}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.cellText,
                  isTod && styles.cellTextToday,
                  !cell.current && styles.cellTextOther,
                ]}
              >
                {cell.day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const CELL = 36;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E9D7FE",
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  navBtn: { padding: 4 },
  navText: { fontSize: 20, color: "#712A87", fontWeight: "600" },
  monthLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#101828",
    fontFamily: "PoppinsSemiBold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayLabel: {
    width: `${100 / 7}%`,
    textAlign: "center",
    fontSize: 11,
    color: "#667085",
    paddingVertical: 4,
    fontFamily: "PoppinsRegular",
  },
  cell: {
    width: `${100 / 7}%`,
    height: CELL,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: CELL / 2,
  },
  cellGrad: {
    width: `${100 / 7}%`,
    height: CELL,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: CELL / 2,
  },
  cellToday: { backgroundColor: "#E9D7FE" },
  cellOther: {},
  cellText: { fontSize: 13, color: "#101828", fontFamily: "PoppinsRegular" },
  cellTextToday: { color: "#712A87", fontWeight: "700" },
  cellTextOther: { color: "#D0D5DD" },
  cellTextSelected: {
    fontSize: 13,
    color: "#fff",
    fontFamily: "PoppinsSemiBold",
  },
});
