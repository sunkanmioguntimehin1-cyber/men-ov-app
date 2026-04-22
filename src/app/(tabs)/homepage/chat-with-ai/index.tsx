import { useGetAllChatAiHistory } from "@/src/api_services/chatApi/chatQuery";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
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
import useChatStore from "@/src/store/chatStore";
import {
  QuotaInfo,
  extractQuota,
  extractSelection,
  parseMessage,
  parseWidgetSelection,
} from "@/src/widgets/messageParser";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  AppState,
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
import { Message, ChatMessageDetail, CyclePayload, SymptomPayload } from "./types";
import { useChatStream } from "./hooks/useChatStream";
import { useChatActions } from "./hooks/useChatActions";
import { MessageBubble } from "./components/MessageBubble";
import { formatUserMessageForDisplay } from "./utils/formatUserMessage";
import { renderFormattedText, parseInlineFormatting } from "./utils/parseMessage";

const ChatWithAi = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [messageDatail, setMessageDatail] = useState<ChatMessageDetail | null>(null);
  const { messages } = useChatStore();
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [quotaInfo, setQuotaInfo] = React.useState<QuotaInfo | null>(null);
  const [hasLoadedInitially, setHasLoadedInitially] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | undefined>(undefined);
  const [durationData, setDurationData] = React.useState("");
  const [selectedSymptomDate, setSelectedSymptomDate] = React.useState(null);
  const [quotaError, setQuotaError] = React.useState<{
    message: string;
    refillsAt: string;
  } | null>(null);

  const getUserData = useGetUser();
  const chatfrozen = getUserData?.data?.chatConfig?.frozenAt;
  const chatResetAt = getUserData?.data?.chatConfig?.resetAt;

  const isQuotaReset = React.useMemo(() => {
    if (!quotaInfo?.resets) return false;
    const resetTime = new Date(quotaInfo.resets).getTime();
    const now = Date.now();
    return now >= resetTime;
  }, [quotaInfo?.resets]);

  const isQuotaExhausted = quotaInfo?.status === "exhausted" && !isQuotaReset;

  React.useEffect(() => {
    if (!chatfrozen) {
      getUserData.refetch();
    }
  }, [chatfrozen, chatResetAt, getUserData]);

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

  const scrollButtonOpacity = useRef(new Animated.Value(0)).current;
  const appState = useRef(AppState.currentState);

  const getAllChatAiHistory = useGetAllChatAiHistory();
  const scrollViewRef = useRef<ScrollView>(null as unknown as ScrollView);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

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

  const onQuotaError = (error: { message: string; refillsAt: string }) => {
    setQuotaError(error);
  };

  const {
    streamingText,
    setStreamingText,
    isStreaming,
    fetchAI,
    stopTypingAnimation,
    hasFetchedAIRef,
    lastMessageDetailRef,
  } = useChatStream(onQuotaError, setQuotaInfo);

  const { handleActionPress, handleDateSubmit, handleCycleSubmit, handleSymptomSubmit, handleWidgetSubmit } =
    useChatActions({
      scrollViewRef,
      messages,
      setIsNearBottom,
      setMessageDatail,
    });

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

  const scrollToBottom = (animated: boolean = false) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated });
      }, 100);
    });
  };

  useEffect(() => {
    Animated.timing(scrollButtonOpacity, {
      toValue: showScrollButton ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showScrollButton]);

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
    return () => {
      stopTypingAnimation();
    };
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 50;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;

    setIsNearBottom(isAtBottom);
    setShowScrollButton(!isAtBottom && messages.length > 0);
  };

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
      fetchAI(messageDatail);
    }
  }, [messageDatail, fetchAI]);

  const containerMaxWidth = Math.min(width, 900);
  const horizontalPadding = width >= 1024 ? 32 : width >= 768 ? 24 : 16;
  const contentWidth = containerMaxWidth - horizontalPadding * 2;
  const bubbleMaxWidth = Math.min(640, contentWidth * 0.9);

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

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const messageDate = new Date(fullDate);
        messageDate.setHours(0, 0, 0, 0);
        const todaySet = new Date(today);
        todaySet.setHours(0, 0, 0, 0);
        const yesterdaySet = new Date(yesterday);
        yesterdaySet.setHours(0, 0, 0, 0);

        let date: string;
        if (messageDate.getTime() === todaySet.getTime()) {
          date = "Today";
        } else if (messageDate.getTime() === yesterdaySet.getTime()) {
          date = "Yesterday";
        } else {
          date = messageDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }

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
          timestamp,
          date,
          fullDate,
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

  const handleSend = async () => {
    setQuotaError(null);
    if (message.trim() && !isStreaming) {
      const userMessageText = message.trim();
      const fullDate = new Date();
      const timestamp = fullDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const messageDate = new Date(fullDate);
      messageDate.setHours(0, 0, 0, 0);
      const todaySet = new Date(today);
      todaySet.setHours(0, 0, 0, 0);
      const yesterdaySet = new Date(yesterday);
      yesterdaySet.setHours(0, 0, 0, 0);

      let date: string;
      if (messageDate.getTime() === todaySet.getTime()) {
        date = "Today";
      } else if (messageDate.getTime() === yesterdaySet.getTime()) {
        date = "Yesterday";
      } else {
        date = messageDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }

      const newMessage: Message = {
        id: `temp-${Date.now()}`,
        text: userMessageText,
        isAi: false,
        timestamp,
        date,
        fullDate,
      };

      const typingMessage: Message = {
        id: "typing-indicator",
        text: "...",
        isAi: true,
        timestamp,
        date,
        fullDate,
      };

      useChatStore.getState().addMessage(newMessage);
      useChatStore.getState().addMessage(typingMessage);
      setMessage("");
      setStreamingText("");

      hasFetchedAIRef.current = false;

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
    }
  };

  const renderMessageContent = (message: Message) => {
    const segments = parseMessage(message.text);

    if (segments.length === 0) {
      return renderFormattedText(message.text);
    }

    return (
      <>
        {segments.map((segment, index) => {
          switch (segment.type) {
            case "text":
              return segment.content ? (
                <View className="pb-2" key={index}>
                  {renderFormattedText(segment.content)}
                </View>
              ) : null;
            case "actions":
              return (
                <View
                  className="overflow-hidden py-4"
                  key={index}
                  style={{ marginTop: 12 }}
                >
                  <ActionPills
                    actions={segment.options}
                    messageId={message.id}
                    selectedButton={message.selectedAction}
                    onPress={(action) => handleActionPress(message.id, action)}
                    disabled={
                      isQuotaExhausted ||
                      message.id !== lastInteractiveMessageId ||
                      !!message.selectedAction
                    }
                  />
                </View>
              );
            case "widget":
              return (
                <View
                  className="overflow-hidden py-4"
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
                            ? (payload) => handleSymptomSubmit(message.id, payload)
                            : (payload: any) => handleWidgetSubmit(message.id, payload)
                    }
                    submitted={
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
              );
            default:
              return null;
          }
        })}
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
                      : (payload: any) => handleWidgetSubmit(message.id, payload)
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

  const renderMessage = ({ item, index }: { item: Message; index: number }) => (
    <MessageBubble
      item={item}
      index={index}
      messages={messages}
      bubbleMaxWidth={bubbleMaxWidth}
      renderMessageContent={renderMessageContent}
    />
  );

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

            {isLoadingHistory && (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#000" />
                <Text className="mt-2 text-gray-500 font-[PoppinsRegular]">
                  Loading chat history...
                </Text>
              </View>
            )}

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

                      {isStreaming && streamingText && (
                        <View className="mb-4 items-start">
                          <View
                            className="rounded-2xl p-4 rounded-tl-none overflow-hidden bg-secondary border border-[#FBC3F8]"
                            style={{ maxWidth: bubbleMaxWidth }}
                          >
                            {renderFormattedText(streamingText)}
                            <Text style={{ color: "black", fontSize: 16 }}>▌</Text>
                          </View>
                          <Text className="text-xs text-gray-400 mt-1 px-2 font-[PoppinsRegular]">
                            {new Date().toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Text>
                        </View>
                      )}

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
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 8,
                              }}
                            >
                              <Text style={{ fontSize: 18, marginRight: 8 }}>⏳</Text>
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

                            <Text
                              style={{
                                fontFamily: "PoppinsRegular",
                                fontSize: 13,
                                color: "#9A3412",
                                lineHeight: 20,
                                marginBottom: 10,
                              }}
                            >
                              {`You've used all your messages for today. Your quota refreshes at`}
                              <Text style={{ fontFamily: "PoppinsSemiBold" }}>
                                {quotaError.refillsAt}
                              </Text>
                              .
                            </Text>

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

            {chatfrozen && (
              <View
                style={{
                  paddingHorizontal: horizontalPadding,
                  paddingBottom: 4,
                }}
              >
                <QuotaBanner info={chatResetAt} />
              </View>
            )}

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
                    onChangeText={(text) => setMessage(text || "")}
                    primary
                    returnKeyType="send"
                    onSubmitEditing={handleSend}
                    autoCapitalize="sentences"
                    editable={!isLoadingHistory && !isStreaming && !chatfrozen}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSend}
                  disabled={
                    !message.trim() ||
                    isLoadingHistory ||
                    isStreaming ||
                    chatfrozen
                  }
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