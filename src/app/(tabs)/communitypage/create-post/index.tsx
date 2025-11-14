import { useGetHashtag } from "@/src/api_services/postsApi/postQuery";
import { useCreatePostApi } from "@/src/api_services/postsApi/postsMutation";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import CommUploadImage from "@/src/components/community/CommUploadImage";
import CustomInput from "@/src/custom-components/CustomInput";
import Screen from "@/src/layout/Screen";
import { getInitials } from "@/src/utils/getInitials";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CreatePost = () => {
  const router = useRouter();
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [notePublicUrls, setNotePublicUrls] = React.useState<string[]>([]);

  const getUserData = useGetUser();
  const createPostMutation = useCreatePostApi();
  const getHashtagList = useGetHashtag();

  // console.log("selectedTags", selectedTags);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const tags = getHashtagList?.data;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const onSubmit = (data: any) => {
    const requestedPayload = {
      title: data?.title,
      content: data?.content,
      hashtags: selectedTags,
      images: notePublicUrls,
      isAnon: isAnonymous,
    };

    createPostMutation.mutate(requestedPayload);
  };

  return (
    <Screen scroll={true} className=" px-4 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="font-[PoppinsSemiBold] text-lg text-black">
          Creat post
        </Text>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          {createPostMutation.isPending ? (
            <ActivityIndicator />
          ) : (
            <Text className={`font-[PoppinsMedium] text-base text-primary `}>
              Next
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="px-4">
        {/* User Info */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            {getUserData?.data?.picture ? (
              <Image
                source={{ uri: getUserData?.data?.picture }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
              />
            ) : (
              <View className="my-2 w-9 h-9 bg-slate-300 rounded-full items-center justify-center">
                <Text className="text-black font-bold text-sm">
                  {getInitials(getUserData?.data?.fullname)}
                </Text>
              </View>
            )}

            {/* <View>UE</View> */}
            <View className="ml-3">
              <Text className="font-[PoppinsSemiBold] text-base text-black">
                {getUserData?.data?.fullname}
              </Text>
              {/* <Text className="font-[PoppinsRegular] text-xs text-gray-500">
                20 Jan 2025 8:30 AM
              </Text> */}
            </View>
          </View>
        </View>

        {/* Title Input */}

        <View className="mb-4">
          <Controller
            control={control}
            name="title"
            // rules={{
            //   required: "title  is required",
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                placeholder="What's topic on your mind?"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                // error={errors.title?.message}
              />
            )}
          />
        </View>

        {/* Content Input */}
        <Controller
          control={control}
          name="content"
          rules={{
            required: "content is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Anyone else dealing with brain fog lately?"
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              className="font-[PoppinsRegular] text-base text-black border border-gray-300 rounded-xl px-4 py-3 "
              style={{ height: 150 }}
            />
          )}
        />
        {errors.content && (
          <Text className="text-red-500 font-[PoppinsRegular] text-xs mt-1">
            {errors.content.message}
          </Text>
        )}

        {/* Anonymous Toggle */}
        <View className="flex-row items-center justify-between my-3">
          <Text className="font-[PoppinsRegular] text-base text-black">
            Participate as anonymous
          </Text>
          <Switch
            value={isAnonymous}
            onValueChange={setIsAnonymous}
            trackColor={{ false: "#D1D5DB", true: "#A78BFA" }}
            thumbColor={isAnonymous ? "#8553F3" : "#F3F4F6"}
            ios_backgroundColor="#D1D5DB"
          />
        </View>

        {/* Image Upload Button */}

        <CommUploadImage
          notePublicUrls={notePublicUrls}
          setNotePublicUrls={setNotePublicUrls}
        />

        {/* Tags */}
        <View className="flex-row flex-wrap gap-2">
          {tags?.map((tag: any, index: number) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <TouchableOpacity
                key={`${tag}-${index}`}
                onPress={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full border ${
                  isSelected
                    ? "border-[#8553F3] bg-[#F3F0FF]"
                    : "border-gray-300 bg-white"
                }`}
              >
                <Text
                  className={`font-[PoppinsRegular] text-sm ${
                    isSelected ? "text-[#8553F3]" : "text-gray-600"
                  }`}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Screen>
  );
};

export default CreatePost;
