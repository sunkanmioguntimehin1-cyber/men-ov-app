import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import { MaterialIcons } from "@expo/vector-icons";
// import { ImageBackground } from "expo-image";
import { rMS } from "@/src/lib/responsivehandler";
import { Image } from "expo-image";
import React from "react";
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

const LastSymptomsModal = ({ onCancel }: any) => {
  const [selected, setSelected] = React.useState<Item | null>(null);
  const [openDropDown, setOpenDropDown] = React.useState(false);
  const [imageSelected, setImageSelected] = React.useState<any>(null);
  const [isDone, setIsDone] = React.useState(false)
 

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

  const handleWelconeBtn =()=>{
    setIsDone(false)
    onCancel()
  }

  
  return (
    <>
      {!isDone && (
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
              <CustomInput
                primary
                label="Symptoms"
                placeholder="Back Pain"
                //   value={selected || undefined}
              />
            </View>

            <View className="my-3">
              <Text className="font-[PoppinsMedium]">Severity Level</Text>

              <View className="flex-row items-center justify-between">
                {SeverityLevelData.map((item) => (
                  <>
                    <TouchableOpacity
                      key={item.level}
                      className=" w-20 h-12 items-center justify-center border border-[#D0D5DD] rounded-xl my-3"
                    >
                      <Text className=" font-[PoppinsRegular] text-[#667085]">
                        {item.level}
                      </Text>
                    </TouchableOpacity>
                  </>
                ))}
              </View>
            </View>

            <Triggers />
            <Note />
            <ImageUploadedDetails />
          </ScrollView>

          <View className="my-3">
            <CustomButton primary title="Done" onPress={()=>{
              setIsDone(true)
            }} />
          </View>
        </View>
      )}
      {isDone && (
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
