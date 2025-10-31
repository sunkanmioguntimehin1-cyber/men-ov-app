// import Screen from '@/src/layout/Screen'
// import React from 'react'
// import { Text } from 'react-native'

// const CreatePost = () => {
//   return (
//     <Screen>
//       <Text>CreatePost</Text>
//     </Screen>
//   )
// }

// export default CreatePost


import Screen from "@/src/layout/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const CreatePost = () => {
  const router = useRouter();
  const [isAnonymous, setIsAnonymous] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const tags = [
    "#hotflash",
    "#anxiety",
    "#hotflash",
    "#hotflash",
    "#sleep",
    "#anxiety",
    "#hotflash",
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Screen scroll={true} className="bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="font-[PoppinsSemiBold] text-lg text-black">
          Creat post
        </Text>
        <TouchableOpacity>
          <Text className="font-[PoppinsMedium] text-base text-gray-400">
            Next
          </Text>
        </TouchableOpacity>
      </View>

      <View className="px-4 pt-4">
        {/* User Info */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Image
              source={require("@/assets/images/profile-image.png")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
            />
            <View className="ml-3">
              <Text className="font-[PoppinsSemiBold] text-base text-black">
                Olivia Rhye
              </Text>
              <Text className="font-[PoppinsRegular] text-xs text-gray-500">
                20 Jan 2025 8:30 AM
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Anonymous Toggle */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="font-[PoppinsRegular] text-base text-black">
            Participate as anonymous
          </Text>
          <Switch
            value={isAnonymous}
            onValueChange={setIsAnonymous}
            trackColor={{ false: "#D1D5DB", true: "#A78BFA" }}
            thumbColor={isAnonymous ? "#8553F3" : "#F3F4F6"}
            ios_backgroundColor="#D1D5DB"
          />
        </View>

        {/* Image Upload Button */}
        <TouchableOpacity className="w-10 h-10 bg-[#8553F3] rounded-lg items-center justify-center mb-4">
          <Ionicons name="image" size={20} color="white" />
        </TouchableOpacity>

        {/* Title Input */}
        <TextInput
          placeholder="What's topic on your mind?"
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
          className="font-[PoppinsRegular] text-base text-black border border-gray-300 rounded-xl px-4 py-3 mb-4"
        />

        {/* Content Input */}
        <TextInput
          placeholder="Anyone else dealing with brain fog lately?"
          placeholderTextColor="#9CA3AF"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={8}
          textAlignVertical="top"
          className="font-[PoppinsRegular] text-base text-black border border-gray-300 rounded-xl px-4 py-3 mb-4"
          style={{ height: 200 }}
        />

        {/* Tags */}
        <View className="flex-row flex-wrap gap-2">
          {tags.map((tag, index) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <TouchableOpacity
                key={`${tag}-${index}`}
                onPress={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full border ${
                  isSelected
                    ? "border-[#8553F3] bg-[#F3F0FF]"
                    : "border-gray-300 bg-white"
                }`}
              >
                <Text
                  className={`font-[PoppinsRegular] text-sm ${
                    isSelected ? "text-[#8553F3]" : "text-gray-600"
                  }`}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Screen>
  );
};

export default CreatePost;