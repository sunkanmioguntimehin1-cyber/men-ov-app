import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TypingDots } from "@/src/custom-components/TypingDots";
import { Message } from "../types";
import { shouldShowDateSeparator } from "@/src/utils/shouldShowDateSeparator";
import { formatUserMessageForDisplay } from "../utils/formatUserMessage";

interface MessageBubbleProps {
  item: Message;
  index: number;
  messages: Message[];
  bubbleMaxWidth: number;
  renderMessageContent: (message: Message) => React.ReactNode;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  item,
  index,
  messages,
  bubbleMaxWidth,
  renderMessageContent,
}) => {
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
              <View
                className="p-4 rounded-2xl bg-secondary border border-[#FBC3F8]"
                style={{ maxWidth: bubbleMaxWidth }}
              >
                <Text className="text-base font-[PoppinsRegular]">
                  {renderMessageContent(item)}
                </Text>
              </View>
            )}
          </View>
        ) : (
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