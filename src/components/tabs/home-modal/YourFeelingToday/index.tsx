// import { useCreateLogApi } from "@/src/api_services/logApi/logMutation";
// import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
// import CustomButton from "@/src/custom-components/CustomButton";
// import useSymtomsStore from "@/src/store/symtomsStore";
// import { MaterialIcons } from "@expo/vector-icons";
// import BottomSheet from "@gorhom/bottom-sheet";
// import { format } from "date-fns";
// import React, { useMemo, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Text, TouchableOpacity, View } from "react-native";
// import AddNote from "./addnote";
// import Symptoms from "./symptoms";
// import DurationList from "./symptoms/bottomSheetComp/DurationList";
// import SetWhenDidHappenCalender from "./symptoms/bottomSheetComp/SetWhenDidHappenCalender";
// import TriggersActivities from "./TriggersActivities";

// const YourFeelingToday = ({ onCancel }: any) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const [selectedList, setSelectedList] = React.useState<string | null>(null);
//    const [selectedSeverityLevel, setSelectedSeverityLevel] = React.useState<
//      number | null
//    >(null);

//   const [selectedDate, setSelectedDate] = React.useState(null);
//   const [durationData, setDurationData] = React.useState("");

//   const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);

//   const [notePublicUrls, setNotePublicUrls] = React.useState<string[]>([]);
//    const [publicUrls, setPublicUrls] = React.useState<string[]>([]);

//   console.log("selectedSeverityLevel200", selectedSeverityLevel);;
//   const publicUrl = useSymtomsStore().symtomsDataList.publicUrl;
//   const notePublicUrl = useSymtomsStore().symtomsDataList.notePublicUrl;

  
  

//   const formMethods = useForm({
//     mode: "onChange",
//     defaultValues: {
//       symptoms: "",
//       notes: "",
//     },
//   });

//   const {
//     handleSubmit,
//     reset,
//     formState: { errors, isValid },
//   } = formMethods;

//   React.useEffect(() => {
//     if (selectedList) {
//       reset({
//         symptoms: selectedList,
//         //  notes: selectedLastSymptom.notes,
//       });
//     }
//   }, [selectedList, reset]);

//   const tellUsHowYouFeel = ["Symptoms", "Triggers & Activities", "Add Note"];

//   // Update handleSelectFeeling to set the index directly
//   const handleSelectFeeling = (item: any, index: number) => {
//     setActiveIndex(index);
//     console.log("item:", item);
//   };

//   // all the bottom sheet handler
//   const snapPoints = useMemo(() => ["30%", "50%"], []);

//   const datebottomSheetRef = React.useRef<BottomSheet>(null);
//   const handleDateBottomSheetOpen = () => datebottomSheetRef.current?.expand();
//   const handleDateBottomSheetClose = () => datebottomSheetRef.current?.close();

//   const durationBottomSheetRef = React.useRef<BottomSheet>(null);
//   const handleDurationBottomSheetOpen = () =>
//     durationBottomSheetRef.current?.expand();
//   const handleDurationBottomSheetClose = () =>
//     durationBottomSheetRef.current?.close();

//   // formatting Date
//   const dateValue = selectedDate ? format(selectedDate, "dd-MM-yyy") : "";

//   console.log("all-datas200", {
//     symptoms: selectedList,
//     icon: selectedList,
//     severityLevel: selectedSeverityLevel,
//     triggers: selectedTriggers,
//     startDate: selectedDate,
//     duration: durationData,
//     symptomImages: publicUrls,
//     images: notePublicUrls,
//   });

//   const createLogApi = useCreateLogApi();

//   const onSubmit = (data:any) => {
//     const requestedPayload = {
//       symptoms: data?.symptoms || selectedList,
//       icon: selectedList,
//       severityLevel: selectedSeverityLevel,
//       triggers: selectedTriggers,
//       startDate: selectedDate,
//       symptomImages: publicUrl,
//       images: notePublicUrl,
//       notes: data.notes,
//       duration: durationData,
//     };

//     console.log("requestedPayload:", requestedPayload);
//   };

//   return (
//     <>
//       <View className=" w-96 p-5 bg-white rounded-lg  shadow-lg overflow-hidden">
//         <View className=" flex-row items-center justify-between">
//           <Text>How do you Feel today? </Text>
//           <TouchableOpacity onPress={onCancel}>
//             <MaterialIcons name="close" size={24} color="black" />
//           </TouchableOpacity>
//         </View>
//         <View className=" flex-row items-center justify-between mt-5">
//           {tellUsHowYouFeel.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               className={` ${
//                 activeIndex === index ? " border-b border-[#42307D] p-2" : null
//               }`}
//               onPress={() => {
//                 handleSelectFeeling(item, index);
//               }}
//             >
//               <Text
//                 className={`text-sm font-[PoppinsRegular]  ${
//                   activeIndex === index ? "text-[#42307D]" : "text-[#D6BBFB]"
//                 }`}
//               >
//                 {item}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <View>
//           {activeIndex === 0 && (
//             <Symptoms
//               errors={errors}
//               control={formMethods.control}
//               handleDateBottomSheetOpen={handleDateBottomSheetOpen}
//               handleDurationBottomSheetOpen={handleDurationBottomSheetOpen}
//               selectedDate={dateValue}
//               durationData={durationData}
//               selectedList={selectedList}
//               setSelectedList={setSelectedList}
//               selectedSeverityLevel={selectedSeverityLevel}
//               setSelectedSeverityLevel={setSelectedSeverityLevel}
//               setPublicUrls={setPublicUrls}
//             />
//           )}
//           {activeIndex === 1 && (
//             <TriggersActivities
//               selectedTriggers={selectedTriggers}
//               setSelectedTriggers={setSelectedTriggers}
//             />
//           )}
//           {activeIndex === 2 && (
//             <AddNote
//               errors={errors}
//               control={formMethods.control}
//               setNotePublicUrls={setNotePublicUrls}
//             />
//           )}
//         </View>
//         <View className="my-3">
//           <CustomButton primary title="Add" onPress={handleSubmit(onSubmit)} />
//         </View>
//       </View>
//       <BottomSheetScreen
//         snapPoints={snapPoints}
//         ref={datebottomSheetRef}
//         isBackdropComponent={true}
//         enablePanDownToClose={true}
//         index={-1}
//         message={
//           <SetWhenDidHappenCalender
//             selectedDate={selectedDate}
//             setSelectedDate={setSelectedDate}
//             handleDateBottomSheetClose={handleDateBottomSheetClose}
//           />
//         }
//       />

//       <BottomSheetScreen
//         snapPoints={snapPoints}
//         ref={durationBottomSheetRef}
//         isBackdropComponent={true}
//         enablePanDownToClose={true}
//         index={-1}
//         message={
//           <DurationList
//             handleDurationBottomSheetClose={handleDurationBottomSheetClose}
//             durationData={durationData}
//             setDurationData={setDurationData}
//           />
//         }
//       />
//     </>
//   );
// };

// export default YourFeelingToday;



import { useCreateLogApi } from "@/src/api_services/logApi/logMutation";
import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
import CustomButton from "@/src/custom-components/CustomButton";
import useSymtomsStore from "@/src/store/symtomsStore";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import AddNote from "./addnote";
import Symptoms from "./symptoms";
import DurationList from "./symptoms/bottomSheetComp/DurationList";
import SetWhenDidHappenCalender from "./symptoms/bottomSheetComp/SetWhenDidHappenCalender";
import TriggersActivities from "./TriggersActivities";

const YourFeelingToday = ({ onCancel }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedList, setSelectedList] = React.useState<string | null>(null);
  const [selectedSeverityLevel, setSelectedSeverityLevel] = React.useState<
    number | null
  >(null);

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [durationData, setDurationData] = React.useState("");

  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);

  const [notePublicUrls, setNotePublicUrls] = React.useState<string[]>([]);
  const [publicUrls, setPublicUrls] = React.useState<string[]>([]);

  console.log("notePublicUrls111", notePublicUrls);
  const publicUrl = useSymtomsStore().symtomsDataList.publicUrl;
  const notePublicUrl = useSymtomsStore().symtomsDataList.notePublicUrl;

  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {
      symptoms: "",
      notes: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = formMethods;

  React.useEffect(() => {
    if (selectedList) {
      reset({
        symptoms: selectedList,
      });
    }
  }, [selectedList, reset]);

  const tellUsHowYouFeel = ["Symptoms", "Triggers & Activities", "Add Note"];

  // Update handleSelectFeeling to set the index directly
  const handleSelectFeeling = (item: any, index: number) => {
    setActiveIndex(index);
    console.log("item:", item);
  };

  // Function to handle Next/Submit button click
  const handleButtonClick = () => {
    if (activeIndex < 2) {
      // Move to next step
      setActiveIndex(activeIndex + 1);
    } else {
      // Submit the form
      handleSubmit(onSubmit)();
    }
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (activeIndex) {
      case 0: // Symptoms step
        return (
          selectedList && selectedSeverityLevel && selectedDate && durationData
        );
      case 1: // Triggers step
        return true; // Triggers are optional, so always valid
      case 2: // Notes step
        return true; // Notes are optional, so always valid
      default:
        return false;
    }
  };

  // Determine button text and state
  const getButtonText = () => {
    return activeIndex === 2 ? "Submit" : "Next";
  };

  const isButtonDisabled = () => {
    return !isCurrentStepValid();
  };

  // all the bottom sheet handler
  const snapPoints = useMemo(() => ["30%", "50%"], []);

  const datebottomSheetRef = React.useRef<BottomSheet>(null);
  const handleDateBottomSheetOpen = () => datebottomSheetRef.current?.expand();
  const handleDateBottomSheetClose = () => datebottomSheetRef.current?.close();

  const durationBottomSheetRef = React.useRef<BottomSheet>(null);
  const handleDurationBottomSheetOpen = () =>
    durationBottomSheetRef.current?.expand();
  const handleDurationBottomSheetClose = () =>
    durationBottomSheetRef.current?.close();

  // formatting Date
  const dateValue = selectedDate ? format(selectedDate, "dd-MM-yyy") : "";

  console.log("all-datas200", {
    symptoms: selectedList,
    icon: selectedList,
    severityLevel: selectedSeverityLevel,
    triggers: selectedTriggers,
    startDate: selectedDate,
    duration: durationData,
    symptomImages: publicUrls,
    images: notePublicUrls,
  });

  const createLogApi = useCreateLogApi(onCancel);

  const onSubmit = (data: any) => {
    const requestedPayload = {
      symptoms: data?.symptoms || selectedList,
      icon: selectedList,
      severityLevel: selectedSeverityLevel,
      triggers: selectedTriggers,
      startDate: selectedDate,
      symptomImages: publicUrl,
      images: notePublicUrl,
      notes: data.notes,
      duration: durationData,
      recommendation: "Drink More Water",
    };

    createLogApi.mutate(requestedPayload);

    console.log("requestedPayload:", requestedPayload);
   
  };

  // console.log("selectedDate", selectedDate);

  return (
    <>
      <View className=" w-96 p-5 bg-white rounded-lg  shadow-lg overflow-hidden">
        <View className=" flex-row items-center justify-between">
          <Text>How do you Feel today? </Text>
          <TouchableOpacity onPress={onCancel}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className=" flex-row items-center justify-between mt-5">
          {tellUsHowYouFeel.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={` ${
                activeIndex === index ? " border-b border-[#42307D] p-2" : null
              }`}
              onPress={() => {
                handleSelectFeeling(item, index);
              }}
            >
              <Text
                className={`text-sm font-[PoppinsRegular]  ${
                  activeIndex === index ? "text-[#42307D]" : "text-[#D6BBFB]"
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          {activeIndex === 0 && (
            <Symptoms
              errors={errors}
              control={formMethods.control}
              handleDateBottomSheetOpen={handleDateBottomSheetOpen}
              handleDurationBottomSheetOpen={handleDurationBottomSheetOpen}
              selectedDate={dateValue}
              durationData={durationData}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
              selectedSeverityLevel={selectedSeverityLevel}
              setSelectedSeverityLevel={setSelectedSeverityLevel}
              setPublicUrls={setPublicUrls}
            />
          )}
          {activeIndex === 1 && (
            <TriggersActivities
              selectedTriggers={selectedTriggers}
              setSelectedTriggers={setSelectedTriggers}
            />
          )}
          {activeIndex === 2 && (
            <AddNote
              errors={errors}
              control={formMethods.control}
              notePublicUrls={notePublicUrls}
              setNotePublicUrls={setNotePublicUrls}
            />
          )}
        </View>
        <View className="my-3">
          <CustomButton
            primary
            title={getButtonText()}
            onPress={handleButtonClick}
            disabled={isButtonDisabled()}
            loading={createLogApi.isPending}
            // You might need to add opacity or style changes for disabled state
            // className={isButtonDisabled() ? "opacity-50" : ""}
          />
        </View>
      </View>
      <BottomSheetScreen
        snapPoints={snapPoints}
        ref={datebottomSheetRef}
        isBackdropComponent={true}
        enablePanDownToClose={true}
        index={-1}
        message={
          <SetWhenDidHappenCalender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleDateBottomSheetClose={handleDateBottomSheetClose}
          />
        }
      />

      <BottomSheetScreen
        snapPoints={snapPoints}
        ref={durationBottomSheetRef}
        isBackdropComponent={true}
        enablePanDownToClose={true}
        index={-1}
        message={
          <DurationList
            handleDurationBottomSheetClose={handleDurationBottomSheetClose}
            durationData={durationData}
            setDurationData={setDurationData}
          />
        }
      />
    </>
  );
};

export default YourFeelingToday;