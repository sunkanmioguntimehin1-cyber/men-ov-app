import {
  useTalkToChatAi,
  useTalkToChatAiwithStream,
} from "@/src/api_services/chatApi/chatMutation";
import {
  useGetChatHistory,
  useGetSessionWithAiStream,
} from "@/src/api_services/chatApi/chatQuery";
import CustomInput from "@/src/custom-components/CustomInput";
import { GradientMaterialIcon } from "@/src/custom-components/GradientIcon";
import { TypingDots } from "@/src/custom-components/TypingDots";
import Screen from "@/src/layout/Screen";
import useChatStore from "@/src/store/chatStore";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { fetch } from "expo/fetch";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
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
import Linking from "react-native/Libraries/Linking/Linking";

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: string;
  date: string;
  fullDate: Date;
}

const STREAMING_BASE_URL = process.env.EXPO_PUBLIC_STREAMING_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const ChatWithAi = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [messageDatail, setMessageDatail] = useState<any>(null);
  const { messages, setMessages, addMessage } = useChatStore();
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [hasLoadedInitially, setHasLoadedInitially] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // ✅ Separate streaming state with typing animation
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // ✅ Typing animation state
  const typingQueueRef = useRef<string>("");
  const isTypingRef = useRef(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Animated value for scroll button
  const scrollButtonOpacity = useRef(new Animated.Value(0)).current;

  const sendtalkToChatAi = useTalkToChatAiwithStream();
  const getSessionWithAi = useGetSessionWithAiStream(chatMessage);
  const getChatHistory = useGetChatHistory();
  const { data: chatData, isLoading, isError, error } = getChatHistory;
  const sendMessage = useTalkToChatAi();

  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

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

  useEffect(() => {
    if (chatMessage) {
      getSessionWithAi.refetch();
    }
  }, [chatMessage]);

  useEffect(() => {
    if (getSessionWithAi.isSuccess) {
      setMessageDatail(getSessionWithAi.data);
    }
  }, [getSessionWithAi.data]);

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

      useChatStore.getState().removeTypingIndicator();

      startTypingAnimation();

      const response = await fetch(`${STREAMING_BASE_URL}/api/v1/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY || "",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageDatail),
      });

      if (!response.ok) {
        console.error("Failed to fetch AI", response);
        stopTypingAnimation();
        setIsStreaming(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        stopTypingAnimation();
        setIsStreaming(false);
        return;
      }

      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          const waitForTyping = setInterval(() => {
            if (typingQueueRef.current.length === 0) {
              clearInterval(waitForTyping);
              stopTypingAnimation();

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

                return "";
              });

              setIsStreaming(false);
            }
          }, 50);

          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const cleanedChunk = chunk.replace(/\\n/g, "\n");

        typingQueueRef.current += cleanedChunk;

        console.log(
          `📦 Received chunk: ${chunk.length} chars. Queue size: ${typingQueueRef.current.length}`
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
    }
  }

  // Parse Markdown-style text and render it
  const renderFormattedText = (text: string) => {
    const elements: React.ReactNode[] = [];
    const lines = text.split("\n");

    lines.forEach((line, lineIndex) => {
      if (!line.trim()) {
        elements.push(
          <View key={`space-${lineIndex}`} style={{ height: 8 }} />
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
                color: "white",
                flex: 1,
                fontSize: 16,
                fontFamily: "PoppinsRegular",
              }}
            >
              {formatted}
            </Text>
          </View>
        );
      } else {
        const formatted = parseInlineFormatting(line);
        elements.push(
          <Text
            key={lineIndex}
            style={{
              color: "white",
              fontSize: 16,
              marginBottom: 4,
              fontFamily: "PoppinsRegular",
            }}
          >
            {formatted}
          </Text>
        );
      }
    });

    return <>{elements}</>;
  };

  // Parse inline formatting like **bold** and [links](urls)
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
            style={{ fontFamily: "PoppinsSemiBold", color: "white" }}
          >
            {boldText}
          </Text>
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
                color: "#ADD8E6",
                textDecorationLine: "underline",
                fontFamily: "PoppinsRegular",
              }}
              onPress={() => Linking.openURL(url)}
            >
              {linkText}
            </Text>
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

  useEffect(() => {
    if (messageDatail) {
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
    prevMsg: Message | null
  ): boolean => {
    if (!prevMsg) return true;

    const currentDate = new Date(currentMsg.fullDate);
    const prevDate = new Date(prevMsg.fullDate);
    currentDate.setHours(0, 0, 0, 0);
    prevDate.setHours(0, 0, 0, 0);

    return currentDate.getTime() !== prevDate.getTime();
  };

  // ✅ Transform server data to message format - improved with auto-scroll
  useEffect(() => {
    let isMounted = true;

    if (chatData?.data && Array.isArray(chatData.data)) {
      const currentMessages = useChatStore.getState().messages;
      const existingIds = new Set(currentMessages.map((m) => m.id));

      let hasNewMessages = false;

      chatData.data.forEach((item: any) => {
        const userMsgId = `${item.id}-user`;
        const aiMsgId = `${item.id}-ai`;

        if (!existingIds.has(userMsgId)) {
          hasNewMessages = true;
          const fullDate = new Date(item.createdAt);
          const timestamp = fullDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const date = formatDateHeader(fullDate);

          useChatStore.getState().addMessage({
            id: userMsgId,
            text: item.message,
            isAi: false,
            timestamp: timestamp,
            date: date,
            fullDate: fullDate,
          });

          useChatStore.getState().addMessage({
            id: aiMsgId,
            text: item.reply,
            isAi: true,
            timestamp: timestamp,
            date: date,
            fullDate: fullDate,
          });
        }
      });

      // ✅ Scroll to bottom after loading chat history - with race condition fix
      if (isMounted && (hasNewMessages || !hasLoadedInitially)) {
        setHasLoadedInitially(true);
        requestAnimationFrame(() => {
          const timer = setTimeout(() => {
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
  }, [chatData]);

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

  // Handle successful AI response (for non-streaming API)
  useEffect(() => {
    let isMounted = true;

    if (sendMessage.isSuccess && sendMessage.data) {
      const fullDate = new Date();
      const timestamp = fullDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = formatDateHeader(fullDate);

      useChatStore.getState().removeTypingIndicator();

      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        text:
          sendMessage.data.reply ||
          sendMessage.data.data?.reply ||
          "No response",
        isAi: true,
        timestamp: timestamp,
        date: date,
        fullDate: fullDate,
      };

      useChatStore.getState().addMessage(aiResponse);

      if (isMounted && isNearBottom) {
        const timer = setTimeout(() => {
          if (isMounted && scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
        }, 100);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [sendMessage.isSuccess, sendMessage.data]);

  // Handle error
  useEffect(() => {
    if (sendMessage.isError) {
      useChatStore.getState().removeTypingIndicator();

      const fullDate = new Date();
      const timestamp = fullDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const date = formatDateHeader(fullDate);

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Failed to send message. Please try again.",
        isAi: true,
        timestamp: timestamp,
        date: date,
        fullDate: fullDate,
      };

      useChatStore.getState().addMessage(errorMessage);
    }
  }, [sendMessage.isError]);

  const handleSend = async () => {
    if (message.trim() && !sendMessage.isPending && !isStreaming) {
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

      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        const timer = setTimeout(() => {
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
                <LinearGradient
                  colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ padding: 16 }}
                >
                  {renderFormattedText(item.text)}
                </LinearGradient>
              )}
            </View>
          ) : (
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

            {/* Messages ScrollView */}
            {!isLoading && !isError && (
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
                            className="rounded-2xl rounded-tl-none overflow-hidden"
                            style={{ maxWidth: bubbleMaxWidth }}
                          >
                            <LinearGradient
                              colors={[
                                "#6B5591",
                                "#6E3F8C",
                                "#853385",
                                "#9F3E83",
                              ]}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 1 }}
                              style={{ padding: 16 }}
                            >
                              {renderFormattedText(streamingText)}
                              <Text style={{ color: "white", fontSize: 16 }}>
                                ▌
                              </Text>
                            </LinearGradient>
                          </View>
                          <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
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
                    editable={
                      !isLoading && !sendMessage.isPending && !isStreaming
                    }
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSend}
                  disabled={
                    !message.trim() ||
                    isLoading ||
                    sendMessage.isPending ||
                    isStreaming
                  }
                  className={`w-12 h-12 rounded-full items-center justify-center ${
                    message.trim() &&
                    !isLoading &&
                    !sendMessage.isPending &&
                    !isStreaming
                      ? "bg-primaryLight"
                      : "bg-[#F4EBFF]"
                  }`}
                >
                  {sendMessage.isPending || isStreaming ? (
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
