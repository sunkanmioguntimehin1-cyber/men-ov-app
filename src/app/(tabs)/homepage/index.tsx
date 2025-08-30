import FloatingAiButton from "@/src/components/tabs/FloatingAiButton";
import YourFeelingToday from "@/src/components/tabs/home-modal/YourFeelingToday";
import TabsArticles from "@/src/components/tabs/TabsArticles";
import CustomModel from "@/src/custom-components/CustomModel";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import Screen from "@/src/layout/Screen";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const [modelVisible, setModelVisible] = React.useState(false);

  const handleOpenmodal =()=>{
    setModelVisible(true)
  }

  const onCancel = () => {
    setModelVisible(false);
  };


  return (
    <Screen className="relative">
      <CustomModel
        modelVisible={modelVisible}
        setModelVisible={setModelVisible}
        closeOnOutsideClick={false}
        message={<YourFeelingToday onCancel={onCancel} />}
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
      <View className=" px-8">
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

