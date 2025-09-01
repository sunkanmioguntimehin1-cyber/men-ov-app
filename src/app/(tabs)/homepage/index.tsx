import FloatingAiButton from "@/src/components/tabs/FloatingAiButton";
import YourFeelingToday from "@/src/components/tabs/home-modal/YourFeelingToday";
import LastSymptomsModal from "@/src/components/tabs/home-modal/YourFeelingToday/lastSymptomsModal";
import TabsArticles from "@/src/components/tabs/TabsArticles";
import CustomModel from "@/src/custom-components/CustomModel";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const [modelVisible, setModelVisible] = React.useState(false);
  const [modelVisible1, setModelVisible1] = React.useState(false);


  const handleOpenmodal =()=>{
    setModelVisible(true)
  }

  const onCancel = () => {
    setModelVisible(false);
  };

   const handleOpenmodal1 = () => {
     setModelVisible1(true);
   };

   const onCancel1 = () => {
     setModelVisible1(false);
   };


  return (
    <Screen className="relative">
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
        message={<LastSymptomsModal onCancel={onCancel1} />}
      />
      <View className="p-8 flex-row items-center justify-end">
        <TouchableOpacity className=" mx-3">
          <Ionicons name="notifications-outline" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity className=" w-6 h-6 ">
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
      <View className="px-8">
        <View className="my-3">
          <Text
            className="mb-2 font-[PoppinsMedium] text-black"
            style={{ fontSize: Platform.OS === "android" ? rS(13) : rS(12) }}
          >
            Your last symptoms
          </Text>

          <View>
            <TouchableOpacity
              className=" bg-[#8A3FFC] h-20 w-40 rounded-xl"
              onPress={handleOpenmodal1}
            >
              <View className=" mb-3 flex-row items-center justify-between p-2">
                <View className=" w-6 h-6">
                  <Image
                    source={require("@/assets/images/sman.png")}
                    style={{
                      height: "100%",
                      width: "100%",
                      // alignSelf: "center",
                      borderRadius: 100,
                    }}
                    contentFit="contain"
                    onError={(error) => console.log("Image error:", error)}
                  />
                </View>

                <View>
                  <Text className="text-white">Back Pain</Text>
                </View>

                <View className=" items-center justify-center w-5 h-5 rounded-full bg-[#D7CE20]">
                  <Text className="text-white">3</Text>
                </View>
              </View>

              <Text className=" text-center text-xs text-white font-[PoppinsMedium]">
                Don’t forget to hydrate
              </Text>
            </TouchableOpacity>
          </View>
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
            onPress={() => {}}
            primary
            label="Cycle Tracking"
            placeholder="Add your last cycle"
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

        <View className="absolute top-full left-0 right-0 px-4 pb-8">
          <FloatingAiButton />
        </View>
      </View>
    </Screen>
  );
}

