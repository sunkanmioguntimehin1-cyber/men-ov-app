// import Screen from '@/src/layout/Screen'
// import React from 'react'
// import { Text } from 'react-native'

// const CreatePost = () => {
//   return (
//     <Screen>
//       <Text>CreatePost</Text>
//     </Screen>
//   )
// }

// export default CreatePost

import {
  useGetAPost,
  useGetHashtag,
} from "@/src/api_services/postsApi/postQuery";
import { useUpdateAPost } from "@/src/api_services/postsApi/postsMutation";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import EditCommUploadImage from "@/src/components/community/EditCommUploadImage";
import { GradientText } from "@/src/components/GradientText";
import CustomInput from "@/src/custom-components/CustomInput";
import Screen from "@/src/layout/Screen";
import { getInitials } from "@/src/utils/getInitials";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo } from "react";
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

const EditPost = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [notePublicUrls, setNotePublicUrls] = React.useState<string[]>([]);

  const getUserData = useGetUser();
  const updateAPostMutation = useUpdateAPost();
  const getHashtagList = useGetHashtag();

  // console.log("selectedTags", selectedTags);
  const newData = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

  // console.log("notePublicUrls", notePublicUrls);

  const getAPost = useGetAPost(newData);

  // console.log("getAPost", getAPost?.data);
  // console.log("updateAPostMutation", updateAPostMutation);

  //  useEffect(()=>{
  //   if(newData){
  //     setNotePublicUrls(newData.images);
  //   }
  //  },[])

  const {
    control,
    handleSubmit,
    reset,
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

  useEffect(() => {
    if (getAPost?.data) {
      const postData = getAPost?.data;
      // Set form values
      reset({
        title: postData.title || "",
        content: postData.content || "",
      });
      // Set image URLs
      setNotePublicUrls(postData.images[0] || []);
      setIsAnonymous(postData.isAnon || false);
      setSelectedTags(postData.hashtags || []);
      // You can set other form fields similarly if needed
    }
  }, [getAPost?.data, reset]);

  const onSubmit = (data: any) => {
    const requestedPayload = {
      title: data?.title,
      content: data?.content,
      hashtags: selectedTags,
      images: notePublicUrls,
      isAnon: isAnonymous,
      id: newData,
    };

    updateAPostMutation.mutate(requestedPayload);
  };

  // console.log("getUserData", getHashtagList?.data);

  return (
    <Screen scroll={true} className=" px-4 bg-white pb-10">
      {/* Header */}
      <View className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="font-[PoppinsSemiBold] text-lg text-black">
          Edit post
        </Text>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={updateAPostMutation.isPending}
        >
          {updateAPostMutation.isPending ? (
            <ActivityIndicator />
          ) : (
            <GradientText className="font-[PoppinsMedium] text-base">
              Save
            </GradientText>
          )}
        </TouchableOpacity>
      </View>

      <View className="px-4">
        {/* User Info */}
        <View className="flex-row items-center justify-between my-4">
          <View className="flex-row items-center">
            {getAPost?.data?.user?.picture ? (
              <Image
                source={{ uri: getAPost?.data?.user?.picture }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
              />
            ) : (
              <View className=" bg-slate-200 w-10 h-10 rounded-full items-center justify-center">
                <Text className="font-[PoppinsSemiBold] text-base text-black">
                  {getInitials(getAPost?.data?.user?.fullname)}
                </Text>
              </View>
            )}

            <View className="ml-3">
              <Text className="font-[PoppinsSemiBold] text-base text-black">
                {getAPost?.data?.user?.fullname}
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
                placeholder={`Add a short topic (optional)`}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.title?.message}
              />
            )}
          />
        </View>

        {/* Content Input */}
        <Controller
          control={control}
          name="content"
          // rules={{
          //   required: "content is required",
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={`Share what you’re experiencing—and what kind of support you’d like.
You can ask a question, share a win, or simply vent.`}
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

        {/* Anonymous Toggle */}
        <View className="flex-row items-center justify-between my-3">
          <Text className="font-[PoppinsRegular] text-base text-black">
            Share anonymously
          </Text>
          <Switch
            value={isAnonymous}
            onValueChange={setIsAnonymous}
            trackColor={{ false: "#D1D5DB", true: "#B33288" }}
            thumbColor="#fff"
            ios_backgroundColor="#D1D5DB"
          />
        </View>

        {/* Image Upload Button */}

        <EditCommUploadImage
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
                  isSelected ? "border-[#B33288]" : "border-gray-300 bg-white"
                }`}
              >
               

                {isSelected ? (
                  <GradientText className="font-[PoppinsRegular] text-sm ">
                    {tag}
                  </GradientText>
                ) : (
                  <Text
                    className={`font-[PoppinsRegular] text-sm text-gray-600 `}
                  >
                    {tag}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Screen>
  );
};

export default EditPost;
