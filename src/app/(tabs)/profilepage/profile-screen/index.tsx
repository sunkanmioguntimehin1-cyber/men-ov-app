import { useLikeArticleApi, useUnLikeArticleApi } from "@/src/api_services/articleApi/articleMutation";
import { useSaveRecommendationApi } from "@/src/api_services/recommendationApi/recommendationMutation";
import { useGetRecommendationApi } from "@/src/api_services/recommendationApi/recommendationQuery";
import {
  useGetIntakeDetails,
  useGetUser,
} from "@/src/api_services/userApi/userQuery";
import { GradientText } from "@/src/components/GradientText";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import Screen from "@/src/layout/Screen";
import { getInitials } from "@/src/utils/getInitials";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// import SafeScreen from "../../../components/SafeScreen";

export default function ProfilePage() {
  const router = useRouter();
  const firstTimeRef = React.useRef(true);

  const [modelVisible1, setModelVisible1] = React.useState(false);

  const getUserData = useGetUser();
  const getRecommendationData = useGetRecommendationApi();
  const saveRecommendation = useSaveRecommendationApi();
  const getIntakeDetails = useGetIntakeDetails();
    const likeArticleApi =  useLikeArticleApi()
    const unLikeArticleApi = useUnLikeArticleApi();

  // console.log("getUserData11", getUserData?.data);
  // console.log("getIntakeDetails", getIntakeDetails?.data);

  const openWebView = (itemUrl: string) => {
    try {
      const uri = itemUrl;

      if (!uri) {
        Alert.alert("No  article Url found");
        return;
      }
      router.push({
        pathname: "/profilepage/profile-screen/recommendations-webview",
        params: { item: JSON.stringify(uri) },
      });
    } catch (error) {
      Alert.alert("Failed to fetch article Url");
    }
  };

  const handleSaveRecommadation = (itemId: string) => {
    saveRecommendation.mutate({
      isSaved: true,
      id: itemId,
    });
  };

  //!  working in porgress...
  const handleLikeAndUnLike = (itemId: any, isLiked: any) => {
    
    if (isLiked === getUserData?.data.id) {
      unLikeArticleApi.mutate({
        id: itemId,
      });
    } else {
      likeArticleApi.mutate({
        id: itemId,
      });
    }
  };

  // const birthDate = getUserData?.data?.dob;
  // let age = null;
  // if (birthDate) {
  //   const date = parseISO(birthDate);
  //   const now = new Date();
  //   age = differenceInYears(now, date);
  // }

  const birthDate = getUserData?.data?.dob;
  let age = null;

  if (birthDate) {
    const d = new Date(birthDate);
    const today = new Date();

    age = today.getFullYear() - d.getFullYear();
    const hasHadBirthday =
      today.getMonth() > d.getMonth() ||
      (today.getMonth() === d.getMonth() && today.getDate() >= d.getDate());

    if (!hasHadBirthday) age--;
  }

  return (
    <Screen scroll={true} className="bg-white">
      <LoadingOverlay
        isOpen={getUserData.isPending} // Required: Controls visibility
        // message="Login..." // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />

      {/* Header */}

      <ImageBackground
        source={require("@/assets/images/AI.png")}
        style={{
          height: "100%",
          width: "100%",
        }}
        resizeMode="cover"
      >
        <View className="flex-row items-center justify-between px-6">
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

          <TouchableOpacity
            onPress={() => {
              router.push("/profilepage/profile-screen/edit-profile");
            }}
          >
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View
          className="items-center px-6"
          style={{
            paddingVertical: Platform.OS === "ios" ? 40 : 70,
          }}
        >
          {/* Avatar */}
          <View className="w-32 h-32 rounded-full bg-purple-200 items-center justify-center mb-4">
            <View className="w-28 h-28 rounded-full bg-pink-300 items-center justify-center">
              {/* <MaterialIcons name="person" size={60} color="#8A3FFC" /> */}
              {getUserData?.data?.picture ? (
                <Image
                  source={{ uri: getUserData?.data?.picture }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                  }}
                />
              ) : (
                <View className="w-full h-full  rounded-full items-center justify-center">
                  <Text className="text-black font-bold text-sm">
                    {getInitials(getUserData?.data?.fullname)}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Name */}
          <Text className="text-2xl font-[PoppinsSemiBold] text-black">
            {getUserData.data?.fullname}
          </Text>

          {/* Demographics */}
          <Text className="text-sm text-gray-600 mb-2">
            {age !== null ? `${age} years old` : "—"}-{" "}
            {getUserData.data?.gender}
          </Text>

          {/* Health Tags */}
          <View className="flex-row flex-wrap justify-center mb-1">
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
          <View className="flex-row w-full gap-4 justify-between">
            <TouchableOpacity
              className="border border-primary rounded-xl items-center justify-center flex-1"
              onPress={() => {
                router.push("/(tabs)/homepage/personal-info");
              }}
            >
              <GradientText className="font-[PoppinsMedium] text-center p-4">
                Health Information
              </GradientText>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white border border-primary rounded-xl  flex-1 items-center justify-center">
             
              <GradientText className="font-[PoppinsMedium] text-center p-4">
                Your Meds
              </GradientText>
            </TouchableOpacity>
          </View>
        </View>

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
              className="mt-6 bg-primary px-6 py-3 rounded-full"
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

            //like icon
            const isLiked = item.article.likedBy.find(
              (id: string) => id === getUserData?.data?.id
            );

            console.log("isLiked", isLiked);
            return (
              <TouchableOpacity
                key={item.id}
                className="px-6 pb-20 "
                onPress={() => openWebView(item.article?.url)}
              >
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

                  <TouchableOpacity
                    onPress={() => handleSaveRecommadation(item.id)}
                  >
                    {item.isSaved ? (
                      <Ionicons name="bookmark" size={20} color="gray" />
                    ) : (
                      <Ionicons
                        name="bookmark-outline"
                        size={24}
                        color="gray"
                      />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Title */}
                <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
                  {/* My Recommendations */}
                  {item?.article?.title}
                </Text>

                {/* Description */}
                <Text className="text-sm text-gray-600 mb-4 leading-5">
                  {item?.article?.summary}
                </Text>

                {/* Hashtags */}
                <View className="flex-row mb-4">
                  {item.article?.tags?.map((tag: any) => (
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
                  onPress={() => openWebView(item.article?.url)}
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
                <View className="flex-row items-center justify-between ">
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      className="flex-row items-center mr-6"
                      onPress={() =>
                        handleLikeAndUnLike(item.article?.id, isLiked)
                      }
                    >
                      {isLiked === getUserData?.data?.id ? (
                        <Feather name="thumbs-up" size={16} color="#712A87" />
                      ) : (
                        <Feather name="thumbs-down" size={16} color="#712A87" />
                      )}

                      <Text className="text-xs text-gray-600 ml-1">
                        {item?.article?.likes} likes
                      </Text>
                    </TouchableOpacity>
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
              </TouchableOpacity>
            );
          })
        )}
      </ImageBackground>
    </Screen>
  );
}
