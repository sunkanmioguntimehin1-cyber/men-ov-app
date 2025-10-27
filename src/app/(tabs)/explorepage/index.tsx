import {
  useGetAllToics,
  useGetExplore,
} from "@/src/api_services/exploreApi/exploreQuery";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import Screen from "@/src/layout/Screen";
import { EvilIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
// import { Image, ImageBackground } from 'expo-image'
import React from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ExplorePage = () => {
  const router = useRouter();

  const getAllExploreToics = useGetAllToics();
  const getExploreData = useGetExplore();

  const handleSearchResult = (item: string) => {
    router.push({
      pathname: "/(tabs)/explorepage/view-search-result",
      params: { item: JSON.stringify(item) },
    });
  };

  const openWebView = (itemUrl: string) => {
    try {
      const uri = itemUrl;

      if (!uri) {
        Alert.alert("No  article Url found");
        return;
      }
      router.push({
        pathname: "/(tabs)/explorepage/explore-webview",
        params: { item: JSON.stringify(uri) },
      });
    } catch (error) {
      Alert.alert("Failed to fetch article Url");
    }
  };

  const renderPostCard = (post: any, item: any) => (
    <TouchableOpacity
      key={post.id}
      // style={{ backgroundColor: item.background }}
      className="mr-4 bg-[#F4EBFF] rounded-xl"
      style={{ width: width * 0.75 }}
      onPress={() => {
        openWebView(post?.url);
      }}
    >
      <View className=" p-4 overflow-hidden shadow-sm">
        <Text className="my-2">{post.title}</Text>

        <View className="h-60">
          <ImageBackground
            source={{
              uri:
                post?.images[0] ||
                "https://www.sleepfoundation.org/wp-content/uploads/2024/01/image-16.png",
            }}
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
              <Text className=" text-base">{post.author}</Text>
              {/* <Text className=" text-lg">20 Jan 2025</Text> */}
            </BlurView>
          </ImageBackground>
        </View>
      </View>

      <View className="px-4 py-2 mb-4">
        <View className=" flex-row justify-between">
          <View className="flex-row">
            <View className="flex-row items-center mr-4">
              <EvilIcons name="like" size={20} color="black" />
              <Text className="text-gray-500 text-xs">{post.likes}</Text>
            </View>
            <View className="flex-row items-center mr-4">
              <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
              <Text className="text-gray-500 text-xs">{post.comments}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            {/* <Feather name="share-2" size={16} color="#6B7280" /> */}
            <Fontisto name="share-a" size={16} color="black" />
            <Text className="text-gray-500 text-xs ml-1">{post.shares}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <LoadingOverlay
        isOpen={getAllExploreToics.isPending || getExploreData.isLoading} // Required: Controls visibility
        // message="Login..." // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />
      <Screen scroll={true} className="bg-[#FCFCFD]">
        <ImageBackground
          source={require("@/assets/images/background.png")}
          style={{
            height: "43%",
            width: "100%",
          }}
          resizeMode="cover"
        >
          <View className="px-6 pt-4 pb-6">
            {/* Search Bar */}

            <TouchableOpacity
              className="bg-white rounded-2xl px-4 py-3 flex-row items-center mb-6 shadow-sm"
              onPress={() => {
                router.push("/explorepage/searchpage");
              }}
            >
              <Ionicons name="search" size={20} color="#9B9B9B" />
              <Text className="text-[#9B9B9B] mx-2">
                Search symptoms, tips, community posts
              </Text>
            </TouchableOpacity>

            {/* Feature Topics */}
            <View className="mb-6">
              <Text className="font-[PoppinsSemiBold] text-lg mb-4 text-black">
                Feature Topics
              </Text>

              <View>
                <FlatList
                  data={getAllExploreToics?.data?.data}
                  numColumns={2}
                  columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ backgroundColor: item.background }}
                      className="flex-1 h-20 rounded-2xl px-4 py-3 flex-row items-center"
                      onPress={() => {
                        handleSearchResult(item?.title);
                      }}
                    >
                      <View className="w-6 h-6">
                        <Image
                          source={{ uri: item.icon }}
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: 100,
                          }}
                          contentFit="contain"
                          onError={(error) =>
                            console.log("Image error:", error)
                          }
                        />
                      </View>

                      <Text className="text-white text-base mx-2 font-[PoppinsRegular] flex-1">
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </View>

            {/* Trending Posts */}
            {getExploreData?.data?.topics?.map((item: any, index: number) => {
              return (
                <View className="mb-6" key={item.id || index}>
                  <Text className="font-[PoppinsSemiBold] text-lg mb-4 text-black">
                    {item.title}
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 16 }}
                  >
                    {item.articles?.map((article: any, item: any) =>
                      renderPostCard(article, item)
                    )}
                  </ScrollView>
                </View>
              );
            })}
          </View>
        </ImageBackground>
      </Screen>
    </>
  );
};

export default ExplorePage;
