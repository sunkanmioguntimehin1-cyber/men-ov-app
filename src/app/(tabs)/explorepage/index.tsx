// import {
//   useLikeArticleApi,
//   useUnLikeArticleApi,
// } from "@/src/api_services/articleApi/articleMutation";
// import {
//   useGetAllToics,
//   useGetExplore,
// } from "@/src/api_services/exploreApi/exploreQuery";
// import { GradientText } from "@/src/components/GradientText";
// import { GradientIoniconsIcon } from "@/src/custom-components/GradientIcon";
// import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
// import Screen from "@/src/layout/Screen";
// import { EvilIcons, Fontisto, Ionicons } from "@expo/vector-icons";
// import { BlurView } from "expo-blur";
// import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";

// // import { Image, ImageBackground } from 'expo-image'
// import React from "react";
// import {
//   Alert,
//   Dimensions,
//   FlatList,
//   ImageBackground,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";

// const { width } = Dimensions.get("window");

// const ExplorePage = () => {
//   const router = useRouter();

//   const getAllExploreToics = useGetAllToics();
//   const getExploreData = useGetExplore();
//   const likeArticleApi = useLikeArticleApi();
//   const unLikeArticleApi = useUnLikeArticleApi();

//   //!  working in porgress...
//   const handleLikeAndUnLike = (item: any) => {
//     if (item.isLiked) {
//       unLikeArticleApi.mutate({
//         id: item._id,
//       });
//     } else {
//       likeArticleApi.mutate({
//         id: item._id,
//       });
//     }
//   };

//   const handleSearchResult = (item: string) => {
//     router.push({
//       pathname: "/(tabs)/explorepage/view-search-result",
//       params: { item: JSON.stringify(item) },
//     });
//   };

//   const openWebView = (itemUrl: string) => {
//     try {
//       const uri = itemUrl;

//       if (!uri) {
//         Alert.alert("No  article Url found");
//         return;
//       }
//       router.push({
//         pathname: "/(tabs)/explorepage/explore-webview",
//         params: { item: JSON.stringify(uri) },
//       });
//     } catch (error) {
//       Alert.alert("Failed to fetch article Url");
//     }
//   };

//   const renderPostCard = (post: any, item: any) => (
//     <TouchableOpacity
//       key={post.id}
//       // style={{ backgroundColor: item.background }}
//       className="mr-4 bg-[#F4EBFF] rounded-xl"
//       style={{ width: width * 0.75 }}
//       onPress={() => {
//         openWebView(post?.url);
//       }}
//     >
//       <View className=" p-4 overflow-hidden shadow-sm">
//         <Text className="my-2 font-[PoppinsSemiBold] ">{post.title}</Text>

//         <View className="h-60">
//           <ImageBackground
//             source={{
//               uri:
//                 post?.images[0] ||
//                 "https://www.sleepfoundation.org/wp-content/uploads/2024/01/image-16.png",
//             }}
//             style={{
//               height: "100%",
//               width: "100%",
//               justifyContent: "flex-end", // 👈 moves children to bottom
//             }}
//             resizeMode="cover"
//           >
//             <BlurView
//               intensity={100} // 👈 controls blur strength
//               tint="light" // 'light' | 'dark' | 'default'
//               style={{
//                 width: "100%",
//                 padding: 16,
//                 // alignItems: "center",
//                 // justifyContent: "center",
//               }}
//             >
//               <GradientText className="text-base font-[PoppinsRegular]">
//                 {post.author}
//               </GradientText>
//             </BlurView>
//           </ImageBackground>
//         </View>
//       </View>

//       <View className="px-4 py-2 mb-4">
//         <View className=" flex-row justify-between">
//           <View className="flex-row">
//             <View className="flex-row items-center mr-4">
//               <EvilIcons name="like" size={20} color="black" />
//               <Text className="text-gray-500 text-xs">{post.likes}</Text>
//             </View>
//             <View className="flex-row items-center mr-4">
//               <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
//               <Text className="text-gray-500 text-xs">{post.comments}</Text>
//             </View>
//           </View>

//           <View className="flex-row items-center">
           
//             <Fontisto name="share-a" size={16} color="black" />
//             <Text className="text-gray-500 text-xs ml-1">{post.shares}</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <>
//       <LoadingOverlay
//         isOpen={getAllExploreToics.isPending || getExploreData.isLoading} // Required: Controls visibility
//         // message="Login..." // Optional: Loading text
//         animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
//         backdropClassName="..." // Optional: Additional backdrop styling
//       />
//       <Screen scroll={true} className="bg-[#FCFCFD]">
//         <ImageBackground
//           source={require("@/assets/images/Exploreimg.png")}
//           style={{
//             height: "80%",
//             width: "100%",
//           }}
//           resizeMode="cover"
//         >
//           <View className="px-6 pt-4 pb-6">
//             {/* Search Bar */}

//             <TouchableOpacity
//               className="bg-white rounded-2xl px-4 py-3 flex-row border border-[#B33288] items-center mb-6 shadow-sm"
//               onPress={() => {
//                 router.push("/explorepage/searchpage");
//               }}
//             >
//               <GradientIoniconsIcon
//                 name="search"
//                 size={20}
//                 gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
//               />
//               <Text className="text-[#9B9B9B] mx-2">
//                 Search symptoms, tips, community posts
//               </Text>
//             </TouchableOpacity>

//             {/* Feature Topics */}
//             <View className="mb-6">
//               <Text className="font-[PoppinsSemiBold] text-lg mb-4 text-black">
//                 Feature Topics
//               </Text>

//               <View>
//                 <FlatList
//                   data={getAllExploreToics?.data?.data}
//                   numColumns={2}
//                   columnWrapperStyle={{ gap: 10, marginBottom: 12 }}
//                   renderItem={({ item }) => {
//                     // Split the background string into an array of colors
//                     const colors = item.background.split(",");

//                     return (
//                       <TouchableOpacity
//                         onPress={() => handleSearchResult(item?.title)}
//                         style={{ flex: 1 }}
//                       >
//                         <LinearGradient
//                           colors={colors}
//                           start={{ x: 0, y: 0 }}
//                           end={{ x: 1, y: 1 }}
//                           style={{
//                             height: 80,
//                             flexDirection: "row",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                             borderRadius: 20,
//                             padding: 16,
//                           }}
//                           // className=" rounded-full"
//                         >
//                           <View className="w-6 h-6">
//                             <Image
//                               source={{ uri: item.icon }}
//                               style={{
//                                 height: "100%",
//                                 width: "100%",
//                                 borderRadius: 100,
//                               }}
//                               contentFit="contain"
//                               onError={(error) =>
//                                 console.log("Image error:", error)
//                               }
//                             />
//                           </View>

//                           <Text className="text-white text-base mx-2 font-[PoppinsRegular] flex-1">
//                             {item.title}
//                           </Text>
//                         </LinearGradient>
//                       </TouchableOpacity>
//                     );
//                   }}
//                   keyExtractor={(item) => item.id}
//                 />
//               </View>
//             </View>

//             {/* Trending Posts */}
//             {getExploreData?.data?.topics?.map((item: any, index: number) => {
//               return (
//                 <View className="mb-6" key={item.id || index}>
//                   <Text className="font-[PoppinsSemiBold] text-lg mb-4 text-black">
//                     {item.title}
//                   </Text>
//                   <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={{ paddingRight: 16 }}
//                   >
//                     {item.articles?.map((article: any, item: any) =>
//                       renderPostCard(article, item)
//                     )}
//                   </ScrollView>
//                 </View>
//               );
//             })}
//           </View>
//         </ImageBackground>
//       </Screen>
//     </>
//   );
// };

// export default ExplorePage;


import {
  useLikeArticleApi,
  useUnLikeArticleApi,
} from "@/src/api_services/articleApi/articleMutation";
import {
  useGetAllToics,
  useGetExplore,
} from "@/src/api_services/exploreApi/exploreQuery";
import { GradientText } from "@/src/components/GradientText";
import { GradientIoniconsIcon } from "@/src/custom-components/GradientIcon";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import Screen from "@/src/layout/Screen";
import { EvilIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ExplorePage = () => {
  const router = useRouter();

  const getAllExploreToics = useGetAllToics();
  const getExploreData = useGetExplore();
  const likeArticleApi = useLikeArticleApi();
  const unLikeArticleApi = useUnLikeArticleApi();

  const handleLikeAndUnLike = (item: any) => {
    if (item.isLiked) {
      unLikeArticleApi.mutate({
        id: item._id,
      });
    } else {
      likeArticleApi.mutate({
        id: item._id,
      });
    }
  };

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
        Alert.alert("No article Url found");
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

  const renderPostCard = (post: any) => (
    <TouchableOpacity
      key={post.id}
      className="mr-4 bg-[#F4EBFF] rounded-xl"
      style={{ width: width * 0.75 }}
      onPress={() => {
        openWebView(post?.url);
      }}
    >
      <View className="p-4 overflow-hidden shadow-sm">
        <Text className="my-2 font-[PoppinsSemiBold]">{post.title}</Text>

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
              justifyContent: "flex-end",
            }}
            resizeMode="cover"
          >
            <BlurView
              intensity={100}
              tint="light"
              style={{
                width: "100%",
                padding: 16,
              }}
            >
              <GradientText className="text-base font-[PoppinsRegular]">
                {post.author}
              </GradientText>
            </BlurView>
          </ImageBackground>
        </View>
      </View>

      <View className="px-4 py-2 mb-4">
        <View className="flex-row justify-between">
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
            <Fontisto name="share-a" size={16} color="black" />
            <Text className="text-gray-500 text-xs ml-1">{post.shares}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Prepare data for FlatList sections
  const sections = React.useMemo(() => {
    const data = [];

    // Header section (search + featured topics)
    data.push({ type: "header" });

    // Trending posts sections
    if (getExploreData?.data?.topics) {
      getExploreData.data.topics.forEach((topic: any) => {
        data.push({ type: "section", topic });
      });
    }

    return data;
  }, [getExploreData?.data, getAllExploreToics?.data]);

  const renderFeatureTopicsGrid = () => (
    <View className="mb-6">
      <Text className="font-[PoppinsSemiBold] text-lg mb-4 text-black">
        Feature Topics
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {getAllExploreToics?.data?.data?.map((item: any) => {
          const colors = item.background.split(",");
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleSearchResult(item?.title)}
              style={{ width: "48%" }}
            >
              <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  height: 80,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 20,
                  padding: 16,
                  marginBottom: 12,
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
                    onError={(error) => console.log("Image error:", error)}
                  />
                </View>

                <Text className="text-white text-base mx-2 font-[PoppinsRegular] flex-1">
                  {item.title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderItem = ({ item }: any) => {
    if (item.type === "header") {
      return (
        <View className="px-6 pt-4 pb-6">
          {/* Search Bar */}
          <TouchableOpacity
            className="bg-white rounded-2xl px-4 py-3 flex-row border border-[#B33288] items-center mb-6 shadow-sm"
            onPress={() => {
              router.push("/explorepage/searchpage");
            }}
          >
            <GradientIoniconsIcon
              name="search"
              size={20}
              gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
            />
            <Text className="text-[#9B9B9B] mx-2">
              Search symptoms, tips, community posts
            </Text>
          </TouchableOpacity>

          {/* Feature Topics */}
          {renderFeatureTopicsGrid()}
        </View>
      );
    }

    if (item.type === "section") {
      return (
        <View className="mb-6 px-6">
          <Text className="font-[PoppinsSemiBold] text-lg mb-4 text-black">
            {item.topic.title}
          </Text>
          <FlatList
            horizontal
            data={item.topic.articles}
            keyExtractor={(article) => article.id}
            renderItem={({ item: article }) => renderPostCard(article)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          />
        </View>
      );
    }

    return null;
  };

  return (
    <>
      <LoadingOverlay
        isOpen={getAllExploreToics.isPending || getExploreData.isLoading}
        animationType="pulse"
        backdropClassName="..."
      />
      <Screen scroll={false} className="bg-[#FCFCFD]">
        <View className="flex-1">
          <ImageBackground
            source={require("@/assets/images/Exploreimg.png")}
            style={{
              // flex: 1,
              height: "130%",
              width: "100%",
            }}
            resizeMode="cover"
            // imageStyle={{
            //   opacity: 0.3,
            //   position: "absolute",
            //   top: "20%", // Centers the image vertically
            //   left: 0,
            //   right: 0,
            //   bottom: 0,
            // }}
          >
            <FlatList
              data={sections}
              keyExtractor={(item, index) => `${item.type}-${index}`}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
            />
          </ImageBackground>
        </View>
      </Screen>
    </>
  );
};

export default ExplorePage;