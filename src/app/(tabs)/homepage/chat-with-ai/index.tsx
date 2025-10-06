

import CustomInput from "@/src/custom-components/CustomInput";
import Screen from "@/src/layout/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Message {
  id: number;
  text: string;
  isAi: boolean;
  timestamp: string;
}

const ChatWithAi = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. How can I help you today?",
      isAi: true,
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      text: "Hello! I need help with my productivity.",
      isAi: false,
      timestamp: "10:31 AM",
    },
    {
      id: 3,
      text: "I'd be happy to help you with productivity! Here are some tips:\n\n1. Break tasks into smaller chunks\n2. Use the Pomodoro technique\n3. Minimize distractions\n\nWhat specific area would you like to focus on?",
      isAi: true,
      timestamp: "10:31 AM",
    },
  ]);

  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Responsive layout measurements
  const containerMaxWidth = Math.min(width, 900);
  const horizontalPadding = width >= 1024 ? 32 : width >= 768 ? 24 : 16;
  const contentWidth = containerMaxWidth - horizontalPadding * 2;
  const bubbleMaxWidth = Math.min(640, contentWidth * 0.9);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message.trim(),
        isAi: false,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages([...messages, newMessage]);
      setMessage("");

      // Scroll to bottom after sending
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: "Thanks for your message! I'm processing your request...",
          isAi: true,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiResponse]);

        // Scroll to bottom after AI response
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 1000);
    }
  };

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
        <Text
          className={`text-base font-[PoppinsRegular] ${
            item.isAi ? "text-titleText" : "text-white"
          }`}
        >
          {item.text}
        </Text>
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

          {/* Messages List */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              paddingVertical: 16,
              paddingHorizontal: horizontalPadding,
              flexGrow: 1,
            }}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          {/* Input Area */}
          <View
            className="border-t  border-[#EAEAEA] bg-white"
            style={{
              paddingTop: 8,
              paddingHorizontal: horizontalPadding,
              paddingBottom:
                Platform.OS === "ios" ? insets.bottom + 8 : insets.bottom + 6,
            }}
          >
            <View className="  flex-row items-center space-x-2">
              <View className="flex-1">
                <CustomInput
                  placeholder="Type a message..."
                  value={message}
                  onChangeText={setMessage}
                  primary
                  returnKeyType="send"
                  onSubmitEditing={handleSend}
                  autoCapitalize="sentences"
                />
              </View>
              <TouchableOpacity
                onPress={handleSend}
                disabled={!message.trim()}
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  message.trim() ? "bg-primary" : "bg-primaryLight"
                }`}
              >
                <MaterialIcons
                  name="send"
                  size={20}
                  color={message.trim() ? "white" : "#B0B0B0"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ChatWithAi;
