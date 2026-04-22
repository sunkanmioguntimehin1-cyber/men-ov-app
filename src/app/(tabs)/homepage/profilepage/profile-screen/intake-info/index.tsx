import {
  useEditIntakeDetailsApi,
  useEditUser,
} from "@/src/api_services/userApi/userMutation";
import {
  useGetIntakeDetails,
  useGetUser,
} from "@/src/api_services/userApi/userQuery";
import AgeOfFirstPeriod from "@/src/components/PersonalInfoForm/BottomSheetComp/AgeOfFirstPeriod";
import LastMenstrualPeriod from "@/src/components/PersonalInfoForm/BottomSheetComp/LastMenstrualPeriod";
import CurrentStatus from "@/src/components/PersonalInfoForm/CurrentStatus";
import HormonalTreatment from "@/src/components/PersonalInfoForm/HormonalTreatment";
import MenstrualHistory from "@/src/components/PersonalInfoForm/MenstrualHistory";
import SurgicalAndReproductiveHistory from "@/src/components/PersonalInfoForm/SurgicalAndReproductiveHistory";
import { GRADIENT_COLORS } from "@/src/constants";
import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
import KeyboardAwareScreen from "@/src/layout/KeyboardAwareScreen";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

const PersonalInfoForm = () => {
  const router = useRouter();

  const formsStep = [
    "Menstrual History",
    "Surgical & Reproductive History",
    "Current Status",
    "Hormonal Treatment",
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Menstrual
  const [firstPeriod, setFirstPeriod] = React.useState("");
  const [selectedLastMenstrualDate, setSelectedLastMenstrualDate] =
    React.useState<Date | null>(null);
  const [periodsStoppedAnswer, setPeriodsStoppedAnswer] = React.useState<
    boolean | null
  >(null);

  // Surgical
  const [isHysterectomy, setIsHysterectomy] = React.useState<boolean | null>(
    null,
  );
  const [isAvariesRemoved, setIsAvariesRemoved] = React.useState<
    boolean | null
  >(null);

  // Current status
  const [menopauseStage, setMenopauseStage] = React.useState("");

  // Hormonal
  const [isOnHormoneTherapy, setIsOnHormoneTherapy] = React.useState<
    boolean | null
  >(null);

  const getUserData = useGetUser();
  const getIntakeDetails = useGetIntakeDetails();

  const formMethods = useForm({ mode: "onChange" });

  const editUserProfile = useEditUser(() =>
    setCurrentIndex((prev) => prev + 1),
  );

  const editIntakeDetails = useEditIntakeDetailsApi();

  React.useEffect(() => {
    if (getIntakeDetails?.data) {
      setFirstPeriod(getIntakeDetails.data.ageOfFirstPeriod ?? "");
      setSelectedLastMenstrualDate(
        getIntakeDetails.data.dateOfLastPeriod
          ? new Date(getIntakeDetails.data.dateOfLastPeriod)
          : null,
      );
      setIsHysterectomy(getIntakeDetails.data.ishysterectomy ?? null);
      setIsAvariesRemoved(getIntakeDetails.data.isOvariesRemoved ?? null);
      setIsOnHormoneTherapy(getIntakeDetails.data.isOnHormoneTherapy ?? null);
      setPeriodsStoppedAnswer(
        getIntakeDetails.data.isPeriodsStopped12Months ?? null,
      );
      setMenopauseStage(getIntakeDetails.data.menopauseStage ?? "");
    }
  }, [getIntakeDetails?.data]);

  const lastDateValue = selectedLastMenstrualDate
    ? format(selectedLastMenstrualDate, "yyyy-MM-dd")
    : "";

  const validateCurrentStep = () => {
    switch (currentIndex) {
      case 0:
        return firstPeriod;
      case 1:
        return isHysterectomy !== null && isAvariesRemoved !== null;
      case 2:
        return menopauseStage !== "";
      case 3:
        return isOnHormoneTherapy !== null;
      default:
        return false;
    }
  };

  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === formsStep.length - 1;
  const isDisabled = !validateCurrentStep();

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }
  };

  const handleSave = () => {
    // if (!isLastStep) {
    //   setCurrentIndex((prev) => prev + 1);
    //   return;
    // }

    editIntakeDetails.mutate({
      ageOfFirstPeriod: firstPeriod,
      dateOfLastPeriod: lastDateValue,
      isPeriodsStopped12Months: periodsStoppedAnswer,
      ishysterectomy: isHysterectomy,
      isOvariesRemoved: isAvariesRemoved,
      menopauseStage: menopauseStage.toLowerCase(),
      isOnHormoneTherapy: isOnHormoneTherapy,
    });
  };

  // Bottom sheets
  const snapPoints = useMemo(() => ["30%", "50%"], []);
  const firstPeriodRef = React.useRef<BottomSheet>(null);
  const lastPeriodRef = React.useRef<BottomSheet>(null);

  return (
    <KeyboardAwareScreen scroll keyboardAware>
      <FormProvider {...formMethods}>
        {/* HEADER */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            disabled={isFirstStep}
            onPress={() => setCurrentIndex((p) => p - 1)}
            className="h-11 w-11 rounded-full border border-[#9F3E83] items-center justify-center"
            style={{ opacity: isFirstStep ? 0.4 : 1 }}
          >
            <Ionicons name="arrow-back" size={20} color="#9F3E83" />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={isDisabled}
            onPress={handleNext}
            // className="h-11 w-11 rounded-full bg-[#9F3E83] items-center justify-center"
            style={{ opacity: isDisabled ? 0.4 : 1 }}
          >
            <LinearGradient
              colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              // className="items-center justify-center py-4"
              style={{
                minHeight: 44,
                width: 44,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
              }}
            >
              <Ionicons name="arrow-forward" size={24} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <View className="flex-[4] px-6">
          {currentIndex === 0 && (
            <MenstrualHistory
              handleFirstPeriodBottomSheetOpen={() =>
                firstPeriodRef.current?.expand()
              }
              handleLastPeriodOpen={() => lastPeriodRef.current?.expand()}
              selectedDate={lastDateValue}
              setSelected={setSelectedLastMenstrualDate}
              firstPeriod={firstPeriod}
              setFirstPeriod={setFirstPeriod}
              periodsStoppedAnswer={periodsStoppedAnswer}
              setPeriodsStoppedAnswer={setPeriodsStoppedAnswer}
            />
          )}

          {currentIndex === 1 && (
            <SurgicalAndReproductiveHistory
              isHysterectomy={isHysterectomy}
              setIsHysterectomy={setIsHysterectomy}
              isAvariesRemoved={isAvariesRemoved}
              setIsAvariesRemoved={setIsAvariesRemoved}
            />
          )}

          {currentIndex === 2 && (
            <CurrentStatus
              menopauseStage={menopauseStage}
              setMenopauseStage={setMenopauseStage}
            />
          )}

          {currentIndex === 3 && (
            <HormonalTreatment
              isOnHormoneTherapy={isOnHormoneTherapy}
              setIsOnHormoneTherapy={setIsOnHormoneTherapy}
            />
          )}
        </View>

        {/* FOOTER */}
        <View className=" flex-1 flex-row px-6 ">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 mr-3 h-12 rounded-xl border border-gray-300 items-center justify-center"
          >
            <Text className="text-gray-700 font-medium">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSave}
            disabled={isDisabled}
            className="flex-1 rounded-lg overflow-hidden"
          >
            <LinearGradient
              colors={GRADIENT_COLORS}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              // className="h-14 flex-row items-center justify-center"
              style={{
                minHeight: 42,
                flexDirection: "row",
                // padding: Platform.OS === "ios" ? 16 : 16,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }}
            >
              {editIntakeDetails.isPending ? (
                <Text className="text-white font-semibold">Saving...</Text>
              ) : (
                <Text className="text-white font-semibold">Save</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </FormProvider>

      {/* Bottom Sheets */}
      <BottomSheetScreen
        ref={firstPeriodRef}
        snapPoints={snapPoints}
        index={-1}
        message={
          <AgeOfFirstPeriod
            firstPeriod={firstPeriod}
            setFirstPeriod={setFirstPeriod}
            handleFirstPeriodBottomSheetClose={() =>
              firstPeriodRef.current?.close()
            }
          />
        }
      />

      <BottomSheetScreen
        ref={lastPeriodRef}
        snapPoints={snapPoints}
        index={-1}
        message={
          <LastMenstrualPeriod
            selectedDate={selectedLastMenstrualDate}
            setSelectedDate={setSelectedLastMenstrualDate}
            handleDateBottomSheetClose={() => lastPeriodRef.current?.close()}
          />
        }
      />
    </KeyboardAwareScreen>
  );
};

export default PersonalInfoForm;
