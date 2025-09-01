import AgeOfFirstPeriod from "@/src/components/PersonalInfoForm/BottomSheetComp/AgeOfFirstPeriod";
import SetPersonalInfoCalender from "@/src/components/PersonalInfoForm/BottomSheetComp/SetPersonalInfoCalender";
import CurrentStatus from "@/src/components/PersonalInfoForm/CurrentStatus";
import HormonalTreatment from "@/src/components/PersonalInfoForm/HormonalTreatment";
import MenstrualHistory from "@/src/components/PersonalInfoForm/MenstrualHistory";
import PersonalForm from "@/src/components/PersonalInfoForm/PersonalForm";
import SurgicalAndReproductiveHistory from "@/src/components/PersonalInfoForm/SurgicalAndReproductiveHistory";
import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
import Screen from "@/src/layout/Screen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

const PersonalInfoForm = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedDate, setSelectedDate] = React.useState<Date | any>(null);
  const [firstPeriod, setFirstPeriod] = React.useState("");


  // bottom sheet
  const snapPoints = useMemo(() => ["30%", "50%"], []);
  //open the bottom sheet

  const datebottomSheetRef = React.useRef<BottomSheet>(null);
  //close the bottom sheet
  const handleDateBottomSheetOpen = () => datebottomSheetRef.current?.expand();
  const handleDateBottomSheetClose = () => datebottomSheetRef.current?.close();

  const firstPeriodBottomSheetRef = React.useRef<BottomSheet>(null);
  //close the bottom sheet
  const handleFirstPeriodBottomSheetOpen = () =>
    firstPeriodBottomSheetRef.current?.expand();
  const handleFirstPeriodBottomSheetClose = () =>
    firstPeriodBottomSheetRef.current?.close();

  const formsStep = [
    "Personal Information",
    "Menstrual History",
    "Surgical & Reproductive History",
    "Current Status",
    "Hormonal Treatment",
  ];

  const totalSteps = formsStep.length;
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === totalSteps - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentIndex((prev) => prev + 1);
    }
    // Optionally: if you want to go to another screen after last step, use router.push or similar
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  console.log(
    "selectedDate:",
    selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No date selected"
  );

  const dateValue = selectedDate ? format(selectedDate, "MMMM d, yyyy") : "";

  return (
    <>
      <Screen scroll={true} className="">
        {/* Back to previous screen (navigation) */}
        <TouchableOpacity
          className="px-8 my-4"
          onPress={() => {
            router.back();
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>

        {/* Form Steps Progress */}
        <View className="px-8 flex-1">
          <View className="flex-row px-4 pt-4">
            {formsStep.map((form, index) => (
              <React.Fragment key={form}>
                <TouchableOpacity
                  className="flex-1 items-center"
                  // onPress={() => {
                  //   if (index <= currentIndex) {
                  //     setCurrentIndex(index); // Allow going back to completed steps
                  //   }
                  // }}
                >
                  {/* Progress Line */}
                  <View
                    className={`border-t-4 w-full h-1 ${
                      index === currentIndex
                        ? "border-primary" // Current step (e.g., purple)
                        : index < currentIndex
                        ? "border-primary" // Completed steps (e.g., green or darker purple)
                        : "border-[#D0D5DD]" // Upcoming steps (neutral gray)
                    }`}
                  />
                </TouchableOpacity>
                {index < formsStep.length - 1 && <View className="w-4" />}
                {/* Spacer between segments */}
              </React.Fragment>
            ))}
          </View>

          {/* Render current form step */}
          {currentIndex === 0 && (
            <PersonalForm
              selectedDate={dateValue}
              handleDateBottomSheetOpen={handleDateBottomSheetOpen}
            />
          )}
          {currentIndex === 1 && (
            <MenstrualHistory
              handleFirstPeriodBottomSheetOpen={
                handleFirstPeriodBottomSheetOpen
              }
              firstPeriod={firstPeriod}
              setFirstPeriod={setFirstPeriod}
            />
          )}
          {currentIndex === 2 && <SurgicalAndReproductiveHistory />}
          {currentIndex === 3 && <CurrentStatus />}
          {currentIndex === 4 && <HormonalTreatment />}
        </View>

        {/* Navigation Buttons */}
        <View className="p-8 my-5 flex-row items-center justify-between">
          {/* Previous Button - Hidden on first step */}
          {!isFirstStep && (
            <TouchableOpacity
              className="items-center justify-center w-14 h-14 rounded-full border border-primary"
              onPress={handlePrev}
            >
              <Ionicons name="arrow-back" size={24} color="#8A3FFC" />
            </TouchableOpacity>
          )}

          {/* Spacer to keep Next button on right when Prev is hidden */}
          {isFirstStep && <View className="w-14 h-14" />}

          {/* Next Button */}
          <TouchableOpacity
            onPress={handleNext}
            disabled={isLastStep}
            className={`items-center justify-center w-14 h-14 rounded-full ${
              isLastStep ? "bg-primaryLight" : "bg-primary"
            }`}
          >
            <Ionicons
              name="arrow-forward"
              size={24}
              color={isLastStep ? "#B0B0B0" : "#fff"}
            />
          </TouchableOpacity>
        </View>
        <BottomSheetScreen
          snapPoints={snapPoints}
          ref={datebottomSheetRef}
          isBackdropComponent={true}
          enablePanDownToClose={true}
          index={-1}
          message={
            <SetPersonalInfoCalender
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              handleDateBottomSheetClose={handleDateBottomSheetClose}
            />
          }
        />
        <BottomSheetScreen
          snapPoints={snapPoints}
          ref={firstPeriodBottomSheetRef}
          isBackdropComponent={true}
          enablePanDownToClose={true}
          index={-1}
          message={
            <AgeOfFirstPeriod
              handleFirstPeriodBottomSheetClose={
                handleFirstPeriodBottomSheetClose
              }
              firstPeriod={firstPeriod}
              setFirstPeriod={setFirstPeriod}
            />
          }
        />
      </Screen>
    </>
  );
};

export default PersonalInfoForm;
