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
import KeyboardAwareScreen from "@/src/layout/KeyboardAwareScreen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
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
];

const PersonalInfoForm = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedDate, setSelectedDate] = React.useState<Date | any>(null);
  const [selected, setSelected] = React.useState<Item | null>(null);
  const [userAddress, setUserAddress] = React.useState<string>("");

  //menstrual states
  const [periodsStoppedAnswer, setPeriodsStoppedAnswer] = React.useState<
    boolean | null
  >(null);
  const [firstPeriod, setFirstPeriod] = React.useState("");
  const [selectedLastMenstrualDate, setSelectedLastMenstrualDate] =
    React.useState<Date | any>(null);

  //SurgicalAndReproductive
  const [isHysterectomy, setIsHysterectomy] = React.useState<boolean | null>(
    null
  );
  const [isAvariesRemoved, setIsAvariesRemoved] = React.useState<
    boolean | null
  >(null);
  //current status
  const [menopauseStage, setMenopauseStage] = React.useState("");
  const [isOnHormoneTherapy, setIsOnHormoneTherapy] = React.useState<
    boolean | null
  >(null);

  const getUserData = useGetUser();

  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {
      address: "",
      fullname: "",
      dob:"",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = formMethods;

  // bottom sheet
  const snapPoints = useMemo(() => ["30%", "50%"], []);

  const datebottomSheetRef = React.useRef<BottomSheet>(null);
  const handleDateBottomSheetOpen = () => datebottomSheetRef.current?.expand();
  const handleDateBottomSheetClose = () => datebottomSheetRef.current?.close();

  const firstPeriodBottomSheetRef = React.useRef<BottomSheet>(null);
  const handleFirstPeriodBottomSheetOpen = () =>
    firstPeriodBottomSheetRef.current?.expand();
  const handleFirstPeriodBottomSheetClose = () =>
    firstPeriodBottomSheetRef.current?.close();

  const lastMenstrualPeriodRef = React.useRef<BottomSheet>(null);
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

  // Callback for when editUserProfile succeeds
  const handleEditProfileSuccess = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const editUserProfile = useEditUser(handleEditProfileSuccess);
  const intakeDetails = useIntakeDetailsApi();

  

  // Function to validate current step before proceeding
  const validateCurrentStep = () => {
    const values = formMethods.getValues();
    switch (currentIndex) {
      case 0: // Personal Information
        // Check if required fields are filled for first step
        return (
          !!selectedDate &&
          !!selected &&
          !!(values.fullname || getUserData?.data?.fullname) &&
          !!(values.address || getUserData?.data?.address)
        );// Form validation will handle this
      case 1: // Menstrual History
        return firstPeriod && lastDateValue && periodsStoppedAnswer !== null;
      case 2: // Surgical & Reproductive History
        return isHysterectomy !== null && isAvariesRemoved !== null;
      case 3: // Current Status
        return menopauseStage !== "";
      case 4: // Hormonal Treatment
        return isOnHormoneTherapy !== null;
      default:
        return false;
    }
  };

  // Handle moving to next step
  const handleNext = (data: any) => {
    // First step - save personal info and move forward
    if (currentIndex === 0) {
      // Validate that we have the required data
      if (!data.fullname && !getUserData?.data?.fullname) {
        return; // Don't proceed without fullname
      }

      editUserProfile.mutate({
        fullname: data.fullname || getUserData?.data?.fullname,
        gender: selected?.value || getUserData?.data?.gender,
        address: data.address || getUserData?.data?.address,
        dob: selectedDate,
      });
      // The handleEditProfileSuccess callback will handle moving to next step
    }
    // Last step - submit intake details
    else if (currentIndex === totalSteps - 1) {
      const requestedPayload = {
        ageOfFirstPeriod: firstPeriod,
        dateOfLastPeriod: lastDateValue,
        isPeriodsStopped12Months: periodsStoppedAnswer,
        ishysterectomy: isHysterectomy,
        isOvariesRemoved: isAvariesRemoved,
        menopauseStage: menopauseStage.toLowerCase(),
        isOnHormoneTherapy: isOnHormoneTherapy,
      };
      intakeDetails.mutate(requestedPayload);
    }
    // Middle steps - just move forward if validation passes
    else {
      if (validateCurrentStep()) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  // Handle moving to previous step
  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Determine if Next button should be disabled
  const isNextButtonDisabled = () => {
    // For first step, use form validation
    if (currentIndex === 0) {
      return editUserProfile.isPending || !validateCurrentStep();
    }

    // For last step, check if API call is pending
    if (isLastStep) {
      return intakeDetails.isPending || !validateCurrentStep();
    }

    // For other steps, check step validation
    return !validateCurrentStep();
  };

  const {
    term,
    option,
    city,
    handleLocationChange,
    onOptionSelect,
    getSearchOptionQuery,
  } = useLocationSearch();

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
      const updateDateValue = getUserData?.data?.dob;
      reset({
        fullname: getUserData?.data?.fullname,
        address: getUserData?.data?.address,
        dob: getUserData?.data?.dob,
      });
      const matchingGender = dataItem.find((item) => item.value === userGender);
      setSelected(matchingGender || null);

      const parsedDob = updateDateValue ? new Date(updateDateValue) : null;
      setSelectedDate(parsedDob);
    }
  }, [getUserData?.data, reset]);

  return (
    <>
      {/* <Screen scroll={true} className=""> */}
      <KeyboardAwareScreen
        scroll={true}
        keyboardAware={true}
        extraScrollHeight={50}
      >
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
                  <TouchableOpacity className="flex-1 items-center">
                    <View
                      className={`border-t-4 w-full h-1 ${
                        index === currentIndex
                          ? "border-primary"
                          : index < currentIndex
                          ? "border-primary"
                          : "border-[#D0D5DD]"
                      }`}
                    />
                  </TouchableOpacity>
                  {index < formsStep.length - 1 && <View className="w-4" />}
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
                onPress={handlePrev}
              >
                <Ionicons name="arrow-back" size={24} color="#712A87" />
              </TouchableOpacity>
            )}

            {/* Spacer to keep Next button on right when Prev is hidden */}
            {isFirstStep && <View className="w-14 h-14" />}

            {/* Next Button */}
            {isNextButtonDisabled() ? (
              <TouchableOpacity
                onPress={
                  currentIndex === 0
                    ? handleSubmit(handleNext)
                    : () => handleNext({})
                }
                disabled={isNextButtonDisabled()}
                className={`items-center justify-center w-14 h-14 rounded-full bg-primaryLight `}
              >
                <Ionicons
                  name="arrow-forward"
                  size={24}
                  color={isNextButtonDisabled() ? "#B0B0B0" : "#fff"}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={
                  currentIndex === 0
                    ? handleSubmit(handleNext)
                    : () => handleNext({})
                }
                // disabled={isNextButtonDisabled()}
                // className={`items-center justify-center w-14 h-14 rounded-full ${
                //   isNextButtonDisabled() ? "bg-primaryLight" : "bg-primary"
                // }`}
              >
                <LinearGradient
                  colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  // className="items-center justify-center py-4"
                  style={{
                    minHeight: 56,
                    width: 56,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                  }}
                >
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    color={isNextButtonDisabled() ? "#B0B0B0" : "#fff"}
                  />
                </LinearGradient>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
              onPress={
                currentIndex === 0
                  ? handleSubmit(handleNext)
                  : () => handleNext({})
              }
              disabled={isNextButtonDisabled()}
              className={`items-center justify-center w-14 h-14 rounded-full ${
                isNextButtonDisabled() ? "bg-primaryLight" : "bg-primary"
              }`}
            >
           
                <Ionicons
                  name="arrow-forward"
                  size={24}
                  color={isNextButtonDisabled() ? "#B0B0B0" : "#fff"}
                />
            </TouchableOpacity> */}
          </View>
        </FormProvider>

        {/* Bottom Sheets */}
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
      </KeyboardAwareScreen>
      {/* </Screen> */}
    </>
  );
};

export default PersonalInfoForm;