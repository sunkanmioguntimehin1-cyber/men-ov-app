import { useGetRecommendationApi } from "@/src/api_services/recommendationApi/recommendationQuery";
import { useGetUser } from "@/src/api_services/userApi/userQuery";
import SafeScreen from "@/src/components/SafeScreen";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import SafeScreen from "../../../components/SafeScreen";

export default function ProfilePage() {
  const router = useRouter();
  const getUserData = useGetUser();
  const getRecommendationData = useGetRecommendationApi();

  console.log("getUserData", getUserData.data);

  const handleOpenArticle = async (itemUrl: string) => {
    try {
      const uri = itemUrl;

      if (!uri) {
        Alert.alert("No transfer URl found.");
        return;
      }

      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        Alert.alert("Can't open this URL:", uri);
      }
    } catch (error) {
      Alert.alert("Failed to fetch Url.");
    }
  };

  return (
    <SafeScreen className="bg-white">
      <LoadingOverlay
        isOpen={getUserData.isPending} // Required: Controls visibility
        // message="Login..." // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />
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
            {getUserData.data?.fullname}
          </Text>

          {/* Demographics */}
          <Text className="text-sm text-gray-600 mb-6">
            45 years old - {getUserData.data?.gender}
          </Text>

          {/* Health Tags */}
          <View className="flex-row flex-wrap justify-center mb-3">
            {getUserData.data?.tags?.map((tag: string, index: number) => (
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
          {/* <View className="flex-row w-full justify-between">
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
          </View> */}
        </View>

        {/* My Recommendations Section */}
        {getRecommendationData.data?.length === 0 ? (
          // 👉 Empty State UI
          <View className="items-center justify-center mt-20">
            <Text className="text-gray-500 text-base mt-4 font-[PoppinsMedium]">
              No Recommendations found
            </Text>
            {/* <Text className="text-gray-400 text-sm mt-2 text-center px-6">
              No Recommendations yet.
            </Text> */}

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/homepage")}
              className="mt-6 bg-[#8A3FFC] px-6 py-3 rounded-full"
            >
              <Text className="text-white font-[PoppinsSemiBold]">
                Back to Home page
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          getRecommendationData.data?.map((item: any) => {
            // const date = new Date(item.publishedAt);
            const date = new Date(item?.article?.updatedAt);
            const formattedDate = format(date, "do MMMM yyyy");
            return (
              <View key={item.id} className="px-6 ">
                {/* Recommendation Header */}
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-purple-200 items-center justify-center mr-3">
                      <View className="w-6 h-6 rounded-full bg-pink-300 items-center justify-center">
                        <MaterialIcons
                          name="person"
                          size={16}
                          color="#8A3FFC"
                        />
                      </View>
                    </View>
                    <View>
                      <Text className="text-sm font-[PoppinsSemiBold] text-black">
                        {item.article?.author}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {/* 20 Jan 2025 8:30 AM */}
                        {formattedDate}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity>
                    {item.article?.isSaved ? (
                      <Ionicons
                        name="bookmark-outline"
                        size={24}
                        color="gray"
                      />
                    ) : (
                      <Ionicons name="bookmark" size={20} color="gray" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Title */}
                <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
                  {/* My Recommendations */}
                  {item.article?.title}
                </Text>

                {/* Description */}
                <Text className="text-sm text-gray-600 mb-4 leading-5">
                  {item.article?.summary}
                </Text>

                {/* Hashtags */}
                <View className="flex-row mb-4">
                  {item.article?.tags.map((tag: any) => (
                    <View
                      key={tag}
                      className="bg-gray-200 rounded-full px-3 py-1 mr-2"
                    >
                      <Text className="text-xs text-gray-700">#{tag}</Text>
                    </View>
                  ))}
                </View>

                {/* Embedded Image */}
                <TouchableOpacity
                  className="w-full h-48 bg-gray-200 rounded-lg mb-4 items-center justify-center"
                  onPress={() => handleOpenArticle(item.article?.url)}
                >
                  <Image
                    source={item.article?.images[0]}
                    style={{
                      height: "100%",
                      width: "100%",
                      // alignSelf: "center",
                      borderRadius: 10,
                    }}
                    contentFit="cover"
                    onError={(error) => console.log("Image error:", error)}
                  />
                </TouchableOpacity>

                {/* Engagement Bar */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="flex-row items-center mr-6">
                      <Feather name="thumbs-up" size={16} color="gray" />
                      <Text className="text-xs text-gray-600 ml-1">
                        {item?.article?.likes} likes
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Feather name="message-circle" size={16} color="gray" />
                      <Text className="text-xs text-gray-600 ml-1">
                        Comments
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <Feather name="share" size={16} color="gray" />
                    <Text className="text-xs text-gray-600 ml-1">
                      {item?.article?.shares} shares
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeScreen>
  );
}
