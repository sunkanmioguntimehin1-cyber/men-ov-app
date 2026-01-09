import {
  useGetHashtag,
  useViewAPost,
} from "@/src/api_services/postsApi/postQuery";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import { GradientText } from "@/src/components/GradientText";
import {
  GradientEntypoIcon,
  GradientFeatherIcon,
  GradientMaterialCommunityIcons,
} from "@/src/custom-components/GradientIcon";
import Popover from "@/src/custom-components/Popover";
import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import { getInitials } from "@/src/utils/getInitials";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

const ViewPostScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showPopover, setShowPopover] = useState(false);
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  const newData = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

  const getUserData = useGetUser();
  const viewUserPosts = useViewAPost(newData);
  const getHashtagList = useGetHashtag();

  const tags = getHashtagList?.data;

  React.useEffect(() => {
    if (newData) {
      viewUserPosts.refetch();
    }
  }, [newData]);

  React.useEffect(() => {
    if (viewUserPosts.data) {
      setIsAnonymous(viewUserPosts.data.isAnonymous);
      setSelectedTags(viewUserPosts.data.hashtags || []);
    }
  }, [viewUserPosts.data]);

  console.log("viewUserPosts", viewUserPosts.data);

  const handleComments = (postId: string) => {
    router.push({
      pathname: `/(tabs)/communitypage/comments`,
      params: { item: JSON.stringify(postId) },
    });
  };

  const handleOpenPopover = (event: any) => {
    event.currentTarget.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        setPopoverPosition({ x: pageX + width, y: pageY + height });
        setShowPopover(true);
      }
    );
  };

  const handleEdit = () => {
    setShowPopover(false);
    // Add your edit logic here
    router.push({
      pathname: `/(tabs)/communitypage/edit-post`,
      params: { item: JSON.stringify(viewUserPosts.data?._id) },
    });
    // console.log("Edit post:", viewUserPosts.data?._id);
  };

  const handleDelete = () => {
    setShowPopover(false);
    // Add your delete logic here
    console.log("Delete post:", viewUserPosts.data?._id);
  };

  const popoverItems = [
    {
      label: "Edit",
      icon: (
        <GradientFeatherIcon
          name="edit"
          size={18}
          gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
        />
      ),
      onPress: handleEdit,
      textColor: "#374151",
    },
    // {
    //   label: "Delete",
    //   icon: <Feather name="trash-2" size={18} color="#DC2626" />,
    //   onPress: handleDelete,
    //   textColor: "#DC2626",
    // },
  ];

  return (
    <Screen className="px-6 pt-3 pb-10">
      <View className="flex-row items-center justify-between my-2 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View>
          <Text className="font-[PoppinsSemiBold]" style={{ fontSize: rS(12) }}>
            View Post
          </Text>
        </View>
        <View />
      </View>

      <ScrollView className="">
        <View className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
          {/* Post Header */}
          <View className="flex-row justify-between items-center py-2">
            <View className="flex-row  items-center py-2">
              <View className="w-10 h-10 rounded-full bg-slate-200 items-center justify-center">
                {viewUserPosts.data?.user?.picture ? (
                  <Image
                    source={{ uri: viewUserPosts.data?.user?.picture }}
                    style={{ width: 40, height: 40 }}
                    contentFit="cover"
                  />
                ) : (
                  <Text>{getInitials(viewUserPosts.data?.user?.fullname)}</Text>
                )}
              </View>

              <View className="mx-2">
                <Text className="font-bold text-black">
                  {viewUserPosts.data?.user?.fullname}
                </Text>
              </View>
            </View>

            {getUserData?.data?.id === viewUserPosts.data?.user?._id ? (
              <TouchableOpacity
                className=""
                onPress={(e) => handleOpenPopover(e)}
              >
                <GradientEntypoIcon
                  name="dots-three-vertical"
                  size={20}
                  gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Post Description */}
          <View className="px-4 pb-3">
            <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
              {viewUserPosts.data?.title}
            </Text>
            <Text className="text-gray-700 text-sm leading-5">
              {viewUserPosts.data?.content}
            </Text>
          </View>

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

          {/* Post Image */}
          {viewUserPosts.data?.images[0] && (
            <View className="w-full h-96">
              <Image
                source={{
                  uri: viewUserPosts.data?.images[0],
                }}
                style={{
                  height: "100%",
                  width: "100%",
                }}
                contentFit="cover"
              />
            </View>
          )}

          {/* Action Bar */}
          <View className="flex-row items-center justify-between py-3">
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity className="flex-row items-center justify-center">
                {viewUserPosts.data?.isLiked ? (
                  <GradientMaterialCommunityIcons
                    name="thumb-up"
                    size={20}
                    gradientColors={[
                      "#6B5591",
                      "#6E3F8C",
                      "#853385",
                      "#9F3E83",
                    ]}
                  />
                ) : (
                  <GradientMaterialCommunityIcons
                    name="thumb-up-outline"
                    size={20}
                    gradientColors={[
                      "#6B5591",
                      "#6E3F8C",
                      "#853385",
                      "#9F3E83",
                    ]}
                  />
                )}
                <Text className="mx-2 text-lg">
                  {viewUserPosts.data?.likes}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="mx-2 flex-row items-center"
                onPress={() => handleComments(viewUserPosts.data._id)}
              >
                <GradientFeatherIcon
                  name="message-circle"
                  size={20}
                  gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                />
                <Text className="text-xs text-gray-600 ml-1">
                  {viewUserPosts.data?.commentCount} Comments
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tags */}
          <View className="flex-row flex-wrap gap-2">
            {tags?.map((tag: any, index: number) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <TouchableOpacity
                  key={`${tag}-${index}`}
                  // onPress={() => toggleTag(tag)}
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
      </ScrollView>

      {/* Popover Menu */}
      <Popover
        visible={showPopover}
        onClose={() => setShowPopover(false)}
        items={popoverItems}
        anchorPosition={popoverPosition}
      />
    </Screen>
  );
};

export default ViewPostScreen;
