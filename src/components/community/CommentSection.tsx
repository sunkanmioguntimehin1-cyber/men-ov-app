// CommentSection.tsx
import { useCommentPostApi } from "@/src/api_services/postsApi/postsMutation";
import CustomInput from "@/src/custom-components/CustomInput";
import { GradientMaterialIcon } from "@/src/custom-components/GradientIcon";
import { getInitials } from "@/src/utils/getInitials";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";


interface User {
  _id: string;
  fullname: string;
  picture?: string;
}
interface Comment {
  _id: string;
  user: User;
  text: string;
  createdAt: string;
}

interface CommentSectionProps {
  getPostCommentLists: any;
  newData: any;
  currentUserId?: string;
}

const CommentSection = ({
  getPostCommentLists,
  newData,
  currentUserId,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const commentOnProduct = useCommentPostApi();
  const flatListRef = useRef<FlatList>(null);

  const handleSubmitComment = () => {
    if (!newComment.trim() || !newData) return;

    const requestData = {
      id: newData,
      text: newComment,
    };
    commentOnProduct.mutate(requestData);
    setNewComment("");
  };

  // Sort comments by date (oldest first) for proper chat UI display
  const comments = (getPostCommentLists?.data?.comments || []).sort(
    (a: Comment, b: Comment) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Auto-scroll to bottom when comments change
  useEffect(() => {
    if (comments.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [comments.length]);

  // Group messages by date
  const groupedComments = comments.reduce((groups: any, comment: Comment) => {
    const date = new Date(comment.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(comment);
    return groups;
  }, {});

  const renderComment = ({ item }: { item: Comment }) => {
    const isOwn = currentUserId && item.user?._id === currentUserId;
    const time = new Date(item.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View
        className={`mb-3 ${
          isOwn ? "items-start flex-row-reverse " : "items-start flex-row"
        }`}
      >
        {item.user?.picture ? (
          <View className="mr-2  h-7 w-7 rounded-full">
            <Image
              source={{ uri: item.user?.picture }}
              style={{ width: "100%", height: "100%", borderRadius: 100 }}
            />
          </View>
        ) : (
          <View
            className="mr-2  bg-secondary border border-[#FBC3F8] h-7 w-7 items-center justify-center  rounded-full"
            style={{ borderRadius: 100 }}
          >
            <Text className="text-sm text-black font-[PoppinsSemiBold]">
              {getInitials(item.user?.fullname)}
            </Text>
          </View>
        )}

        <View
          className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
            isOwn ? "bg-primary" : " bg-secondary border border-[#FBC3F8]"
          }`}
          style={
            !isOwn && {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1,
            }
          }
        >
          <Text
            className={`text-[15px] leading-5 ${
              isOwn
                ? "text-white text-sm font-[PoppinsSemiBold] my-1"
                : "text-black text-sm font-[PoppinsSemiBold] my-1"
            }`}
          >
            {item.user?.fullname}
          </Text>
          <Text
            className={`text-[15px] leading-5 ${
              isOwn ? "text-white" : "text-black"
            }`}
          >
            {item.text}
          </Text>
          <Text
            className={`text-[10px] mt-1 ${
              isOwn ? "text-white text-left" : "text-gray-500 text-right"
            }`}
          >
            {time}
          </Text>
        </View>
      </View>
    );
  };

  const renderDateHeader = (date: string) => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

    let displayDate = date;
    if (date === today)
      displayDate =
        "Today " +
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
    else if (date === yesterday) displayDate = "Yesterday";

    return (
      <View className="items-center my-4">
        <Text className="text-xs text-gray-600 font-medium">{displayDate}</Text>
      </View>
    );
  };

  const renderSectionList = () => {
    const sections: React.ReactNode[] = [];
    // Sort dates chronologically (oldest first)
    const sortedDates = Object.keys(groupedComments).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    sortedDates.forEach((date) => {
      sections.push(
        <View key={date}>
          {renderDateHeader(date)}
          {groupedComments[date].map((comment: Comment) => (
            <View key={comment._id}>{renderComment({ item: comment })}</View>
          ))}
        </View>
      );
    });
    return sections;
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={"padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={[{ key: "comments" }]}
        renderItem={() => (
          <View className="px-4 pt-4">
            {comments.length > 0 ? (
              renderSectionList()
            ) : (
              <View className="flex-1 justify-center items-center py-20">
                <Text className="text-gray-400 text-base">
                  Be the first to comment!
                </Text>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => {
          if (comments.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: false });
          }
        }}
      />

      <View className="flex-row items-end px-3 py-2 bg-white border-t border-gray-200">
        <View className="flex-1 mx-2">
          <CustomInput
            placeholder="Comment as user name "
            value={newComment}
            onChangeText={setNewComment}
            primary
            returnKeyType="send"
            onSubmitEditing={handleSubmitComment}
            autoCapitalize="sentences"
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmitComment}
          disabled={!newComment.trim() || commentOnProduct.isPending}
          className={`w-12 h-12 rounded-full items-center justify-center ${
            !newComment.trim() || commentOnProduct.isPending
              ? "bg-primaryLight opacity-50"
              : "bg-[#F4EBFF]"
          }`}
        >
          {commentOnProduct.isPending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <GradientMaterialIcon
              name="send"
              size={20}
              gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
            />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentSection;
