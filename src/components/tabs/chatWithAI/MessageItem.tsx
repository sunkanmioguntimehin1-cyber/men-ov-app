

import { Text, View } from "react-native";

const MessageItem = ({ message, currentUserId }: any) => {
  console.log("currentUserId", currentUserId);
  if (message.user?.id === currentUserId) {
    return (
      <View className=" flex-row justify-end mb-2 mr-3 px-2">
        <View className="">
          <View className=" flex self-end p-3 rounded-2xl bg-white border border-neutral-200">
            <Text className=" text-base">{message.message}</Text>
            {/* <Text>Helloo</Text> */}
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View className=" flex-row justify-start mb-2 ml-3 px-2">
        <View className="">
          <View className=" flex self-start p-3 rounded-2xl bg-primary border border-neutral-200">
            <Text className=" text-base text-white">{message.reply}</Text>
          </View>
        </View>
      </View>
    );
  }
};

export default MessageItem;
