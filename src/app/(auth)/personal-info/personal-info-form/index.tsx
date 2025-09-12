import {
  useEditUser,
  useIntakeDetailsApi,
} from "@/src/api_services/userApi/userMutation";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import AgeOfFirstPeriod from "@/src/components/PersonalInfoForm/BottomSheetComp/AgeOfFirstPeriod";
import LastMenstrualPeriod from "@/src/components/PersonalInfoForm/BottomSheetComp/LastMenstrualPeriod";
import SetPersonalInfoCalender from "@/src/components/PersonalInfoForm/BottomSheetComp/SetPersonalInfoCalender";
import CurrentStatus from "@/src/components/PersonalInfoForm/CurrentStatus";
import HormonalTreatment from "@/src/components/PersonalInfoForm/HormonalTreatment";
import MenstrualHistory from "@/src/components/PersonalInfoForm/MenstrualHistory";
import PersonalForm from "@/src/components/PersonalInfoForm/PersonalForm";
import SurgicalAndReproductiveHistory from "@/src/components/PersonalInfoForm/SurgicalAndReproductiveHistory";
import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
import { useLocationSearch } from "@/src/hooks/useLocationSearch";
import Screen from "@/src/layout/Screen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";

interface Item {
  title: string;
  value: string;
  price?: string;
}

const dataItem = [
  { title: "Female", value: "female" },
  { title: "Male", value: "male" },
  { title: "Intersex", value: "Intersex" },
  // { title: "Farmer", value: "Farmer" },
];

const PersonalInfoForm = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedDate, setSelectedDate] = React.useState<Date | any>(null);
  const [selected, setSelected] = React.useState<Item | null>(null);

  //menstrual states
  const [periodsStoppedAnswer, setPeriodsStoppedAnswer] = React.useState<
    "yes" | "no" | null
  >(null);
  const [firstPeriod, setFirstPeriod] = React.useState("");
  const [selectedLastMenstrualDate, setSelectedLastMenstrualDate] =
    React.useState<Date | any>(null);

  //SurgicalAndReproductive
  const [isHysterectomy, setIsHysterectomy] = React.useState<
    "yes" | "no" | null
  >(null);
  const [isAvariesRemoved, setIsAvariesRemoved] = React.useState<
    "yes" | "no" | null
  >(null);
  //current status
  const [menopauseStage, setMenopauseStage] = React.useState("");
  const [isOnHormoneTherapy, setIsOnHormoneTherapy] = React.useState<
    "yes" | "no" | null
  >(null);

  const getUserData = useGetUser();

  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {
      address: "",
      fullname: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

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

  const lastMenstrualPeriodRef = React.useRef<BottomSheet>(null);
  //close the bottom sheet
  const handleLastPeriodOpen = () => lastMenstrualPeriodRef.current?.expand();
  const handleLastPeriodClose = () => lastMenstrualPeriodRef.current?.close();

  const formsStep = [
    "Personal Information",
    "Menstrual History",
    "Surgical & Reproductive History",
    "Current Status",
    "Hormonal Treatment",
  ];

  const dateValue = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const lastDateValue = selectedLastMenstrualDate
    ? format(selectedLastMenstrualDate, "yyyy-MM-dd")
    : "";

  const totalSteps = formsStep.length;
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === totalSteps - 1;

  const handleNext = (data: any) => {
    if (isFirstStep) {
      editUserProfile.mutate({
        fullname: data.fullname || getUserData?.data?.fullname,
        gender: selected?.value || getUserData?.data?.gender,
        address: data.address || getUserData?.data?.data?.address,
        dob: dateValue,
      });
    } else if (!isLastStep) {
      setCurrentIndex((prev) => prev + 1);
    } else if (isLastStep) {
      const requestedPayload = {
        ageOfFirstPeriod: firstPeriod,
        dateOfLastPeriod: lastDateValue,
        isPeriodsStopped12Months: periodsStoppedAnswer,
        ishysterectomy: isHysterectomy,
        isOvariesRemoved: isAvariesRemoved,
        menopauseStage: menopauseStage,
        isOnHormoneTherapy: isOnHormoneTherapy,
      };
      intakeDetails.mutate(requestedPayload);
    }
  };

  console.log("firstPeriod:", firstPeriod);
  console.log("lastDateValue:", lastDateValue);

  console.log("periodsStoppedAnswer:", periodsStoppedAnswer);

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNextBtn = () => {
    if (!isLastStep) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const editUserProfile = useEditUser(handleNextBtn);
  const intakeDetails = useIntakeDetailsApi();
  // console.log("editUserProfile:", editUserProfile);

  const {
    term,
    option,
    city,
    handleLocationChange,
    onOptionSelect,
    getSearchOptionQuery,
  } = useLocationSearch();

  // const getLocationDetails = useQuery({
  //   queryKey: ["location-details", city?.place_id],
  //   queryFn: () => fetchLocationDetails(city?.place_id),
  //   enabled: !!city?.place_id,
  // });

  const handleAddressSelect = (
    item: any,
    onChange: (value: string) => void
  ) => {
    onChange(item.description);
    onOptionSelect(item);
  };

  React.useEffect(() => {
    if (getUserData?.data) {
      const userGender = getUserData.data.gender;
      reset({
        fullname: getUserData?.data?.fullname,
        address: getUserData?.data?.data?.address,
      });
      const matchingGender = dataItem.find((item) => item.value === userGender);
      setSelected(matchingGender || null);
    }
  }, [getUserData?.data, reset]);

  return (
    <>
      <Screen scroll={true} className="">
        {/* Back to previous screen (navigation) */}
        <FormProvider {...formMethods}>
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
                setSelected={setSelected}
                selected={selected}
                errors={errors}
                control={formMethods.control}
                reset={reset}
                handleDateBottomSheetOpen={handleDateBottomSheetOpen}
                handleAddressSelect={handleAddressSelect}
                handleLocationChange={handleLocationChange}
                dataItem={dataItem}
                getSearchOptionQuery={getSearchOptionQuery}
                option={option}
                term={term}
              />
            )}
            {currentIndex === 1 && (
              <MenstrualHistory
                handleFirstPeriodBottomSheetOpen={
                  handleFirstPeriodBottomSheetOpen
                }
                handleLastPeriodOpen={handleLastPeriodOpen}
                selectedDate={lastDateValue}
                setSelected={setSelectedLastMenstrualDate}
                firstPeriod={firstPeriod}
                setFirstPeriod={setFirstPeriod}
                periodsStoppedAnswer={periodsStoppedAnswer}
                setPeriodsStoppedAnswer={setPeriodsStoppedAnswer}
              />
            )}
            {currentIndex === 2 && (
              <SurgicalAndReproductiveHistory
                isHysterectomy={isHysterectomy}
                setIsHysterectomy={setIsHysterectomy}
                isAvariesRemoved={isAvariesRemoved}
                setIsAvariesRemoved={setIsAvariesRemoved}
              />
            )}
            {currentIndex === 3 && (
              <CurrentStatus
                menopauseStage={menopauseStage}
                setMenopauseStage={setMenopauseStage}
              />
            )}
            {currentIndex === 4 && (
              <HormonalTreatment
                isOnHormoneTherapy={isOnHormoneTherapy}
                setIsOnHormoneTherapy={setIsOnHormoneTherapy}
              />
            )}
          </View>

          {/* Navigation Buttons */}
          <View className="p-8 my-5 flex-row items-center justify-between">
            {/* Previous Button - Hidden on first step */}
            {!isFirstStep && (
              <TouchableOpacity
                className="items-center justify-center w-14 h-14 rounded-full border border-primary"
                onPress={handleSubmit(handlePrev)}
              >
                <Ionicons name="arrow-back" size={24} color="#8A3FFC" />
              </TouchableOpacity>
            )}

            {/* Spacer to keep Next button on right when Prev is hidden */}
            {isFirstStep && <View className="w-14 h-14" />}

            {/* Next Button */}
            <TouchableOpacity
              // onPress={handleSubmit(handleNext)}
              onPress={handleNextBtn}
              // disabled={isLastStep}
              disabled={!isOnHormoneTherapy}
              className={`items-center justify-center w-14 h-14 rounded-full ${
                !isOnHormoneTherapy ? "bg-primaryLight" : "bg-primary"
              }`}
            >
              <Ionicons
                name="arrow-forward"
                size={24}
                color={isLastStep ? "#B0B0B0" : "#fff"}
              />
            </TouchableOpacity>
          </View>
        </FormProvider>
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
        <BottomSheetScreen
          snapPoints={snapPoints}
          ref={lastMenstrualPeriodRef}
          isBackdropComponent={true}
          enablePanDownToClose={true}
          index={-1}
          message={
            <LastMenstrualPeriod
              selectedDate={selectedLastMenstrualDate}
              setSelectedDate={setSelectedLastMenstrualDate}
              handleDateBottomSheetClose={handleLastPeriodClose}
            />
          }
        />
      </Screen>
    </>
  );
};

export default PersonalInfoForm;
