// // import SafeScreen from "@/src/components/SafeScreen";
// // import { MaterialIcons } from "@expo/vector-icons";
// // import { useRouter } from "expo-router";
// // import React from "react";
// // import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// // const ChatWithAi = () => {
// //     const router = useRouter()
// //   return (
// //     <SafeScreen className="bg-white">
// //       <ScrollView className="flex-1">
// //         <View className="flex-row items-center justify-between px-8 py-4">
// //           <TouchableOpacity onPress={() => router.back()}>
// //             <MaterialIcons name="arrow-back-ios" size={24} color="black" />
// //           </TouchableOpacity>

// //           <Text className="text-lg font-[PoppinsSemiBold] text-black">
// //             Talk with Ai
// //           </Text>

// //           <View />
// //         </View>
// //       </ScrollView>
    
// //     </SafeScreen>
// //   );
// // };

// // export default ChatWithAi;


// import SafeScreen from "@/src/components/SafeScreen";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";

// const ChatWithAi = () => {
//   const router = useRouter();
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hi! I'm your AI assistant. How can I help you today?",
//       isAi: true,
//       timestamp: "10:30 AM",
//     },
//     {
//       id: 2,
//       text: "Hello! I need help with my productivity.",
//       isAi: false,
//       timestamp: "10:31 AM",
//     },
//     {
//       id: 3,
//       text: "I'd be happy to help you with productivity! Here are some tips:\n\n1. Break tasks into smaller chunks\n2. Use the Pomodoro technique\n3. Minimize distractions\n\nWhat specific area would you like to focus on?",
//       isAi: true,
//       timestamp: "10:31 AM",
//     },
//   ]);

//   const handleSend = () => {
//     if (message.trim()) {
//       const newMessage = {
//         id: messages.length + 1,
//         text: message,
//         isAi: false,
//         timestamp: new Date().toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };

//       setMessages([...messages, newMessage]);
//       setMessage("");

//       // Simulate AI response
//       setTimeout(() => {
//         const aiResponse = {
//           id: messages.length + 2,
//           text: "Thanks for your message! I'm processing your request...",
//           isAi: true,
//           timestamp: new Date().toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         };
//         setMessages((prev) => [...prev, aiResponse]);
//       }, 1000);
//     }
//   };

//   return (
//     <SafeScreen className="bg-white ">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex-1"
//         keyboardVerticalOffset={0}
//       >
//         {/* Header */}
//         <View className="flex-row items-center justify-between px-8 py-4 border-b border-gray-200">
//           <TouchableOpacity onPress={() => router.back()}>
//             <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//           </TouchableOpacity>

//           <Text className="text-lg font-[PoppinsSemiBold] text-black">
//             Talk with AI
//           </Text>

//           <View className="w-6" />
//         </View>

//         {/* Messages */}
//         <ScrollView className="flex-1 px-4 py-4">
//           {messages.map((msg) => (
//             <View
//               key={msg.id}
//               className={`mb-4 ${msg.isAi ? "items-start" : "items-end"}`}
//             >
//               <View
//                 className={`max-w-[80%] px-4 py-3 rounded-2xl ${
//                   msg.isAi
//                     ? "bg-gray-100 rounded-tl-none"
//                     : "bg-blue-500 rounded-tr-none"
//                 }`}
//               >
//                 <Text
//                   className={`text-base ${
//                     msg.isAi ? "text-gray-800" : "text-white"
//                   }`}
//                 >
//                   {msg.text}
//                 </Text>
//               </View>
//               <Text className="text-xs text-gray-400 mt-1 px-2">
//                 {msg.timestamp}
//               </Text>
//             </View>
//           ))}
//         </ScrollView>

//         {/* Input Area */}
//         <View className="px-4 py-3 border-t border-gray-200 bg-white">
//           <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
//             <TextInput
//               className="flex-1 text-base py-2"
//               placeholder="Type a message..."
//               value={message}
//               onChangeText={setMessage}
//               multiline
//               maxLength={500}
//             />
//             <TouchableOpacity
//               onPress={handleSend}
//               className={`ml-2 w-10 h-10 rounded-full items-center justify-center ${
//                 message.trim() ? "bg-blue-500" : "bg-gray-300"
//               }`}
//               disabled={!message.trim()}
//             >
//               <MaterialIcons name="send" size={20} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeScreen>
//   );
// };

// export default ChatWithAi;





import CustomInput from "@/src/custom-components/CustomInput";
import Screen from "@/src/layout/Screen";
import { rS, rV } from "@/src/lib/responsivehandler";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
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
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  // Responsive values based on screen size
  const isSmallScreen = screenWidth < 375;
  const isMediumScreen = screenWidth >= 375 && screenWidth < 768;
  const isLargeScreen = screenWidth >= 768;

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

  // Calculate responsive message bubble max width
  const getMessageMaxWidth = () => {
    if (isLargeScreen) return "70%";
    if (isSmallScreen) return "85%";
    return "80%";
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      className={`${item.isAi ? "items-start" : "items-end"}`}
      style={{
        marginBottom: rV(12),
        paddingHorizontal: rS(isSmallScreen ? 12 : 16),
      }}
    >
      <View
        className={`rounded-2xl ${
          item.isAi
            ? "bg-secondary rounded-tl-none"
            : "bg-primary rounded-tr-none"
        }`}
        style={{
          maxWidth: getMessageMaxWidth(),
          paddingHorizontal: rS(isSmallScreen ? 12 : 16),
          paddingVertical: rV(10),
        }}
      >
        <Text
          className={`font-[PoppinsRegular] ${
            item.isAi ? "text-titleText" : "text-white"
          }`}
          style={{ fontSize: rS(isSmallScreen ? 13 : 14), lineHeight: rV(20) }}
        >
          {item.text}
        </Text>
      </View>
      <Text
        className="text-gray-400 font-[PoppinsRegular]"
        style={{
          fontSize: rS(10),
          marginTop: rV(4),
          paddingHorizontal: rS(8),
        }}
      >
        {item.timestamp}
      </Text>
    </View>
  );

  return (
    <Screen className="bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Header */}
        <View
          className="flex-row items-center justify-between border-b border-[#EAEAEA]"
          style={{
            paddingHorizontal: rS(isSmallScreen ? 12 : 16),
            paddingVertical: rV(12),
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: rS(40),
              height: rV(40),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={rS(isSmallScreen ? 20 : 24)}
              color="black"
            />
          </TouchableOpacity>

          <Text
            className="font-[PoppinsSemiBold] text-black"
            style={{ fontSize: rS(isSmallScreen ? 16 : 18) }}
          >
            Talk with AI
          </Text>

          <View style={{ width: rS(40) }} />
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingVertical: rV(16),
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Input Area */}
        <View
          className="border-t border-[#EAEAEA] bg-white"
          style={{
            paddingHorizontal: rS(isSmallScreen ? 12 : 16),
            paddingTop: rV(12),
            paddingBottom:
              Platform.OS === "ios"
                ? Math.max(insets.bottom, rV(12))
                : rV(12),
          }}
        >
          <View className="flex-row items-center" style={{ gap: rS(8) }}>
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
              className={`rounded-full items-center justify-center ${
                message.trim() ? "bg-primary" : "bg-primaryLight"
              }`}
              style={{
                width: rS(isSmallScreen ? 44 : 48),
                height: rV(isSmallScreen ? 44 : 48),
              }}
            >
              <MaterialIcons
                name="send"
                size={rS(isSmallScreen ? 18 : 20)}
                color={message.trim() ? "white" : "#B0B0B0"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ChatWithAi;