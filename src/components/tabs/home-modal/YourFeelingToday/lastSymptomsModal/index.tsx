import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import { MaterialIcons } from "@expo/vector-icons";
// import { ImageBackground } from "expo-image";
import {
  useCloseLogApi,
  useUpdateLogApi,
} from "@/src/api_services/logApi/logMutation";
import {
  useGetUploadUrl,
  useImageUpload,
} from "@/src/api_services/uploadApi/uploadMutations";
import { rMS } from "@/src/lib/responsivehandler";
import { Image } from "expo-image";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageUploadedDetails from "./ImageUploadedDetails";
import Note from "./Note";
import Triggers from "./Trigger";

interface Item {
  title: string;
  value: string;
  price?: string;
}

const LastSymptomsModal = ({ onCancel, selectedLastSymptom }: any) => {
  const [selectedSeverityLevel, setSelectedSeverityLevel] = React.useState<
    number | null
  >(selectedLastSymptom?.severityLevel || null);
  const [selectedTriggers, setSelectedTriggers] = React.useState<string[]>(
    selectedLastSymptom?.triggers || []
  );

  const [customTrigger, setCustomTrigger] = React.useState("");
  const [storeData, setStoreData] = React.useState<string | any>(null);
  const [imageSelected, setImageSelected] = React.useState<any>(null);



  console.log("selectedLastSymptom", selectedLastSymptom);
  console.log("selectedSeverityLevel", selectedSeverityLevel);

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(trigger)
        ? prev.filter((t) => t !== trigger)
        : [...prev, trigger]
    );
  };

  const addCustomTrigger = () => {
    const newTrigger = customTrigger.trim();

    if (newTrigger && !selectedTriggers.includes(newTrigger)) {
      setSelectedTriggers((prev) => [...prev, newTrigger]); // add new trigger
    }
    setCustomTrigger(""); // clear input after add
  };

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

  const SeverityLevelData = [
    {
      level: "Lvl 1",
      levelColor: "#20D72A",
    },
    {
      level: "Lvl 2",
      levelColor: "#D7CE20",
    },
    {
      level: "Lvl 3",
      levelColor: "#D77F20",
    },
    {
      level: "Lvl 4",
      levelColor: "#D72020",
    },
  ];

  const handleWelconeBtn = () => {
    onCancel();
  };

  React.useEffect(() => {
    if (selectedLastSymptom) {
      // const userGender = getUserData.data.gender;
      reset({
        symptoms: selectedLastSymptom.symptoms,
        notes: selectedLastSymptom.notes,
      });
    }
  }, [selectedLastSymptom, reset]);

  const handleStoreData = (data: any) => {
    setStoreData(data);
  };

  const getUploadUrlData = useGetUploadUrl(handleStoreData);

  //UPLOADING
  const {
    uploadImage: imageUploadedSelected,
    imageData: itemImgData,
    isImageUploadPending: ImgIsPending,
    isImageUploadError: ImgIsError,
    resetImageData,
  } = useImageUpload(storeData);

  const onSubmit = (data: any) => {
    const payload = {
      symptoms: data.symptoms || selectedLastSymptom.symptoms,
      severityLevel: selectedSeverityLevel || selectedLastSymptom.severityLevel,
      triggers: selectedTriggers || selectedLastSymptom.triggers,
      notes: data.notes || selectedLastSymptom.notes,
      symptomImages: itemImgData
        ? [itemImgData]
        : selectedLastSymptom?.symptomImages || [],
      images: selectedLastSymptom?.images || [],
      id: selectedLastSymptom._id,
    };
    updateLogDetails.mutate(payload);
  };

  const handleCloseLog = (data: any) => {
    const payload = {
      symptoms: data.symptoms || selectedLastSymptom.symptoms,
      severityLevel: selectedSeverityLevel || selectedLastSymptom.severityLevel,
      triggers: selectedTriggers || selectedLastSymptom.triggers,
      notes: data.notes || selectedLastSymptom.notes,
      symptomImages: itemImgData
        ? [itemImgData]
        : selectedLastSymptom?.symptomImages || [],
      images: selectedLastSymptom?.images || [],
      id: selectedLastSymptom._id,
    };
    closeLog.mutate(payload);
  };

  const updateLogDetails = useUpdateLogApi(onCancel);
  const closeLog = useCloseLogApi(onCancel);

  return (
    <>
      {selectedLastSymptom.isClosed === false && (
        <View className=" h-[600px] w-96 p-5 bg-white rounded-lg  shadow-lg overflow-hidden">
          <View className=" flex-row items-center justify-between">
            <Text className=" font-[PoppinsSemiBold] text-base">
              Are you well now?{" "}
            </Text>
            <TouchableOpacity onPress={onCancel}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView className="">
            <View>
              <Controller
                control={formMethods.control}
                name="symptoms"
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    primary
                    label="Symptoms"
                    value={value}
                    onChangeText={onChange}
                    // placeholder="Back Paisn"
                    //   value={selected || undefined}
                  />
                )}
              />
            </View>

            <View className="flex-row items-center justify-between my-3">
              {SeverityLevelData.map((item, index) => {
                const levelValue = index + 1;
                const isSelected = levelValue === selectedSeverityLevel;

                return (
                  <TouchableOpacity
                    key={item.level}
                    className="w-20 h-12 items-center justify-center border rounded-xl my-3"
                    style={{
                      borderColor: "#D0D5DD",
                      backgroundColor: isSelected
                        ? item.levelColor
                        : "transparent",
                    }}
                    onPress={() => setSelectedSeverityLevel(levelValue)} // update state
                  >
                    <Text
                      className="font-[PoppinsRegular]"
                      style={{
                        color: isSelected ? "white" : "#667085",
                      }}
                    >
                      {item.level}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Triggers
              selectedTriggers={selectedTriggers}
              toggleTrigger={toggleTrigger}
              addCustomTrigger={addCustomTrigger}
              selectedLastSymptom={selectedLastSymptom}
              customTrigger={customTrigger}
              setCustomTrigger={setCustomTrigger}
            />
            <Note errors={errors} control={formMethods.control} />
            <ImageUploadedDetails
              imageSelected={imageSelected}
              setImageSelected={setImageSelected}
              imageUploadedSelected={imageUploadedSelected}
              selectedLastSymptom={selectedLastSymptom}
              resetImageData={resetImageData}
            />
          </ScrollView>

          <View className="my-3 flex-row items-center justify-center gap-1 space-x-3">
            <View className=" flex-1">
              <CustomButton
                primary
                title="I am feeling better"
                disabled={
                  (selectedSeverityLevel !== null &&
                    selectedSeverityLevel > 1) ||
                  closeLog.isPending
                }
                loading={closeLog.isPending}
                onPress={handleSubmit(handleCloseLog)}
              />
            </View>

            <View className=" ">
              <CustomButton
                primary
                title="Update"
                disabled={updateLogDetails.isPending}
                loading={updateLogDetails.isPending}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </View>
      )}
      {selectedLastSymptom.isClosed === true && (
        <View className="h-[550px] w-96 p-5 bg-white rounded-xl  shadow-lg overflow-hidden">
          <ImageBackground
            source={require("@/assets/images/isdonebg.png")}
            className="w-full h-full"
          >
            <View className=" flex-row items-center justify-between">
              <View />
              <TouchableOpacity onPress={handleWelconeBtn}>
                <MaterialIcons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View className=" items-center mt-16">
              <View
                style={{
                  width: rMS(250),
                  height: rMS(250),
                }}
              >
                <Image
                  source={require("@/assets/images/isdone.png")}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  contentFit="contain"
                  onError={(error) => console.log("Image error:", error)}
                />
              </View>
              <View className=" items-center">
                <Text className=" font-[PoppinsSemiBold] text-base my-3">
                  I’m proud of you!
                </Text>
                <Text className="font-[PoppinsLight]">
                  We always want to help you.
                </Text>
              </View>
            </View>

            <View className="mt-5">
              <CustomButton
                primary
                title="Your welcome!"
                onPress={handleWelconeBtn}
              />
            </View>
          </ImageBackground>
        </View>
      )}
    </>
  );
};

export default LastSymptomsModal;
