import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface CellProps {
  children: React.ReactNode;
  onPress: () => void;
  isToday: boolean;
  isCurrentMonth: boolean;
  isSelected: boolean;
  hasTimeSlots?: boolean;
}

const Cell: React.FC<CellProps> = ({
  children,
  onPress,
  isToday,
  isCurrentMonth,
  isSelected,
  hasTimeSlots,
}) => (
  <TouchableOpacity
    style={[
      styles.cell,
      isToday && styles.today,
      !isCurrentMonth && styles.otherMonth,
      isSelected && styles.selected,
      hasTimeSlots && styles.hasTimeSlots,
    ]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.cellText,
        isToday && styles.todayText,
        !isCurrentMonth && styles.otherMonthText,
        isSelected && styles.selectedText,
      ]}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cell: {
    width: "14.28%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  cellText: {
    fontSize: 16,
  },
  today: {
    backgroundColor: "#F4EBFF",
  },
  todayText: {
    fontWeight: "bold",
    color: "#712A87",
  },
  otherMonth: {
    backgroundColor: "#f9f9f9",
  },
  otherMonthText: {
    color: "#bdbdbd",
  },
  selected: {
    backgroundColor: "#712A87",
  },
  selectedText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  hasTimeSlots: {
    backgroundColor: "#d4edda",
  },
});

export default Cell;
