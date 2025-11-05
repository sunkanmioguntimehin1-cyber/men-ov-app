import { useGetAllPosts } from "@/src/api_services/postsApi/postQuery";
import {
  useLikePostApi,
  useSavePostApi,
  useUnLikePostApi,
  useUnSavePostApi,
} from "@/src/api_services/postsApi/postsMutation";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import Screen from "@/src/layout/Screen";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { format } from "date-fns";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Communitypage = () => {
  const router = useRouter();

  const getPosts = useGetAllPosts();
  const savePost = useSavePostApi();
  const unSavePost = useUnSavePostApi();
  const likePostApi = useLikePostApi();
  const unLikePostApi = useUnLikePostApi();

  console.log("getPosts", getPosts?.data);

  const openWebView = (itemUrl: string) => {
    try {
      const uri = itemUrl;

      if (!uri) {
        Alert.alert("No  article Url found");
        return;
      }
      router.push({
        pathname: "/profilepage/profile-screen/recommendations-webview",
        params: { item: JSON.stringify(uri) },
      });
    } catch (error) {
      Alert.alert("Failed to fetch article Url");
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
    console.log(item, "5555");
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

   const handleComments = (postId: string) => {
     router.push({
       pathname: `/(tabs)/communitypage/comments`,
       params: { item: JSON.stringify(postId) },
     });
   };
  return (
    <Screen className="px-4 py-3">
      <LoadingOverlay
        isOpen={getPosts.isLoading} // Required: Controls visibility
        // message="Login..." // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />
      <TouchableOpacity
        className=" flex-row items-center"
        onPress={() => {
          router.push("/(tabs)/communitypage/create-post");
        }}
      >
        <View className="mx-3 bg-slate-400 h-10 w-10 items-center justify-center rounded-full">
          <Text>US</Text>
        </View>
        <View>
          <Text>What’s on your thoughs?</Text>
        </View>
      </TouchableOpacity>
      <View className=" h-0.5 bg-slate-200 my-2" />

      <ScrollView className=" p-4 mb-10">
        {getPosts?.data?.data?.length === 0 ? (
          // 👉 Empty State UI
          <View className="items-center justify-center mt-20">
            <Text className="text-gray-500 text-base mt-4 font-[PoppinsMedium]">
              No Post found
            </Text>
            {/* <Text className="text-gray-400 text-sm mt-2 text-center px-6">
              No Recommendations yet.
            </Text> */}

            <TouchableOpacity
              // onPress={() => router.push("/(tabs)/homepage")}
              className="mt-6 bg-[#8A3FFC] px-6 py-3 rounded-full"
            >
              <Text className="text-white font-[PoppinsSemiBold]">
                Create a post
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          getPosts?.data?.data?.map((item: any) => {
            // const date = new Date(item.publishedAt);
            const date = new Date(item?.updatedAt);
            const formattedDate = format(date, "do MMMM yyyy");

            return (
              <TouchableOpacity
                key={item._id}
                className=" my-2"
                // onPress={() => openWebView(item.article?.url)}
              >
                {/* Recommendation Header */}
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-purple-200 items-center justify-center mr-3">
                      <View className="w-6 h-6 rounded-full bg-pink-300 items-center justify-center">
                        <MaterialIcons
                          name="person"
                          size={16}
                          color="#8A3FFC"
                        />
                      </View>
                    </View>
                    <View>
                      <Text className="text-sm font-[PoppinsSemiBold] text-black">
                        {item.user?.fullname}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {/* 20 Jan 2025 8:30 AM */}
                        {formattedDate}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity onPress={() => handleSaveAndUnsave(item)}>
                    {item.isSaved ? (
                      <Ionicons name="bookmark" size={20} color="gray" />
                    ) : (
                      <Ionicons
                        name="bookmark-outline"
                        size={24}
                        color="gray"
                      />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Title */}
                <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
                  {/* My Recommendations */}
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
                <TouchableOpacity
                  className="w-full h-48 bg-gray-200 rounded-lg mb-4"
                  // onPress={() => openWebView(item.article?.url)}
                >
                  <Image
                    source={{ uri: item.images[0] }}
                    style={{
                      height: "100%",
                      width: "100%",
                      // alignSelf: "center",
                      borderRadius: 10,
                    }}
                    contentFit="cover"
                    onError={(error) => console.log("Image error:", error)}
                  />
                </TouchableOpacity>

                {/* Engagement Bar */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="flex-row items-center mr-6">
                      <TouchableOpacity
                        onPress={() => handleLikeAndUnLike(item)}
                      >
                        {item.isLiked ? (
                          <MaterialCommunityIcons
                            name="thumb-up"
                            size={16}
                            color="black"
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="thumb-up-outline"
                            size={16}
                            color="black"
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
                      <Feather name="message-circle" size={16} color="gray" />
                      <Text className="text-xs text-gray-600 ml-1">
                        {item.commentCount} Comments
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row items-center">
                    <Feather name="share" size={16} color="gray" />
                    <Text className="text-xs text-gray-600 ml-1">
                      {item?.shares} shares
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </Screen>
  );
};

export default Communitypage;
