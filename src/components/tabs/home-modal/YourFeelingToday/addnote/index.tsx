import CustomButton from "@/src/custom-components/CustomButton";
import { rS, rV } from "@/src/lib/responsivehandler";
import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const AddNote = () => {
  const [note, setNote] = useState("");

   const {
     control,
     handleSubmit,
     reset,
     watch,
     formState: { errors, isValid },
   } = useForm({
     mode: "onChange",
     defaultValues: {
       full_name: "",
       email: "",
       phone_number: "",
       bio: "",
       region: "",
       gender: "",
     },
   });

  return (
    <View>
      <View className="mt-3 mb-5">
        <Text
          className="mb-2 font-[PoppinsMedium] "
          style={{ fontSize: rS(12) }}
        >
          Notes
        </Text>

        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="border border-[#B4B4B4] bg-white rounded-lg p-4">
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder="Add a note about how do you feel"
                placeholderTextColor="#9B9B9B"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{
                  fontSize: rS(14),
                  color: "#000",
                  textAlignVertical: "top",
                  minHeight: rV(100),
                }}
              />
            </View>
          )}
        />
      </View>
      <TouchableOpacity className="w-[131px] flex-row items-center ml-2 bg-[#F9F5FF] rounded-full px-4 py-3">
        <Text className="font-[PoppinsMedium]">Add image</Text>
        <View className="mx-2">
          <Entypo name="image-inverted" size={24} color="#8A3FFC" />
        </View>
      </TouchableOpacity>

      <View className="my-3">
        <CustomButton primary title="Add" />
      </View>
    </View>
  );
};

export default AddNote;
