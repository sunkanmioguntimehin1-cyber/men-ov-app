import {
  useViewAPost
} from "@/src/api_services/postsApi/postQuery";
import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import {
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CommentsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const newData = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

  const viewUserPosts = useViewAPost(newData);

  console.log("newData300", newData);
  console.log(viewUserPosts?.data, "viewUserPostsBB");

  React.useEffect(() => {
    if (newData) {
      console.log("View Product Data:", viewUserPosts.data);
      viewUserPosts.refetch();
    
    }
  }, [newData]);

   const handleComments = (postId: string) => {
     router.push({
       pathname: `/(tabs)/communitypage/comments`,
       params: { item: JSON.stringify(postId) },
     });
   };

  return (
    <Screen className="p-6">
      <View className="flex-row items-center justify-between my-2  bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text
            className="font-[PoppinsSemiBold]"
            style={{ fontSize: rS(12) }}
          >
            View Post
          </Text>
        </View>
        <View />
      </View>

      <View className="">
        <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          {/* Post Header */}
          <View className="flex-row items-center py-2">
            {/* <View className="w-10 h-10 rounded-full mr-3">
              <Image
                source={{
                  uri: viewUserPosts.data?.images[0],
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 100,
                }}
                contentFit="cover"
              />
            </View> */}

            <View className="w-10 h-10 rounded-full bg-slate-200 items-center justify-center ">
              <Text>UE</Text>
            </View>

            <View className="mx-2">
              <Text className="font-bold text-black">
                {viewUserPosts.data?.user?.fullname}
              </Text>
            </View>
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

          {/* Post Image */}
          <View className="w-full h-48">
            <Image
              source={{
                // uri: item.images[0],
                uri: viewUserPosts.data?.images[0],
              }}
              style={{
                height: "100%",
                width: "100%",
              }}
              contentFit="cover"
            />
          </View>

          {/* Action Bar */}
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity
                className="  flex-row items-center justify-center"
                // onPress={() => handleLikeProduct(item.id)}
              >
                {viewUserPosts.data?.isLiked ? (
                  <MaterialCommunityIcons
                    name="thumb-up"
                    size={20}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="thumb-up-outline"
                    size={20}
                    color="black"
                  />
                )}
                <Text className=" mx-2 text-lg">
                  {viewUserPosts.data?.likes}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="mx-2  flex-row items-center"
                onPress={() => handleComments(viewUserPosts.data._id)}
              >
                <Ionicons name="chatbubble-outline" size={20} color="#666" />

                <Text className="text-xs text-gray-600 ml-1">
                  {viewUserPosts.data?.commentCount} Comments
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default CommentsScreen;
