// import { rS, rV } from "@/src/lib/responsivehandler";
// import { MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useEffect, useState } from "react";
// import {
//   Platform,
//   Text,
//   TouchableOpacity,
//   View,
//   ViewStyle,
// } from "react-native";

// const CARD_STYLE: ViewStyle = {
//   backgroundColor: "white",
//   height: Platform.OS === "ios" ? rV(280) : rV(300),
//   maxWidth: rS(260),
//   width: rS(260),
//   // height: "auto",
//   borderRadius: 16,
//   borderWidth: 1,
//   borderColor: "rgba(107,85,145,0.15)",
//   padding: 16,
//   shadowColor: "#6B5591",
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.08,
//   shadowRadius: 8,
//   elevation: 3,
// };

// const PURPLE = "#6B5591";
// const PURPLE_LIGHT = "#F8F0FF";

// const MONTH_NAMES = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

// const SubmitButton: React.FC<{
//   label: string;
//   onPress: () => void;
//   disabled?: boolean;
// }> = ({ label, onPress, disabled }) => (
//   <TouchableOpacity
//     onPress={onPress}
//     disabled={disabled}
//     activeOpacity={0.85}
//     style={{ marginTop: 12 }}
//   >
//     <LinearGradient
//       colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 0 }}
//       style={{ borderRadius: 12, paddingVertical: 11, alignItems: "center" }}
//     >
//       <Text
//         style={{ color: "white", fontSize: 14, fontFamily: "PoppinsSemiBold" }}
//       >
//         {label}
//       </Text>
//     </LinearGradient>
//   </TouchableOpacity>
// );

// export const DatePickerWidget: React.FC<{
//   onSubmit: (payload: any) => void;
//   onDateSelected?: (dateStr: string) => void;
//   submitted?: boolean;
//   disabled?: boolean;
//   messageId?: string;
//   initialDate?: string;
// }> = ({
//   onSubmit,
//   onDateSelected,
//   submitted = false,
//   disabled,
//   messageId,
//   initialDate,
// }) => {
//   const today = new Date();
//   const [year, setYear] = useState(today.getFullYear());
//   const [month, setMonth] = useState(today.getMonth());
//   const [selectedDay, setSelectedDay] = useState<number | null>(null);

//   useEffect(() => {
//     if (initialDate && submitted) {
//       const parts = initialDate.split("-");
//       if (parts.length === 3) {
//         const y = parseInt(parts[0], 10);
//         const m = parseInt(parts[1], 10) - 1;
//         const d = parseInt(parts[2], 10);
//         if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
//           setYear(y);
//           setMonth(m);
//           setSelectedDay(d);
//         }
//       }
//     }
//   }, [initialDate, submitted]);

//   const firstDayOfWeek = new Date(year, month, 1).getDay();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const prevMonthDays = new Date(year, month, 0).getDate(); // ← from Code 1

//   // ── Build unified cells array (Code 1 approach: leading + current + trailing) ──
//   type Cell = { day: number; current: boolean };
//   const cells: Cell[] = [];

//   // Leading days from previous month
//   for (let i = firstDayOfWeek - 1; i >= 0; i--)
//     cells.push({ day: prevMonthDays - i, current: false });

//   // Current month days
//   for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true });

//   // Trailing days to complete the last row (from Code 1)
//   let trailing = 1;
//   while (cells.length % 7 !== 0)
//     cells.push({ day: trailing++, current: false });

//   const prevMonth = () => {
//     if (month === 0) {
//       setMonth(11);
//       setYear((y) => y - 1);
//     } else setMonth((m) => m - 1);
//     setSelectedDay(null);
//   };

//   const nextMonth = () => {
//     if (month === 11) {
//       setMonth(0);
//       setYear((y) => y + 1);
//     } else setMonth((m) => m + 1);
//     setSelectedDay(null);
//   };

//   const handleDayPress = (day: number) => {
//     if (disabled || submitted || selectedDay !== null) return;
//     setSelectedDay(day);

//     if (onDateSelected) {
//       const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
//       onDateSelected(dateStr);
//     }
//   };

//   const handleSubmit = () => {
//     if (!selectedDay || submitted) return;
//     const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
//     onSubmit({ date });
//   };

//   const isToday = (day: number) =>
//     today.getFullYear() === year &&
//     today.getMonth() === month &&
//     today.getDate() === day;

//   return (
//     <View style={CARD_STYLE}>
//       {/* Navigation */}
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: 12,
//         }}
//       >
//         <TouchableOpacity
//           onPress={prevMonth}
//           disabled={!!disabled || submitted}
//           style={{ padding: 6 }}
//         >
//           <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontSize: 15,
//             fontFamily: "PoppinsSemiBold",
//             color: "#1a1a2e",
//           }}
//         >
//           {MONTH_NAMES[month]} {year}
//         </Text>
//         <TouchableOpacity
//           onPress={nextMonth}
//           disabled={!!disabled || submitted}
//           style={{ padding: 6 }}
//         >
//           <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
//         </TouchableOpacity>
//       </View>

//       {/* Day headers */}
//       <View style={{ flexDirection: "row", marginBottom: 4 }}>
//         {DAY_LABELS.map((d, i) => (
//           <View key={i} style={{ flex: 1, alignItems: "center" }}>
//             <Text
//               style={{
//                 fontSize: 11,
//                 color: "#999",
//                 fontFamily: "PoppinsMedium",
//               }}
//             >
//               {d}
//             </Text>
//           </View>
//         ))}
//       </View>

//       {/* Days grid — now uses unified cells array with trailing days */}
//       <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//         {cells.map((cell, i) => {
//           const isSelected = cell.current && selectedDay === cell.day;
//           const isTod = cell.current && isToday(cell.day);

//           // Selected day: gradient circle
//           if (isSelected) {
//             return (
//               <View
//                 key={i}
//                 style={{
//                   width: `${100 / 7}%`,
//                   aspectRatio: 1,
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <LinearGradient
//                   colors={["#6B5591", "#9F3E83"]}
//                   style={{
//                     width: 32,
//                     height: 32,
//                     borderRadius: 16,
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: "white",
//                       fontSize: 13,
//                       fontFamily: "PoppinsSemiBold",
//                     }}
//                   >
//                     {cell.day}
//                   </Text>
//                 </LinearGradient>
//               </View>
//             );
//           }

//           return (
//             <TouchableOpacity
//               key={i}
//               onPress={() => cell.current && handleDayPress(cell.day)}
//               disabled={!cell.current || !!disabled || submitted}
//               activeOpacity={0.7}
//               style={{
//                 width: `${100 / 7}%`,
//                 aspectRatio: 1,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <View
//                 style={{
//                   width: 32,
//                   height: 32,
//                   borderRadius: 16,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   backgroundColor: isTod ? PURPLE_LIGHT : "transparent",
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     fontFamily: isTod ? "PoppinsSemiBold" : "PoppinsRegular",
//                     // From Code 1: grey out other-month days
//                     color: !cell.current
//                       ? "#D0D5DD"
//                       : isTod
//                         ? PURPLE
//                         : "#1a1a2e",
//                   }}
//                 >
//                   {cell.day}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       <SubmitButton
//         label={
//           submitted
//             ? "Date logged ✓"
//             : selectedDay
//               ? `Confirm ${MONTH_NAMES[month]} ${selectedDay}`
//               : "Pick a date"
//         }
//         onPress={handleSubmit}
//         disabled={!selectedDay || submitted}
//       />
//     </View>
//   );
// };

import { rS, rV } from "@/src/lib/responsivehandler";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// ─── Styles & Constants ────────────────────────────────────────────────────────

const CARD_STYLE: ViewStyle = {
  backgroundColor: "white",
  height: Platform.OS === "ios" ? rV(300) : rV(320),
  maxWidth: rS(260),
  width: rS(260),
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

// Today's date for initial state and "today" highlighting
const TODAY = new Date();

// Year range: 1900 to 2100
const YEAR_START = 1900;
const YEAR_END = TODAY.getFullYear();
const YEARS = Array.from(
  { length: YEAR_END - YEAR_START + 1 },
  (_, i) => YEAR_START + i,
);

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

// ─── DatePickerWidget ──────────────────────────────────────────────────────────

export const DatePickerWidget: React.FC<{
  onSubmit: (payload: any) => void;
  onDateSelected?: (dateStr: string) => void;
  submitted?: boolean;
  disabled?: boolean;
  messageId?: string;
  initialDate?: string;
}> = ({
  onSubmit,
  onDateSelected,
  submitted = false,
  disabled,
  messageId,
  initialDate,
}) => {
  const [year, setYear] = useState(TODAY.getFullYear());
  const [month, setMonth] = useState(TODAY.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  // "calendar" | "year" — toggles when user taps the header
  const [mode, setMode] = useState<"calendar" | "year">("calendar");

  const yearScrollRef = useRef<ScrollView>(null);

  // ── Restore date if already submitted (history load) ──────────────────────
  useEffect(() => {
    if (initialDate && submitted) {
      const parts = initialDate.split("-");
      if (parts.length === 3) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const d = parseInt(parts[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
          setYear(y);
          setMonth(m);
          setSelectedDay(d);
        }
      }
    }
  }, [initialDate, submitted]);

  // ── Scroll year list so selected year is centred on open ─────────────────
  useEffect(() => {
    if (mode === "year") {
      const idx = YEARS.indexOf(year);
      if (idx !== -1 && yearScrollRef.current) {
        // Each year row is ~36px tall; scroll so it's roughly centred
        setTimeout(() => {
          yearScrollRef.current?.scrollTo({
            y: Math.max(0, idx * 36 - 72),
            animated: false,
          });
        }, 50);
      }
    }
  }, [mode]);

  // ── Calendar helpers ──────────────────────────────────────────────────────
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  type Cell = { day: number; current: boolean };
  const cells: Cell[] = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--)
    cells.push({ day: prevMonthDays - i, current: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true });
  let trailing = 1;
  while (cells.length % 7 !== 0)
    cells.push({ day: trailing++, current: false });

  const isToday = (day: number) =>
    TODAY.getFullYear() === year &&
    TODAY.getMonth() === month &&
    TODAY.getDate() === day;

  // ── Handlers ──────────────────────────────────────────────────────────────
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

  const handleDayPress = (day: number) => {
    if (disabled || submitted || selectedDay !== null) return;
    setSelectedDay(day);
    if (onDateSelected) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      onDateSelected(dateStr);
    }
  };

  const handleYearSelect = (y: number) => {
    setYear(y);
    setSelectedDay(null);
    setMode("calendar"); // snap back to calendar view
  };

  const handleSubmit = () => {
    if (!selectedDay || submitted) return;
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
    onSubmit({ date });
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <View style={CARD_STYLE}>
      {/* ── Header: [< Prev Year] [< Prev Month]  Month Year  [Next Month >] [Next Year >] ── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        {/* Left side: Prev Year | Prev Month */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              if (year > YEAR_START) {
                setYear((y) => y - 1);
                setSelectedDay(null);
              }
            }}
            disabled={
              !!disabled || submitted || mode === "year" || year <= YEAR_START
            }
            style={{ padding: 4 }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={
                disabled || submitted || mode === "year" || year <= YEAR_START
                  ? "#CCC"
                  : "black"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={prevMonth}
            disabled={!!disabled || submitted || mode === "year"}
            style={{ padding: 4 }}
          >
            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Center: Tappable "Month Year" label – toggles year picker */}
        <TouchableOpacity
          onPress={() =>
            !submitted &&
            !disabled &&
            setMode((m) => (m === "calendar" ? "year" : "calendar"))
          }
          disabled={submitted || !!disabled}
          activeOpacity={0.7}
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "PoppinsSemiBold",
              color: "#1a1a2e",
            }}
          >
            {MONTH_NAMES[month]} {year}
          </Text>
          <MaterialIcons
            name={mode === "year" ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color={PURPLE}
          />
        </TouchableOpacity>

        {/* Right side: Next Month | Next Year */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={nextMonth}
            disabled={!!disabled || submitted || mode === "year"}
            style={{ padding: 4 }}
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (year < YEAR_END) {
                setYear((y) => y + 1);
                setSelectedDay(null);
              }
            }}
            disabled={
              !!disabled || submitted || mode === "year" || year >= YEAR_END
            }
            style={{ padding: 4 }}
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={
                disabled || submitted || mode === "year" || year >= YEAR_END
                  ? "#CCC"
                  : "black"
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Year Picker (replaces calendar grid) ── */}
      {mode === "year" ? (
        <ScrollView
          // ref={yearScrollRef}
          // showsVerticalScrollIndicator={false}
          // style={{ flex: 1 }}
          // contentContainerStyle={{ paddingBottom: 4 }}
          ref={yearScrollRef}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          nestedScrollEnabled={true} // Important for Android
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          // Optional: improve scroll performance
          removeClippedSubviews={false}
        >
          {/* Month row at top so user can also change month while in year mode */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 12,
            }}
          >
            {MONTH_NAMES.map((mn, mi) => {
              const isCurrentMonth = mi === month;
              return (
                <TouchableOpacity
                  key={mn}
                  onPress={() => {
                    setMonth(mi);
                    setSelectedDay(null);
                  }}
                  activeOpacity={0.75}
                  style={{
                    width: "22%",
                    paddingVertical: 6,
                    borderRadius: 8,
                    alignItems: "center",
                    backgroundColor: isCurrentMonth ? PURPLE : PURPLE_LIGHT,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: isCurrentMonth
                        ? "PoppinsSemiBold"
                        : "PoppinsRegular",
                      color: isCurrentMonth ? "white" : PURPLE,
                    }}
                  >
                    {mn}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: "rgba(107,85,145,0.1)",
              marginBottom: 8,
            }}
          />

          {/* Year list */}
          {YEARS.map((y) => {
            const isSelected = y === year;
            const isCurrent = y === TODAY.getFullYear();
            return (
              <TouchableOpacity
                key={y}
                onPress={() => handleYearSelect(y)}
                activeOpacity={0.75}
                style={{
                  height: 36,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  marginBottom: 2,
                  backgroundColor: isSelected ? PURPLE : "transparent",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily:
                      isSelected || isCurrent
                        ? "PoppinsSemiBold"
                        : "PoppinsRegular",
                    color: isSelected
                      ? "white"
                      : isCurrent
                        ? PURPLE
                        : "#1a1a2e",
                  }}
                >
                  {y}
                </Text>
                {isCurrent && !isSelected && (
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: PURPLE,
                      marginLeft: 6,
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <>
          {/* ── Day-of-week headers ── */}
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

          {/* ── Days grid ── */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {cells.map((cell, i) => {
              const isSelected = cell.current && selectedDay === cell.day;
              const isTod = cell.current && isToday(cell.day);

              if (isSelected) {
                return (
                  <View
                    key={i}
                    style={{
                      width: `${100 / 7}%`,
                      aspectRatio: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
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
                        {cell.day}
                      </Text>
                    </LinearGradient>
                  </View>
                );
              }

              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => cell.current && handleDayPress(cell.day)}
                  disabled={!cell.current || !!disabled || submitted}
                  activeOpacity={0.7}
                  style={{
                    width: `${100 / 7}%`,
                    aspectRatio: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isTod ? PURPLE_LIGHT : "transparent",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: isTod
                          ? "PoppinsSemiBold"
                          : "PoppinsRegular",
                        color: !cell.current
                          ? "#D0D5DD"
                          : isTod
                            ? PURPLE
                            : "#1a1a2e",
                      }}
                    >
                      {cell.day}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Submit ── */}
          <SubmitButton
            label={
              submitted
                ? "Date logged ✓"
                : selectedDay
                  ? `Confirm ${MONTH_NAMES[month]} ${selectedDay}, ${year}`
                  : "Pick a date"
            }
            onPress={handleSubmit}
            disabled={!selectedDay || submitted}
          />
        </>
      )}
    </View>
  );
};
