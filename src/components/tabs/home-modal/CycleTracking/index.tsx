import {
  useCreateCycleTrackingApi,
  useUpdateCycleTrackingApi,
} from "@/src/api_services/logApi/logMutation";
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
import LastCycleHistory from "./LastCycleHistory";
import LogCycle from "./LogCycle";
import Duration from "./logCycleBottomSheet/Duration";
import StartDateBottomSheet from "./logCycleBottomSheet/StartDateBottomSheet";

const CycleTracking = ({ onCancel }: any) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [menopauseStage, setMenopauseStage] = React.useState("");

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [durationData, setDurationData] = React.useState("");

  const [notePublicUrls, setNotePublicUrls] = React.useState<string>("");

  const getIntakeDetails = useGetIntakeDetails();
  
  const createCycleTracking = useCreateCycleTrackingApi(onCancel);
  const getCycleTrackingLatest = useCycleTrackingLatest();
  const updateCycleTracking = useUpdateCycleTrackingApi(onCancel);

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
      setMenopauseStage(getCycleTrackingLatest?.data?.menopauseStage);
    }
  }, [getCycleTrackingLatest?.data, reset]);

  // Function to handle Next/Submit button click
  const handleButtonClick = () => {
    if (getCycleTrackingLatest?.data) {
      // Move to next step
      handleSubmit(onSubmit)();
      // setCurrentIndex(currentIndex + 1);
    } else if (currentIndex < 1) {
      // Submit the form
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit(onSubmit)();
    }
  };
  // Determine button text and state
  const getButtonText = () => {
    if (getCycleTrackingLatest?.data) {
      // if (currentIndex === 0) {
      //   return "Submit";
      // }
      return "Add";
    } else {
      if (currentIndex === 1) {
        return "Submit";
      }
      return "Next";
    }
  };
  // formatting Date
  const dateValue = selectedDate ? format(selectedDate, "dd-MM-yyy") : "";

  //onSubmit
  const onSubmit = (data: any) => {
    const requestPayload = {
      menopauseStage: menopauseStage,
      start: selectedDate,
      duration: Number(durationData),
      note: data.notes,
      image: notePublicUrls,
    };

    // console.log("requestPayload5001", requestPayload);

    // createCycleTracking.mutate(requestPayload);

    // const requestUpdatePayload = {
    //   start: selectedDate,
    //   duration: Number(durationData),
    //   note: data.notes || getCycleTrackingLatest?.data?.note,
    //   image: getCycleTrackingLatest?.data?.image,
    //   user: getCycleTrackingLatest?.data?.user,
    //   id: getCycleTrackingLatest?.data?.id,
    // };

    const requestUpdatePayload = {
      menopauseStage: menopauseStage,
      start: selectedDate,
      // duration: Number(durationData),
      note: data.notes,
      image: notePublicUrls,
    };

    if (getCycleTrackingLatest?.data) {
      // updateCycleTracking.mutate(requestUpdatePayload);

      createCycleTracking.mutate(requestUpdatePayload);
    } else {
      createCycleTracking.mutate(requestPayload);
    }
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
          {getCycleTrackingLatest?.data ||
          getIntakeDetails?.data?.menopauseStage ? (
            <>
              {/* {currentIndex === 0 && (
                <CurrentStatus
                  menopauseStage={menopauseStage}
                  setMenopauseStage={setMenopauseStage}
                  getIntakeDetails={getIntakeDetails}
                />
              )} */}
              {currentIndex === 0 && (
                <LastCycleHistory
                  errors={errors}
                  getCycleTrackingLatest={getCycleTrackingLatest}
                  control={formMethods.control}
                  notePublicUrls={notePublicUrls}
                  setNotePublicUrls={setNotePublicUrls}
                  handleDateBottomSheetOpen={handleDateBottomSheetOpen}
                  handleDurationBottomSheetOpen={handleDurationBottomSheetOpen}
                  durationData={durationData}
                  selectedDate={dateValue}
                />
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </View>
        <View className="">
          <CustomButton
            gradient
            title={getButtonText()}
            onPress={handleButtonClick}
            disabled={
              getCycleTrackingLatest.isLoading ||
              !menopauseStage ||
              (getCycleTrackingLatest?.data &&
                currentIndex === 0 &&
                !selectedDate) ||
              (currentIndex === 1 && (!selectedDate || !durationData)) ||
              updateCycleTracking.isPending ||
              createCycleTracking.isPending
            }
            loading={
              createCycleTracking.isPending || updateCycleTracking.isPending
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
