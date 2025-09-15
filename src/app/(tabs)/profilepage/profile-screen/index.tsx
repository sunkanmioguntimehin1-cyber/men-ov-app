import SafeScreen from "@/src/components/SafeScreen";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// import SafeScreen from "../../../components/SafeScreen";

export default function ProfilePage() {
  const router = useRouter();

  const healthTags = ["Post-menopause", "Sleep", "Sleep", "Back Pain"];

  return (
    <SafeScreen className="bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-lg font-[PoppinsSemiBold] text-black">
            Profile
          </Text>

          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View className="items-center px-6 py-8">
          {/* Avatar */}
          <View className="w-32 h-32 rounded-full bg-purple-200 items-center justify-center mb-4">
            <View className="w-28 h-28 rounded-full bg-pink-300 items-center justify-center">
              <MaterialIcons name="person" size={60} color="#8A3FFC" />
            </View>
          </View>

          {/* Name */}
          <Text className="text-2xl font-[PoppinsSemiBold] text-black mb-2">
            Elizabeth
          </Text>

          {/* Demographics */}
          <Text className="text-sm text-gray-600 mb-6">
            45 years old - Female
          </Text>

          {/* Health Tags */}
          <View className="flex-row flex-wrap justify-center mb-3">
            {healthTags.map((tag, index) => (
              <View
                key={index}
                className="bg-white border border-gray-300 rounded-full px-4 py-2 mr-2 mb-2"
              >
                <Text className="text-sm text-gray-700 font-[PoppinsRegular]">
                  {tag}
                </Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="flex-row w-full justify-between">
            <TouchableOpacity className="bg-[#8A3FFC] rounded-xl px-6 py-4 flex-1 mr-2">
              <Text className="text-white font-[PoppinsMedium] text-center">
                Health Information
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white border border-[#8A3FFC] rounded-xl px-6 py-4 flex-1 ml-2">
              <Text className="text-[#8A3FFC] font-[PoppinsMedium] text-center">
                Your Meds
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Recommendations Section */}
        <View className="px-6 ">
          {/* Recommendation Header */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-purple-200 items-center justify-center mr-3">
                <View className="w-6 h-6 rounded-full bg-pink-300 items-center justify-center">
                  <MaterialIcons name="person" size={16} color="#8A3FFC" />
                </View>
              </View>
              <View>
                <Text className="text-sm font-[PoppinsSemiBold] text-black">
                  Elizabeth
                </Text>
                <Text className="text-xs text-gray-500">
                  20 Jan 2025 8:30 AM
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <Feather name="bookmark" size={20} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
            My Recommendations
          </Text>

          {/* Description */}
          <Text className="text-sm text-gray-600 mb-4 leading-5">
            Lorem ipsum dolor sit amet consectetur. Diam et nisl sapien
            pellentesque egestas quis. Sit pharetra mattis auctor nibh gravida
            sagittis. Nullam viverra eget consectetur massa tempus...
          </Text>

          {/* Hashtags */}
          <View className="flex-row mb-4">
            <View className="bg-gray-200 rounded-full px-3 py-1 mr-2">
              <Text className="text-xs text-gray-700">#hotflash</Text>
            </View>
            <View className="bg-gray-200 rounded-full px-3 py-1">
              <Text className="text-xs text-gray-700">#sleep</Text>
            </View>
          </View>

          {/* Embedded Image */}
          <View className="w-full h-48 bg-gray-200 rounded-lg mb-4 items-center justify-center">
            <MaterialIcons name="image" size={40} color="gray" />
            <Text className="text-gray-500 mt-2">
              Office/Coworking Space Image
            </Text>
          </View>

          {/* Engagement Bar */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="flex-row items-center mr-6">
                <Feather name="thumbs-up" size={16} color="gray" />
                <Text className="text-xs text-gray-600 ml-1">5 likes</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="message-circle" size={16} color="gray" />
                <Text className="text-xs text-gray-600 ml-1">Comments</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <Feather name="share" size={16} color="gray" />
              <Text className="text-xs text-gray-600 ml-1">3 shares</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}
