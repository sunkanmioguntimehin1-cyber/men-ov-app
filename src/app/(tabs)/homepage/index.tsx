import { useGetArticleApi } from "@/src/api_services/articleApi/articleQuery";
import { useCycleTrackingApi } from "@/src/api_services/logApi/logQuery";
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
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const [modelVisible, setModelVisible] = React.useState(false);
  const [modelVisible1, setModelVisible1] = React.useState(false);
  const [modelVisible2, setModelVisible2] = React.useState(false);
  const [selectedLastSymptom, setSelectedLastSymptom] = React.useState(null);
  const cycleTracking = useCycleTrackingApi();
    const getArticles = useGetArticleApi();
  

  console.log("cycleTracking", cycleTracking?.data?.data[0].note);

  const router = useRouter();

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
    setModelVisible2(true);
  };

  const onCancel2 = () => {
    setModelVisible2(false);
  };

  return (
    <>
      <LoadingOverlay
        isOpen={getArticles.isLoading || cycleTracking.isLoading} // Required: Controls visibility
        // message="Login..." // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
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

          <View className="p-8 flex-row items-center justify-end">
            <TouchableOpacity
              className=" mx-3"
              onPress={() => {
                router.push("/profilepage/notifications");
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
                  // alignSelf: "center",
                  borderRadius: 100,
                }}
                contentFit="contain"
                onError={(error) => console.log("Image error:", error)}
              />
            </TouchableOpacity>
          </View>

          <View className="px-8 pb-24">
            {" "}
            {/* Added bottom padding to prevent content being hidden behind floating button */}
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
                  <TouchableOpacity>
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
                placeholder={"Add your last cycle"}
                // placeholder={cycleTracking?.data?.data[0].note? cycleTracking?.data?.data[0].note : "Add your last cycle"}
                icon={
                  <TouchableOpacity>
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

        {/* Floating button positioned outside of scrollable content */}
        {/* <View className="absolute bottom-24 right-10">
          <FloatingAiButton />
        </View> */}
      </View>
    </>
  );
}
