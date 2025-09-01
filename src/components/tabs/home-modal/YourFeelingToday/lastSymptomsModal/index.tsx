import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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

  
  return (
    <ScrollView className="h-[600px]">
      <View className=" w-96 p-5 bg-white rounded-lg  shadow-lg overflow-hidden">
        <View className=" flex-row items-center justify-between">
          <Text className=" font-[PoppinsSemiBold] text-base">
            Are you well now?{" "}
          </Text>
          <TouchableOpacity onPress={onCancel}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View>
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
        </View>

        <View className="my-3">
          <CustomButton primary title="Add" />
        </View>
      </View>
    </ScrollView>
  );
};

export default LastSymptomsModal;


