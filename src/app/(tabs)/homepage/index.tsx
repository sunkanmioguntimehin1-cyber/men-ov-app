import { useGetArticleApi } from "@/src/api_services/articleApi/articleQuery";
import { useCycleTrackingLatest } from "@/src/api_services/logApi/logQuery";
import { useGetIntakeDetails } from "@/src/api_services/userApi/userQuery";
import FloatingAiButton from "@/src/components/tabs/FloatingAiButton";
import CycleTracking from "@/src/components/tabs/home-modal/CycleTracking";
import YourFeelingToday from "@/src/components/tabs/home-modal/YourFeelingToday";
import LastSymptomsModal from "@/src/components/tabs/home-modal/YourFeelingToday/lastSymptomsModal";
import TabsArticles from "@/src/components/tabs/TabsArticles";
import YourLastSymptoms from "@/src/components/tabs/YourLastSymptoms";
import CustomModel from "@/src/custom-components/CustomModel";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import Screen from "@/src/layout/Screen";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomePage() {
  const [modelVisible, setModelVisible] = React.useState(false);
  const [modelVisible1, setModelVisible1] = React.useState(false);
  const [modelVisible2, setModelVisible2] = React.useState(false);
  const [modelVisible3, setModelVisible3] = React.useState(false);

  const [selectedLastSymptom, setSelectedLastSymptom] = React.useState(null);

  const firstTimeRef = React.useRef(true);
  const getArticles = useGetArticleApi();
  const getCycleTrackingLatest = useCycleTrackingLatest();
  const getIntakeDetails = useGetIntakeDetails();

  console.log("getCycleTrackingLatest5001", getCycleTrackingLatest?.data);

  const insets = useSafeAreaInsets();

  const router = useRouter();

  //date calculation with proper validation
  const getFormattedDate = () => {
    if (!getCycleTrackingLatest?.data?.start) {
      return null;
    }

    const date = new Date(getCycleTrackingLatest?.data?.start);

    if (isNaN(date.getTime())) {
      return null;
    }

    try {
      const distance = formatDistanceToNow(date, { addSuffix: false });
      return `${distance} ago`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return null;
    }
  };

  const result = getFormattedDate();

  console.log("result", result);

  const handleOpenmodal = () => {
    setModelVisible(true);
  };

  const onCancel = () => {
    setModelVisible(false);
  };

  const handleOpenLastSymptoms = (item: any) => {
    setSelectedLastSymptom(item);
    setModelVisible1(true);
  };

  const onCancel1 = () => {
    setModelVisible1(false);
  };

  const handleOpenmodal2 = () => {
    // if (!getIntakeDetails.data) {
    //   setModelVisible3(true);
    // } else {
    //   setModelVisible2(true);
    // }
      setModelVisible2(true);

  };

  console.log("getIntakeDetailsError6001", getIntakeDetails.data);

  const onCancel2 = () => {
    setModelVisible2(false);
  };

  const onCancel3 = () => {
    setModelVisible3(false);
  };

  return (
    <>
      <LoadingOverlay
        isOpen={getArticles.isLoading}
        animationType="pulse"
        backdropClassName="..."
      />
      <View className="flex-1 relative">
        <Screen scroll={true}>
          <CustomModel
            modelVisible={modelVisible}
            setModelVisible={setModelVisible}
            closeOnOutsideClick={false}
            message={<YourFeelingToday onCancel={onCancel} />}
          />

          <CustomModel
            modelVisible={modelVisible1}
            setModelVisible={setModelVisible1}
            closeOnOutsideClick={false}
            message={
              <LastSymptomsModal
                selectedLastSymptom={selectedLastSymptom}
                onCancel={onCancel1}
              />
            }
          />

          <CustomModel
            modelVisible={modelVisible2}
            setModelVisible={setModelVisible2}
            closeOnOutsideClick={false}
            message={<CycleTracking onCancel={onCancel2} />}
          />

          {/* <CustomModel
            modelVisible={modelVisible3}
            setModelVisible={setModelVisible3}
            // closeOnOutsideClick={false}
            message={<InTakeModal onCancel={onCancel3} />}
          /> */}

          <View className="p-8 flex-row items-center justify-end">
            <TouchableOpacity
              className=" mx-3"
              onPress={() => {
                router.push("/(tabs)/profilepage");
              }}
            >
              <Ionicons name="notifications-outline" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              className=" w-6 h-6 "
              onPress={() => {
                router.push("/(tabs)/profilepage");
              }}
            >
              <Image
                source={require("@/assets/images/profile-image.png")}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 100,
                }}
                contentFit="contain"
                onError={(error) => console.log("Image error:", error)}
              />
            </TouchableOpacity>
          </View>

          <View className="px-8 pb-32">
            {/* Increased bottom padding to ensure content isn't hidden */}
            <View className="my-3">
              <YourLastSymptoms
                handleOpenLastSymptoms={handleOpenLastSymptoms}
              />
            </View>
            <View>
              <CustomSelectData
                onPress={handleOpenmodal}
                primary
                label="How do you Feel today?"
                placeholder="Log "
                icon={
                  <TouchableOpacity onPress={handleOpenmodal}>
                    <AntDesign name="right" size={24} color="black" />
                  </TouchableOpacity>
                }
              />
            </View>
            <View className="my-5">
              <CustomSelectData
                onPress={handleOpenmodal2}
                primary
                label="Cycle Tracking"
                placeholder={
                  getCycleTrackingLatest?.data && result
                    ? `${getCycleTrackingLatest?.data?.note} ${result}`
                    : "Add your last cycle"
                }
                icon={
                  <TouchableOpacity onPress={handleOpenmodal2}>
                    <AntDesign name="right" size={24} color="black" />
                  </TouchableOpacity>
                }
              />
            </View>
            <View className="">
              <TabsArticles />
            </View>
          </View>
        </Screen>

        {/* Floating button with proper positioning for all screen sizes */}
        <View
          style={{
            position: "absolute",
            bottom: Platform.OS === "ios" ? insets.bottom + 50 : 10,
            left: 0,
            right: 0,
            paddingHorizontal: 32,
            pointerEvents: "box-none", // Allow touches to pass through empty space
          }}
        >
          <FloatingAiButton />
        </View>
      </View>
    </>
  );
}
