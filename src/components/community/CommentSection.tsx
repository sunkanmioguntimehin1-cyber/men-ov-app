// CommentSection.tsx
import { useCommentPostApi } from "@/src/api_services/postsApi/postsMutation";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Comment {
  _id: string;
  user: string;
  text: string;
  createdAt: string;
}

interface CommentSectionProps {
  getPostCommentLists: any;
  newData: any;
  currentUserId?: string; // Pass current user ID to distinguish own messages
}

const CommentSection = ({
  getPostCommentLists,
  newData,
  currentUserId,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const commentOnProduct = useCommentPostApi();

  const handleSubmitComment = () => {
    if (!newComment.trim() || !newData) return;

    const requestData = {
      id: newData,
      text: newComment,
    };
    commentOnProduct.mutate(requestData);
    setNewComment("");
  };

  const comments = getPostCommentLists?.data?.comments || [];

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
    const isOwn = currentUserId && item.user === currentUserId;
    const time = new Date(item.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View className={`mb-3 ${isOwn ? "items-end" : "items-start"}`}>
        <View
          className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
            isOwn ? "bg-primary" : "bg-white"
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
    Object.keys(groupedComments).forEach((date) => {
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
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
      />

      <View className="flex-row items-end px-3 py-2 bg-white border-t border-gray-200">
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          className="flex-1 bg-gray-100 rounded-3xl px-4 py-2.5 text-[15px] mr-2 max-h-[100px]"
          multiline
          maxLength={500}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          onPress={handleSubmitComment}
          disabled={!newComment.trim() || commentOnProduct.isPending}
          className={`rounded-3xl px-5 py-2.5 ${
            !newComment.trim() || commentOnProduct.isPending
              ? "bg-gray-300"
              : "bg-[#2E6939]"
          }`}
        >
          {commentOnProduct.isPending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text className="text-white font-semibold">Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentSection;
