// // import { useTalkToChatAi } from "@/src/api_services/chatApi/chatMutation";
// // import { useGetChatHistory } from "@/src/api_services/chatApi/chatQuery";
// // import CustomInput from "@/src/custom-components/CustomInput";
// // import Screen from "@/src/layout/Screen";
// // import { MaterialIcons } from "@expo/vector-icons";
// // import { useRouter } from "expo-router";
// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   ActivityIndicator,
// //   FlatList,
// //   KeyboardAvoidingView,
// //   Platform,
// //   Text,
// //   TouchableOpacity,
// //   View,
// //   useWindowDimensions,
// // } from "react-native";
// // import { useSafeAreaInsets } from "react-native-safe-area-context";

// // interface Message {
// //   id: string;
// //   text: string;
// //   isAi: boolean;
// //   timestamp: string;
// // }

// // const ChatWithAi = () => {
// //   const router = useRouter();
// //   const [message, setMessage] = useState("");
// //   const [messages, setMessages] = useState<Message[]>([]);

// //   const getChatHistory = useGetChatHistory();
// //   const { data: chatData, isLoading, isError, error } = getChatHistory;
// //   const sendMessage = useTalkToChatAi();

// //   console.log("error", error);

// //   const flatListRef = useRef<FlatList>(null);
// //   const insets = useSafeAreaInsets();
// //   const { width } = useWindowDimensions();

// //   // Responsive layout measurements
// //   const containerMaxWidth = Math.min(width, 900);
// //   const horizontalPadding = width >= 1024 ? 32 : width >= 768 ? 24 : 16;
// //   const contentWidth = containerMaxWidth - horizontalPadding * 2;
// //   const bubbleMaxWidth = Math.min(640, contentWidth * 0.9);

// //   // Transform server data to message format
// //   useEffect(() => {
// //     if (chatData?.data && Array.isArray(chatData.data)) {
// //       const transformedMessages: Message[] = [];

// //       chatData.data.forEach((item: any) => {
// //         const timestamp = new Date(item.createdAt).toLocaleTimeString("en-US", {
// //           hour: "2-digit",
// //           minute: "2-digit",
// //         });

// //         // Add user message
// //         transformedMessages.push({
// //           id: `${item.id}-user`,
// //           text: item.message,
// //           isAi: false,
// //           timestamp: timestamp,
// //         });

// //         // Add AI reply
// //         transformedMessages.push({
// //           id: `${item.id}-ai`,
// //           text: item.reply,
// //           isAi: true,
// //           timestamp: timestamp,
// //         });
// //       });

// //       setMessages(transformedMessages);
// //     }
// //   }, [chatData]);

// //   // Scroll to bottom when messages load
// //   useEffect(() => {
// //     if (messages.length > 0) {
// //       setTimeout(() => {
// //         flatListRef.current?.scrollToEnd({ animated: true });
// //       }, 100);
// //     }
// //   }, [messages]);

// //   const handleSend = async () => {
// //     if (message.trim() && !sendMessage.isPending) {
// //       const userMessageText = message.trim();
// //       const timestamp = new Date().toLocaleTimeString("en-US", {
// //         hour: "2-digit",
// //         minute: "2-digit",
// //       });

// //       // Add user message immediately to UI
// //       const newMessage: Message = {
// //         id: `temp-${Date.now()}`,
// //         text: userMessageText,
// //         isAi: false,
// //         timestamp: timestamp,
// //       };

// //       setMessages((prev) => [...prev, newMessage]);
// //       setMessage("");

// //       // Scroll to bottom after sending
// //       setTimeout(() => {
// //         flatListRef.current?.scrollToEnd({ animated: true });
// //       }, 100);

// //       // Send message to API
// //       sendMessage.mutate({
// //         message: userMessageText,
// //       });
// //     }
// //   };

// //   console.log("sendMessage500", sendMessage);

// //   const renderMessage = ({ item }: { item: Message }) => (
// //     <View className={`mb-4 ${item.isAi ? "items-start" : "items-end"}`}>
// //       <View
// //         className={`px-4 py-3 rounded-2xl ${
// //           item.isAi
// //             ? "bg-secondary rounded-tl-none"
// //             : "bg-primary rounded-tr-none"
// //         }`}
// //         style={{ maxWidth: bubbleMaxWidth }}
// //       >
// //         <Text
// //           className={`text-base font-[PoppinsRegular] ${
// //             item.isAi ? "text-titleText" : "text-white"
// //           }`}
// //         >
// //           {item.text}
// //         </Text>
// //       </View>
// //       <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
// //         {item.timestamp}
// //       </Text>
// //     </View>
// //   );

// //   return (
// //     <Screen className="bg-white">
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === "ios" ? "padding" : "height"}
// //         style={{ flex: 1 }}
// //         keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
// //       >
// //         <View
// //           className=" "
// //           style={{
// //             flex: 1,
// //             alignSelf: "center",
// //             width: "100%",
// //             maxWidth: containerMaxWidth,
// //           }}
// //         >
// //           {/* Header */}
// //           <View
// //             className="flex-row items-center justify-between py-4 border-b border-[#EAEAEA]"
// //             style={{ paddingHorizontal: horizontalPadding }}
// //           >
// //             <TouchableOpacity
// //               onPress={() => router.back()}
// //               className="w-10 h-10 items-center justify-center"
// //             >
// //               <MaterialIcons name="arrow-back-ios" size={24} color="black" />
// //             </TouchableOpacity>

// //             <Text className="text-lg font-[PoppinsSemiBold] text-black">
// //               Talk with AI
// //             </Text>

// //             <View className="w-10" />
// //           </View>

// //           {/* Loading State */}
// //           {isLoading && (
// //             <View className="flex-1 items-center justify-center">
// //               <ActivityIndicator size="large" color="#000" />
// //               <Text className="mt-2 text-gray-500 font-[PoppinsRegular]">
// //                 Loading chat history...
// //               </Text>
// //             </View>
// //           )}

// //           {/* Error State */}
// //           {isError && !isLoading && (
// //             <View className="flex-1 items-center justify-center px-6">
// //               <MaterialIcons name="error-outline" size={48} color="#EF4444" />
// //               <Text className="mt-2 text-gray-700 font-[PoppinsSemiBold] text-center">
// //                 Failed to load chat history
// //               </Text>
// //               <Text className="mt-1 text-gray-500 font-[PoppinsRegular] text-center">
// //                 Please try again later
// //               </Text>
// //             </View>
// //           )}

// //           {/* Messages List */}
// //           {!isLoading && !isError && (
// //             <FlatList
// //               ref={flatListRef}
// //               data={messages}
// //               renderItem={renderMessage}
// //               keyExtractor={(item) => item.id}
// //               contentContainerStyle={{
// //                 paddingVertical: 16,
// //                 paddingHorizontal: horizontalPadding,
// //                 flexGrow: 1,
// //               }}
// //               style={{ flex: 1 }}
// //               showsVerticalScrollIndicator={false}
// //               scrollEnabled={true}
// //               nestedScrollEnabled={true}
// //               ListEmptyComponent={
// //                 <View className="flex-1 items-center justify-center">
// //                   <MaterialIcons
// //                     name="chat-bubble-outline"
// //                     size={64}
// //                     color="#D1D5DB"
// //                   />
// //                   <Text className="mt-4 text-gray-500 font-[PoppinsRegular] text-center">
// //                     No messages yet. Start a conversation!
// //                   </Text>
// //                 </View>
// //               }
// //               onContentSizeChange={() =>
// //                 flatListRef.current?.scrollToEnd({ animated: true })
// //               }
// //             />
// //           )}

// //           {/* Input Area */}
// //           <View
// //             className="border-t border-[#EAEAEA] bg-white"
// //             style={{
// //               paddingTop: 8,
// //               paddingHorizontal: horizontalPadding,
// //               paddingBottom:
// //                 Platform.OS === "ios" ? insets.bottom + 8 : insets.bottom + 6,
// //             }}
// //           >
// //             <View className="flex-row items-center space-x-2">
// //               <View className="flex-1">
// //                 <CustomInput
// //                   placeholder="Type a message..."
// //                   value={message}
// //                   onChangeText={setMessage}
// //                   primary
// //                   returnKeyType="send"
// //                   onSubmitEditing={handleSend}
// //                   autoCapitalize="sentences"
// //                   editable={!isLoading && !sendMessage.isPending}
// //                 />
// //               </View>
// //               <TouchableOpacity
// //                 onPress={handleSend}
// //                 disabled={!message.trim() || isLoading || sendMessage.isPending}
// //                 className={`w-12 h-12 rounded-full items-center justify-center ${
// //                   message.trim() && !isLoading && !sendMessage.isPending
// //                     ? "bg-primary"
// //                     : "bg-primaryLight"
// //                 }`}
// //               >
// //                 {sendMessage.isPending ? (
// //                   <ActivityIndicator size="small" color="white" />
// //                 ) : (
// //                   <MaterialIcons
// //                     name="send"
// //                     size={20}
// //                     color={message.trim() && !isLoading ? "white" : "#B0B0B0"}
// //                   />
// //                 )}
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </View>
// //       </KeyboardAvoidingView>
// //     </Screen>
// //   );
// // };

// // export default ChatWithAi;


// import { useTalkToChatAi } from "@/src/api_services/chatApi/chatMutation";
// import { useGetChatHistory } from "@/src/api_services/chatApi/chatQuery";
// import CustomInput from "@/src/custom-components/CustomInput";
// import Screen from "@/src/layout/Screen";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   Text,
//   TouchableOpacity,
//   View,
//   useWindowDimensions,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// interface Message {
//   id: string;
//   text: string;
//   isAi: boolean;
//   timestamp: string;
// }

// const ChatWithAi = () => {
//   const router = useRouter();
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);

//   const getChatHistory = useGetChatHistory();
//   const { data: chatData, isLoading, isError, error } = getChatHistory;
//   const sendMessage = useTalkToChatAi();

//   console.log("error", error);

//   const flatListRef = useRef<FlatList>(null);
//   const insets = useSafeAreaInsets();
//   const { width } = useWindowDimensions();

//   // Responsive layout measurements
//   const containerMaxWidth = Math.min(width, 900);
//   const horizontalPadding = width >= 1024 ? 32 : width >= 768 ? 24 : 16;
//   const contentWidth = containerMaxWidth - horizontalPadding * 2;
//   const bubbleMaxWidth = Math.min(640, contentWidth * 0.9);

//   // Transform server data to message format
//   useEffect(() => {
//     if (chatData?.data && Array.isArray(chatData.data)) {
//       const transformedMessages: Message[] = [];

//       chatData.data.forEach((item: any) => {
//         const timestamp = new Date(item.createdAt).toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         // Add user message
//         transformedMessages.push({
//           id: `${item.id}-user`,
//           text: item.message,
//           isAi: false,
//           timestamp: timestamp,
//         });

//         // Add AI reply
//         transformedMessages.push({
//           id: `${item.id}-ai`,
//           text: item.reply,
//           isAi: true,
//           timestamp: timestamp,
//         });
//       });

//       setMessages(transformedMessages);
//     }
//   }, [chatData]);

//   // Scroll to bottom when messages load
//   useEffect(() => {
//     if (messages.length > 0) {
//       setTimeout(() => {
//         flatListRef.current?.scrollToEnd({ animated: true });
//       }, 100);
//     }
//   }, [messages]);

//   // Handle successful AI response
//   useEffect(() => {
//     if (sendMessage.isSuccess && sendMessage.data) {
//       const timestamp = new Date().toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });

//       // Remove typing indicator
//       setMessages((prev) =>
//         prev.filter((msg) => msg.id !== "typing-indicator")
//       );

//       // Add AI response
//       const aiResponse: Message = {
//         id: `ai-${Date.now()}`,
//         text:
//           sendMessage.data.reply ||
//           sendMessage.data.data?.reply ||
//           "No response", // Adjust based on your API response structure
//         isAi: true,
//         timestamp: timestamp,
//       };

//       setMessages((prev) => [...prev, aiResponse]);

//       // Scroll to bottom
//       setTimeout(() => {
//         flatListRef.current?.scrollToEnd({ animated: true });
//       }, 100);
//     }
//   }, [sendMessage.isSuccess, sendMessage.data]);

//   // Handle error
//   useEffect(() => {
//     if (sendMessage.isError) {
//       // Remove typing indicator on error
//       setMessages((prev) =>
//         prev.filter((msg) => msg.id !== "typing-indicator")
//       );

//       // Show error message
//       const errorMessage: Message = {
//         id: `error-${Date.now()}`,
//         text: "Failed to send message. Please try again.",
//         isAi: true,
//         timestamp: new Date().toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };

//       setMessages((prev) => [...prev, errorMessage]);
//     }
//   }, [sendMessage.isError]);

//   const handleSend = async () => {
//     if (message.trim() && !sendMessage.isPending) {
//       const userMessageText = message.trim();
//       const timestamp = new Date().toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });

//       // Add user message immediately to UI
//       const newMessage: Message = {
//         id: `temp-${Date.now()}`,
//         text: userMessageText,
//         isAi: false,
//         timestamp: timestamp,
//       };

//       // Add a temporary "typing" indicator for AI
//       const typingMessage: Message = {
//         id: "typing-indicator",
//         text: "...",
//         isAi: true,
//         timestamp: timestamp,
//       };

//       setMessages((prev) => [...prev, newMessage, typingMessage]);
//       setMessage("");

//       // Scroll to bottom after sending
//       setTimeout(() => {
//         flatListRef.current?.scrollToEnd({ animated: true });
//       }, 100);

//       // Send message to API
//       sendMessage.mutate({
//         message: userMessageText,
//       });
//     }
//   };

//   console.log("sendMessage500", sendMessage);

//   const renderMessage = ({ item }: { item: Message }) => (
//     <View className={`mb-4 ${item.isAi ? "items-start" : "items-end"}`}>
//       <View
//         className={`px-4 py-3 rounded-2xl ${
//           item.isAi
//             ? "bg-secondary rounded-tl-none"
//             : "bg-primary rounded-tr-none"
//         }`}
//         style={{ maxWidth: bubbleMaxWidth }}
//       >
//         {item.id === "typing-indicator" ? (
//           <View className="flex-row space-x-1 py-1 items-center">
//             <ActivityIndicator size="small" color="#666" />
//             <Text className="text-base font-[PoppinsRegular] text-titleText ml-2">
//               AI is typing
//             </Text>
//           </View>
//         ) : (
//           <Text
//             className={`text-base font-[PoppinsRegular] ${
//               item.isAi ? "text-titleText" : "text-white"
//             }`}
//           >
//             {item.text}
//           </Text>
//         )}
//       </View>
//       <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
//         {item.timestamp}
//       </Text>
//     </View>
//   );

//   return (
//     <Screen className="bg-white">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//         keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
//       >
//         <View
//           className=" "
//           style={{
//             flex: 1,
//             alignSelf: "center",
//             width: "100%",
//             maxWidth: containerMaxWidth,
//           }}
//         >
//           {/* Header */}
//           <View
//             className="flex-row items-center justify-between py-4 border-b border-[#EAEAEA]"
//             style={{ paddingHorizontal: horizontalPadding }}
//           >
//             <TouchableOpacity
//               onPress={() => router.back()}
//               className="w-10 h-10 items-center justify-center"
//             >
//               <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//             </TouchableOpacity>

//             <Text className="text-lg font-[PoppinsSemiBold] text-black">
//               Talk with AI
//             </Text>

//             <View className="w-10" />
//           </View>

//           {/* Loading State */}
//           {isLoading && (
//             <View className="flex-1 items-center justify-center">
//               <ActivityIndicator size="large" color="#000" />
//               <Text className="mt-2 text-gray-500 font-[PoppinsRegular]">
//                 Loading chat history...
//               </Text>
//             </View>
//           )}

//           {/* Error State */}
//           {isError && !isLoading && (
//             <View className="flex-1 items-center justify-center px-6">
//               <MaterialIcons name="error-outline" size={48} color="#EF4444" />
//               <Text className="mt-2 text-gray-700 font-[PoppinsSemiBold] text-center">
//                 Failed to load chat history
//               </Text>
//               <Text className="mt-1 text-gray-500 font-[PoppinsRegular] text-center">
//                 Please try again later
//               </Text>
//             </View>
//           )}

//           {/* Messages List */}
//           {!isLoading && !isError && (
//             <FlatList
//               ref={flatListRef}
//               data={messages}
//               renderItem={renderMessage}
//               keyExtractor={(item) => item.id}
//               contentContainerStyle={{
//                 paddingVertical: 16,
//                 paddingHorizontal: horizontalPadding,
//                 flexGrow: 1,
//               }}
//               style={{ flex: 1 }}
//               showsVerticalScrollIndicator={false}
//               scrollEnabled={true}
//               nestedScrollEnabled={true}
//               ListEmptyComponent={
//                 <View className="flex-1 items-center justify-center">
//                   <MaterialIcons
//                     name="chat-bubble-outline"
//                     size={64}
//                     color="#D1D5DB"
//                   />
//                   <Text className="mt-4 text-gray-500 font-[PoppinsRegular] text-center">
//                     No messages yet. Start a conversation!
//                   </Text>
//                 </View>
//               }
//               onContentSizeChange={() =>
//                 flatListRef.current?.scrollToEnd({ animated: true })
//               }
//             />
//           )}

//           {/* Input Area */}
//           <View
//             className="border-t border-[#EAEAEA] bg-white"
//             style={{
//               paddingTop: 8,
//               paddingHorizontal: horizontalPadding,
//               paddingBottom:
//                 Platform.OS === "ios" ? insets.bottom + 8 : insets.bottom + 6,
//             }}
//           >
//             <View className="flex-row items-center space-x-2">
//               <View className="flex-1">
//                 <CustomInput
//                   placeholder="Type a message..."
//                   value={message}
//                   onChangeText={setMessage}
//                   primary
//                   returnKeyType="send"
//                   onSubmitEditing={handleSend}
//                   autoCapitalize="sentences"
//                   editable={!isLoading && !sendMessage.isPending}
//                 />
//               </View>
//               <TouchableOpacity
//                 onPress={handleSend}
//                 disabled={!message.trim() || isLoading || sendMessage.isPending}
//                 className={`w-12 h-12 rounded-full items-center justify-center ${
//                   message.trim() && !isLoading && !sendMessage.isPending
//                     ? "bg-primary"
//                     : "bg-primaryLight"
//                 }`}
//               >
//                 {sendMessage.isPending ? (
//                   <ActivityIndicator size="small" color="white" />
//                 ) : (
//                   <MaterialIcons
//                     name="send"
//                     size={20}
//                     color={message.trim() && !isLoading ? "white" : "#B0B0B0"}
//                   />
//                 )}
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </Screen>
//   );
// };

// export default ChatWithAi;




import { useTalkToChatAi } from "@/src/api_services/chatApi/chatMutation";
import { useGetChatHistory } from "@/src/api_services/chatApi/chatQuery";
import CustomInput from "@/src/custom-components/CustomInput";
import Screen from "@/src/layout/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: string;
}

const ChatWithAi = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [hasLoadedInitially, setHasLoadedInitially] = useState(false);

  const getChatHistory = useGetChatHistory();
  const { data: chatData, isLoading, isError, error } = getChatHistory;
  const sendMessage = useTalkToChatAi();

  console.log("error", error);

  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Responsive layout measurements
  const containerMaxWidth = Math.min(width, 900);
  const horizontalPadding = width >= 1024 ? 32 : width >= 768 ? 24 : 16;
  const contentWidth = containerMaxWidth - horizontalPadding * 2;
  const bubbleMaxWidth = Math.min(640, contentWidth * 0.9);

  // Transform server data to message format
  useEffect(() => {
    if (chatData?.data && Array.isArray(chatData.data)) {
      const transformedMessages: Message[] = [];

      chatData.data.forEach((item: any) => {
        const timestamp = new Date(item.createdAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Add user message
        transformedMessages.push({
          id: `${item.id}-user`,
          text: item.message,
          isAi: false,
          timestamp: timestamp,
        });

        // Add AI reply
        transformedMessages.push({
          id: `${item.id}-ai`,
          text: item.reply,
          isAi: true,
          timestamp: timestamp,
        });
      });

      setMessages(transformedMessages);

      // Scroll to bottom only on initial load
      if (!hasLoadedInitially && transformedMessages.length > 0) {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: false });
          setHasLoadedInitially(true);
        }, 100);
      }
    }
  }, [chatData]);

  // Check if user is near the bottom of the list
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 50;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    setIsNearBottom(isAtBottom);
  };

  // Handle successful AI response
  useEffect(() => {
    if (sendMessage.isSuccess && sendMessage.data) {
      const timestamp = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Remove typing indicator
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== "typing-indicator")
      );

      // Add AI response
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        text:
          sendMessage.data.reply ||
          sendMessage.data.data?.reply ||
          "No response",
        isAi: true,
        timestamp: timestamp,
      };

      setMessages((prev) => [...prev, aiResponse]);

      // Only scroll to bottom if user was already near the bottom
      if (isNearBottom) {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    }
  }, [sendMessage.isSuccess, sendMessage.data]);

  // Handle error
  useEffect(() => {
    if (sendMessage.isError) {
      // Remove typing indicator on error
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== "typing-indicator")
      );

      // Show error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Failed to send message. Please try again.",
        isAi: true,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  }, [sendMessage.isError]);

  const handleSend = async () => {
    if (message.trim() && !sendMessage.isPending) {
      const userMessageText = message.trim();
      const timestamp = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Add user message immediately to UI
      const newMessage: Message = {
        id: `temp-${Date.now()}`,
        text: userMessageText,
        isAi: false,
        timestamp: timestamp,
      };

      // Add a temporary "typing" indicator for AI
      const typingMessage: Message = {
        id: "typing-indicator",
        text: "...",
        isAi: true,
        timestamp: timestamp,
      };

      setMessages((prev) => [...prev, newMessage, typingMessage]);
      setMessage("");

      // Always scroll to bottom when user sends a message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
        setIsNearBottom(true);
      }, 100);

      // Send message to API
      sendMessage.mutate({
        message: userMessageText,
      });
    }
  };

  console.log("sendMessage500", sendMessage);

  const renderMessage = ({ item }: { item: Message }) => (
    <View className={`mb-4 ${item.isAi ? "items-start" : "items-end"}`}>
      <View
        className={`px-4 py-3 rounded-2xl ${
          item.isAi
            ? "bg-secondary rounded-tl-none"
            : "bg-primary rounded-tr-none"
        }`}
        style={{ maxWidth: bubbleMaxWidth }}
      >
        {item.id === "typing-indicator" ? (
          <View className="flex-row space-x-1 py-1 items-center">
            <ActivityIndicator size="small" color="#666" />
            <Text className="text-base font-[PoppinsRegular] text-titleText ml-2">
              AI is typing
            </Text>
          </View>
        ) : (
          <Text
            className={`text-base font-[PoppinsRegular] ${
              item.isAi ? "text-titleText" : "text-white"
            }`}
          >
            {item.text}
          </Text>
        )}
      </View>
      <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
        {item.timestamp}
      </Text>
    </View>
  );

  return (
    <Screen className="bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
      >
        <View
          className=" "
          style={{
            flex: 1,
            alignSelf: "center",
            width: "100%",
            maxWidth: containerMaxWidth,
          }}
        >
          {/* Header */}
          <View
            className="flex-row items-center justify-between py-4 border-b border-[#EAEAEA]"
            style={{ paddingHorizontal: horizontalPadding }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center"
            >
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </TouchableOpacity>

            <Text className="text-lg font-[PoppinsSemiBold] text-black">
              Talk with AI
            </Text>

            <View className="w-10" />
          </View>

          {/* Loading State */}
          {isLoading && (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#000" />
              <Text className="mt-2 text-gray-500 font-[PoppinsRegular]">
                Loading chat history...
              </Text>
            </View>
          )}

          {/* Error State */}
          {isError && !isLoading && (
            <View className="flex-1 items-center justify-center px-6">
              <MaterialIcons name="error-outline" size={48} color="#EF4444" />
              <Text className="mt-2 text-gray-700 font-[PoppinsSemiBold] text-center">
                Failed to load chat history
              </Text>
              <Text className="mt-1 text-gray-500 font-[PoppinsRegular] text-center">
                Please try again later
              </Text>
            </View>
          )}

          {/* Messages List */}
          {!isLoading && !isError && (
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingVertical: 16,
                paddingHorizontal: horizontalPadding,
                flexGrow: 1,
              }}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center">
                  <MaterialIcons
                    name="chat-bubble-outline"
                    size={64}
                    color="#D1D5DB"
                  />
                  <Text className="mt-4 text-gray-500 font-[PoppinsRegular] text-center">
                    No messages yet. Start a conversation!
                  </Text>
                </View>
              }
            />
          )}

          {/* Input Area */}
          <View
            className="border-t border-[#EAEAEA] bg-white"
            style={{
              paddingTop: 8,
              paddingHorizontal: horizontalPadding,
              paddingBottom:
                Platform.OS === "ios" ? insets.bottom + 8 : insets.bottom + 6,
            }}
          >
            <View className="flex-row items-center space-x-2">
              <View className="flex-1">
                <CustomInput
                  placeholder="Type a message..."
                  value={message}
                  onChangeText={setMessage}
                  primary
                  returnKeyType="send"
                  onSubmitEditing={handleSend}
                  autoCapitalize="sentences"
                  editable={!isLoading && !sendMessage.isPending}
                />
              </View>
              <TouchableOpacity
                onPress={handleSend}
                disabled={!message.trim() || isLoading || sendMessage.isPending}
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  message.trim() && !isLoading && !sendMessage.isPending
                    ? "bg-primary"
                    : "bg-primaryLight"
                }`}
              >
                {sendMessage.isPending ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <MaterialIcons
                    name="send"
                    size={20}
                    color={message.trim() && !isLoading ? "white" : "#B0B0B0"}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ChatWithAi;