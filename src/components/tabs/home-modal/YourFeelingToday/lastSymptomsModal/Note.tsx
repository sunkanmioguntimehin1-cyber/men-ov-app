import { rS, rV } from '@/src/lib/responsivehandler';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

const Note = () => {

       const {
         control,
         handleSubmit,
         reset,
         watch,
         formState: { errors, isValid },
       } = useForm({
         mode: "onChange",
         defaultValues: {
          
           notes: "",
         },
       });
  return (
    <View className="mt-3 mb-5">
      <Text className="mb-2 font-[PoppinsMedium] " style={{ fontSize: rS(12) }}>
        Notes
      </Text>

      <Controller
        control={control}
        name="notes"
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
  );
}

export default Note