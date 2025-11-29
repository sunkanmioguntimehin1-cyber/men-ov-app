import { useGetAllPosts } from "@/src/api_services/postsApi/postQuery";
import {
  useLikePostApi,
  useSavePostApi,
  useUnLikePostApi,
  useUnSavePostApi,
} from "@/src/api_services/postsApi/postsMutation";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import {
  GradientFeatherIcon,
  GradientIoniconsIcon,
  GradientMaterialCommunityIcons
} from "@/src/custom-components/GradientIcon";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import Screen from "@/src/layout/Screen";
import { getInitials } from "@/src/utils/getInitials";
import { format } from "date-fns";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Communitypage = () => {
  const router = useRouter();

  // const getPosts = useGetAllPosts();
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

  const getPosts = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);


  const _onReachEnd = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

 

  const handleSaveAndUnsave = (item: any) => {
    console.log(item, "5555");
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
  return (
    <Screen className="px-4 py-3">
      <LoadingOverlay
        isOpen={isLoading} // Required: Controls visibility
        // message="Login..." // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />
      <TouchableOpacity
        className=" flex-row items-center justify-between"
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
            <Text>What’s on your mind?</Text>
          </View>
        </View>

        {/* <TouchableOpacity className=" ">
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity> */}
      </TouchableOpacity>
      <View className=" h-0.5 bg-slate-200 my-2" />

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

            <TouchableOpacity className="mt-6 bg-[#8A3FFC] px-6 py-3 rounded-full">
              <Text className="text-white font-[PoppinsSemiBold]">
                Create a post
              </Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => {
          const date = new Date(item?.updatedAt);
          const formattedDate = format(date, "do MMMM yyyy");

          console.log(item, "itemmmm");

          return (
            <TouchableOpacity
              className="my-2"
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

              {/* Title */}
              <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
                {item?.title}
              </Text>

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
                  <View className="flex-row items-center mr-6">
                    <TouchableOpacity onPress={() => handleLikeAndUnLike(item)}>
                      {item.isLiked ? (
                        <GradientMaterialCommunityIcons
                          name="thumb-up"
                          size={16}
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
                          size={16}
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
                      {item?.likes} likes
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => handleComments(item._id)}
                  >
                    <GradientFeatherIcon
                      name="message-circle"
                      size={16}
                      gradientColors={[
                        "#6B5591",
                        "#6E3F8C",
                        "#853385",
                        "#9F3E83",
                      ]}
                    />

                    <Text className="text-xs text-gray-600 ml-1">
                      {item.commentCount} Comments
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center">
                  {/* <Feather name="share" size={16} color="gray" /> */}
                  <GradientMaterialCommunityIcons
                    name="repeat-variant"
                    size={16}
                    gradientColors={[
                      "#6B5591",
                      "#6E3F8C",
                      "#853385",
                      "#9F3E83",
                    ]}
                  />
                  <Text className="text-xs text-gray-600 ml-1">
                    {item?.shares} reposts
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
};

export default Communitypage;

