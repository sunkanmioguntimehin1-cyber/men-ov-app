import CustomInput from "@/src/custom-components/CustomInput";
import CustomSelect from "@/src/custom-components/CustomSelect";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Controller } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GradientText } from "../GradientText";

const PersonalForm = ({
  handleDateBottomSheetOpen,
  selectedDate,
  setSelected,
  selected,
  control,
  errors,
  handleAddressSelect,
  handleLocationChange,
  dataItem,
  getSearchOptionQuery,
  option,
  term,
}: any) => {
  const [openDropDown, setOpenDropDown] = React.useState(false);

  return (
    <>
      <View>
        <View className=" items-center my-5">
          <GradientText className="font-[PoppinsMedium] text-xl">
            Personal Information
          </GradientText>

          <Text className="text-base font-[PoppinsRegular] my-2">
            Your data will be safe with us.
          </Text>
        </View>
        <View>
          <View>
            <Controller
              control={control}
              name="fullname"
              rules={{
                required: "username is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  primary
                  label="Full name"
                  placeholder="Full name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.fullname?.message}
                />
              )}
            />
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
              onPress={handleDateBottomSheetOpen}
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
            <Controller
              control={control}
              name="address"
              rules={{
                required: "Address is required",
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <>
                  <CustomInput
                    primary
                    label="Address"
                    normalize={false} // Normalize input
                    placeholder="Enter your address"
                    value={term?.description || value}
                    onChangeText={(text) => {
                      onChange(text);
                      handleLocationChange(text);
                    }}
                    onBlur={onBlur}
                    error={errors.address?.message}
                  />

                  {term && (
                    <ScrollView className="z-50 h-auto bg-primaryLight w-full rounded-lg">
                      {getSearchOptionQuery.isLoading ? (
                        <Text className="py-10 mx-auto">Loading...</Text>
                      ) : getSearchOptionQuery.isError ? (
                        <Text className="py-10 mx-auto">
                          Something went wrong
                        </Text>
                      ) : (
                        option.map((item: any) => (
                          <TouchableOpacity
                            key={item.place_id}
                            className="my-2 px-3"
                            onPress={() => handleAddressSelect(item, onChange)}
                          >
                            <Text className="font-[PoppinsRegular] text-[#6F649A]">
                              {item.description}
                            </Text>
                          </TouchableOpacity>
                        ))
                      )}
                    </ScrollView>
                  )}
                </>
              )}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default PersonalForm;
