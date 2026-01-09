import {
  useGetCommentPostApi,
  useViewAPost,
} from "@/src/api_services/postsApi/postQuery";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import CommentSection from "@/src/components/community/CommentSection";
import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CommentsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const newData = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

  const getUserData = useGetUser();
  const viewUserPosts = useViewAPost(newData);
  const getPostCommentLists = useGetCommentPostApi(newData);

  const currentUserId = getUserData?.data?.id

 

  React.useEffect(() => {
    if (newData) {
      console.log("View Product Data:", viewUserPosts.data);
      viewUserPosts.refetch();
      getPostCommentLists.refetch();
    }
  }, [newData]);

  return (
    <Screen className="p-6">
      <View className="flex-row items-center justify-between my-2 ">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View>
          <Text
            className="font-[PoppinsSemiBold] "
            style={{ fontSize: rS(12) }}
          >
            Comments
          </Text>
        </View>
        <View />
      </View>

      <View className="flex-1 mb-4">
        <CommentSection
          getPostCommentLists={getPostCommentLists}
          newData={newData} // Pass the actual product data
          currentUserId={currentUserId}
        />
      </View>
    </Screen>
  );
};

export default CommentsScreen;
