import CustomInput from "@/src/custom-components/CustomInput";
import CustomSelect from "@/src/custom-components/CustomSelect";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Item {
  title: string;
  value: string;
  price?: string;
}

const PersonalForm = ({ handleDateBottomSheetOpen, selectedDate }: any) => {
  const [selected, setSelected] = React.useState<Item | null>(null);
  const [openDropDown, setOpenDropDown] = React.useState(false);

  const dataItem = [
    { title: "Female", value: "female" },
    { title: "Male", value: "male" },
    { title: "Intersex", value: "Intersex" },
    // { title: "Farmer", value: "Farmer" },
  ];

  return (
    <>
      <View>
        <View className=" items-center my-5">
          <Text className=" text-xl text-[#42307D] font-[PoppinsSemiBold]">
            Personal Information
          </Text>
          <Text className=" text-base text-[#6941C6] font-[PoppinsRegular] my-2">
            Your data will be safe with us.
          </Text>
        </View>
        <View>
          <View>
            <CustomInput primary label="Full name" />
          </View>

          <View className=" my-3">
            <CustomSelect
              label="Sex"
              primary
              selected={selected}
              setSelected={setSelected}
              openDropDown={openDropDown}
              setOpenDropDown={setOpenDropDown}
              placeholder="Choose"
              dataItem={dataItem}
              // style={{ borderRadius: 100 }}
            />
          </View>

          <View className=" my-3">
            <CustomSelectData
              primary
              placeholder="Pick a date"
              label="Date of birth"
              value={selectedDate}
              icon={
                <TouchableOpacity onPress={handleDateBottomSheetOpen}>
                  <AntDesign name="down" size={20} color="#1E1D2F" />
                </TouchableOpacity>
              }
            />
          </View>

          <View className=" my-3">
            <CustomInput primary label="Address" />
          </View>
        </View>
      </View>
    </>
  );
};

export default PersonalForm;
