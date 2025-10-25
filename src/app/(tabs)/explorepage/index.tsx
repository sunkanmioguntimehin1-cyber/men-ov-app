import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
// import { Image, ImageBackground } from 'expo-image'
import React from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ExplorePage = () => {
  // Mock data for posts
  const trendingPosts = [
    {
      id: 1,
      title: "My Recommendations",
      author: "Olivia Rhye",
      date: "20 Jan 2025",
      likes: 4,
      comments: 4,
      shares: 3,
      image: require("@/assets/images/profile-image.png"),
    },
    {
      id: 2,
      title: "My Rec",
      author: "Olivia",
      date: "20 Jan 2025",
      likes: 4,
      comments: 4,
      shares: 0,
      image: require("@/assets/images/profile-image.png"),
    },
  ];

  const relatedPosts = [
    {
      id: 1,
      title: "Body changes in perimenopause",
      author: "Olivia Rhye",
      date: "20 Jan 2025",
      likes: 4,
      comments: 4,
      shares: 3,
      image: require("@/assets/images/profile-image.png"),
    },
    {
      id: 2,
      title: "My Rec",
      author: "Olivia",
      date: "20 Jan 2025",
      likes: 4,
      comments: 4,
      shares: 0,
      image: require("@/assets/images/profile-image.png"),
    },
  ];

  const renderPostCard = (post: any) => (
    <TouchableOpacity
      key={post.id}
      className="mr-4 bg-[#F4EBFF]"
      style={{ width: width * 0.75 }}
    >
      <View className="bg-[#F4EBFF] p-4 overflow-hidden shadow-sm">
        <Text className="my-2">My Recommendations</Text>

        <View className="h-60">
          <ImageBackground
            source={post.image}
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "flex-end", // 👈 moves children to bottom
            }}
            resizeMode="cover"
          >
            <BlurView
              intensity={100} // 👈 controls blur strength
              tint="light" // 'light' | 'dark' | 'default'
              style={{
                width: "100%",
                padding: 16,
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <Text className=" text-lg">Olivia Rhye</Text>
              <Text className=" text-lg">20 Jan 2025</Text>
            </BlurView>
          </ImageBackground>
        </View>
      </View>

      <View className="px-4 py-2 mb-4">
        <View className=" flex-row justify-between">
          <View className="flex-row">
            <View className="flex-row items-center mr-4">
              <Ionicons name="thumbs-up-outline" size={16} color="#6B7280" />
              <Text className="text-gray-500 text-xs ml-1">{post.likes}</Text>
            </View>
            <View className="flex-row items-center mr-4">
              <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
              <Text className="text-gray-500 text-xs ml-1">
                {post.comments}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Feather name="share-2" size={16} color="#6B7280" />
            <Text className="text-gray-500 text-xs ml-1">{post.shares}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen scroll={true} className="bg-[#FCFCFD]">
      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={{
          height: "56%",
          width: "100%",
        }}
        resizeMode="cover"
      >
        <View className="px-6 pt-4 pb-6">
          {/* Search Bar */}

          <View className="bg-white rounded-2xl px-4 py-3 flex-row items-center mb-6 shadow-sm">
            <Ionicons name="search" size={20} color="#9B9B9B" />
            <TextInput
              placeholder="Search symptoms, tips, community posts"
              placeholderTextColor="#9B9B9B"
              className="flex-1 ml-3 text-base"
              style={{ fontSize: rS(14) }}
            />
          </View>

          {/* Feature Topics */}
          <View className="mb-6">
            <Text className="font-[PoppinsSemiBold] text-lg mb-4 text-black">
              Feature Topics
            </Text>

            <View>
              <View className=" flex-row gap-3">
                <TouchableOpacity className="flex-1 h-20 bg-[#FD832D] rounded-2xl px-4 py-3 flex-row items-center">
                  <View className="w-6 h-6">
                    <Image
                      source={require("@/assets/images/explore1.png")}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 100,
                      }}
                      contentFit="contain"
                      onError={(error) => console.log("Image error:", error)}
                    />
                  </View>

                  <Text className="text-white text-lg mx-2 font-[PoppinsRegular]">
                    Managing Hot flashes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 h-20 bg-[#75B458] rounded-2xl px-4 py-3 flex-row items-center">
                  <View className="w-6 h-6">
                    <Image
                      source={require("@/assets/images/explore2.png")}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 100,
                      }}
                      contentFit="contain"
                      onError={(error) => console.log("Image error:", error)}
                    />
                  </View>

                  <Text className="text-white text-lg mx-2 font-[PoppinsRegular]">
                    Hormone Therapy
                  </Text>
                </TouchableOpacity>
              </View>

              <View className=" my-3 flex-row gap-3">
                <TouchableOpacity className="flex-1 h-20 bg-[#7FCAFF] rounded-2xl px-4 py-3 flex-row items-center">
                  <View className="w-6 h-6">
                    <Image
                      source={require("@/assets/images/explore3.png")}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 100,
                      }}
                      contentFit="contain"
                      onError={(error) => console.log("Image error:", error)}
                    />
                  </View>

                  <Text className="text-white text-lg mx-2 font-[PoppinsRegular]">
                    Sleep&Mood Support
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 h-20 bg-[#A37EF6] rounded-2xl px-4 py-3 flex-row items-center">
                  <View className="w-6 h-6">
                    <Image
                      source={require("@/assets/images/explore4.png")}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 100,
                      }}
                      contentFit="contain"
                      onError={(error) => console.log("Image error:", error)}
                    />
                  </View>

                  <Text className="text-white text-lg mx-2 font-[PoppinsRegular]">
                    Pelvic Health & Sex
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Trending Posts */}
          <View className="mb-6">
            <Text className="font-[PoppinsSemiBold] text-lg mb-4 text-black">
              Trending Posts
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              {trendingPosts.map((post) => renderPostCard(post))}
            </ScrollView>
          </View>

          {/* Related to your logged symptoms */}
          <View className="mb-6">
            <Text className="font-[PoppinsSemiBold] text-lg mb-4 text-black">
              Related to your logged symptoms
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              {relatedPosts.map((post) => renderPostCard(post))}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  );
};

export default ExplorePage;
