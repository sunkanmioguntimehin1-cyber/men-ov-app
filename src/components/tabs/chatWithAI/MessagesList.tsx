import React from "react";
import { ScrollView } from "react-native";
import MessageItem from "./MessageItem";


const MessagesList = ({ messages, currentUserId }: any) => {

    console.log("messages", messages);
  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: 10 }}
      showsVerticalScrollIndicator={false}
    >
      {messages?.map((message: any, index: number) => {
        return (
          <MessageItem
            key={index}
            message={message}
            currentUserId={currentUserId}
          />
        );
      })}
    </ScrollView>
  );
};

export default MessagesList;
