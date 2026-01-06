// import {
//   useEditUser,
//   useIntakeDetailsApi,
// } from "@/src/api_services/userApi/userMutation";
// import { useGetIntakeDetails, useGetUser } from "@/src/api_services/userApi/userQuery";
// import AgeOfFirstPeriod from "@/src/components/PersonalInfoForm/BottomSheetComp/AgeOfFirstPeriod";
// import LastMenstrualPeriod from "@/src/components/PersonalInfoForm/BottomSheetComp/LastMenstrualPeriod";
// import SetPersonalInfoCalender from "@/src/components/PersonalInfoForm/BottomSheetComp/SetPersonalInfoCalender";
// import CurrentStatus from "@/src/components/PersonalInfoForm/CurrentStatus";
// import HormonalTreatment from "@/src/components/PersonalInfoForm/HormonalTreatment";
// import MenstrualHistory from "@/src/components/PersonalInfoForm/MenstrualHistory";
// import SurgicalAndReproductiveHistory from "@/src/components/PersonalInfoForm/SurgicalAndReproductiveHistory";
// import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
// import { useLocationSearch } from "@/src/hooks/useLocationSearch";
// import KeyboardAwareScreen from "@/src/layout/KeyboardAwareScreen";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import BottomSheet from "@gorhom/bottom-sheet";
// import { format } from "date-fns";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import React, { useMemo } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import { TouchableOpacity, View } from "react-native";

// interface Item {
//   title: string;
//   value: string;
//   price?: string;
// }

// const dataItem = [
//   { title: "Female", value: "female" },
//   { title: "Male", value: "male" },
//   { title: "Intersex", value: "Intersex" },
// ];

// const PersonalInfoForm = () => {
//   const router = useRouter();
//   const getIntakeDetails = useGetIntakeDetails();
//   const [currentIndex, setCurrentIndex] = React.useState<number>(0);
//   const [selectedDate, setSelectedDate] = React.useState<Date | any>(null);
//   const [selected, setSelected] = React.useState<Item | null>(null);
//   const [userAddress, setUserAddress] = React.useState<string>("");

//   //menstrual states
//   const [periodsStoppedAnswer, setPeriodsStoppedAnswer] = React.useState<
//     boolean | null
//   >(null);
//   const [firstPeriod, setFirstPeriod] = React.useState("");
//   const [selectedLastMenstrualDate, setSelectedLastMenstrualDate] =
//     React.useState<Date | any>(null);

//   //SurgicalAndReproductive
//   const [isHysterectomy, setIsHysterectomy] = React.useState<boolean | null>(
//     null
//   );
//   const [isAvariesRemoved, setIsAvariesRemoved] = React.useState<
//     boolean | null
//   >(null);
//   //current status
//   const [menopauseStage, setMenopauseStage] = React.useState("");
//   const [isOnHormoneTherapy, setIsOnHormoneTherapy] = React.useState<
//     boolean | null
//   >(null);

//   const getUserData = useGetUser();

//   const formMethods = useForm({
//     mode: "onChange",
//     defaultValues: {
//       address: "",
//       fullname: "",
//       dob: "",
//     },
//   });

//   const {
//     handleSubmit,
//     reset,
//     formState: { errors, isValid },
//   } = formMethods;

// React.useEffect(() => {
//   if (getIntakeDetails?.data) {
//     setFirstPeriod(getIntakeDetails?.data?.ageOfFirstPeriod ?? "");
//     setSelectedLastMenstrualDate(
//       getIntakeDetails?.data?.dateOfLastPeriod
//         ? new Date(getIntakeDetails?.data?.dateOfLastPeriod)
//         : null
//     );
//     setIsHysterectomy(getIntakeDetails?.data?.ishysterectomy ?? null);
//     setIsAvariesRemoved(getIntakeDetails?.data?.isOvariesRemoved ?? null);
//     setIsOnHormoneTherapy(getIntakeDetails?.data?.isOnHormoneTherapy ?? null);
//     setPeriodsStoppedAnswer(
//       getIntakeDetails?.data?.isPeriodsStopped12Months ?? null
//     );
//     setMenopauseStage(getIntakeDetails?.data?.menopauseStage ?? "");
//   }
// }, [getIntakeDetails?.data, setMenopauseStage, setIsHysterectomy]);

//   console.log("getIntakeDetails?.data", getIntakeDetails?.data);

//   // bottom sheet
//   const snapPoints = useMemo(() => ["30%", "50%"], []);

//   const datebottomSheetRef = React.useRef<BottomSheet>(null);
//   const handleDateBottomSheetOpen = () => datebottomSheetRef.current?.expand();
//   const handleDateBottomSheetClose = () => datebottomSheetRef.current?.close();

//   const firstPeriodBottomSheetRef = React.useRef<BottomSheet>(null);
//   const handleFirstPeriodBottomSheetOpen = () =>
//     firstPeriodBottomSheetRef.current?.expand();
//   const handleFirstPeriodBottomSheetClose = () =>
//     firstPeriodBottomSheetRef.current?.close();

//   const lastMenstrualPeriodRef = React.useRef<BottomSheet>(null);
//   const handleLastPeriodOpen = () => lastMenstrualPeriodRef.current?.expand();
//   const handleLastPeriodClose = () => lastMenstrualPeriodRef.current?.close();

//   const formsStep = [
  
//     "Menstrual History",
//     "Surgical & Reproductive History",
//     "Current Status",
//     "Hormonal Treatment",
//   ];

//   const dateValue = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
//   const lastDateValue = selectedLastMenstrualDate
//     ? format(selectedLastMenstrualDate, "yyyy-MM-dd")
//     : "";

//   const totalSteps = formsStep.length;
//   const isFirstStep = currentIndex === 0;
//   const isLastStep = currentIndex === totalSteps - 1;

//   // Callback for when editUserProfile succeeds
//   const handleEditProfileSuccess = () => {
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const editUserProfile = useEditUser(handleEditProfileSuccess);
//   const intakeDetails = useIntakeDetailsApi();

//   // Function to validate current step before proceeding
//   const validateCurrentStep = () => {
//     const values = formMethods.getValues();
//     switch (currentIndex) {
    
//       case 0: // Menstrual History
//         return firstPeriod && lastDateValue && periodsStoppedAnswer !== null;
//       case 1: // Surgical & Reproductive History
//         return isHysterectomy !== null && isAvariesRemoved !== null;
//       case 2: // Current Status
//         return menopauseStage !== "";
//       case 3: // Hormonal Treatment
//         return isOnHormoneTherapy !== null;
//       default:
//         return false;
//     }
//   };

//   // Handle moving to next step
//   const handleNext = (data: any) => {
//     // First step - save personal info and move forward
//     if (currentIndex === 0) {
//       // Validate that we have the required data
//       if (!data.fullname && !getUserData?.data?.fullname) {
//         return; // Don't proceed without fullname
//       }

//       editUserProfile.mutate({
//         fullname: data.fullname || getUserData?.data?.fullname,
//         gender: selected?.value || getUserData?.data?.gender,
//         address: data.address || getUserData?.data?.address,
//         dob: selectedDate,
//       });
//       // The handleEditProfileSuccess callback will handle moving to next step
//     }
//     // Last step - submit intake details
//     else if (currentIndex === totalSteps - 1) {
//       const requestedPayload = {
//         ageOfFirstPeriod: firstPeriod,
//         dateOfLastPeriod: lastDateValue,
//         isPeriodsStopped12Months: periodsStoppedAnswer,
//         ishysterectomy: isHysterectomy,
//         isOvariesRemoved: isAvariesRemoved,
//         menopauseStage: menopauseStage.toLowerCase(),
//         isOnHormoneTherapy: isOnHormoneTherapy,
//       };
//       intakeDetails.mutate(requestedPayload);
//     }
//     // Middle steps - just move forward if validation passes
//     else {
//       if (validateCurrentStep()) {
//         setCurrentIndex((prev) => prev + 1);
//       }
//     }
//   };

//   // Handle moving to previous step
//   const handlePrev = () => {
//     if (!isFirstStep) {
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   // Determine if Next button should be disabled
//   const isNextButtonDisabled = () => {
//     // For first step, use form validation
//     if (currentIndex === 0) {
//       return editUserProfile.isPending || !validateCurrentStep();
//     }

//     // For last step, check if API call is pending
//     if (isLastStep) {
//       return intakeDetails.isPending || !validateCurrentStep();
//     }

//     // For other steps, check step validation
//     return !validateCurrentStep();
//   };

//   const {
//     term,
//     option,
//     city,
//     handleLocationChange,
//     onOptionSelect,
//     getSearchOptionQuery,
//   } = useLocationSearch();

//   const handleAddressSelect = (
//     item: any,
//     onChange: (value: string) => void
//   ) => {
//     onChange(item.description);
//     onOptionSelect(item);
//   };

//   React.useEffect(() => {
//     if (getUserData?.data) {
//       const userGender = getUserData.data.gender;
//       const updateDateValue = getUserData?.data?.dob;
//       reset({
//         fullname: getUserData?.data?.fullname,
//         address: getUserData?.data?.address,
//         dob: getUserData?.data?.dob,
//       });
//       const matchingGender = dataItem.find((item) => item.value === userGender);
//       setSelected(matchingGender || null);

//       const parsedDob = updateDateValue ? new Date(updateDateValue) : null;
//       setSelectedDate(parsedDob);
//     }
//   }, [getUserData?.data, reset]);

//   return (
//     <>
//       {/* <Screen scroll={true} className=""> */}
//       <KeyboardAwareScreen
//         scroll={true}
//         keyboardAware={true}
//         extraScrollHeight={50}
//       >
//         <FormProvider {...formMethods}>
//           <TouchableOpacity
//             className="px-8 my-4"
//             onPress={() => {
//               router.back();
//             }}
//           >
//             <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//           </TouchableOpacity>

//           {/* Form Steps Progress */}
//           <View className="px-8 flex-1">
//             <View className="flex-row px-4 pt-4">
//               {formsStep.map((form, index) => (
//                 <React.Fragment key={form}>
//                   <TouchableOpacity className="flex-1 items-center">
//                     <View
//                       className={`border-t-4 w-full h-1 ${
//                         index === currentIndex
//                           ? "border-primary"
//                           : index < currentIndex
//                           ? "border-primary"
//                           : "border-[#D0D5DD]"
//                       }`}
//                     />
//                   </TouchableOpacity>
//                   {index < formsStep.length - 1 && <View className="w-4" />}
//                 </React.Fragment>
//               ))}
//             </View>

//             {/* Render current form step */}
//             {/* {currentIndex === 0 && (
//               <PersonalForm
//                 selectedDate={dateValue}
//                 setSelected={setSelected}
//                 selected={selected}
//                 errors={errors}
//                 control={formMethods.control}
//                 reset={reset}
//                 handleDateBottomSheetOpen={handleDateBottomSheetOpen}
//                 handleAddressSelect={handleAddressSelect}
//                 handleLocationChange={handleLocationChange}
//                 dataItem={dataItem}
//                 getSearchOptionQuery={getSearchOptionQuery}
//                 option={option}
//                 term={term}
//               />
//             )} */}
//             {currentIndex === 0 && (
//               <MenstrualHistory
//                 handleFirstPeriodBottomSheetOpen={
//                   handleFirstPeriodBottomSheetOpen
//                 }
//                 handleLastPeriodOpen={handleLastPeriodOpen}
//                 selectedDate={lastDateValue}
//                 setSelected={setSelectedLastMenstrualDate}
//                 firstPeriod={firstPeriod}
//                 setFirstPeriod={setFirstPeriod}
//                 periodsStoppedAnswer={periodsStoppedAnswer}
//                 setPeriodsStoppedAnswer={setPeriodsStoppedAnswer}
//               />
//             )}
//             {currentIndex === 1 && (
//               <SurgicalAndReproductiveHistory
//                 isHysterectomy={isHysterectomy}
//                 setIsHysterectomy={setIsHysterectomy}
//                 isAvariesRemoved={isAvariesRemoved}
//                 setIsAvariesRemoved={setIsAvariesRemoved}
//               />
//             )}
//             {currentIndex === 2 && (
//               <CurrentStatus
//                 menopauseStage={menopauseStage}
//                 setMenopauseStage={setMenopauseStage}
//               />
//             )}
//             {currentIndex === 3 && (
//               <HormonalTreatment
//                 isOnHormoneTherapy={isOnHormoneTherapy}
//                 setIsOnHormoneTherapy={setIsOnHormoneTherapy}
//               />
//             )}
//           </View>

//           {/* Navigation Buttons */}
//           <View className="p-8 my-5 flex-row items-center justify-between">
//             {/* Previous Button - Hidden on first step */}
//             {!isFirstStep && (
//               <TouchableOpacity
//                 className="items-center justify-center w-14 h-14 rounded-full border border-primary"
//                 onPress={handlePrev}
//               >
//                 <Ionicons name="arrow-back" size={24} color="#712A87" />
//               </TouchableOpacity>
//             )}

//             {/* Spacer to keep Next button on right when Prev is hidden */}
//             {isFirstStep && <View className="w-14 h-14" />}

//             {/* Next Button */}
//             {isNextButtonDisabled() ? (
//               <TouchableOpacity
//                 onPress={
//                   currentIndex === 0
//                     ? handleSubmit(handleNext)
//                     : () => handleNext({})
//                 }
//                 disabled={isNextButtonDisabled()}
//                 className={`items-center justify-center w-14 h-14 rounded-full bg-primaryLight `}
//               >
//                 <Ionicons
//                   name="arrow-forward"
//                   size={24}
//                   color={isNextButtonDisabled() ? "#B0B0B0" : "#fff"}
//                 />
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity
//                 onPress={
//                   currentIndex === 0
//                     ? handleSubmit(handleNext)
//                     : () => handleNext({})
//                 }
//                 // disabled={isNextButtonDisabled()}
//                 // className={`items-center justify-center w-14 h-14 rounded-full ${
//                 //   isNextButtonDisabled() ? "bg-primaryLight" : "bg-primary"
//                 // }`}
//               >
//                 <LinearGradient
//                   colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   // className="items-center justify-center py-4"
//                   style={{
//                     minHeight: 56,
//                     width: 56,
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: 100,
//                   }}
//                 >
//                   <Ionicons
//                     name="arrow-forward"
//                     size={24}
//                     color={isNextButtonDisabled() ? "#B0B0B0" : "#fff"}
//                   />
//                 </LinearGradient>
//               </TouchableOpacity>
//             )}
//             {/* <TouchableOpacity
//               onPress={
//                 currentIndex === 0
//                   ? handleSubmit(handleNext)
//                   : () => handleNext({})
//               }
//               disabled={isNextButtonDisabled()}
//               className={`items-center justify-center w-14 h-14 rounded-full ${
//                 isNextButtonDisabled() ? "bg-primaryLight" : "bg-primary"
//               }`}
//             >
           
//                 <Ionicons
//                   name="arrow-forward"
//                   size={24}
//                   color={isNextButtonDisabled() ? "#B0B0B0" : "#fff"}
//                 />
//             </TouchableOpacity> */}
//           </View>
//         </FormProvider>

//         {/* Bottom Sheets */}
//         <BottomSheetScreen
//           snapPoints={snapPoints}
//           ref={datebottomSheetRef}
//           isBackdropComponent={true}
//           enablePanDownToClose={true}
//           index={-1}
//           message={
//             <SetPersonalInfoCalender
//               selectedDate={selectedDate}
//               setSelectedDate={setSelectedDate}
//               handleDateBottomSheetClose={handleDateBottomSheetClose}
//             />
//           }
//         />
//         <BottomSheetScreen
//           snapPoints={snapPoints}
//           ref={firstPeriodBottomSheetRef}
//           isBackdropComponent={true}
//           enablePanDownToClose={true}
//           index={-1}
//           message={
//             <AgeOfFirstPeriod
//               handleFirstPeriodBottomSheetClose={
//                 handleFirstPeriodBottomSheetClose
//               }
//               firstPeriod={firstPeriod}
//               setFirstPeriod={setFirstPeriod}
//             />
//           }
//         />
//         <BottomSheetScreen
//           snapPoints={snapPoints}
//           ref={lastMenstrualPeriodRef}
//           isBackdropComponent={true}
//           enablePanDownToClose={true}
//           index={-1}
//           message={
//             <LastMenstrualPeriod
//               selectedDate={selectedLastMenstrualDate}
//               setSelectedDate={setSelectedLastMenstrualDate}
//               handleDateBottomSheetClose={handleLastPeriodClose}
//             />
//           }
//         />
//       </KeyboardAwareScreen>
//       {/* </Screen> */}
//     </>
//   );
// };

// export default PersonalInfoForm;


import {
  useEditUser,
  useIntakeDetailsApi,
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
    null
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
    setCurrentIndex((prev) => prev + 1)
  );
  const intakeDetails = useIntakeDetailsApi();

  React.useEffect(() => {
    if (getIntakeDetails?.data) {
      setFirstPeriod(getIntakeDetails.data.ageOfFirstPeriod ?? "");
      setSelectedLastMenstrualDate(
        getIntakeDetails.data.dateOfLastPeriod
          ? new Date(getIntakeDetails.data.dateOfLastPeriod)
          : null
      );
      setIsHysterectomy(getIntakeDetails.data.ishysterectomy ?? null);
      setIsAvariesRemoved(getIntakeDetails.data.isOvariesRemoved ?? null);
      setIsOnHormoneTherapy(getIntakeDetails.data.isOnHormoneTherapy ?? null);
      setPeriodsStoppedAnswer(
        getIntakeDetails.data.isPeriodsStopped12Months ?? null
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
        return firstPeriod && lastDateValue && periodsStoppedAnswer !== null;
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

  const handleSave = () => {
    if (!isLastStep) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    intakeDetails.mutate({
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
            onPress={handleSave}
            className="h-11 w-11 rounded-full bg-[#9F3E83] items-center justify-center"
            style={{ opacity: isDisabled ? 0.4 : 1 }}
          >
            <Ionicons name="arrow-forward" size={20} color="#fff" />
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
            className="flex-1 ml-3 h-12 rounded-xl overflow-hidden"
          >
            <LinearGradient
              colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
              className="flex-1 items-center justify-center"
              style={{ opacity: isDisabled ? 0.4 : 1 }}
            >
              <Text className="text-white font-semibold">Save</Text>
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
