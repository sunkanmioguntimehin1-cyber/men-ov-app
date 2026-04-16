// import { useGetAllChatAiHistory } from "@/src/api_services/chatApi/chatQuery";
// import { ActionPills } from "@/src/components/ActionPills";
// import { InlineWidget } from "@/src/components/InlineWidget";
// import Duration from "@/src/components/tabs/home-modal/CycleTracking/logCycleBottomSheet/Duration";
// import StartDateBottomSheet from "@/src/components/tabs/home-modal/CycleTracking/logCycleBottomSheet/StartDateBottomSheet";
// import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
// import CustomInput from "@/src/custom-components/CustomInput";
// import { GradientMaterialIcon } from "@/src/custom-components/GradientIcon";
// import { TypingDots } from "@/src/custom-components/TypingDots";
// import Screen from "@/src/layout/Screen";
// import useChatStore, { WidgetName } from "@/src/store/chatStore";
// import {
//   CyclePayload,
//   SymptomPayload,
//   extractSelection,
//   parseMessage,
//   parseWidgetSelection,
//   stripSelectionTag,
// } from "@/src/widgets/messageParser";
// import { MaterialIcons } from "@expo/vector-icons";
// import BottomSheet from "@gorhom/bottom-sheet";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useQueryClient } from "@tanstack/react-query";
// import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Linking from "expo-linking";
// import { useRouter } from "expo-router";
// import { fetch } from "expo/fetch";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Animated,
//   AppState,
//   ImageBackground,
//   KeyboardAvoidingView,
//   // Linking,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   Platform,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
//   useWindowDimensions,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// // import Linking from "react-native/Libraries/Linking/Linking";

// interface Message {
//   id: string;
//   text: string;
//   isAi: boolean;
//   timestamp: string;
//   date: string;
//   fullDate: Date;
//   widget?: WidgetName;
//   widgetPayload?: string;
//   selectedAction?: string;
//   selectedDate?: string;
//   selectedCycle?: string;
//   selectedSymptom?: string;
//   initialDate?: string;
//   initialCycle?: CyclePayload;
//   initialSymptom?: SymptomPayload;
// }

// const STREAMING_BASE_URL = process.env.EXPO_PUBLIC_STREAMING_BASE_URL;
// const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

// const ChatWithAi = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const [message, setMessage] = useState("");
//   const [chatMessage, setChatMessage] = useState("");
//   const [messageDatail, setMessageDatail] = useState<any>(null);
//   const { messages, setMessages, addMessage } = useChatStore();
//   const [isNearBottom, setIsNearBottom] = useState(true);

//   const lastInteractiveMessageId = useMemo(() => {
//     for (let i = messages.length - 1; i >= 0; i--) {
//       if (messages[i].isAi) {
//         return messages[i].id;
//       }
//     }
//     return null;
//   }, [messages]);
//   const [hasLoadedInitially, setHasLoadedInitially] = useState(false);
//   const [showScrollButton, setShowScrollButton] = useState(false);

//   const [selectedDate, setSelectedDate] = React.useState(null);
//   const [durationData, setDurationData] = React.useState("");
//   const [selectedSymptomDate, setSelectedSymptomDate] = React.useState(null);

//   // ✅ Separate streaming state with typing animation
//   const [streamingText, setStreamingText] = useState("");
//   const [isStreaming, setIsStreaming] = useState(false);

//   // ✅ Typing animation state
//   const typingQueueRef = useRef<string>("");
//   const isTypingRef = useRef(false);
//   const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

//   // ✅ Animated value for scroll button
//   const scrollButtonOpacity = useRef(new Animated.Value(0)).current;

//   // ✅ Refs to prevent duplicate requests
//   const hasFetchedAIRef = useRef(false);
//   const lastMessageDetailRef = useRef<any>(null);
//   const appState = useRef(AppState.currentState);
//   const lastChatMessageRef = useRef("");

//   const getAllChatAiHistory = useGetAllChatAiHistory();
//   // console.log("getAllChatAiHistory", getAllChatAiHistory?.data);

//   const scrollViewRef = useRef<ScrollView>(null);
//   const insets = useSafeAreaInsets();
//   const { width } = useWindowDimensions();

//   // all the bottom sheet handler
//   const snapPoints = useMemo(() => ["30%", "50%"], []);

//   const datebottomSheetRef = React.useRef<BottomSheet>(null);
//   const handleDateBottomSheetOpen = () => datebottomSheetRef.current?.expand();
//   const handleDateBottomSheetClose = () => datebottomSheetRef.current?.close();

//   const dateSymptomBottomSheetRef = React.useRef<BottomSheet>(null);
//   const handleDateSymptomBottomSheetOpen = () =>
//     dateSymptomBottomSheetRef.current?.expand();
//   const handleDateSymptomBottomSheetClose = () =>
//     dateSymptomBottomSheetRef.current?.close();

//   const durationBottomSheetRef = React.useRef<BottomSheet>(null);
//   const handleDurationBottomSheetOpen = () =>
//     durationBottomSheetRef.current?.expand();
//   const handleDurationBottomSheetClose = () =>
//     durationBottomSheetRef.current?.close();

//   // ✅ Track app state to prevent re-fetching when returning from background
//   useEffect(() => {
//     const subscription = AppState.addEventListener("change", (nextAppState) => {
//       if (
//         appState.current.match(/inactive|background/) &&
//         nextAppState === "active"
//       ) {
//         console.log("App has come to the foreground - preventing auto-fetch");
//       }
//       appState.current = nextAppState;
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   // ✅ Scroll to bottom helper function
//   const scrollToBottom = (animated: boolean = false) => {
//     requestAnimationFrame(() => {
//       setTimeout(() => {
//         scrollViewRef.current?.scrollToEnd({ animated });
//       }, 100);
//     });
//   };

//   // ✅ Show/hide scroll button with animation
//   useEffect(() => {
//     Animated.timing(scrollButtonOpacity, {
//       toValue: showScrollButton ? 1 : 0,
//       duration: 200,
//       useNativeDriver: true,
//     }).start();
//   }, [showScrollButton]);

//   // ✅ Scroll to bottom on mount if messages exist
//   useEffect(() => {
//     let isMounted = true;
//     const timer = setTimeout(() => {
//       if (isMounted && messages.length > 0) {
//         scrollToBottom(false);
//         setIsNearBottom(true);
//       }
//     }, 200);

//     return () => {
//       isMounted = false;
//       clearTimeout(timer);
//     };
//   }, []);

//   // ✅ FIXED: Only refetch when chatMessage actually changes
//   useEffect(() => {
//     if (chatMessage && chatMessage !== lastChatMessageRef.current) {
//       console.log("Refetching session with new chat message:", chatMessage);
//       lastChatMessageRef.current = chatMessage;
//     }
//   }, [chatMessage]);

//   // ✅ Typing animation function - displays text character by character
//   const startTypingAnimation = () => {
//     if (isTypingRef.current) return;

//     isTypingRef.current = true;

//     typingIntervalRef.current = setInterval(() => {
//       if (typingQueueRef.current.length === 0) {
//         return;
//       }

//       const nextChar = typingQueueRef.current[0];
//       typingQueueRef.current = typingQueueRef.current.slice(1);

//       setStreamingText((prev) => prev + nextChar);

//       if (isNearBottom) {
//         requestAnimationFrame(() => {
//           scrollViewRef.current?.scrollToEnd({ animated: false });
//         });
//       }
//     }, 30);
//   };

//   // ✅ Stop typing animation
//   const stopTypingAnimation = () => {
//     if (typingIntervalRef.current) {
//       clearInterval(typingIntervalRef.current);
//       typingIntervalRef.current = null;
//     }
//     isTypingRef.current = false;
//   };

//   console.log("messageDatail33", messageDatail);

//   // ✅ Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       stopTypingAnimation();
//     };
//   }, []);

//   // ✅ Streaming with typing animation
//   async function fetchAI() {
//     const token = await AsyncStorage.getItem("token");

//     try {
//       setIsStreaming(true);
//       setStreamingText("");
//       typingQueueRef.current = "";

//       startTypingAnimation();

//       const response = await fetch(`${STREAMING_BASE_URL}/chat/stream`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": API_KEY || "",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(messageDatail),
//       });

//       if (!response.ok) {
//         console.error("Failed to fetch AI", response);
//         stopTypingAnimation();
//         setIsStreaming(false);
//         return;
//       }

//       const reader = response.body?.getReader();
//       if (!reader) {
//         stopTypingAnimation();
//         setIsStreaming(false);
//         return;
//       }

//       const decoder = new TextDecoder("utf-8");

//       let isFirstChunk = true;

//       while (true) {
//         const { done, value } = await reader.read();

//         if (done) {
//           const waitForTyping = setInterval(() => {
//             if (typingQueueRef.current.length === 0) {
//               clearInterval(waitForTyping);
//               stopTypingAnimation();

//               setStreamingText((prev) => {
//                 const fullDate = new Date();
//                 const timestamp = fullDate.toLocaleTimeString("en-US", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });
//                 const date = formatDateHeader(fullDate);

//                 useChatStore.getState().removeTypingIndicator();
//                 useChatStore.getState().addMessage({
//                   id: `ai-${Date.now()}`,
//                   text: prev,
//                   isAi: true,
//                   timestamp,
//                   date,
//                   fullDate,
//                 });

//                 queryClient.invalidateQueries({
//                   queryKey: ["get-all-chat-history"],
//                 });

//                 return "";
//               });

//               setIsStreaming(false);
//             }
//           }, 50);

//           break;
//         }

//         const chunk = decoder.decode(value, { stream: true });
//         const cleanedChunk = chunk.replace(/\\n/g, "\n");

//         // ✅ Remove typing indicator when we get the first chunk
//         if (isFirstChunk) {
//           useChatStore.getState().removeTypingIndicator();
//           isFirstChunk = false;
//         }

//         typingQueueRef.current += cleanedChunk;

//         console.log(
//           `📦 Received chunk: ${chunk.length} chars. Queue size: ${typingQueueRef.current.length}`,
//         );
//       }
//     } catch (error) {
//       console.error("Error in fetchAI:", error);
//       stopTypingAnimation();
//       setIsStreaming(false);

//       const fullDate = new Date();
//       const timestamp = fullDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       const date = formatDateHeader(fullDate);

//       useChatStore.getState().removeTypingIndicator();
//       useChatStore.getState().addMessage({
//         id: `error-${Date.now()}`,
//         text: "Failed to get response. Please try again.",
//         isAi: true,
//         timestamp: timestamp,
//         date: date,
//         fullDate: fullDate,
//       });

//       queryClient.invalidateQueries({ queryKey: ["get-all-chat-history"] });
//     }
//   }

//   //! Parse Markdown-style text and render it
//   const renderFormattedText = (text: string) => {
//     const elements: React.ReactNode[] = [];
//     const lines = text.split("\n");

//     lines.forEach((line, lineIndex) => {
//       if (!line.trim()) {
//         elements.push(
//           <View key={`space-${lineIndex}`} style={{ height: 8 }} />,
//         );
//         return;
//       }

//       if (line.trim().startsWith("- ")) {
//         const content = line.replace(/^-\s*/, "");
//         const formatted = parseInlineFormatting(content);
//         elements.push(
//           <View
//             key={lineIndex}
//             style={{ flexDirection: "row", marginBottom: 4 }}
//           >
//             <Text style={{ color: "white", marginRight: 8, fontSize: 16 }}>
//               •
//             </Text>
//             <Text
//               style={{
//                 color: "black",
//                 flex: 1,
//                 fontSize: 16,
//                 fontFamily: "PoppinsRegular",
//               }}
//             >
//               {formatted}
//             </Text>
//           </View>,
//         );
//       } else {
//         const formatted = parseInlineFormatting(line);
//         elements.push(
//           <Text
//             key={lineIndex}
//             style={{
//               color: "black",
//               fontSize: 16,
//               marginBottom: 4,
//               fontFamily: "PoppinsRegular",
//             }}
//           >
//             {formatted}
//           </Text>,
//         );
//       }
//     });

//     return <>{elements}</>;
//   };

//   //! Parse inline formatting like **bold** and [links](urls)
//   const parseInlineFormatting = (text: string): React.ReactNode[] => {
//     const elements: React.ReactNode[] = [];
//     let currentIndex = 0;

//     const regex = /(\*\*.*?\*\*)|(\[.*?\]\(.*?\))/g;
//     let match;

//     while ((match = regex.exec(text)) !== null) {
//       if (match.index > currentIndex) {
//         elements.push(text.substring(currentIndex, match.index));
//       }

//       const fullMatch = match[0];

//       if (fullMatch.startsWith("**")) {
//         const boldText = fullMatch.replace(/\*\*/g, "");
//         elements.push(
//           <Text
//             key={match.index}
//             style={{ fontFamily: "PoppinsSemiBold", color: "black" }}
//           >
//             {boldText}
//           </Text>,
//         );
//       } else if (fullMatch.startsWith("[")) {
//         const linkMatch = fullMatch.match(/\[(.*?)\]\((.*?)\)/);
//         if (linkMatch) {
//           const linkText = linkMatch[1];
//           const url = linkMatch[2];
//           elements.push(
//             <Text
//               key={match.index}
//               style={{
//                 color: "#0e48c7",
//                 textDecorationLine: "underline",
//                 fontFamily: "PoppinsSemiBold",
//                 fontSize: 16,
//               }}
//               onPress={() => Linking.openURL(url)}
//             >
//               {linkText}
//             </Text>,
//           );
//         }
//       }

//       currentIndex = match.index + fullMatch.length;
//     }

//     if (currentIndex < text.length) {
//       elements.push(text.substring(currentIndex));
//     }

//     return elements.length > 0 ? elements : [text];
//   };

//   // Handle action pill press - send as user message and trigger AI response
//   const handleActionPress = async (messageId: string, action: string) => {
//     const fullDate = new Date();
//     const timestamp = fullDate.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const date = formatDateHeader(fullDate);

//     // 1. Update message with selected action in store
//     useChatStore.getState().updateMessageSelectedAction(messageId, action);

//     // 2. Add user message
//     useChatStore.getState().addMessage({
//       id: `user-${Date.now()}`,
//       text: action,
//       isAi: false,
//       timestamp,
//       date,
//       fullDate,
//     });

//     // 3. Add typing indicator
//     useChatStore.getState().addMessage({
//       id: "typing-indicator",
//       text: "...",
//       isAi: true,
//       timestamp,
//       date,
//       fullDate,
//     });

//     // 4. Scroll to bottom
//     setTimeout(() => {
//       if (scrollViewRef.current) {
//         scrollViewRef.current.scrollToEnd({ animated: true });
//         setIsNearBottom(true);
//       }
//     }, 100);

//     // 5. Reset fetch flag and trigger streaming response
//     hasFetchedAIRef.current = false;
//     lastMessageDetailRef.current = null;

//     // 6. Set message payload to continue conversation
//     const token = await AsyncStorage.getItem("token");
//     const chatHistory = messages.map((msg) => ({
//       role: msg.isAi ? "assistant" : "user",
//       content: msg.text,
//     }));

//     setMessageDatail({
//       messages: [
//         ...chatHistory,
//         {
//           role: "user",
//           content: action,
//         },
//       ],
//     });
//   };

//   // Handle date picker submission
//   const handleDateSubmit = async (
//     messageId: string,
//     payload: { date: string },
//   ) => {
//     const fullDate = new Date();
//     const timestamp = fullDate.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const date = formatDateHeader(fullDate);

//     useChatStore.getState().updateMessageSelectedDate(messageId, payload.date);

//     useChatStore.getState().addMessage({
//       id: `user-${Date.now()}`,
//       text: payload.date,
//       isAi: false,
//       timestamp,
//       date,
//       fullDate,
//     });

//     useChatStore.getState().addMessage({
//       id: "typing-indicator",
//       text: "...",
//       isAi: true,
//       timestamp,
//       date,
//       fullDate,
//     });

//     setTimeout(() => {
//       if (scrollViewRef.current) {
//         scrollViewRef.current.scrollToEnd({ animated: true });
//         setIsNearBottom(true);
//       }
//     }, 100);

//     hasFetchedAIRef.current = false;
//     lastMessageDetailRef.current = null;

//     const chatHistory = messages.map((msg) => ({
//       role: msg.isAi ? "assistant" : "user",
//       content: msg.text,
//     }));

//     setMessageDatail({
//       messages: [
//         ...chatHistory,
//         {
//           role: "user",
//           content: payload.date,
//         },
//       ],
//     });
//   };

//   // Handle cycle form submission
//   const handleCycleSubmit = async (
//     messageId: string,
//     payload: { cycleData: string },
//   ) => {
//     const fullDate = new Date();
//     const timestamp = fullDate.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const date = formatDateHeader(fullDate);

//     useChatStore
//       .getState()
//       .updateMessageSelectedCycle(messageId, payload.cycleData);

//     useChatStore.getState().addMessage({
//       id: `user-${Date.now()}`,
//       text: payload.cycleData,
//       isAi: false,
//       timestamp,
//       date,
//       fullDate,
//     });

//     useChatStore.getState().addMessage({
//       id: "typing-indicator",
//       text: "...",
//       isAi: true,
//       timestamp,
//       date,
//       fullDate,
//     });

//     setTimeout(() => {
//       if (scrollViewRef.current) {
//         scrollViewRef.current.scrollToEnd({ animated: true });
//         setIsNearBottom(true);
//       }
//     }, 100);

//     hasFetchedAIRef.current = false;
//     lastMessageDetailRef.current = null;

//     const chatHistory = messages.map((msg) => ({
//       role: msg.isAi ? "assistant" : "user",
//       content: msg.text,
//     }));

//     setMessageDatail({
//       messages: [
//         ...chatHistory,
//         {
//           role: "user",
//           content: payload.cycleData,
//         },
//       ],
//     });
//   };

//   // Handle symptom form submission
//   const handleSymptomSubmit = async (
//     messageId: string,
//     payload: { symptomData: string },
//   ) => {
//     const fullDate = new Date();
//     const timestamp = fullDate.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const date = formatDateHeader(fullDate);

//     useChatStore
//       .getState()
//       .updateMessageSelectedSymptom(messageId, payload.symptomData);

//     useChatStore.getState().addMessage({
//       id: `user-${Date.now()}`,
//       text: payload.symptomData,
//       isAi: false,
//       timestamp,
//       date,
//       fullDate,
//     });

//     useChatStore.getState().addMessage({
//       id: "typing-indicator",
//       text: "...",
//       isAi: true,
//       timestamp,
//       date,
//       fullDate,
//     });

//     setTimeout(() => {
//       if (scrollViewRef.current) {
//         scrollViewRef.current.scrollToEnd({ animated: true });
//         setIsNearBottom(true);
//       }
//     }, 100);

//     hasFetchedAIRef.current = false;
//     lastMessageDetailRef.current = null;

//     const chatHistory = messages.map((msg) => ({
//       role: msg.isAi ? "assistant" : "user",
//       content: msg.text,
//     }));

//     setMessageDatail({
//       messages: [
//         ...chatHistory,
//         {
//           role: "user",
//           content: payload.symptomData,
//         },
//       ],
//     });
//   };

//   // Handle widget submission
//   const handleWidgetSubmit = (messageId: string) => (payload: any) => {
//     const fullDate = new Date();
//     const timestamp = fullDate.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const date = formatDateHeader(fullDate);

//     useChatStore.getState().addMessage({
//       id: `user-${Date.now()}`,
//       text: JSON.stringify(payload),
//       isAi: false,
//       timestamp: timestamp,
//       date: date,
//       fullDate: fullDate,
//     });

//     setTimeout(() => {
//       if (scrollViewRef.current) {
//         scrollViewRef.current.scrollToEnd({ animated: true });
//         setIsNearBottom(true);
//       }
//     }, 100);
//   };

//   //! Render message content segments (text, actions, widgets)
//   const renderMessageContent = (message: Message) => {
//     const segments = parseMessage(message.text);

//     // If no tags found, render all text directly (fallback for regular messages)
//     if (segments.length === 0) {
//       return renderFormattedText(message.text);
//     }

//     // Render segments sequentially
//     return (
//       <>
//         {segments.map((segment, index) => {
//           switch (segment.type) {
//             case "text":
//               return segment.content ? (
//                 <View className=" pb-2" key={index}>
//                   {renderFormattedText(segment.content)}
//                 </View>
//               ) : null;
//             case "actions":
//               return (
//                 <View
//                   className="  overflow-hidden py-4"
//                   key={index}
//                   style={{ marginTop: 12 }}
//                 >
//                   <ActionPills
//                     actions={segment.options}
//                     messageId={message.id}
//                     selectedButton={message.selectedAction}
//                     onPress={(action) => handleActionPress(message.id, action)}
//                     disabled={
//                       message.id !== lastInteractiveMessageId ||
//                       !!message.selectedAction
//                     }
//                   />
//                 </View>
//               );
//             case "widget":
//               return (
//                 <View
//                   className="  overflow-hidden py-4"
//                   key={index}
//                   style={{ marginTop: 12, paddingVertical: 8 }}
//                 >
//                   <InlineWidget
//                     type={segment.name}
//                     messageId={message.id}
//                     selectedDate={selectedDate}
//                     durationData={durationData}
//                     initialDate={message.initialDate}
//                     initialCycle={message.initialCycle}
//                     initialSymptom={message.initialSymptom}
//                     handleDurationBottomSheetOpen={
//                       message.id !== lastInteractiveMessageId
//                         ? undefined
//                         : handleDurationBottomSheetOpen
//                     }
//                     handleDateBottomSheetOpen={
//                       message.id !== lastInteractiveMessageId
//                         ? undefined
//                         : handleDateBottomSheetOpen
//                     }
//                     onSubmit={
//                       segment.name === "date_picker"
//                         ? (payload) => handleDateSubmit(message.id, payload)
//                         : segment.name === "cycle_form"
//                           ? (payload) => handleCycleSubmit(message.id, payload)
//                           : segment.name === "symptom_form"
//                             ? (payload) =>
//                                 handleSymptomSubmit(message.id, payload)
//                             : handleWidgetSubmit(message.id)
//                     }
//                     submitted={
//                       message.id !== lastInteractiveMessageId ||
//                       !!message.selectedDate ||
//                       !!message.selectedCycle ||
//                       !!message.selectedSymptom
//                     }
//                     disabled={
//                       message.id !== lastInteractiveMessageId ||
//                       !!message.selectedDate ||
//                       !!message.selectedCycle ||
//                       !!message.selectedSymptom
//                     }
//                   />
//                 </View>
//               );
//             default:
//               return null;
//           }
//         })}
//         {/* Fallback: render widget from message metadata if no widget segment found */}
//         {message.widget && !segments.some((s) => s.type === "widget") && (
//           <View style={{ marginTop: 12 }}>
//             <InlineWidget
//               type={message.widget}
//               messageId={message.id}
//               selectedDate={selectedDate}
//               durationData={durationData}
//               initialDate={message.initialDate}
//               initialCycle={message.initialCycle}
//               initialSymptom={message.initialSymptom}
//               handleDurationBottomSheetOpen={
//                 message.id !== lastInteractiveMessageId
//                   ? undefined
//                   : handleDurationBottomSheetOpen
//               }
//               handleDateBottomSheetOpen={
//                 message.id !== lastInteractiveMessageId
//                   ? undefined
//                   : handleDateBottomSheetOpen
//               }
//               onSubmit={
//                 message.widget === "date_picker"
//                   ? (payload) => handleDateSubmit(message.id, payload)
//                   : message.widget === "cycle_form"
//                     ? (payload) => handleCycleSubmit(message.id, payload)
//                     : message.widget === "symptom_form"
//                       ? (payload) => handleSymptomSubmit(message.id, payload)
//                       : handleWidgetSubmit(message.id)
//               }
//               submitted={
//                 message.id !== lastInteractiveMessageId ||
//                 !!message.selectedDate ||
//                 !!message.selectedCycle ||
//                 !!message.selectedSymptom
//               }
//               disabled={
//                 message.id !== lastInteractiveMessageId ||
//                 !!message.selectedDate ||
//                 !!message.selectedCycle ||
//                 !!message.selectedSymptom
//               }
//             />
//           </View>
//         )}
//       </>
//     );
//   };

//   // ✅ FIXED: Only fetch AI response once per message
//   useEffect(() => {
//     const messageDetailString = JSON.stringify(messageDatail);
//     const lastMessageString = JSON.stringify(lastMessageDetailRef.current);

//     if (
//       messageDatail &&
//       messageDetailString !== lastMessageString &&
//       !hasFetchedAIRef.current
//     ) {
//       console.log("Fetching AI response for new message detail");
//       hasFetchedAIRef.current = true;
//       lastMessageDetailRef.current = messageDatail;
//       fetchAI();
//     }
//   }, [messageDatail]);

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
//     prevMsg: Message | null,
//   ): boolean => {
//     if (!prevMsg) return true;

//     const currentDate = new Date(currentMsg.fullDate);
//     const prevDate = new Date(prevMsg.fullDate);
//     currentDate.setHours(0, 0, 0, 0);
//     prevDate.setHours(0, 0, 0, 0);

//     return currentDate.getTime() !== prevDate.getTime();
//   };

//   // Format system payload for user display
//   const formatUserMessageForDisplay = (text: string): string => {
//     let formatted = stripSelectionTag(text);

//     if (formatted.startsWith("[SYSTEM_PAYLOAD:")) {
//       formatted = formatted
//         .replace("[SYSTEM_PAYLOAD: FORM_SUBMITTED | ", "")
//         .replace("]", "")
//         .replace("type: ", "");
//     }
//     return formatted;
//   };

//   // ✅ Transform server data from getAllChatAiHistory to message format
//   useEffect(() => {
//     let isMounted = true;

//     useChatStore.getState().clearMessages();

//     if (
//       getAllChatAiHistory.data?.messages &&
//       Array.isArray(getAllChatAiHistory.data.messages)
//     ) {
//       const serverMessages = getAllChatAiHistory.data.messages;

//       const transformedMessages: Message[] = serverMessages.map((msg: any) => {
//         const fullDate = new Date(msg.created_at);
//         const timestamp = fullDate.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         const date = formatDateHeader(fullDate);
//         const selectedAction = extractSelection(msg.content);

//         const rawSelection = extractSelection(msg.content);
//         let selectedDate: string | undefined;
//         let selectedCycle: string | undefined;
//         let selectedSymptom: string | undefined;
//         let initialDate: string | undefined;
//         let initialCycle: CyclePayload | undefined;
//         let initialSymptom: SymptomPayload | undefined;

//         if (rawSelection) {
//           const parsed = parseWidgetSelection(rawSelection);
//           if (parsed) {
//             switch (parsed.widgetType) {
//               case "date_picker":
//                 initialDate = parsed.payload as string;
//                 selectedDate = parsed.payload as string;
//                 break;
//               case "cycle_form":
//                 initialCycle = parsed.payload as CyclePayload;
//                 selectedCycle = rawSelection;
//                 break;
//               case "symptom_form":
//                 initialSymptom = parsed.payload as SymptomPayload;
//                 selectedSymptom = rawSelection;
//                 break;
//             }
//           }
//         }

//         return {
//           id: msg.id,
//           text: msg.content,
//           isAi: msg.role === "assistant",
//           timestamp: timestamp,
//           date: date,
//           fullDate: fullDate,
//           selectedAction,
//           selectedDate,
//           selectedCycle,
//           selectedSymptom,
//           initialDate,
//           initialCycle,
//           initialSymptom,
//         };
//       });

//       transformedMessages.sort(
//         (a, b) => a.fullDate.getTime() - b.fullDate.getTime(),
//       );

//       useChatStore.getState().setMessages(transformedMessages);

//       if (isMounted && transformedMessages.length > 0 && !hasLoadedInitially) {
//         setHasLoadedInitially(true);
//         requestAnimationFrame(() => {
//           setTimeout(() => {
//             if (isMounted && scrollViewRef.current) {
//               scrollViewRef.current.scrollToEnd({ animated: false });
//               setIsNearBottom(true);
//             }
//           }, 150);
//         });
//       }
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [getAllChatAiHistory.data]);

//   // ✅ Check if user is near the bottom and show/hide scroll button
//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
//     const paddingToBottom = 50;
//     const isAtBottom =
//       layoutMeasurement.height + contentOffset.y >=
//       contentSize.height - paddingToBottom;

//     setIsNearBottom(isAtBottom);
//     setShowScrollButton(!isAtBottom && messages.length > 0);
//   };

//   const handleSend = async () => {
//     if (message.trim() && !isStreaming) {
//       const userMessageText = message.trim();
//       const fullDate = new Date();
//       const timestamp = fullDate.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       const date = formatDateHeader(fullDate);

//       const newMessage: Message = {
//         id: `temp-${Date.now()}`,
//         text: userMessageText,
//         isAi: false,
//         timestamp: timestamp,
//         date: date,
//         fullDate: fullDate,
//       };

//       const typingMessage: Message = {
//         id: "typing-indicator",
//         text: "...",
//         isAi: true,
//         timestamp: timestamp,
//         date: date,
//         fullDate: fullDate,
//       };

//       useChatStore.getState().addMessage(newMessage);
//       useChatStore.getState().addMessage(typingMessage);
//       setMessage("");
//       setStreamingText("");

//       // ✅ Reset fetch flag for new message
//       hasFetchedAIRef.current = false;

//       // ✅ Set the message payload that fetchAI will send to the backend
//       setMessageDatail({
//         messages: [
//           {
//             role: "user",
//             content: userMessageText,
//           },
//         ],
//       });

//       requestAnimationFrame(() => {
//         setTimeout(() => {
//           if (scrollViewRef.current) {
//             scrollViewRef.current.scrollToEnd({ animated: true });
//             setIsNearBottom(true);
//           }
//         }, 100);
//       });

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
//             <View
//               className="rounded-2xl rounded-tl-none overflow-hidden"
//               style={{ maxWidth: bubbleMaxWidth }}
//             >
//               {item.id === "typing-indicator" ? (
//                 <View className="flex-row space-x-1 py-1 items-center">
//                   <TypingDots />
//                 </View>
//               ) : (
//                 // <LinearGradient
//                 //   colors={["#853385", "#9F3E83"]}
//                 //   start={{ x: 0, y: 0 }}
//                 //   end={{ x: 1, y: 1 }}
//                 //   style={{ padding: 16 }}
//                 // >
//                 //   {renderMessageContent(item)}
//                 // </LinearGradient>
//                 <View
//                   className="p-4  rounded-2xl bg-secondary border border-[#FBC3F8] "
//                   style={{ maxWidth: bubbleMaxWidth }}
//                 >
//                   <Text className="text-base font-[PoppinsRegular]">
//                     {renderMessageContent(item)}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           ) : (
//             // <View
//             //   className="px-4 py-3 rounded-2xl bg-secondary border border-[#FBC3F8] rounded-tr-none"
//             //   style={{ maxWidth: bubbleMaxWidth }}
//             // >
//             // <Text className="text-base font-[PoppinsRegular] text-titleText">
//             //   {item.text}
//             // </Text>
//             // </View>
//             <LinearGradient
//               colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={{
//                 paddingHorizontal: 20,
//                 paddingVertical: 16,
//                 borderRadius: 16,
//                 borderTopRightRadius: 4,
//               }}
//             >
//               <Text className="text-base text-white font-[PoppinsRegular]">
//                 {formatUserMessageForDisplay(item.text)}
//               </Text>
//             </LinearGradient>
//           )}

//           <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
//             {item.timestamp}
//           </Text>
//         </View>
//       </>
//     );
//   };

//   const isLoadingHistory = getAllChatAiHistory.isLoading;
//   const isErrorHistory = getAllChatAiHistory.isError;

//   return (
//     <Screen className="bg-white">
//       <ImageBackground
//         source={require("@/assets/images/AI.png")}
//         style={{ height: "100%", width: "100%" }}
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
//                   style={{ width: "100%", height: "100%", borderRadius: 100 }}
//                   contentFit="contain"
//                 />
//               </View>
//             </View>

//             {/* Loading State */}
//             {isLoadingHistory && (
//               <View className="flex-1 items-center justify-center">
//                 <ActivityIndicator size="large" color="#000" />
//                 <Text className="mt-2 text-gray-500 font-[PoppinsRegular]">
//                   Loading chat history...
//                 </Text>
//               </View>
//             )}

//             {/* Error State */}
//             {isErrorHistory && !isLoadingHistory && (
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

//             {/* Messages ScrollView */}
//             {!isLoadingHistory && !isErrorHistory && (
//               <View style={{ flex: 1, position: "relative" }}>
//                 <ScrollView
//                   ref={scrollViewRef}
//                   contentContainerStyle={{
//                     paddingVertical: 16,
//                     paddingHorizontal: horizontalPadding,
//                     flexGrow: 1,
//                   }}
//                   style={{ flex: 1 }}
//                   showsVerticalScrollIndicator={false}
//                   onScroll={handleScroll}
//                   scrollEventThrottle={16}
//                 >
//                   {messages.length === 0 && !isStreaming ? (
//                     <View className="flex-1 items-center justify-center">
//                       <MaterialIcons
//                         name="chat-bubble-outline"
//                         size={64}
//                         color="#D1D5DB"
//                       />
//                       <Text className="mt-4 text-gray-500 font-[PoppinsRegular] text-center">
//                         No messages yet. Start a conversation!
//                       </Text>
//                     </View>
//                   ) : (
//                     <>
//                       {messages.map((item, index) => (
//                         <View key={item.id}>
//                           {renderMessage({ item, index })}
//                         </View>
//                       ))}

//                       {/* ✅ Streaming text with typing animation */}
//                       {isStreaming && streamingText && (
//                         <View className="mb-4 items-start">
//                           <View
//                             className="rounded-2xl p-4 rounded-tl-none overflow-hidden bg-secondary border border-[#FBC3F8]"
//                             style={{ maxWidth: bubbleMaxWidth }}
//                           >
//                             {/* <LinearGradient
//                               colors={[
//                                 "#6B5591",
//                                 "#6E3F8C",
//                                 "#853385",
//                                 "#9F3E83",
//                               ]}
//                               start={{ x: 0, y: 0 }}
//                               end={{ x: 1, y: 1 }}
//                               style={{ padding: 16 }}
//                             > */}
//                             {renderFormattedText(streamingText)}
//                             <Text style={{ color: "black", fontSize: 16 }}>
//                               ▌
//                             </Text>
//                             {/* </LinearGradient> */}
//                           </View>
//                           <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
//                             {new Date().toLocaleTimeString("en-US", {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </Text>
//                         </View>
//                       )}
//                     </>
//                   )}
//                 </ScrollView>

//                 {/* ✅ Scroll to Bottom Button */}
//                 {showScrollButton && (
//                   <Animated.View
//                     style={{
//                       position: "absolute",
//                       bottom: 16,
//                       right: horizontalPadding,
//                       opacity: scrollButtonOpacity,
//                     }}
//                   >
//                     <TouchableOpacity
//                       onPress={() => {
//                         scrollToBottom(true);
//                         setIsNearBottom(true);
//                       }}
//                       className="bg-white rounded-full shadow-lg p-3 border border-gray-200"
//                       style={{
//                         shadowColor: "#000",
//                         shadowOffset: { width: 0, height: 2 },
//                         shadowOpacity: 0.25,
//                         shadowRadius: 3.84,
//                         elevation: 5,
//                       }}
//                     >
//                       <MaterialIcons
//                         name="keyboard-arrow-down"
//                         size={28}
//                         color="#6B5591"
//                       />
//                     </TouchableOpacity>
//                   </Animated.View>
//                 )}
//               </View>
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
//                     editable={!isLoadingHistory && !isStreaming}
//                   />
//                 </View>
//                 <TouchableOpacity
//                   onPress={handleSend}
//                   disabled={!message.trim() || isLoadingHistory || isStreaming}
//                   className={`w-12 h-12 rounded-full items-center justify-center ${
//                     message.trim() && !isLoadingHistory && !isStreaming
//                       ? "bg-primaryLight"
//                       : "bg-[#F4EBFF]"
//                   }`}
//                 >
//                   {isStreaming ? (
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

//       <BottomSheetScreen
//         snapPoints={snapPoints}
//         ref={datebottomSheetRef}
//         isBackdropComponent={true}
//         enablePanDownToClose={true}
//         index={-1}
//         message={
//           <StartDateBottomSheet
//             selectedDate={selectedDate}
//             setSelectedDate={setSelectedDate}
//             handleDateBottomSheetClose={handleDateBottomSheetClose}
//           />
//         }
//       />

//       <BottomSheetScreen
//         snapPoints={snapPoints}
//         ref={durationBottomSheetRef}
//         isBackdropComponent={true}
//         enablePanDownToClose={true}
//         index={-1}
//         message={
//           <Duration
//             handleDurationBottomSheetClose={handleDurationBottomSheetClose}
//             durationData={durationData}
//             setDurationData={setDurationData}
//           />
//         }
//       />
//     </Screen>
//   );
// };

// export default ChatWithAi;

//! #############################
//! ########################################

import { useGetAllChatAiHistory } from "@/src/api_services/chatApi/chatQuery";
import { ActionPills } from "@/src/components/ActionPills";
import { InlineWidget } from "@/src/components/InlineWidget";
import QuotaBanner from "@/src/components/QuotaBanner";
import Duration from "@/src/components/tabs/home-modal/CycleTracking/logCycleBottomSheet/Duration";
import StartDateBottomSheet from "@/src/components/tabs/home-modal/CycleTracking/logCycleBottomSheet/StartDateBottomSheet";
import BottomSheetScreen from "@/src/custom-components/BottomSheetScreen";
import CustomInput from "@/src/custom-components/CustomInput";
import { GradientMaterialIcon } from "@/src/custom-components/GradientIcon";
import { TypingDots } from "@/src/custom-components/TypingDots";
import Screen from "@/src/layout/Screen";
import useChatStore, { WidgetName } from "@/src/store/chatStore";
import {
  CyclePayload,
  QuotaInfo,
  SymptomPayload,
  extractQuota,
  extractSelection,
  parseMessage,
  parseWidgetSelection,
  stripQuotaTag,
  stripSelectionTag,
} from "@/src/widgets/messageParser";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { fetch } from "expo/fetch";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  AppState,
  ImageBackground,
  KeyboardAvoidingView,
  // Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Linking from "react-native/Libraries/Linking/Linking";

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: string;
  date: string;
  fullDate: Date;
  widget?: WidgetName;
  widgetPayload?: string;
  selectedAction?: string;
  selectedDate?: string;
  selectedCycle?: string;
  selectedSymptom?: string;
  initialDate?: string;
  initialCycle?: CyclePayload;
  initialSymptom?: SymptomPayload;
}

const STREAMING_BASE_URL = process.env.EXPO_PUBLIC_STREAMING_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const ChatWithAi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [messageDatail, setMessageDatail] = useState<any>(null);
  const { messages, setMessages, addMessage } = useChatStore();
  const [isNearBottom, setIsNearBottom] = useState(true);

  const [quotaInfo, setQuotaInfo] = React.useState<QuotaInfo | null>(null);

  const isQuotaReset = React.useMemo(() => {
    if (!quotaInfo?.resets) return false;
    const resetTime = new Date(quotaInfo.resets).getTime();
    const now = Date.now();
    return now >= resetTime;
  }, [quotaInfo?.resets]);

  const isQuotaExhausted = quotaInfo?.status === "exhausted" && !isQuotaReset;

  console.log("isQuotaExhausted:", isQuotaExhausted);
  console.log("isQuotaReset:", isQuotaReset);
  console.log("quotaInfo2000:", quotaInfo);

  const lastInteractiveMessageId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].isAi) {
        return messages[i].id;
      }
    }
    return null;
  }, [messages]);
  const [hasLoadedInitially, setHasLoadedInitially] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [durationData, setDurationData] = React.useState("");
  const [selectedSymptomDate, setSelectedSymptomDate] = React.useState(null);

  // ✅ Separate streaming state with typing animation
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const [quotaError, setQuotaError] = React.useState<{
    message: string;
    refillsAt: string;
  } | null>(null);

  // ✅ Typing animation state
  const typingQueueRef = useRef<string>("");
  const isTypingRef = useRef(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Animated value for scroll button
  const scrollButtonOpacity = useRef(new Animated.Value(0)).current;

  // ✅ Refs to prevent duplicate requests
  const hasFetchedAIRef = useRef(false);
  const lastMessageDetailRef = useRef<any>(null);
  const appState = useRef(AppState.currentState);
  const lastChatMessageRef = useRef("");

  const getAllChatAiHistory = useGetAllChatAiHistory();
  // console.log("getAllChatAiHistory", getAllChatAiHistory?.data);

  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // all the bottom sheet handler
  const snapPoints = useMemo(() => ["30%", "50%"], []);

  const datebottomSheetRef = React.useRef<BottomSheet>(null);
  const handleDateBottomSheetOpen = () => datebottomSheetRef.current?.expand();
  const handleDateBottomSheetClose = () => datebottomSheetRef.current?.close();

  const dateSymptomBottomSheetRef = React.useRef<BottomSheet>(null);
  const handleDateSymptomBottomSheetOpen = () =>
    dateSymptomBottomSheetRef.current?.expand();
  const handleDateSymptomBottomSheetClose = () =>
    dateSymptomBottomSheetRef.current?.close();

  const durationBottomSheetRef = React.useRef<BottomSheet>(null);
  const handleDurationBottomSheetOpen = () =>
    durationBottomSheetRef.current?.expand();
  const handleDurationBottomSheetClose = () =>
    durationBottomSheetRef.current?.close();

  // ✅ Track app state to prevent re-fetching when returning from background
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground - preventing auto-fetch");
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // ✅ Scroll to bottom helper function
  const scrollToBottom = (animated: boolean = false) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated });
      }, 100);
    });
  };

  // ✅ Show/hide scroll button with animation
  useEffect(() => {
    Animated.timing(scrollButtonOpacity, {
      toValue: showScrollButton ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showScrollButton]);

  // ✅ Scroll to bottom on mount if messages exist
  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted && messages.length > 0) {
        scrollToBottom(false);
        setIsNearBottom(true);
      }
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  // ✅ FIXED: Only refetch when chatMessage actually changes
  useEffect(() => {
    if (chatMessage && chatMessage !== lastChatMessageRef.current) {
      console.log("Refetching session with new chat message:", chatMessage);
      lastChatMessageRef.current = chatMessage;
    }
  }, [chatMessage]);

  // ✅ Typing animation function - displays text character by character
  const startTypingAnimation = () => {
    if (isTypingRef.current) return;

    isTypingRef.current = true;

    typingIntervalRef.current = setInterval(() => {
      if (typingQueueRef.current.length === 0) {
        return;
      }

      const nextChar = typingQueueRef.current[0];
      typingQueueRef.current = typingQueueRef.current.slice(1);

      setStreamingText((prev) => prev + nextChar);

      if (isNearBottom) {
        requestAnimationFrame(() => {
          scrollViewRef.current?.scrollToEnd({ animated: false });
        });
      }
    }, 30);
  };

  // ✅ Stop typing animation
  const stopTypingAnimation = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    isTypingRef.current = false;
  };

  console.log("messageDatail33", messageDatail);

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTypingAnimation();
    };
  }, []);

  // ✅ Streaming with typing animation
  async function fetchAI() {
    const token = await AsyncStorage.getItem("token");

    try {
      setIsStreaming(true);
      setStreamingText("");
      typingQueueRef.current = "";

      startTypingAnimation();

      const response = await fetch(`${STREAMING_BASE_URL}/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY || "",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageDatail),
      });

      // if (!response.ok) {
      //   console.error("Failed to fetch AI", response);
      //   stopTypingAnimation();
      //   setIsStreaming(false);
      //   return;
      // }

      if (!response.ok) {
        stopTypingAnimation();
        setIsStreaming(false);
        useChatStore.getState().removeTypingIndicator();

        try {
          const errData = await response.json();
          if (errData?.error === "quota_exceeded") {
            // Format the refill time nicely
            const refillDate = new Date(errData.quota_refills_at);
            const refillsAt = refillDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
            setQuotaError({
              message:
                errData.message ||
                "You've used all your tokens for this period.",
              refillsAt,
            });
            // Also lock the UI via quotaInfo
            setQuotaInfo({
              status: "exhausted",
              plan: "free",
              used: 0,
              limit: 0,
              resets: errData.quota_refills_at,
            });
          }
        } catch (_) {
          console.error("Failed to fetch AI", response.status);
        }
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        stopTypingAnimation();
        setIsStreaming(false);
        return;
      }

      const decoder = new TextDecoder("utf-8");

      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          const waitForTyping = setInterval(() => {
            if (typingQueueRef.current.length === 0) {
              clearInterval(waitForTyping);
              stopTypingAnimation();

              //! #################

              setStreamingText((prev) => {
                const fullDate = new Date();
                const timestamp = fullDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const date = formatDateHeader(fullDate);

                useChatStore.getState().removeTypingIndicator();
                useChatStore.getState().addMessage({
                  id: `ai-${Date.now()}`,
                  text: prev,
                  isAi: true,
                  timestamp,
                  date,
                  fullDate,
                });

                // ── Extract quota from newly streamed message ──
                const q = extractQuota(prev);
                if (q) setQuotaInfo(q);
                // ─────────────────────────────────────────────

                queryClient.invalidateQueries({
                  queryKey: ["get-all-chat-history"],
                });
                return "";
              });

              //! #######################

              setIsStreaming(false);
            }
          }, 50);

          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const cleanedChunk = chunk.replace(/\\n/g, "\n");

        // ✅ Remove typing indicator when we get the first chunk
        if (isFirstChunk) {
          useChatStore.getState().removeTypingIndicator();
          isFirstChunk = false;
        }

        typingQueueRef.current += cleanedChunk;

        console.log(
          `📦 Received chunk: ${chunk.length} chars. Queue size: ${typingQueueRef.current.length}`,
        );
      }
    } catch (error) {
      console.error("Error in fetchAI:", error);
      stopTypingAnimation();
      setIsStreaming(false);

      const fullDate = new Date();
      const timestamp = fullDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = formatDateHeader(fullDate);

      useChatStore.getState().removeTypingIndicator();
      useChatStore.getState().addMessage({
        id: `error-${Date.now()}`,
        text: "Failed to get response. Please try again.",
        isAi: true,
        timestamp: timestamp,
        date: date,
        fullDate: fullDate,
      });

      queryClient.invalidateQueries({ queryKey: ["get-all-chat-history"] });
    }
  }

  //! Parse Markdown-style text and render it
  const renderFormattedText = (text: string) => {
    const elements: React.ReactNode[] = [];
    const lines = text.split("\n");

    lines.forEach((line, lineIndex) => {
      if (!line.trim()) {
        elements.push(
          <View key={`space-${lineIndex}`} style={{ height: 8 }} />,
        );
        return;
      }

      if (line.trim().startsWith("- ")) {
        const content = line.replace(/^-\s*/, "");
        const formatted = parseInlineFormatting(content);
        elements.push(
          <View
            key={lineIndex}
            style={{ flexDirection: "row", marginBottom: 4 }}
          >
            <Text style={{ color: "white", marginRight: 8, fontSize: 16 }}>
              •
            </Text>
            <Text
              style={{
                color: "black",
                flex: 1,
                fontSize: 16,
                fontFamily: "PoppinsRegular",
              }}
            >
              {formatted}
            </Text>
          </View>,
        );
      } else {
        const formatted = parseInlineFormatting(line);
        elements.push(
          <Text
            key={lineIndex}
            style={{
              color: "black",
              fontSize: 16,
              marginBottom: 4,
              fontFamily: "PoppinsRegular",
            }}
          >
            {formatted}
          </Text>,
        );
      }
    });

    return <>{elements}</>;
  };

  //! Parse inline formatting like **bold** and [links](urls)
  const parseInlineFormatting = (text: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    let currentIndex = 0;

    const regex = /(\*\*.*?\*\*)|(\[.*?\]\(.*?\))/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > currentIndex) {
        elements.push(text.substring(currentIndex, match.index));
      }

      const fullMatch = match[0];

      if (fullMatch.startsWith("**")) {
        const boldText = fullMatch.replace(/\*\*/g, "");
        elements.push(
          <Text
            key={match.index}
            style={{ fontFamily: "PoppinsSemiBold", color: "black" }}
          >
            {boldText}
          </Text>,
        );
      } else if (fullMatch.startsWith("[")) {
        const linkMatch = fullMatch.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          const linkText = linkMatch[1];
          const url = linkMatch[2];
          elements.push(
            <Text
              key={match.index}
              style={{
                color: "#0e48c7",
                textDecorationLine: "underline",
                fontFamily: "PoppinsSemiBold",
                fontSize: 16,
              }}
              onPress={() => Linking.openURL(url)}
            >
              {linkText}
            </Text>,
          );
        }
      }

      currentIndex = match.index + fullMatch.length;
    }

    if (currentIndex < text.length) {
      elements.push(text.substring(currentIndex));
    }

    return elements.length > 0 ? elements : [text];
  };

  // Handle action pill press - send as user message and trigger AI response
  const handleActionPress = async (messageId: string, action: string) => {
    const fullDate = new Date();
    const timestamp = fullDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = formatDateHeader(fullDate);

    // 1. Update message with selected action in store
    useChatStore.getState().updateMessageSelectedAction(messageId, action);

    // 2. Add user message
    useChatStore.getState().addMessage({
      id: `user-${Date.now()}`,
      text: action,
      isAi: false,
      timestamp,
      date,
      fullDate,
    });

    // 3. Add typing indicator
    useChatStore.getState().addMessage({
      id: "typing-indicator",
      text: "...",
      isAi: true,
      timestamp,
      date,
      fullDate,
    });

    // 4. Scroll to bottom
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
        setIsNearBottom(true);
      }
    }, 100);

    // 5. Reset fetch flag and trigger streaming response
    hasFetchedAIRef.current = false;
    lastMessageDetailRef.current = null;

    // 6. Set message payload to continue conversation
    const token = await AsyncStorage.getItem("token");
    const chatHistory = messages.map((msg) => ({
      role: msg.isAi ? "assistant" : "user",
      content: msg.text,
    }));

    setMessageDatail({
      messages: [
        ...chatHistory,
        {
          role: "user",
          content: action,
        },
      ],
    });
  };

  // Handle date picker submission
  const handleDateSubmit = async (
    messageId: string,
    payload: { date: string },
  ) => {
    const fullDate = new Date();
    const timestamp = fullDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = formatDateHeader(fullDate);

    useChatStore.getState().updateMessageSelectedDate(messageId, payload.date);

    useChatStore.getState().addMessage({
      id: `user-${Date.now()}`,
      text: payload.date,
      isAi: false,
      timestamp,
      date,
      fullDate,
    });

    useChatStore.getState().addMessage({
      id: "typing-indicator",
      text: "...",
      isAi: true,
      timestamp,
      date,
      fullDate,
    });

    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
        setIsNearBottom(true);
      }
    }, 100);

    hasFetchedAIRef.current = false;
    lastMessageDetailRef.current = null;

    const chatHistory = messages.map((msg) => ({
      role: msg.isAi ? "assistant" : "user",
      content: msg.text,
    }));

    setMessageDatail({
      messages: [
        ...chatHistory,
        {
          role: "user",
          content: payload.date,
        },
      ],
    });
  };

  // Handle cycle form submission
  const handleCycleSubmit = async (
    messageId: string,
    payload: { cycleData: string },
  ) => {
    const fullDate = new Date();
    const timestamp = fullDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = formatDateHeader(fullDate);

    useChatStore
      .getState()
      .updateMessageSelectedCycle(messageId, payload.cycleData);

    useChatStore.getState().addMessage({
      id: `user-${Date.now()}`,
      text: payload.cycleData,
      isAi: false,
      timestamp,
      date,
      fullDate,
    });

    useChatStore.getState().addMessage({
      id: "typing-indicator",
      text: "...",
      isAi: true,
      timestamp,
      date,
      fullDate,
    });

    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
        setIsNearBottom(true);
      }
    }, 100);

    hasFetchedAIRef.current = false;
    lastMessageDetailRef.current = null;

    const chatHistory = messages.map((msg) => ({
      role: msg.isAi ? "assistant" : "user",
      content: msg.text,
    }));

    setMessageDatail({
      messages: [
        ...chatHistory,
        {
          role: "user",
          content: payload.cycleData,
        },
      ],
    });
  };

  // Handle symptom form submission
  const handleSymptomSubmit = async (
    messageId: string,
    payload: { symptomData: string },
  ) => {
    const fullDate = new Date();
    const timestamp = fullDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = formatDateHeader(fullDate);

    useChatStore
      .getState()
      .updateMessageSelectedSymptom(messageId, payload.symptomData);

    useChatStore.getState().addMessage({
      id: `user-${Date.now()}`,
      text: payload.symptomData,
      isAi: false,
      timestamp,
      date,
      fullDate,
    });

    useChatStore.getState().addMessage({
      id: "typing-indicator",
      text: "...",
      isAi: true,
      timestamp,
      date,
      fullDate,
    });

    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
        setIsNearBottom(true);
      }
    }, 100);

    hasFetchedAIRef.current = false;
    lastMessageDetailRef.current = null;

    const chatHistory = messages.map((msg) => ({
      role: msg.isAi ? "assistant" : "user",
      content: msg.text,
    }));

    setMessageDatail({
      messages: [
        ...chatHistory,
        {
          role: "user",
          content: payload.symptomData,
        },
      ],
    });
  };

  // Handle widget submission
  const handleWidgetSubmit = (messageId: string) => (payload: any) => {
    const fullDate = new Date();
    const timestamp = fullDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = formatDateHeader(fullDate);

    useChatStore.getState().addMessage({
      id: `user-${Date.now()}`,
      text: JSON.stringify(payload),
      isAi: false,
      timestamp: timestamp,
      date: date,
      fullDate: fullDate,
    });

    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
        setIsNearBottom(true);
      }
    }, 100);
  };

  //! Render message content segments (text, actions, widgets)
  const renderMessageContent = (message: Message) => {
    const segments = parseMessage(message.text);

    // If no tags found, render all text directly (fallback for regular messages)
    if (segments.length === 0) {
      return renderFormattedText(message.text);
    }

    // Render segments sequentially
    return (
      <>
        {segments.map((segment, index) => {
          switch (segment.type) {
            case "text":
              return segment.content ? (
                <View className=" pb-2" key={index}>
                  {renderFormattedText(segment.content)}
                </View>
              ) : null;
            case "actions":
              return (
                <View
                  className="  overflow-hidden py-4"
                  key={index}
                  style={{ marginTop: 12 }}
                >
                  <ActionPills
                    actions={segment.options}
                    messageId={message.id}
                    selectedButton={message.selectedAction}
                    onPress={(action) => handleActionPress(message.id, action)}
                    // disabled={
                    //   message.id !== lastInteractiveMessageId ||
                    //   !!message.selectedAction
                    // }
                    disabled={
                      isQuotaExhausted || // <-- ADD
                      message.id !== lastInteractiveMessageId ||
                      !!message.selectedAction
                    }
                  />
                </View>
              );
            case "widget":
              return (
                <View
                  className="  overflow-hidden py-4"
                  key={index}
                  style={{ marginTop: 12, paddingVertical: 8 }}
                >
                  <InlineWidget
                    type={segment.name}
                    messageId={message.id}
                    selectedDate={selectedDate}
                    durationData={durationData}
                    initialDate={message.initialDate}
                    initialCycle={message.initialCycle}
                    initialSymptom={message.initialSymptom}
                    handleDurationBottomSheetOpen={
                      message.id !== lastInteractiveMessageId
                        ? undefined
                        : handleDurationBottomSheetOpen
                    }
                    handleDateBottomSheetOpen={
                      message.id !== lastInteractiveMessageId
                        ? undefined
                        : handleDateBottomSheetOpen
                    }
                    onSubmit={
                      segment.name === "date_picker"
                        ? (payload) => handleDateSubmit(message.id, payload)
                        : segment.name === "cycle_form"
                          ? (payload) => handleCycleSubmit(message.id, payload)
                          : segment.name === "symptom_form"
                            ? (payload) =>
                                handleSymptomSubmit(message.id, payload)
                            : handleWidgetSubmit(message.id)
                    }
                    submitted={
                      message.id !== lastInteractiveMessageId ||
                      !!message.selectedDate ||
                      !!message.selectedCycle ||
                      !!message.selectedSymptom
                    }
                    // disabled={
                    //   message.id !== lastInteractiveMessageId ||
                    //   !!message.selectedDate ||
                    //   !!message.selectedCycle ||
                    //   !!message.selectedSymptom
                    // }
                    disabled={
                      isQuotaExhausted || // <-- ADD
                      message.id !== lastInteractiveMessageId ||
                      !!message.selectedDate ||
                      !!message.selectedCycle ||
                      !!message.selectedSymptom
                    }
                  />
                </View>
              );
            default:
              return null;
          }
        })}
        {/* Fallback: render widget from message metadata if no widget segment found */}
        {message.widget && !segments.some((s) => s.type === "widget") && (
          <View style={{ marginTop: 12 }}>
            <InlineWidget
              type={message.widget}
              messageId={message.id}
              selectedDate={selectedDate}
              durationData={durationData}
              initialDate={message.initialDate}
              initialCycle={message.initialCycle}
              initialSymptom={message.initialSymptom}
              handleDurationBottomSheetOpen={
                message.id !== lastInteractiveMessageId
                  ? undefined
                  : handleDurationBottomSheetOpen
              }
              handleDateBottomSheetOpen={
                message.id !== lastInteractiveMessageId
                  ? undefined
                  : handleDateBottomSheetOpen
              }
              onSubmit={
                message.widget === "date_picker"
                  ? (payload) => handleDateSubmit(message.id, payload)
                  : message.widget === "cycle_form"
                    ? (payload) => handleCycleSubmit(message.id, payload)
                    : message.widget === "symptom_form"
                      ? (payload) => handleSymptomSubmit(message.id, payload)
                      : handleWidgetSubmit(message.id)
              }
              submitted={
                isQuotaExhausted ||
                message.id !== lastInteractiveMessageId ||
                !!message.selectedDate ||
                !!message.selectedCycle ||
                !!message.selectedSymptom
              }
              disabled={
                isQuotaExhausted ||
                message.id !== lastInteractiveMessageId ||
                !!message.selectedDate ||
                !!message.selectedCycle ||
                !!message.selectedSymptom
              }
            />
          </View>
        )}
      </>
    );
  };

  // ✅ FIXED: Only fetch AI response once per message
  useEffect(() => {
    const messageDetailString = JSON.stringify(messageDatail);
    const lastMessageString = JSON.stringify(lastMessageDetailRef.current);

    if (
      messageDatail &&
      messageDetailString !== lastMessageString &&
      !hasFetchedAIRef.current
    ) {
      console.log("Fetching AI response for new message detail");
      hasFetchedAIRef.current = true;
      lastMessageDetailRef.current = messageDatail;
      fetchAI();
    }
  }, [messageDatail]);

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
    prevMsg: Message | null,
  ): boolean => {
    if (!prevMsg) return true;

    const currentDate = new Date(currentMsg.fullDate);
    const prevDate = new Date(prevMsg.fullDate);
    currentDate.setHours(0, 0, 0, 0);
    prevDate.setHours(0, 0, 0, 0);

    return currentDate.getTime() !== prevDate.getTime();
  };

  //! Format system payload for user display
  // const formatUserMessageForDisplay = (text: string): string => {
  //   let formatted = stripSelectionTag(text);

  //   if (formatted.startsWith("[SYSTEM_PAYLOAD:")) {
  //     formatted = formatted
  //       .replace("[SYSTEM_PAYLOAD: FORM_SUBMITTED | ", "")
  //       .replace("]", "")
  //       .replace("type: ", "");
  //   }
  //   return formatted;
  // };

  //! ######################
  const formatUserMessageForDisplay = (text: string): string => {
    let formatted = stripSelectionTag(text);
    formatted = stripQuotaTag(formatted); // <-- ADD THIS LINE
    if (formatted.startsWith("[SYSTEM_PAYLOAD:")) {
      formatted = formatted
        .replace("[SYSTEM_PAYLOAD: FORM_SUBMITTED | ", "")
        .replace("]", "")
        .replace("type: ", "");
    }
    return formatted;
  };
  //! ########################

  // ✅ Transform server data from getAllChatAiHistory to message format
  useEffect(() => {
    let isMounted = true;

    useChatStore.getState().clearMessages();

    if (
      getAllChatAiHistory.data?.messages &&
      Array.isArray(getAllChatAiHistory.data.messages)
    ) {
      const serverMessages = getAllChatAiHistory.data.messages;

      const transformedMessages: Message[] = serverMessages.map((msg: any) => {
        const fullDate = new Date(msg.created_at);
        const timestamp = fullDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const date = formatDateHeader(fullDate);
        const selectedAction = extractSelection(msg.content);

        const rawSelection = extractSelection(msg.content);
        let selectedDate: string | undefined;
        let selectedCycle: string | undefined;
        let selectedSymptom: string | undefined;
        let initialDate: string | undefined;
        let initialCycle: CyclePayload | undefined;
        let initialSymptom: SymptomPayload | undefined;

        if (rawSelection) {
          const parsed = parseWidgetSelection(rawSelection);
          if (parsed) {
            switch (parsed.widgetType) {
              case "date_picker":
                initialDate = parsed.payload as string;
                selectedDate = parsed.payload as string;
                break;
              case "cycle_form":
                initialCycle = parsed.payload as CyclePayload;
                selectedCycle = rawSelection;
                break;
              case "symptom_form":
                initialSymptom = parsed.payload as SymptomPayload;
                selectedSymptom = rawSelection;
                break;
            }
          }
        }

        return {
          id: msg.id,
          text: msg.content,
          isAi: msg.role === "assistant",
          timestamp: timestamp,
          date: date,
          fullDate: fullDate,
          selectedAction,
          selectedDate,
          selectedCycle,
          selectedSymptom,
          initialDate,
          initialCycle,
          initialSymptom,
        };
      });

      const quotaMessages = serverMessages.filter(
        (msg: any) =>
          msg.role === "assistant" && msg.content?.includes("<<QUOTA:"),
      );
      // Server messages are returned newest‑first, so the first match is the newest quota.
      const quotaMsg = quotaMessages.length ? quotaMessages[0] : undefined;
      if (quotaMsg) {
        const q = extractQuota(quotaMsg.content);
        if (q) setQuotaInfo(q);
      }

      transformedMessages.sort(
        (a, b) => a.fullDate.getTime() - b.fullDate.getTime(),
      );

      useChatStore.getState().setMessages(transformedMessages);

      if (isMounted && transformedMessages.length > 0 && !hasLoadedInitially) {
        setHasLoadedInitially(true);
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (isMounted && scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({ animated: false });
              setIsNearBottom(true);
            }
          }, 150);
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [getAllChatAiHistory.data]);

  // ✅ Check if user is near the bottom and show/hide scroll button
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 50;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;

    setIsNearBottom(isAtBottom);
    setShowScrollButton(!isAtBottom && messages.length > 0);
  };

  const handleSend = async () => {
    setQuotaError(null);
    if (message.trim() && !isStreaming) {
      const userMessageText = message.trim();
      const fullDate = new Date();
      const timestamp = fullDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = formatDateHeader(fullDate);

      const newMessage: Message = {
        id: `temp-${Date.now()}`,
        text: userMessageText,
        isAi: false,
        timestamp: timestamp,
        date: date,
        fullDate: fullDate,
      };

      const typingMessage: Message = {
        id: "typing-indicator",
        text: "...",
        isAi: true,
        timestamp: timestamp,
        date: date,
        fullDate: fullDate,
      };

      useChatStore.getState().addMessage(newMessage);
      useChatStore.getState().addMessage(typingMessage);
      setMessage("");
      setStreamingText("");

      // ✅ Reset fetch flag for new message
      hasFetchedAIRef.current = false;

      // ✅ Set the message payload that fetchAI will send to the backend
      setMessageDatail({
        messages: [
          {
            role: "user",
            content: userMessageText,
          },
        ],
      });

      requestAnimationFrame(() => {
        setTimeout(() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
            setIsNearBottom(true);
          }
        }, 100);
      });

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
            <View
              className="rounded-2xl rounded-tl-none overflow-hidden"
              style={{ maxWidth: bubbleMaxWidth }}
            >
              {item.id === "typing-indicator" ? (
                <View className="flex-row space-x-1 py-1 items-center">
                  <TypingDots />
                </View>
              ) : (
                // <LinearGradient
                //   colors={["#853385", "#9F3E83"]}
                //   start={{ x: 0, y: 0 }}
                //   end={{ x: 1, y: 1 }}
                //   style={{ padding: 16 }}
                // >
                //   {renderMessageContent(item)}
                // </LinearGradient>
                <View
                  className="p-4  rounded-2xl bg-secondary border border-[#FBC3F8] "
                  style={{ maxWidth: bubbleMaxWidth }}
                >
                  <Text className="text-base font-[PoppinsRegular]">
                    {renderMessageContent(item)}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            // <View
            //   className="px-4 py-3 rounded-2xl bg-secondary border border-[#FBC3F8] rounded-tr-none"
            //   style={{ maxWidth: bubbleMaxWidth }}
            // >
            // <Text className="text-base font-[PoppinsRegular] text-titleText">
            //   {item.text}
            // </Text>
            // </View>
            <LinearGradient
              colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderRadius: 16,
                borderTopRightRadius: 4,
              }}
            >
              <Text className="text-base text-white font-[PoppinsRegular]">
                {formatUserMessageForDisplay(item.text)}
              </Text>
            </LinearGradient>
          )}

          <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
            {item.timestamp}
          </Text>
        </View>
      </>
    );
  };

  const isLoadingHistory = getAllChatAiHistory.isLoading;
  const isErrorHistory = getAllChatAiHistory.isError;

  return (
    <Screen className="bg-white">
      <ImageBackground
        source={require("@/assets/images/AI.png")}
        style={{ height: "100%", width: "100%" }}
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
                  style={{ width: "100%", height: "100%", borderRadius: 100 }}
                  contentFit="contain"
                />
              </View>
            </View>

            {/* Loading State */}
            {isLoadingHistory && (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#000" />
                <Text className="mt-2 text-gray-500 font-[PoppinsRegular]">
                  Loading chat history...
                </Text>
              </View>
            )}

            {/* Error State */}
            {isErrorHistory && !isLoadingHistory && (
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

            {/* Messages ScrollView */}
            {!isLoadingHistory && !isErrorHistory && (
              <View style={{ flex: 1, position: "relative" }}>
                <ScrollView
                  ref={scrollViewRef}
                  contentContainerStyle={{
                    paddingVertical: 16,
                    paddingHorizontal: horizontalPadding,
                    flexGrow: 1,
                  }}
                  style={{ flex: 1 }}
                  showsVerticalScrollIndicator={false}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                >
                  {messages.length === 0 && !isStreaming ? (
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
                  ) : (
                    <>
                      {messages.map((item, index) => (
                        <View key={item.id}>
                          {renderMessage({ item, index })}
                        </View>
                      ))}

                      {/* ✅ Streaming text with typing animation */}
                      {isStreaming && streamingText && (
                        <View className="mb-4 items-start">
                          <View
                            className="rounded-2xl p-4 rounded-tl-none overflow-hidden bg-secondary border border-[#FBC3F8]"
                            style={{ maxWidth: bubbleMaxWidth }}
                          >
                            {/* <LinearGradient
                              colors={[
                                "#6B5591",
                                "#6E3F8C",
                                "#853385",
                                "#9F3E83",
                              ]}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 1 }}
                              style={{ padding: 16 }}
                            > */}
                            {renderFormattedText(streamingText)}
                            <Text style={{ color: "black", fontSize: 16 }}>
                              ▌
                            </Text>
                            {/* </LinearGradient> */}
                          </View>
                          <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
                            {new Date().toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Text>
                        </View>
                      )}

                      {/* Quota exceeded error bubble */}
                      {quotaError && (
                        <View className="mb-4 items-start">
                          <View
                            style={{
                              maxWidth: bubbleMaxWidth,
                              backgroundColor: "#FFF7ED",
                              borderRadius: 16,
                              borderTopLeftRadius: 4,
                              borderWidth: 1,
                              borderColor: "#FED7AA",
                              padding: 16,
                            }}
                          >
                            {/* Header row */}
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 8,
                              }}
                            >
                              <Text style={{ fontSize: 18, marginRight: 8 }}>
                                ⏳
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "PoppinsSemiBold",
                                  fontSize: 14,
                                  color: "#C2410C",
                                }}
                              >
                                Daily limit reached
                              </Text>
                            </View>

                            {/* Message */}
                            <Text
                              style={{
                                fontFamily: "PoppinsRegular",
                                fontSize: 13,
                                color: "#9A3412",
                                lineHeight: 20,
                                marginBottom: 10,
                              }}
                            >
                              {`You've used all your messages for today. Your
                              quota refreshes at`}
                              <Text style={{ fontFamily: "PoppinsSemiBold" }}>
                                {quotaError.refillsAt}
                              </Text>
                              .
                            </Text>

                            {/* Upgrade nudge */}
                            <TouchableOpacity
                              onPress={() =>
                                router.push(
                                  "/(tabs)/homepage/profilepage/paywall-screen" as any,
                                )
                              }
                              style={{
                                backgroundColor: "#EA580C",
                                borderRadius: 10,
                                paddingVertical: 9,
                                paddingHorizontal: 16,
                                alignSelf: "flex-start",
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "PoppinsSemiBold",
                                  fontSize: 13,
                                  color: "#fff",
                                }}
                              >
                                Upgrade for unlimited access →
                              </Text>
                            </TouchableOpacity>
                          </View>

                          <Text
                            style={{
                              fontSize: 11,
                              color: "#9ca3af",
                              marginTop: 4,
                              paddingHorizontal: 8,
                              fontFamily: "PoppinsRegular",
                            }}
                          >
                            {new Date().toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                </ScrollView>

                {/* ✅ Scroll to Bottom Button */}
                {showScrollButton && (
                  <Animated.View
                    style={{
                      position: "absolute",
                      bottom: 16,
                      right: horizontalPadding,
                      opacity: scrollButtonOpacity,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        scrollToBottom(true);
                        setIsNearBottom(true);
                      }}
                      className="bg-white rounded-full shadow-lg p-3 border border-gray-200"
                      style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >
                      <MaterialIcons
                        name="keyboard-arrow-down"
                        size={28}
                        color="#6B5591"
                      />
                    </TouchableOpacity>
                  </Animated.View>
                )}
              </View>
            )}

            {/* Quota Banner */}
            {isQuotaExhausted && quotaInfo && (
              <View
                style={{
                  paddingHorizontal: horizontalPadding,
                  paddingBottom: 4,
                }}
              >
                <QuotaBanner info={quotaInfo} />
              </View>
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
                    // editable={!isLoadingHistory && !isStreaming}
                    editable={
                      !isLoadingHistory && !isStreaming && !isQuotaExhausted
                    } // <-- ADD !isQuotaExhausted
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSend}
                  // disabled={!message.trim() || isLoadingHistory || isStreaming}
                  disabled={
                    !message.trim() ||
                    isLoadingHistory ||
                    isStreaming ||
                    isQuotaExhausted
                  } // <-- ADD || isQuotaExhausted
                  className={`w-12 h-12 rounded-full items-center justify-center ${
                    message.trim() && !isLoadingHistory && !isStreaming
                      ? "bg-primaryLight"
                      : "bg-[#F4EBFF]"
                  }`}
                >
                  {isStreaming ? (
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

      <BottomSheetScreen
        snapPoints={snapPoints}
        ref={datebottomSheetRef}
        isBackdropComponent={true}
        enablePanDownToClose={true}
        index={-1}
        message={
          <StartDateBottomSheet
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleDateBottomSheetClose={handleDateBottomSheetClose}
          />
        }
      />

      <BottomSheetScreen
        snapPoints={snapPoints}
        ref={durationBottomSheetRef}
        isBackdropComponent={true}
        enablePanDownToClose={true}
        index={-1}
        message={
          <Duration
            handleDurationBottomSheetClose={handleDurationBottomSheetClose}
            durationData={durationData}
            setDurationData={setDurationData}
          />
        }
      />
    </Screen>
  );
};

export default ChatWithAi;
