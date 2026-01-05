

import { useGetAllPosts } from "@/src/api_services/postsApi/postQuery";
import {
  useLikePostApi,
  useSavePostApi,
  useUnLikePostApi,
  useUnSavePostApi,
} from "@/src/api_services/postsApi/postsMutation";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import DeletePostModal from "@/src/components/community/DeletePostModal";
import CustomModel from "@/src/custom-components/CustomModel";
import {
  GradientFeatherIcon,
  GradientIoniconsIcon,
  GradientMaterialCommunityIcons,
} from "@/src/custom-components/GradientIcon";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import Popover, { PopoverMenuItem } from "@/src/custom-components/Popover";
import Screen from "@/src/layout/Screen";
import { getInitials } from "@/src/utils/getInitials";
import { Entypo, Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Communitypage = () => {
  const router = useRouter();
  const [modelVisible, setModelVisible] = React.useState(false);
  const [getPostId, setGetPostId] = React.useState<string | null>(null);
  const [activePopoverId, setActivePopoverId] = React.useState<string | null>(
    null
  );
  const [popoverPosition, setPopoverPosition] = React.useState({ x: 0, y: 0 });

  const getUserData = useGetUser();
  const savePost = useSavePostApi();
  const unSavePost = useUnSavePostApi();
  const likePostApi = useLikePostApi();
  const unLikePostApi = useUnLikePostApi();

  const {
    data,
    isLoading,
    refetch,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllPosts();

  console.log("getUserData", getUserData?.data);
  console.log("data333", data);

  const getPosts = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const _onReachEnd = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const handleSaveAndUnsave = (item: any) => {
    if (item.isSaved) {
      unSavePost.mutate({
        id: item._id,
      });
    } else {
      savePost.mutate({
        id: item._id,
      });
    }
  };

  const handleLikeAndUnLike = (item: any) => {
    if (item.isLiked) {
      unLikePostApi.mutate({
        id: item._id,
      });
    } else {
      likePostApi.mutate({
        id: item._id,
      });
    }
  };

  const handleViewPost = (postId: string) => {
    router.push({
      pathname: `/(tabs)/communitypage/view-post`,
      params: { item: JSON.stringify(postId) },
    });
  };

  const handleComments = (postId: string) => {
    router.push({
      pathname: `/(tabs)/communitypage/comments`,
      params: { item: JSON.stringify(postId) },
    });
  };

  const handleOpenPopover = (postId: string, event: any) => {
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
        setActivePopoverId(postId);
      }
    );
  };

  const handleEdit = (postId: string) => {
    console.log("Edit post:", postId);
    // Add your edit logic here
    router.push({
      pathname: `/(tabs)/communitypage/edit-post`,
      params: { item: JSON.stringify(postId) },
    });
  };

  const handleDelete = (postId: string) => {
    setModelVisible(true);
    setGetPostId(postId);
    // Add your delete logic here
  };

  const getPopoverItems = (postId: string): PopoverMenuItem[] => [
    {
      label: "Edit",
      icon: <Feather name="edit" size={18} color="#2E6939" />,
      onPress: () => handleEdit(postId),
      textColor: "#374151",
    },
    {
      label: "Delete",
      icon: <Feather name="trash-2" size={18} color="#DC2626" />,
      onPress: () => handleDelete(postId),
      textColor: "#DC2626",
    },
  ];

  const onCancel = () => {
    // router.push("/guess-home");
    setModelVisible(false);
  };

  return (
    <Screen className="px-4 py-3">
      <CustomModel
        modelVisible={modelVisible}
        setModelVisible={setModelVisible}
        closeOnOutsideClick={false}
        message={
          <DeletePostModal
            onCancel={onCancel}
            getPostId={getPostId}
            setModelVisible={setModelVisible}
          />
        }
      />
      <LoadingOverlay isOpen={isLoading} animationType="pulse" />
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={() => {
          router.push("/(tabs)/communitypage/create-post");
        }}
      >
        <View className="flex-row items-center">
          <View className="mx-3 bg-slate-400 h-10 w-10 items-center justify-center rounded-full">
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
              <View className="w-full h-full bg-slate-300 rounded-full items-center justify-center">
                <Text className="text-black font-bold text-sm">
                  {getInitials(getUserData?.data?.fullname)}
                </Text>
              </View>
            )}
          </View>
          <View>
            <Text>{`What's on your mind today?`}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View className="h-0.5 bg-slate-200 my-2" />

      <FlatList
        data={getPosts}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        onEndReached={_onReachEnd}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="small" /> : null
        }
        ListEmptyComponent={() => (
          <View className="items-center justify-center mt-20">
            <Text className="text-gray-500 text-base mt-4 font-[PoppinsMedium]">
              No Post found
            </Text>

            <TouchableOpacity
              className="mt-6 px-6 py-3 rounded-full"
              onPress={() => {
                router.push("/communitypage/create-post");
              }}
            >
              <LinearGradient
                colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  minHeight: 56,
                  padding: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <Text className="text-white font-[PoppinsSemiBold]">
                  Create a post
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => {
          const date = new Date(item?.updatedAt);
          const formattedDate = format(date, "do MMMM yyyy");

          return (
            <TouchableOpacity
              className="my-5"
              onPress={() => handleViewPost(item._id)}
            >
              {/* Recommendation Header */}
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-[#F4EBFF] items-center justify-center mr-3">
                    {item.user?.picture ? (
                      <Image
                        source={{ uri: item?.user?.picture }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                        }}
                      />
                    ) : (
                      <View className="w-full h-full bg-slate-300 rounded-full items-center justify-center">
                        <Text className="text-black font-bold text-sm">
                          {getInitials(item.user?.fullname)}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View>
                    <Text className="text-sm font-[PoppinsSemiBold] text-black">
                      {item?.isAnon ? "Anonymous" : item.user?.fullname}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {formattedDate}
                    </Text>
                  </View>
                </View>
                {getUserData?.data?.id === item.user?._id ? (
                  <TouchableOpacity
                    className=""
                    onPress={(e) => handleOpenPopover(item._id, e)}
                  >
                    <Entypo
                      name="dots-three-vertical"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                ) : null}
              </View>

              {/* Title */}
              {item?.title && (
                <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
                  {item?.title}
                </Text>
              )}

              {/* Description */}
              <Text className="text-sm text-gray-600 mb-4 leading-5">
                {item?.content}
              </Text>

              {/* Hashtags */}
              <View className="flex-row mb-4">
                {item.hashtags?.map((tag: any) => (
                  <View
                    key={tag}
                    className="bg-gray-200 rounded-full px-3 py-1 mr-2"
                  >
                    <Text className="text-xs text-gray-700">#{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Embedded Image */}
              {item.images[0] && (
                <TouchableOpacity className="w-full h-96 bg-gray-200 rounded-lg mb-4">
                  <Image
                    source={{ uri: item.images[0] }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 10,
                    }}
                    contentFit="cover"
                    onError={(error) => console.log("Image error:", error)}
                  />
                </TouchableOpacity>
              )}

              {/* Engagement Bar */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => handleLikeAndUnLike(item)}>
                      {item.isLiked ? (
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
                    </TouchableOpacity>
                    <Text className="text-xs text-gray-600 ml-1">
                      {item?.likes}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="flex-row items-center mx-2"
                    onPress={() => handleComments(item._id)}
                  >
                    <GradientFeatherIcon
                      name="message-circle"
                      size={20}
                      gradientColors={[
                        "#6B5591",
                        "#6E3F8C",
                        "#853385",
                        "#9F3E83",
                      ]}
                    />

                    <Text className="text-xs text-gray-600 ml-1">
                      {item.commentCount}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => handleComments(item._id)}
                  >
                    <GradientMaterialCommunityIcons
                      name="repeat-variant"
                      size={20}
                      gradientColors={[
                        "#6B5591",
                        "#6E3F8C",
                        "#853385",
                        "#9F3E83",
                      ]}
                    />
                    <Text className="text-xs text-gray-600 ml-1">
                      {item?.shares}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center">
                  <TouchableOpacity onPress={() => handleSaveAndUnsave(item)}>
                    {item.isSaved ? (
                      <GradientIoniconsIcon
                        name="bookmark"
                        size={20}
                        gradientColors={[
                          "#6B5591",
                          "#6E3F8C",
                          "#853385",
                          "#9F3E83",
                        ]}
                      />
                    ) : (
                      <GradientIoniconsIcon
                        name="bookmark-outline"
                        size={20}
                        gradientColors={[
                          "#6B5591",
                          "#6E3F8C",
                          "#853385",
                          "#9F3E83",
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Single Popover for all posts */}
      {activePopoverId && (
        <Popover
          visible={true}
          onClose={() => setActivePopoverId(null)}
          items={getPopoverItems(activePopoverId)}
          anchorPosition={popoverPosition}
        />
      )}
    </Screen>
  );
};

export default Communitypage;
