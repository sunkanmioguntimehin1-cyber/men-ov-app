import { useEditUser } from "@/src/api_services/userApi/userMutation";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import SetPersonalInfoCalender from "@/src/components/PersonalInfoForm/BottomSheetComp/SetPersonalInfoCalender";
import ProfileUploadImage from "@/src/components/profile/ProfileUploadImage";
import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
import CustomButton from "@/src/custom-components/CustomButton";
import CustomInput from "@/src/custom-components/CustomInput";
import CustomSelect from "@/src/custom-components/CustomSelect";
import CustomSelectData from "@/src/custom-components/CustomSelectData";
import { useLocationSearch } from "@/src/hooks/useLocationSearch";
import KeyboardAwareScreen from "@/src/layout/KeyboardAwareScreen";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Item {
  title: string;
  value: string;
  price?: string;
}

const dataItem = [
  { title: "Female", value: "female" },
  { title: "Male", value: "male" },
  { title: "Intersex", value: "Intersex" },
];

const EditProfile = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selected, setSelected] = React.useState<Item | null>(null);
  const [notePublicUrls, setNotePublicUrls] = React.useState<string[]>([]);

  const [openDropDown, setOpenDropDown] = React.useState(false);

  const getUserData = useGetUser();
  const editUserProfile = useEditUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      address: "",
      fullname: "",
    },
  });
  const {
    term,
    option,
    city,
    handleLocationChange,
    onOptionSelect,
    getSearchOptionQuery,
  } = useLocationSearch();

  const handleAddressSelect = (
    item: any,
    onChange: (value: string) => void
  ) => {
    onChange(item.description);
    onOptionSelect(item);
  };

  React.useEffect(() => {
    if (getUserData?.data) {
      const userGender = getUserData.data.gender;
      const updateDateValue = getUserData?.data?.dob;
      reset({
        fullname: getUserData?.data?.fullname,
        address: getUserData?.data?.address,
        // dob: getUserData?.data?.dob,
      });
      const matchingGender = dataItem.find((item) => item.value === userGender);
      setSelected(matchingGender || null);
      const parsedDob = updateDateValue ? new Date(updateDateValue) : null;
      setSelectedDate(parsedDob);
    }
  }, [getUserData?.data, reset]);

  const dateValue = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  const snapPoints = useMemo(() => ["30%", "50%"], []);

  const datebottomSheetRef = React.useRef<BottomSheet>(null);
  const handleDateBottomSheetOpen = () => datebottomSheetRef.current?.expand();
  const handleDateBottomSheetClose = () => datebottomSheetRef.current?.close();

  const onSubmit = (data: any) => {
    editUserProfile.mutate({
      fullname: data.fullname || getUserData?.data?.fullname,
      gender: selected?.value || getUserData?.data?.gender,
      address: data.address || getUserData?.data?.address,
      dob: selectedDate,
    });
  };

  return (
    <KeyboardAwareScreen
      scroll={true}
      keyboardAware={true}
      extraScrollHeight={50}
    >
      {/* Header */}
      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={{
          height: "80%",
          width: "100%",
        }}
        resizeMode="cover"
      >
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-lg font-[PoppinsSemiBold] text-black">
            Edit Profile
          </Text>

          <View />
        </View>

        <View className="p-8">
          <View className=" ">
            <ProfileUploadImage
              notePublicUrls={notePublicUrls}
              setNotePublicUrls={setNotePublicUrls}
            />
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
                value={dateValue}
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
                              onPress={() =>
                                handleAddressSelect(item, onChange)
                              }
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

          <View>
            <CustomButton
              primary
              title="Save"
              onPress={handleSubmit(onSubmit)}
              loading={editUserProfile.isPending}
            />
          </View>
        </View>
      </ImageBackground>

      <BottomSheetScreen
        snapPoints={snapPoints}
        ref={datebottomSheetRef}
        isBackdropComponent={true}
        enablePanDownToClose={true}
        index={-1}
        message={
          <SetPersonalInfoCalender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleDateBottomSheetClose={handleDateBottomSheetClose}
          />
        }
      />
    </KeyboardAwareScreen>
  );
};

export default EditProfile;
