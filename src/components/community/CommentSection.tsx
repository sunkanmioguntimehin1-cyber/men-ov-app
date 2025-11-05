// import { useCommentPostApi } from "@/src/api_services/postsApi/postsMutation";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// interface CommentSectionProps {
//   getPostCommentLists: any;
//   getUserProduct: any;
// }

// const CommentSection = ({
//   getPostCommentLists,
//   getUserProduct,
// }: CommentSectionProps) => {
//   const [newComment, setNewComment] = useState("");
//   const commentOnProduct = useCommentPostApi();

//   const getAvatarColor = (name: string) => {
//     const colors = [
//       "#3B82F6",
//       "#10B981",
//       "#8B5CF6",
//       "#EC4899",
//       "#6366F1",
//       "#F97316",
//     ];
//     const index = name.length % colors.length;
//     return colors[index];
//   };

//   const handleSubmitComment = () => {
//     if (!newComment.trim() || !getUserProduct?.id) return;

//     const requestData = {
//       product_id: getUserProduct.id,
//       comment: newComment,
//     };
//     commentOnProduct.mutate(requestData);
//     setNewComment("");
//   };

//   const comments = getPostCommentLists?.data?.comments || [];

//   console.log("comments", comments);

//   const renderComment = ({ item }: { item: any }) => (
//     <View style={styles.commentItem}>
//       <View style={styles.commentContent}>
//         <View
//           style={[
//             styles.avatar,
//             // { backgroundColor: getAvatarColor(item.commenter.full_name) },
//           ]}
//         >
//           <Text style={styles.avatarText}>
//             {/* {getInitials(item.commenter.full_name)} */}
//           </Text>
//         </View>

//         <View style={styles.contentWrapper}>
//           <View style={styles.header}>
//             <Text style={styles.username} numberOfLines={1}>
//               {/* {item.commenter.full_name} */}
//             </Text>
//             <Text style={styles.timestamp}>{item.createdAt}</Text>
//           </View>
//           <Text style={styles.commentText}>{item.text}</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={comments}
//         renderItem={renderComment}
//         keyExtractor={(item) => item._id.toString()}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContent}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No comments yet</Text>
//           </View>
//         }
//       />

//       <View style={styles.inputContainer}>
//         <View style={styles.inputWrapper}>
//           <View
//             style={[
//               styles.avatarSmall,
//               { backgroundColor: getAvatarColor("User") },
//             ]}
//           >
//             {/* <Text style={styles.avatarTextSmall}>{getInitials("User")}</Text> */}
//           </View>

//           <View style={styles.inputGroup}>
//             <TextInput
//               value={newComment}
//               onChangeText={setNewComment}
//               placeholder="Write a comment..."
//               placeholderTextColor="#9CA3AF"
//               style={styles.textInput}
//               multiline
//               maxLength={500}
//             />
//             <TouchableOpacity
//               onPress={handleSubmitComment}
//               disabled={!newComment.trim() || commentOnProduct.isPending}
//               style={[
//                 styles.sendButton,
//                 (!newComment.trim() || commentOnProduct.isPending) &&
//                   styles.sendButtonDisabled,
//               ]}
//               activeOpacity={0.7}
//             >
//               {commentOnProduct.isPending ? (
//                 <ActivityIndicator color="#fff" size="small" />
//               ) : (
//                 <>
//                   {/* <Send color="#fff" size={16} /> */}
//                   <Text style={styles.sendButtonText}>Send</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   listContent: {
//     paddingBottom: 10,
//     flexGrow: 1,
//   },
//   commentItem: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F3F4F6",
//   },
//   commentContent: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//   },
//   avatar: {
//     height: 48,
//     width: 48,
//     borderRadius: 24,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },
//   avatarText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   contentWrapper: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 4,
//   },
//   username: {
//     fontWeight: "600",
//     color: "#111827",
//     fontSize: 14,
//     flex: 1,
//     marginRight: 8,
//   },
//   timestamp: {
//     fontSize: 11,
//     color: "#9CA3AF",
//     fontWeight: "500",
//   },
//   commentText: {
//     fontSize: 14,
//     color: "#4B5563",
//     lineHeight: 20,
//   },
//   emptyContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 40,
//   },
//   emptyText: {
//     color: "#9CA3AF",
//     fontSize: 14,
//   },
//   inputContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderTopWidth: 1,
//     borderTopColor: "#F3F4F6",
//     backgroundColor: "#F9FAFB",
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//   },
//   avatarSmall: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },
//   avatarTextSmall: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 12,
//   },
//   inputGroup: {
//     flex: 1,
//     flexDirection: "row",
//     gap: 8,
//   },
//   textInput: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 20,
//     fontSize: 14,
//     maxHeight: 100,
//   },
//   sendButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: "#3B82F6",
//     borderRadius: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     justifyContent: "center",
//     minWidth: 80,
//   },
//   sendButtonDisabled: {
//     backgroundColor: "#D1D5DB",
//   },
//   sendButtonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "500",
//   },
// });

// export default CommentSection;



// CommentSection.tsx
import { useCommentPostApi } from "@/src/api_services/postsApi/postsMutation";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CommentSectionProps {
  getPostCommentLists: any;
  getUserProduct: any;
}

const CommentSection = ({
  getPostCommentLists,
  getUserProduct,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const commentOnProduct = useCommentPostApi();

  const handleSubmitComment = () => {
    if (!newComment.trim() || !getUserProduct?.id) return;

    const requestData = {
      product_id: getUserProduct.id,
      comment: newComment,
    };
    commentOnProduct.mutate(requestData);
    setNewComment("");
  };

  const comments = getPostCommentLists?.data?.comments || [];

  const renderComment = ({ item }: { item: any }) => {
    // Assume all comments are from other users (no distinction for now)
    // You can enhance this later with `isOwn` if you track current user
    return (
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        inverted // Optional: makes latest at bottom (like chat)
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Be the first to comment!</Text>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          style={styles.textInput}
          multiline
          maxLength={500}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          onPress={handleSubmitComment}
          disabled={!newComment.trim() || commentOnProduct.isPending}
          style={[
            styles.sendButton,
            (!newComment.trim() || commentOnProduct.isPending) &&
              styles.sendButtonDisabled,
          ]}
        >
          {commentOnProduct.isPending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Chat background
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    flexGrow: 1, // Ensures input stays at bottom
  },
  messageBubble: {
    maxWidth: "80%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    color: "#000",
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 10,
    color: "#888",
    textAlign: "right",
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#2E6939",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default CommentSection;