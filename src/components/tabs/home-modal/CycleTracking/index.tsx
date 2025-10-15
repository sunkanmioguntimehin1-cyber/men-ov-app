import { useCreateCycleTrackingApi } from "@/src/api_services/logApi/logMutation";
import { useCycleTrackingLatest } from "@/src/api_services/logApi/logQuery";
import { useGetIntakeDetails } from "@/src/api_services/userApi/userQuery";
import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
import CustomButton from "@/src/custom-components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import CurrentStatus from "./CurrentStatus";
import LogCycle from "./LogCycle";
import Duration from "./logCycleBottomSheet/Duration";
import StartDateBottomSheet from "./logCycleBottomSheet/StartDateBottomSheet";

const CycleTracking = ({ onCancel }: any) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [menopauseStage, setMenopauseStage] = React.useState("");

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [durationData, setDurationData] = React.useState("");

  const [notePublicUrls, setNotePublicUrls] = React.useState<string[]>([]);

  const getIntakeDetails = useGetIntakeDetails();
  const createCycleTracking = useCreateCycleTrackingApi(onCancel);
  const getCycleTrackingLatest = useCycleTrackingLatest();

  console.log("notePublicUrls111", notePublicUrls);
  const formMethods = useForm({
    mode: "onChange",
    defaultValues: {
      notes: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = formMethods;

  React.useEffect(() => {
    if (getCycleTrackingLatest?.data) {
      const formattedDateValue = format(
        getCycleTrackingLatest?.data?.start,
        "dd-MM-yyy"
      );
      // setSelectedDate(formattedDateValue);
      // setSelectedDate(getCycleTrackingLatest?.data?.start);
      setDurationData(getCycleTrackingLatest?.data?.duration);
      reset({
        notes: getCycleTrackingLatest?.data?.note,
      });
    }
  }, [getCycleTrackingLatest?.data, reset]);

  // Function to handle Next/Submit button click
  const handleButtonClick = () => {
    if (currentIndex < 1) {
      // Move to next step
      setCurrentIndex(currentIndex + 1);
    } else {
      // Submit the form
      handleSubmit(onSubmit)();
    }
  };
  // Determine button text and state
  const getButtonText = () => {
    return currentIndex === 1 ? "Submit" : "Next";
  };
  // formatting Date
  const dateValue = selectedDate ? format(selectedDate, "dd-MM-yyy") : "";
  const onSubmit = (data: any) => {
    const requestPayload = {
      start: selectedDate,
      duration: Number(durationData),
      note: data.notes,
      image: notePublicUrls,
    };

    console.log("CycleTracking requestPayload:", requestPayload);
    createCycleTracking.mutate(requestPayload);
  };

  console.log("menopauseStage1111", menopauseStage);

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
  return (
    <>
      <View className=" w-96 p-5 bg-white rounded-lg  shadow-lg overflow-hidden">
        <View className=" flex-row items-center justify-between">
          <Text className=" text-base font-[PoppinsSemiBold]">
            Cycle Tracking{" "}
          </Text>
          <TouchableOpacity onPress={onCancel}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          {currentIndex === 0 && (
            <CurrentStatus
              menopauseStage={menopauseStage}
              setMenopauseStage={setMenopauseStage}
              getIntakeDetails={getIntakeDetails}
            />
          )}
          {currentIndex === 1 && (
            <LogCycle
              errors={errors}
              control={formMethods.control}
              notePublicUrls={notePublicUrls}
              setNotePublicUrls={setNotePublicUrls}
              handleDateBottomSheetOpen={handleDateBottomSheetOpen}
              handleDurationBottomSheetOpen={handleDurationBottomSheetOpen}
              durationData={durationData}
              selectedDate={dateValue}
            />
          )}
        </View>
        <View className="">
          <CustomButton
            primary
            title={getButtonText()}
            onPress={handleButtonClick}
            disabled={getIntakeDetails.isLoading || !menopauseStage}
            loading={
              createCycleTracking.isPending || getIntakeDetails.isLoading
            }
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
          <StartDateBottomSheet
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
          <Duration
            handleDurationBottomSheetClose={handleDurationBottomSheetClose}
            durationData={durationData}
            setDurationData={setDurationData}
          />
        }
      />
    </>
  );
};

export default CycleTracking;
