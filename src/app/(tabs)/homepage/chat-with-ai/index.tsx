
// import {
//   useTalkToChatAi,
//   useTalkToChatAiwithStream,
// } from "@/src/api_services/chatApi/chatMutation";
// import {
//   useGetChatHistory,
//   useGetSessionWithAiStream,
// } from "@/src/api_services/chatApi/chatQuery";
// import CustomInput from "@/src/custom-components/CustomInput";
// import { GradientMaterialIcon } from "@/src/custom-components/GradientIcon";
// import { TypingDots } from "@/src/custom-components/TypingDots";
// import Screen from "@/src/layout/Screen";
// import { MaterialIcons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   ImageBackground,
//   KeyboardAvoidingView,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
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
//   date: string;
//   fullDate: Date;
// }

// const ChatWithAi = () => {
//   const router = useRouter();
//   const [message, setMessage] = useState("");
//   const [chatMessage, setChatMessage] = useState("");
//   const [messageDatail, setMessageDatail] = useState<any>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isNearBottom, setIsNearBottom] = useState(true);
//   const [hasLoadedInitially, setHasLoadedInitially] = useState(false);

//   console.log("messages200", messages);
//   console.log("message500", message);

//   const sendtalkToChatAi = useTalkToChatAiwithStream();
//   const getSessionWithAi = useGetSessionWithAiStream(chatMessage);
//   const getChatHistory = useGetChatHistory();
//   const { data: chatData, isLoading, isError, error } = getChatHistory;
//   const sendMessage = useTalkToChatAi();

//   const flatListRef = useRef<FlatList>(null);
//   const insets = useSafeAreaInsets();
//   const { width } = useWindowDimensions();

//   useEffect(() => {
//     if (chatMessage) {
//       getSessionWithAi.refetch();
//     }
//   }, [chatMessage]);

//   useEffect(() => {
//     if (getSessionWithAi.isSuccess) {
//       setMessageDatail(getSessionWithAi.data);
//     }
//   }, [getSessionWithAi.data]);

//   useEffect(() => {
//     if (messageDatail) {
//       sendtalkToChatAi.mutate(getSessionWithAi?.data);
//     }
//   }, [messageDatail]);

//   console.log("getSessionWithAi", getSessionWithAi.data);
//   console.log("sendtalkToChatAi6000", sendtalkToChatAi);
//   console.log("sendtalkToChatAi7000", sendtalkToChatAi?.data);




//   // Responsive layout measurements
//   const containerMaxWidth = Math.min(width, 900);
//   const horizontalPadding = width >= 1024 ? 32 : width >= 768 ? 24 : 16;
//   const contentWidth = containerMaxWidth - horizontalPadding * 2;
//   const bubbleMaxWidth = Math.min(640, contentWidth * 0.9);

//   // Helper function to format date headers
//   const formatDateHeader = (date: Date): string => {
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);

//     const messageDate = new Date(date);
//     messageDate.setHours(0, 0, 0, 0);
//     today.setHours(0, 0, 0, 0);
//     yesterday.setHours(0, 0, 0, 0);

//     if (messageDate.getTime() === today.getTime()) {
//       return "Today";
//     } else if (messageDate.getTime() === yesterday.getTime()) {
//       return "Yesterday";
//     } else {
//       return messageDate.toLocaleDateString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//     }
//   };

//   // Check if we need to show a date separator
//   const shouldShowDateSeparator = (
//     currentMsg: Message,
//     prevMsg: Message | null
//   ): boolean => {
//     if (!prevMsg) return true;

//     const currentDate = new Date(currentMsg.fullDate);
//     const prevDate = new Date(prevMsg.fullDate);

//     currentDate.setHours(0, 0, 0, 0);
//     prevDate.setHours(0, 0, 0, 0);

//     return currentDate.getTime() !== prevDate.getTime();
//   };

//   // Transform server data to message format
//   useEffect(() => {
//     if (chatData?.data && Array.isArray(chatData.data)) {
//       const transformedMessages: Message[] = [];

//       chatData.data.forEach((item: any) => {
//         const fullDate = new Date(item.createdAt);
//         const timestamp = fullDate.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         const date = formatDateHeader(fullDate);

//         // Add user message
//         transformedMessages.push({
//           id: `${item.id}-user`,
//           text: item.message,
//           isAi: false,
//           timestamp: timestamp,
//           date: date,
//           fullDate: fullDate,
//         });

//         // Add AI reply
//         transformedMessages.push({
//           id: `${item.id}-ai`,
//           text: item.reply,
//           isAi: true,
//           timestamp: timestamp,
//           date: date,
//           fullDate: fullDate,
//         });
//       });

//       setMessages(transformedMessages);

//       // Scroll to bottom on initial load
//       if (!hasLoadedInitially && transformedMessages.length > 0) {
//         setHasLoadedInitially(true);
//         // Use requestAnimationFrame for better timing
//         requestAnimationFrame(() => {
//           setTimeout(() => {
//             flatListRef.current?.scrollToEnd({ animated: false });
//           }, 100);
//         });
//       }
//     }
//   }, [chatData]);

//   // Check if user is near the bottom of the list
//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
//     const paddingToBottom = 50;
//     const isAtBottom =
//       layoutMeasurement.height + contentOffset.y >=
//       contentSize.height - paddingToBottom;
//     setIsNearBottom(isAtBottom);
//   };

//   // Handle successful AI response
//   useEffect(() => {
//     if (sendMessage.isSuccess && sendMessage.data) {
//       const fullDate = new Date();
//       const timestamp = fullDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       const date = formatDateHeader(fullDate);

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
//           "No response",
//         isAi: true,
//         timestamp: timestamp,
//         date: date,
//         fullDate: fullDate,
//       };

//       setMessages((prev) => [...prev, aiResponse]);

//       // Only scroll to bottom if user was already near the bottom
//       if (isNearBottom) {
//         setTimeout(() => {
//           flatListRef.current?.scrollToEnd({ animated: true });
//         }, 100);
//       }
//     }
//   }, [sendMessage.isSuccess, sendMessage.data]);

//   // Handle error
//   useEffect(() => {
//     if (sendMessage.isError) {
//       // Remove typing indicator on error
//       setMessages((prev) =>
//         prev.filter((msg) => msg.id !== "typing-indicator")
//       );

//       const fullDate = new Date();
//       const timestamp = fullDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       const date = formatDateHeader(fullDate);

//       // Show error message
//       const errorMessage: Message = {
//         id: `error-${Date.now()}`,
//         text: "Failed to send message. Please try again.",
//         isAi: true,
//         timestamp: timestamp,
//         date: date,
//         fullDate: fullDate,
//       };

//       setMessages((prev) => [...prev, errorMessage]);
//     }
//   }, [sendMessage.isError]);

//   const handleSend = async () => {
//     if (message.trim() && !sendMessage.isPending) {
//       const userMessageText = message.trim();
//       const fullDate = new Date();
//       const timestamp = fullDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       const date = formatDateHeader(fullDate);

//       // Add user message immediately to UI
//       const newMessage: Message = {
//         id: `temp-${Date.now()}`,
//         text: userMessageText,
//         isAi: false,
//         timestamp: timestamp,
//         date: date,
//         fullDate: fullDate,
//       };

//       // Add a temporary "typing" indicator for AI
//       const typingMessage: Message = {
//         id: "typing-indicator",
//         text: "...",
//         isAi: true,
//         timestamp: timestamp,
//         date: date,
//         fullDate: fullDate,
//       };

//       setMessages((prev) => [...prev, newMessage, typingMessage]);
//       setMessage("");

//       // Always scroll to bottom when user sends a message
//       setTimeout(() => {
//         flatListRef.current?.scrollToEnd({ animated: true });
//         setIsNearBottom(true);
//       }, 100);

//       console.log("userMessageText", userMessageText);

//       setChatMessage(userMessageText);

//       // Send message to API
//       sendMessage.mutate({
//         message: userMessageText,
//       });
//     }
//   };

//   // console.log("sendMessage500", sendMessage);

//   const renderMessage = ({ item, index }: { item: Message; index: number }) => {
//     const prevMessage = index > 0 ? messages[index - 1] : null;
//     const showDateSeparator = shouldShowDateSeparator(item, prevMessage);

//     return (
//       <>
//         {showDateSeparator && (
//           <View className="items-center my-4">
//             <View className="bg-gray-200 px-4 py-2 rounded-full">
//               <Text className="text-xs font-[PoppinsSemiBold] text-gray-600">
//                 {item.date}
//               </Text>
//             </View>
//           </View>
//         )}

//         <View className={`mb-4 ${item.isAi ? "items-start" : "items-end"}`}>
//           {item.isAi ? (
//             // AI message with gradient
//             <View
//               className="rounded-2xl rounded-tl-none overflow-hidden"
//               style={{ maxWidth: bubbleMaxWidth }}
//             >
//               {item.id === "typing-indicator" ? (
//                 <View className="flex-row space-x-1 py-1 items-center">
//                   <TypingDots />
//                 </View>
//               ) : (
//                 <LinearGradient
//                   colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   // className="px-4 py-3"
//                   style={{
//                     padding: 16,
//                   }}
//                 >
//                   <Text className="text-base font-[PoppinsRegular] text-white">
//                     {item.text}
//                   </Text>
//                 </LinearGradient>
//               )}
//             </View>
//           ) : (
//             // User message (regular)
//             <View
//               className="px-4 py-3 rounded-2xl bg-secondary border border-[#FBC3F8] rounded-tr-none"
//               style={{ maxWidth: bubbleMaxWidth }}
//             >
//               <Text className="text-base font-[PoppinsRegular] text-titleText">
//                 {item.text}
//               </Text>
//             </View>
//           )}

//           <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
//             {item.timestamp}
//           </Text>
//         </View>
//       </>
//     );
//   };

//   return (
//     <Screen className="bg-white">
//       <ImageBackground
//         source={require("@/assets/images/AI.png")}
//         style={{
//           height: "100%",
//           width: "100%",
//         }}
//         resizeMode="cover"
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={{ flex: 1 }}
//           keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
//         >
//           <View
//             className=" "
//             style={{
//               flex: 1,
//               alignSelf: "center",
//               width: "100%",
//               maxWidth: containerMaxWidth,
//             }}
//           >
//             {/* Header */}
//             <View
//               className="flex-row items-center justify-between py-4 "
//               style={{ paddingHorizontal: horizontalPadding }}
//             >
//               <TouchableOpacity
//                 onPress={() => router.back()}
//                 className="w-10 h-10 items-center justify-center"
//               >
//                 <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//               </TouchableOpacity>

//               <Text className="text-lg font-[PoppinsSemiBold] text-black">
//                 Chat with Ziena™
//               </Text>

//               <View className="w-10" />
//             </View>

//             <View className="items-center px-6 ">
//               <View className=" w-32 h-32 border border-[#EAEAEA] rounded-full overflow-hidden">
//                 <Image
//                   source={require("@/assets/images/ziena-ai.png")}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: 100,
//                   }}
//                   contentFit="contain"
//                 />
//               </View>
//               {/* <View className=" ml-3">
//                 <Text className=" text-center text-xl font-[PoppinsBold] mb-2 text-[#101828]">
//                   Ziena™
//                 </Text>
//               </View> */}
//             </View>

//             {/* Loading State */}
//             {isLoading && (
//               <View className="flex-1 items-center justify-center">
//                 <ActivityIndicator size="large" color="#000" />
//                 <Text className="mt-2 text-gray-500 font-[PoppinsRegular]">
//                   Loading chat history...
//                 </Text>
//               </View>
//             )}

//             {/* Error State */}
//             {isError && !isLoading && (
//               <View className="flex-1 items-center justify-center px-6">
//                 <MaterialIcons name="error-outline" size={48} color="#EF4444" />
//                 <Text className="mt-2 text-gray-700 font-[PoppinsSemiBold] text-center">
//                   Failed to load chat history
//                 </Text>
//                 <Text className="mt-1 text-gray-500 font-[PoppinsRegular] text-center">
//                   Please try again later
//                 </Text>
//               </View>
//             )}

//             {/* Messages List */}
//             {!isLoading && !isError && (
//               <FlatList
//                 ref={flatListRef}
//                 data={messages}
//                 renderItem={renderMessage}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={{
//                   paddingVertical: 16,
//                   paddingHorizontal: horizontalPadding,
//                   flexGrow: 1,
//                 }}
//                 style={{ flex: 1 }}
//                 showsVerticalScrollIndicator={false}
//                 scrollEnabled={true}
//                 nestedScrollEnabled={true}
//                 onScroll={handleScroll}
//                 scrollEventThrottle={16}
//                 maintainVisibleContentPosition={{
//                   minIndexForVisible: 0,
//                 }}
//                 ListEmptyComponent={
//                   <View className="flex-1 items-center justify-center">
//                     <MaterialIcons
//                       name="chat-bubble-outline"
//                       size={64}
//                       color="#D1D5DB"
//                     />
//                     <Text className="mt-4 text-gray-500 font-[PoppinsRegular] text-center">
//                       No messages yet. Start a conversation!
//                     </Text>
//                   </View>
//                 }
//               />
//             )}

//             {/* Input Area */}
//             <View
//               className="border-t border-[#EAEAEA] bg-white"
//               style={{
//                 paddingTop: 8,
//                 paddingHorizontal: horizontalPadding,
//                 paddingBottom:
//                   Platform.OS === "ios" ? insets.bottom + 8 : insets.bottom + 6,
//               }}
//             >
//               <View className="flex-row items-center space-x-2">
//                 <View className="flex-1 mx-2">
//                   <CustomInput
//                     placeholder="Ask Ziena™..."
//                     value={message}
//                     onChangeText={setMessage}
//                     primary
//                     returnKeyType="send"
//                     onSubmitEditing={handleSend}
//                     autoCapitalize="sentences"
//                     editable={!isLoading && !sendMessage.isPending}
//                   />
//                 </View>
//                 <TouchableOpacity
//                   onPress={handleSend}
//                   disabled={
//                     !message.trim() || isLoading || sendMessage.isPending
//                   }
//                   className={`w-12 h-12  rounded-full items-center justify-center ${
//                     message.trim() && !isLoading && !sendMessage.isPending
//                       ? "bg-primaryLight"
//                       : " bg-[#F4EBFF]"
//                   }`}
//                 >
//                   {sendMessage.isPending ? (
//                     <ActivityIndicator size="small" color="white" />
//                   ) : (
//                     <GradientMaterialIcon
//                       name="send"
//                       size={20}
//                       gradientColors={[
//                         "#6B5591",
//                         "#6E3F8C",
//                         "#853385",
//                         "#9F3E83",
//                       ]}
//                     />
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </ImageBackground>
//     </Screen>
//   );
// };

// export default ChatWithAi;




// import { useTalkToChatAiwithStream } from "@/src/api_services/chatApi/chatMutation";
// import {
//   useGetChatHistory,
//   useGetSessionWithAiStream,
// } from "@/src/api_services/chatApi/chatQuery";
// import CustomInput from "@/src/custom-components/CustomInput";
// import { GradientMaterialIcon } from "@/src/custom-components/GradientIcon";
// import { TypingDots } from "@/src/custom-components/TypingDots";
// import Screen from "@/src/layout/Screen";
// import { MaterialIcons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   ImageBackground,
//   KeyboardAvoidingView,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
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
//   date: string;
//   fullDate: Date;
// }

// const ChatWithAi = () => {
//   const router = useRouter();
//   const [message, setMessage] = useState("");
//   const [chatMessage, setChatMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isNearBottom, setIsNearBottom] = useState(true);
//   const [hasLoadedInitially, setHasLoadedInitially] = useState(false);
//   const [isWaitingForStream, setIsWaitingForStream] = useState(false);

//   // Hooks
//   const sendtalkToChatAi = useTalkToChatAiwithStream();
//   const getSessionWithAi = useGetSessionWithAiStream(chatMessage);
//   const getChatHistory = useGetChatHistory();
//   const { data: chatData, isLoading, isError } = getChatHistory;

//   const flatListRef = useRef<FlatList>(null);
//   const insets = useSafeAreaInsets();
//   const { width } = useWindowDimensions();

//   // Responsive layout measurements
//   const containerMaxWidth = Math.min(width, 900);
//   const horizontalPadding = width >= 1024 ? 32 : width >= 768 ? 24 : 16;
//   const contentWidth = containerMaxWidth - horizontalPadding * 2;
//   const bubbleMaxWidth = Math.min(640, contentWidth * 0.9);

//   // Helper function to format date headers
//   const formatDateHeader = (date: Date): string => {
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);

//     const messageDate = new Date(date);
//     messageDate.setHours(0, 0, 0, 0);
//     today.setHours(0, 0, 0, 0);
//     yesterday.setHours(0, 0, 0, 0);

//     if (messageDate.getTime() === today.getTime()) {
//       return "Today";
//     } else if (messageDate.getTime() === yesterday.getTime()) {
//       return "Yesterday";
//     } else {
//       return messageDate.toLocaleDateString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//     }
//   };

//   // Check if we need to show a date separator
//   const shouldShowDateSeparator = (
//     currentMsg: Message,
//     prevMsg: Message | null
//   ): boolean => {
//     if (!prevMsg) return true;

//     const currentDate = new Date(currentMsg.fullDate);
//     const prevDate = new Date(prevMsg.fullDate);

//     currentDate.setHours(0, 0, 0, 0);
//     prevDate.setHours(0, 0, 0, 0);

//     return currentDate.getTime() !== prevDate.getTime();
//   };

//   // Load initial chat history
//   useEffect(() => {
//     if (chatData?.data && Array.isArray(chatData.data)) {
//       const transformedMessages: Message[] = [];

//       chatData.data.forEach((item: any) => {
//         const fullDate = new Date(item.createdAt);
//         const timestamp = fullDate.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         const date = formatDateHeader(fullDate);

//         // Add user message
//         transformedMessages.push({
//           id: `${item.id}-user`,
//           text: item.message,
//           isAi: false,
//           timestamp: timestamp,
//           date: date,
//           fullDate: fullDate,
//         });

//         // Add AI reply
//         transformedMessages.push({
//           id: `${item.id}-ai`,
//           text: item.reply,
//           isAi: true,
//           timestamp: timestamp,
//           date: date,
//           fullDate: fullDate,
//         });
//       });

//       setMessages(transformedMessages);

//       // Scroll to bottom on initial load
//       if (!hasLoadedInitially && transformedMessages.length > 0) {
//         setHasLoadedInitially(true);
//         requestAnimationFrame(() => {
//           setTimeout(() => {
//             flatListRef.current?.scrollToEnd({ animated: false });
//           }, 100);
//         });
//       }
//     }
//   }, [chatData]);

//   // Fetch session when chatMessage is set
//   useEffect(() => {
//     if (chatMessage && !isWaitingForStream) {
//       setIsWaitingForStream(true);
//       getSessionWithAi.refetch();
//     }
//   }, [chatMessage]);

//   // Send to streaming API when session data is received
//   useEffect(() => {
//     if (
//       getSessionWithAi.isSuccess &&
//       getSessionWithAi.data &&
//       isWaitingForStream
//     ) {
//       sendtalkToChatAi.mutate(getSessionWithAi.data);
//       setIsWaitingForStream(false);
//     }
//   }, [getSessionWithAi.isSuccess, getSessionWithAi.data]);

//   // Handle streaming response
//   useEffect(() => {
//     if (sendtalkToChatAi.isSuccess && sendtalkToChatAi.data) {
//       const fullDate = new Date();
//       const timestamp = fullDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       const date = formatDateHeader(fullDate);

//       setMessages((prev) => {
//         // Remove typing indicator
//         const withoutTyping = prev.filter(
//           (msg) => msg.id !== "typing-indicator"
//         );

//         // Check if streaming AI message already exists
//         const streamingMsgIndex = withoutTyping.findIndex(
//           (msg) => msg.id === "streaming-ai"
//         );

//         if (streamingMsgIndex !== -1) {
//           // Update existing streaming message
//           const updated = [...withoutTyping];
//           updated[streamingMsgIndex] = {
//             ...updated[streamingMsgIndex],
//             text: sendtalkToChatAi.data,
//           };
//           return updated;
//         } else {
//           // Add new AI response
//           return [
//             ...withoutTyping,
//             {
//               id: "streaming-ai",
//               text: sendtalkToChatAi.data,
//               isAi: true,
//               timestamp: timestamp,
//               date: date,
//               fullDate: fullDate,
//             },
//           ];
//         }
//       });

//       // Auto-scroll if near bottom
//       if (isNearBottom) {
//         setTimeout(() => {
//           flatListRef.current?.scrollToEnd({ animated: true });
//         }, 100);
//       }
//     }
//   }, [sendtalkToChatAi.data]);

//   // Handle streaming completion
//   useEffect(() => {
//     if (sendtalkToChatAi.isSuccess && !sendtalkToChatAi.isPending) {
//       // Finalize the streaming message with a permanent ID
//       setMessages((prev) => {
//         const streamingMsgIndex = prev.findIndex(
//           (msg) => msg.id === "streaming-ai"
//         );

//         if (streamingMsgIndex !== -1) {
//           const updated = [...prev];
//           updated[streamingMsgIndex] = {
//             ...updated[streamingMsgIndex],
//             id: `ai-${Date.now()}`,
//           };
//           return updated;
//         }
//         return prev;
//       });

//       // Reset chat message
//       setChatMessage("");
//     }
//   }, [sendtalkToChatAi.isSuccess, sendtalkToChatAi.isPending]);

//   // Handle error
//   useEffect(() => {
//     if (sendtalkToChatAi.isError) {
//       const fullDate = new Date();
//       const timestamp = fullDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       const date = formatDateHeader(fullDate);

//       setMessages((prev) => {
//         // Remove typing indicator and streaming message
//         const filtered = prev.filter(
//           (msg) => msg.id !== "typing-indicator" && msg.id !== "streaming-ai"
//         );

//         return [
//           ...filtered,
//           {
//             id: `error-${Date.now()}`,
//             text: "Failed to send message. Please try again.",
//             isAi: true,
//             timestamp: timestamp,
//             date: date,
//             fullDate: fullDate,
//           },
//         ];
//       });

//       setChatMessage("");
//       setIsWaitingForStream(false);
//     }
//   }, [sendtalkToChatAi.isError]);

//   // Check if user is near the bottom of the list
//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
//     const paddingToBottom = 50;
//     const isAtBottom =
//       layoutMeasurement.height + contentOffset.y >=
//       contentSize.height - paddingToBottom;
//     setIsNearBottom(isAtBottom);
//   };

//   const handleSend = async () => {
//     if (message.trim() && !sendtalkToChatAi.isPending && !isWaitingForStream) {
//       const userMessageText = message.trim();
//       const fullDate = new Date();
//       const timestamp = fullDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       const date = formatDateHeader(fullDate);

//       // Add user message immediately to UI
//       const newMessage: Message = {
//         id: `temp-${Date.now()}`,
//         text: userMessageText,
//         isAi: false,
//         timestamp: timestamp,
//         date: date,
//         fullDate: fullDate,
//       };

//       // Add a temporary "typing" indicator for AI
//       const typingMessage: Message = {
//         id: "typing-indicator",
//         text: "...",
//         isAi: true,
//         timestamp: timestamp,
//         date: date,
//         fullDate: fullDate,
//       };

//       setMessages((prev) => [...prev, newMessage, typingMessage]);
//       setMessage("");

//       // Always scroll to bottom when user sends a message
//       setTimeout(() => {
//         flatListRef.current?.scrollToEnd({ animated: true });
//         setIsNearBottom(true);
//       }, 100);

//       // Trigger the streaming flow
//       setChatMessage(userMessageText);
//     }
//   };

//   const renderMessage = ({ item, index }: { item: Message; index: number }) => {
//     const prevMessage = index > 0 ? messages[index - 1] : null;
//     const showDateSeparator = shouldShowDateSeparator(item, prevMessage);

//     return (
//       <>
//         {showDateSeparator && (
//           <View className="items-center my-4">
//             <View className="bg-gray-200 px-4 py-2 rounded-full">
//               <Text className="text-xs font-[PoppinsSemiBold] text-gray-600">
//                 {item.date}
//               </Text>
//             </View>
//           </View>
//         )}

//         <View className={`mb-4 ${item.isAi ? "items-start" : "items-end"}`}>
//           {item.isAi ? (
//             // AI message with gradient
//             <View
//               className="rounded-2xl rounded-tl-none overflow-hidden"
//               style={{ maxWidth: bubbleMaxWidth }}
//             >
//               {item.id === "typing-indicator" ? (
//                 <View className="flex-row space-x-1 py-1 items-center">
//                   <TypingDots />
//                 </View>
//               ) : (
//                 <LinearGradient
//                   colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={{ padding: 16 }}
//                 >
//                   <Text className="text-base font-[PoppinsRegular] text-white">
//                     {item.text}
//                   </Text>
//                 </LinearGradient>
//               )}
//             </View>
//           ) : (
//             // User message
//             <View
//               className="px-4 py-3 rounded-2xl bg-secondary border border-[#FBC3F8] rounded-tr-none"
//               style={{ maxWidth: bubbleMaxWidth }}
//             >
//               <Text className="text-base font-[PoppinsRegular] text-titleText">
//                 {item.text}
//               </Text>
//             </View>
//           )}

//           <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
//             {item.timestamp}
//           </Text>
//         </View>
//       </>
//     );
//   };

//   return (
//     <Screen className="bg-white">
//       <ImageBackground
//         source={require("@/assets/images/AI.png")}
//         style={{
//           height: "100%",
//           width: "100%",
//         }}
//         resizeMode="cover"
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={{ flex: 1 }}
//           keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
//         >
//           <View
//             style={{
//               flex: 1,
//               alignSelf: "center",
//               width: "100%",
//               maxWidth: containerMaxWidth,
//             }}
//           >
//             {/* Header */}
//             <View
//               className="flex-row items-center justify-between py-4"
//               style={{ paddingHorizontal: horizontalPadding }}
//             >
//               <TouchableOpacity
//                 onPress={() => router.back()}
//                 className="w-10 h-10 items-center justify-center"
//               >
//                 <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//               </TouchableOpacity>

//               <Text className="text-lg font-[PoppinsSemiBold] text-black">
//                 Chat with Ziena™
//               </Text>

//               <View className="w-10" />
//             </View>

//             <View className="items-center px-6">
//               <View className="w-32 h-32 border border-[#EAEAEA] rounded-full overflow-hidden">
//                 <Image
//                   source={require("@/assets/images/ziena-ai.png")}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     borderRadius: 100,
//                   }}
//                   contentFit="contain"
//                 />
//               </View>
//             </View>

//             {/* Loading State */}
//             {isLoading && (
//               <View className="flex-1 items-center justify-center">
//                 <ActivityIndicator size="large" color="#000" />
//                 <Text className="mt-2 text-gray-500 font-[PoppinsRegular]">
//                   Loading chat history...
//                 </Text>
//               </View>
//             )}

//             {/* Error State */}
//             {isError && !isLoading && (
//               <View className="flex-1 items-center justify-center px-6">
//                 <MaterialIcons name="error-outline" size={48} color="#EF4444" />
//                 <Text className="mt-2 text-gray-700 font-[PoppinsSemiBold] text-center">
//                   Failed to load chat history
//                 </Text>
//                 <Text className="mt-1 text-gray-500 font-[PoppinsRegular] text-center">
//                   Please try again later
//                 </Text>
//               </View>
//             )}

//             {/* Messages List */}
//             {!isLoading && !isError && (
//               <FlatList
//                 ref={flatListRef}
//                 data={messages}
//                 renderItem={renderMessage}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={{
//                   paddingVertical: 16,
//                   paddingHorizontal: horizontalPadding,
//                   flexGrow: 1,
//                 }}
//                 style={{ flex: 1 }}
//                 showsVerticalScrollIndicator={false}
//                 scrollEnabled={true}
//                 nestedScrollEnabled={true}
//                 onScroll={handleScroll}
//                 scrollEventThrottle={16}
//                 maintainVisibleContentPosition={{
//                   minIndexForVisible: 0,
//                 }}
//                 ListEmptyComponent={
//                   <View className="flex-1 items-center justify-center">
//                     <MaterialIcons
//                       name="chat-bubble-outline"
//                       size={64}
//                       color="#D1D5DB"
//                     />
//                     <Text className="mt-4 text-gray-500 font-[PoppinsRegular] text-center">
//                       No messages yet. Start a conversation!
//                     </Text>
//                   </View>
//                 }
//               />
//             )}

//             {/* Input Area */}
//             <View
//               className="border-t border-[#EAEAEA] bg-white"
//               style={{
//                 paddingTop: 8,
//                 paddingHorizontal: horizontalPadding,
//                 paddingBottom:
//                   Platform.OS === "ios" ? insets.bottom + 8 : insets.bottom + 6,
//               }}
//             >
//               <View className="flex-row items-center space-x-2">
//                 <View className="flex-1 mx-2">
//                   <CustomInput
//                     placeholder="Ask Ziena™..."
//                     value={message}
//                     onChangeText={setMessage}
//                     primary
//                     returnKeyType="send"
//                     onSubmitEditing={handleSend}
//                     autoCapitalize="sentences"
//                     editable={
//                       !isLoading &&
//                       !sendtalkToChatAi.isPending &&
//                       !isWaitingForStream
//                     }
//                   />
//                 </View>
//                 <TouchableOpacity
//                   onPress={handleSend}
//                   disabled={
//                     !message.trim() ||
//                     isLoading ||
//                     sendtalkToChatAi.isPending ||
//                     isWaitingForStream
//                   }
//                   className={`w-12 h-12 rounded-full items-center justify-center ${
//                     message.trim() &&
//                     !isLoading &&
//                     !sendtalkToChatAi.isPending &&
//                     !isWaitingForStream
//                       ? "bg-primaryLight"
//                       : "bg-[#F4EBFF]"
//                   }`}
//                 >
//                   {sendtalkToChatAi.isPending || isWaitingForStream ? (
//                     <ActivityIndicator size="small" color="white" />
//                   ) : (
//                     <GradientMaterialIcon
//                       name="send"
//                       size={20}
//                       gradientColors={[
//                         "#6B5591",
//                         "#6E3F8C",
//                         "#853385",
//                         "#9F3E83",
//                       ]}
//                     />
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </ImageBackground>
//     </Screen>
//   );
// };

// export default ChatWithAi;




import { useTalkToChatAiwithStream } from "@/src/api_services/chatApi/chatMutation";
import {
  useGetChatHistory,
  useGetSessionWithAiStream,
} from "@/src/api_services/chatApi/chatQuery";
import CustomInput from "@/src/custom-components/CustomInput";
import { GradientMaterialIcon } from "@/src/custom-components/GradientIcon";
import { TypingDots } from "@/src/custom-components/TypingDots";
import Screen from "@/src/layout/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
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
  date: string;
  fullDate: Date;
  isStreaming?: boolean;
}

const ChatWithAi = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [hasLoadedInitially, setHasLoadedInitially] = useState(false);
  const [pendingSessionData, setPendingSessionData] = useState<any>(null);

  // Hooks
  const streamingMutation = useTalkToChatAiwithStream();
  const getSessionWithAi = useGetSessionWithAiStream(chatMessage);
  const getChatHistory = useGetChatHistory();
  const { data: chatData, isLoading, isError } = getChatHistory;

  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Responsive layout measurements
  const containerMaxWidth = Math.min(width, 900);
  const horizontalPadding = width >= 1024 ? 32 : width >= 768 ? 24 : 16;
  const contentWidth = containerMaxWidth - horizontalPadding * 2;
  const bubbleMaxWidth = Math.min(640, contentWidth * 0.9);

  // Helper function to format date headers
  const formatDateHeader = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const messageDate = new Date(date);
    messageDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);

    if (messageDate.getTime() === today.getTime()) {
      return "Today";
    } else if (messageDate.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  // Check if we need to show a date separator
  const shouldShowDateSeparator = (
    currentMsg: Message,
    prevMsg: Message | null
  ): boolean => {
    if (!prevMsg) return true;

    const currentDate = new Date(currentMsg.fullDate);
    const prevDate = new Date(prevMsg.fullDate);

    currentDate.setHours(0, 0, 0, 0);
    prevDate.setHours(0, 0, 0, 0);

    return currentDate.getTime() !== prevDate.getTime();
  };

  // Load initial chat history
  useEffect(() => {
    if (chatData?.data && Array.isArray(chatData.data)) {
      const transformedMessages: Message[] = [];

      chatData.data.forEach((item: any) => {
        const fullDate = new Date(item.createdAt);
        const timestamp = fullDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const date = formatDateHeader(fullDate);

        // Add user message
        transformedMessages.push({
          id: `${item.id}-user`,
          text: item.message,
          isAi: false,
          timestamp: timestamp,
          date: date,
          fullDate: fullDate,
        });

        // Add AI reply
        transformedMessages.push({
          id: `${item.id}-ai`,
          text: item.reply,
          isAi: true,
          timestamp: timestamp,
          date: date,
          fullDate: fullDate,
        });
      });

      setMessages(transformedMessages);

      // Scroll to bottom on initial load
      if (!hasLoadedInitially && transformedMessages.length > 0) {
        setHasLoadedInitially(true);
        requestAnimationFrame(() => {
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }, 100);
        });
      }
    }
  }, [chatData]);

  // Fetch session when chatMessage is set
  useEffect(() => {
    if (chatMessage && !pendingSessionData) {
      getSessionWithAi.refetch();
    }
  }, [chatMessage]);

  // Start streaming when session data is received
  useEffect(() => {
    if (getSessionWithAi.isSuccess && getSessionWithAi.data && chatMessage) {
      setPendingSessionData(getSessionWithAi.data);

      // Remove typing indicator and add streaming message placeholder
      const fullDate = new Date();
      const timestamp = fullDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = formatDateHeader(fullDate);

      setMessages((prev) => {
        const withoutTyping = prev.filter(
          (msg) => msg.id !== "typing-indicator"
        );
        return [
          ...withoutTyping,
          {
            id: "streaming-ai",
            text: "",
            isAi: true,
            timestamp: timestamp,
            date: date,
            fullDate: fullDate,
            isStreaming: true,
          },
        ];
      });

      // Trigger streaming mutation
      streamingMutation.mutate(getSessionWithAi.data);
    }
  }, [getSessionWithAi.isSuccess, getSessionWithAi.data]);

  // Update streaming message in real-time
  useEffect(() => {
    if (streamingMutation.streamedData && streamingMutation.isStreaming) {
      setMessages((prev) => {
        const streamingIndex = prev.findIndex(
          (msg) => msg.id === "streaming-ai"
        );

        if (streamingIndex !== -1) {
          const updated = [...prev];
          updated[streamingIndex] = {
            ...updated[streamingIndex],
            text: streamingMutation.streamedData,
          };
          return updated;
        }
        return prev;
      });

      // Auto-scroll if near bottom
      if (isNearBottom) {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 50);
      }
    }
  }, [streamingMutation.streamedData]);

  // Handle streaming completion
  useEffect(() => {
    if (streamingMutation.isSuccess && !streamingMutation.isStreaming) {
      // Finalize the streaming message
      setMessages((prev) => {
        const streamingIndex = prev.findIndex(
          (msg) => msg.id === "streaming-ai"
        );

        if (streamingIndex !== -1) {
          const updated = [...prev];
          updated[streamingIndex] = {
            ...updated[streamingIndex],
            id: `ai-${Date.now()}`,
            isStreaming: false,
          };
          return updated;
        }
        return prev;
      });

      // Reset states
      setChatMessage("");
      setPendingSessionData(null);
    }
  }, [streamingMutation.isSuccess, streamingMutation.isStreaming]);

  // Handle errors
  useEffect(() => {
    if (streamingMutation.isError) {
      const fullDate = new Date();
      const timestamp = fullDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = formatDateHeader(fullDate);

      setMessages((prev) => {
        // Remove typing indicator and streaming message
        const filtered = prev.filter(
          (msg) => msg.id !== "typing-indicator" && msg.id !== "streaming-ai"
        );

        return [
          ...filtered,
          {
            id: `error-${Date.now()}`,
            text: "Failed to send message. Please try again.",
            isAi: true,
            timestamp: timestamp,
            date: date,
            fullDate: fullDate,
          },
        ];
      });

      setChatMessage("");
      setPendingSessionData(null);
    }
  }, [streamingMutation.isError]);

  // Check if user is near the bottom of the list
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 50;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    setIsNearBottom(isAtBottom);
  };

  const handleSend = async () => {
    if (
      message.trim() &&
      !streamingMutation.isPending &&
      !streamingMutation.isStreaming
    ) {
      const userMessageText = message.trim();
      const fullDate = new Date();
      const timestamp = fullDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = formatDateHeader(fullDate);

      // Add user message immediately to UI
      const newMessage: Message = {
        id: `temp-${Date.now()}`,
        text: userMessageText,
        isAi: false,
        timestamp: timestamp,
        date: date,
        fullDate: fullDate,
      };

      // Add a temporary "typing" indicator for AI
      const typingMessage: Message = {
        id: "typing-indicator",
        text: "...",
        isAi: true,
        timestamp: timestamp,
        date: date,
        fullDate: fullDate,
      };

      setMessages((prev) => [...prev, newMessage, typingMessage]);
      setMessage("");

      // Always scroll to bottom when user sends a message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
        setIsNearBottom(true);
      }, 100);

      // Trigger the streaming flow
      setChatMessage(userMessageText);
    }
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const showDateSeparator = shouldShowDateSeparator(item, prevMessage);

    return (
      <>
        {showDateSeparator && (
          <View className="items-center my-4">
            <View className="bg-gray-200 px-4 py-2 rounded-full">
              <Text className="text-xs font-[PoppinsSemiBold] text-gray-600">
                {item.date}
              </Text>
            </View>
          </View>
        )}

        <View className={`mb-4 ${item.isAi ? "items-start" : "items-end"}`}>
          {item.isAi ? (
            // AI message with gradient
            <View
              className="rounded-2xl rounded-tl-none overflow-hidden"
              style={{ maxWidth: bubbleMaxWidth }}
            >
              {item.id === "typing-indicator" ? (
                <View className="flex-row space-x-1 py-1 items-center">
                  <TypingDots />
                </View>
              ) : (
                <LinearGradient
                  colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ padding: 16 }}
                >
                  <Text className="text-base font-[PoppinsRegular] text-white">
                    {item.text}
                    {item.isStreaming && <Text className="opacity-50"> ▊</Text>}
                  </Text>
                </LinearGradient>
              )}
            </View>
          ) : (
            // User message
            <View
              className="px-4 py-3 rounded-2xl bg-secondary border border-[#FBC3F8] rounded-tr-none"
              style={{ maxWidth: bubbleMaxWidth }}
            >
              <Text className="text-base font-[PoppinsRegular] text-titleText">
                {item.text}
              </Text>
            </View>
          )}

          <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
            {item.timestamp}
          </Text>
        </View>
      </>
    );
  };

  return (
    <Screen className="bg-white">
      <ImageBackground
        source={require("@/assets/images/AI.png")}
        style={{
          height: "100%",
          width: "100%",
        }}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
        >
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              width: "100%",
              maxWidth: containerMaxWidth,
            }}
          >
            {/* Header */}
            <View
              className="flex-row items-center justify-between py-4"
              style={{ paddingHorizontal: horizontalPadding }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-10 h-10 items-center justify-center"
              >
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              </TouchableOpacity>

              <Text className="text-lg font-[PoppinsSemiBold] text-black">
                Chat with Ziena™
              </Text>

              <View className="w-10" />
            </View>

            <View className="items-center px-6">
              <View className="w-32 h-32 border border-[#EAEAEA] rounded-full overflow-hidden">
                <Image
                  source={require("@/assets/images/ziena-ai.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                  }}
                  contentFit="contain"
                />
              </View>
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
                maintainVisibleContentPosition={{
                  minIndexForVisible: 0,
                }}
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
                <View className="flex-1 mx-2">
                  <CustomInput
                    placeholder="Ask Ziena™..."
                    value={message}
                    onChangeText={setMessage}
                    primary
                    returnKeyType="send"
                    onSubmitEditing={handleSend}
                    autoCapitalize="sentences"
                    editable={!isLoading && !streamingMutation.isStreaming}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSend}
                  disabled={
                    !message.trim() ||
                    isLoading ||
                    streamingMutation.isStreaming
                  }
                  className={`w-12 h-12 rounded-full items-center justify-center ${
                    message.trim() &&
                    !isLoading &&
                    !streamingMutation.isStreaming
                      ? "bg-primaryLight"
                      : "bg-[#F4EBFF]"
                  }`}
                >
                  {streamingMutation.isStreaming ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <GradientMaterialIcon
                      name="send"
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
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </Screen>
  );
};

export default ChatWithAi;