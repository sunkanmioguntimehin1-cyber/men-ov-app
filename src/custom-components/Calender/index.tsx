import AntDesign from "@expo/vector-icons/AntDesign";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameMonth,
  isToday,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Cell from "./Cell";

const CalenderModal: React.FC = ({
  selectedDate,
  setSelectedDate,
  closeSheet,
  handleDateBottomSheetClose,
}: any) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isYearPickerVisible, setYearPickerVisible] = useState<boolean>(false);

  // React.useEffect(() => {
  //   if (selectedDate) {
  //     const dateString = format(selectedDate, "yyyy-MM-dd");
  //   }
  // }, [selectedDate]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = subDays(monthStart, getDay(monthStart));
  const endDate = addDays(monthEnd, 6 - getDay(monthEnd));
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = (): void => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = (): void => setCurrentDate(addMonths(currentDate, 1));
  const handleDateSelect = (date: Date): void => {
    setSelectedDate(date);
    handleDateBottomSheetClose()
  };

  const handleYearPress = (): void => setYearPickerVisible(true);
  const handleYearSelect = (year: number): void => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setYearPickerVisible(false);
  };

  const renderYearItem = ({ item }: { item: number }) => (
    <>
      <TouchableOpacity
        style={styles.yearItem}
        onPress={() => handleYearSelect(item)}
      >
        <Text style={styles.yearItemText}>{item}</Text>
      </TouchableOpacity>
    </>
  );

  const years = Array.from(
    { length: 101 },
    (_, i) => new Date().getFullYear() - 50 + i
  );

  const timeRanges = Array.from({ length: 24 }, (_, i) => ({
    start: i,
    end: i + 1,
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        className=" items-center justify-center p-2 bg-primary rounded-md  w-20 self-end"
        onPress={handleDateBottomSheetClose}
      >
        <Text className=" text-white font-semibold ">Close</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleYearPress}>
          <Text className=" text-center">Select year</Text>
          <Text style={styles.headerTitle}>
            {format(currentDate, "MMMM yyyy")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextMonth}>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.weekDays}>
        {dayOfWeek.map((day) => (
          <Cell
            key={day}
            onPress={() => {}}
            isToday={false}
            isCurrentMonth={true}
            isSelected={false}
            hasTimeSlots={false}
          >
            <Text style={styles.weekDayText}>{day}</Text>
          </Cell>
        ))}
      </View>
      <View style={styles.days}>
        {calendarDays.map((day) => {
          const dateString = format(day, "yyyy-MM-dd");
          // console.log("day:", day);
          // console.log("dateString", dateString);

          return (
            <Cell
              key={day.toString()}
              onPress={() => handleDateSelect(day)}
              isToday={isToday(day)}
              isCurrentMonth={isSameMonth(day, currentDate)}
              isSelected={
                selectedDate ? day.getTime() === selectedDate.getTime() : false
              }
            >
              {format(day, "d")}
            </Cell>
          );
        })}
      </View>
      {/* {selectedDate && (
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>
            {format(selectedDate, "MMMM d, yyyy")}
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => closeSheet()}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )} */}
      <Modal
        visible={isYearPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setYearPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.yearPicker}>
            <TouchableOpacity
              style={styles.yearButton}
              // onPress={() => setYearPickerVisible(false)}
            >
              <Text style={styles.closeButtonText}> Select Year</Text>
            </TouchableOpacity>
            <FlatList
              data={years}
              renderItem={renderYearItem}
              keyExtractor={(item) => item.toString()}
              showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setYearPickerVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  headerButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekDays: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  weekDayText: {
    fontWeight: "bold",
  },
  days: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedDateContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedTimeSlotsText: {
    fontSize: 14,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  yearPicker: {
    width: 200,
    height: 300,
    backgroundColor: "white",
    borderRadius: 10,
  },
  yearItem: {
    padding: 10,
    alignItems: "center",
  },
  yearItemText: {
    fontSize: 18,
  },
  timePicker: {
    width: 300,
    height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  timePickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  timeSlot: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  selectedTimeSlot: {
    backgroundColor: "#007AFF",
  },
  timeSlotText: {
    fontSize: 16,
  },
  selectedTimeSlotText: {
    color: "#ffffff",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#8A3FFC",
    borderRadius: 5,
    alignItems: "center",
  },
  yearButton: {
    // marginTop: 20,
    padding: 10,
    backgroundColor: "#8A3FFC",
    // borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CalenderModal;









// import React, { useState } from "react";
// import {
//   FlatList,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const ITEM_HEIGHT = 40;

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const years = Array.from(
//   { length: 101 },
//   (_, i) => new Date().getFullYear() - 50 + i
// );

// const CalenderModal: React.FC<any> = ({
//   selectedDate,
//   setSelectedDate,
//   closeSheet,
// }) => {
//   const [tempDate, setTempDate] = useState(selectedDate || new Date());

//   const selectedMonth = tempDate.getMonth();
//   const selectedDay = tempDate.getDate();
//   const selectedYear = tempDate.getFullYear();

//   const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
//   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//   const updateDate = (
//     month = selectedMonth,
//     day = selectedDay,
//     year = selectedYear
//   ) => {
//     const newDate = new Date(year, month, day);
//     setTempDate(newDate);
//   };

//   const renderItem = (item, selectedValue, onSelect) => (
//     <TouchableOpacity style={styles.item} onPress={() => onSelect(item.index)}>
//       <Text
//         style={[
//           styles.itemText,
//           item.index === selectedValue
//             ? styles.selectedText
//             : styles.unselectedText,
//         ]}
//       >
//         {item.item}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <Modal
//       visible={true}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={closeSheet}
//     >
//       <View style={styles.modalOverlay}>
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={closeSheet}>
//               <Text style={styles.cancel}>Cancel</Text>
//             </TouchableOpacity>
//             <Text style={styles.title}>Start Date</Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedDate(tempDate);
//                 closeSheet();
//               }}
//             >
//               <Text style={styles.done}>Done</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Pickers */}
//           <View style={styles.pickerRow}>
//             {/* Month Picker */}
//             <FlatList
//               data={months}
//               keyExtractor={(item, idx) => idx.toString()}
//               renderItem={(item) =>
//                 renderItem(item, selectedMonth, (i) =>
//                   updateDate(i, selectedDay, selectedYear)
//                 )
//               }
//               getItemLayout={(_, index) => ({
//                 length: ITEM_HEIGHT,
//                 offset: ITEM_HEIGHT * index,
//                 index,
//               })}
//               showsVerticalScrollIndicator={false}
//               snapToInterval={ITEM_HEIGHT}
//               initialScrollIndex={selectedMonth}
//             />
//             {/* Day Picker */}
//             <FlatList
//               data={days}
//               keyExtractor={(item, idx) => idx.toString()}
//               renderItem={(item) =>
//                 renderItem(item, selectedDay - 1, (i) =>
//                   updateDate(selectedMonth, i + 1, selectedYear)
//                 )
//               }
//               getItemLayout={(_, index) => ({
//                 length: ITEM_HEIGHT,
//                 offset: ITEM_HEIGHT * index,
//                 index,
//               })}
//               showsVerticalScrollIndicator={false}
//               snapToInterval={ITEM_HEIGHT}
//               initialScrollIndex={selectedDay - 1}
//             />
//             {/* Year Picker */}
//             <FlatList
//               data={years}
//               keyExtractor={(item) => item.toString()}
//               renderItem={(item) =>
//                 renderItem(item, years.indexOf(selectedYear), (i) =>
//                   updateDate(selectedMonth, selectedDay, years[i])
//                 )
//               }
//               getItemLayout={(_, index) => ({
//                 length: ITEM_HEIGHT,
//                 offset: ITEM_HEIGHT * index,
//                 index,
//               })}
//               showsVerticalScrollIndicator={false}
//               snapToInterval={ITEM_HEIGHT}
//               initialScrollIndex={years.indexOf(selectedYear)}
//             />
//           </View>

//           {/* Selection highlight */}
//           <View style={styles.selectionOverlay} />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0,0,0,0.3)",
//   },
//   container: {
//     backgroundColor: "#f7f7f7",
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     overflow: "hidden",
//     paddingBottom: 20,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: "#f7f7f7",
//   },
//   cancel: { color: "red", fontSize: 16 },
//   done: { color: "#007AFF", fontSize: 16 },
//   title: { color: "#aaa", fontSize: 16 },
//   pickerRow: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     height: ITEM_HEIGHT * 5,
//   },
//   item: {
//     height: ITEM_HEIGHT,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   itemText: { fontSize: 18 },
//   selectedText: { fontWeight: "bold", color: "black" },
//   unselectedText: { color: "#aaa" },
//   selectionOverlay: {
//     position: "absolute",
//     top: 50,
//     height: ITEM_HEIGHT,
//     width: "100%",
//     backgroundColor: "rgba(0,0,0,0.05)",
//   },
// });

// export default CalenderModal;
