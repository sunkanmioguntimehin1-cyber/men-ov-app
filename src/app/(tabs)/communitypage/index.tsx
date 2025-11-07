import { useGetAllPosts } from "@/src/api_services/postsApi/postQuery";
import {
  useLikePostApi,
  useSavePostApi,
  useUnLikePostApi,
  useUnSavePostApi,
} from "@/src/api_services/postsApi/postsMutation";
import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
import Screen from "@/src/layout/Screen";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { format } from "date-fns";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

const Communitypage = () => {
  const router = useRouter();

  // const getPosts = useGetAllPosts();
  const savePost = useSavePostApi();
  const unSavePost = useUnSavePostApi();
  const likePostApi = useLikePostApi();
  const unLikePostApi = useUnLikePostApi();

   const {
     data,
     isLoading,
     refetch,
     isError,
     error,
     hasNextPage,
     isFetchingNextPage,
     fetchNextPage,
   } = useGetAllPosts();

     const getPosts = React.useMemo(() => {
       return data?.pages.flatMap((page) => page.data) || [];
     }, [data]);



      const _onReachEnd = () => {
        if (hasNextPage && !isLoading) {
          fetchNextPage();
        }
      };


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

  const handleSaveAndUnsave = (item: any) => {
    console.log(item, "5555");
    if (item.isSaved) {
      unSavePost.mutate({
        id: item._id,
      });
    } else {
      savePost.mutate({
        id: item._id,
      });
    }
  };

  const handleLikeAndUnLike = (item: any) => {
    if (item.isLiked) {
      unLikePostApi.mutate({
        id: item._id,
      });
    } else {
      likePostApi.mutate({
        id: item._id,
      });
    }
  };

   const handleViewPost = (postId: string) => {
     router.push({
       pathname: `/(tabs)/communitypage/view-post`,
       params: { item: JSON.stringify(postId) },
     });
   };

   const handleComments = (postId: string) => {
     router.push({
       pathname: `/(tabs)/communitypage/comments`,
       params: { item: JSON.stringify(postId) },
     });
   };
  return (
    <Screen className="px-4 py-3">
      <LoadingOverlay
        isOpen={isLoading} // Required: Controls visibility
        // message="Login..." // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />
      <TouchableOpacity
        className=" flex-row items-center justify-between"
        onPress={() => {
          router.push("/(tabs)/communitypage/create-post");
        }}
      >
        <View className="flex-row items-center">
          <View className="mx-3 bg-slate-400 h-10 w-10 items-center justify-center rounded-full">
            <Text>US</Text>
          </View>
          <View>
            <Text>What’s on your thoughs?</Text>
          </View>
        </View>

        <TouchableOpacity className=" ">
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
      <View className=" h-0.5 bg-slate-200 my-2" />

      <FlatList
        data={getPosts}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        onEndReached={_onReachEnd}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="small" /> : null
        }
        
        ListEmptyComponent={() => (
          <View className="items-center justify-center mt-20">
            <Text className="text-gray-500 text-base mt-4 font-[PoppinsMedium]">
              No Post found
            </Text>

            <TouchableOpacity className="mt-6 bg-[#8A3FFC] px-6 py-3 rounded-full">
              <Text className="text-white font-[PoppinsSemiBold]">
                Create a post
              </Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => {
          const date = new Date(item?.updatedAt);
          const formattedDate = format(date, "do MMMM yyyy");

          return (
            <TouchableOpacity
              className="my-2"
              onPress={() => handleViewPost(item._id)}
            >
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
                      {item.user?.fullname}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {formattedDate}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity onPress={() => handleSaveAndUnsave(item)}>
                  {item.isSaved ? (
                    <Ionicons name="bookmark" size={20} color="gray" />
                  ) : (
                    <Ionicons name="bookmark-outline" size={24} color="gray" />
                  )}
                </TouchableOpacity>
              </View>

              {/* Title */}
              <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
                {item?.title}
              </Text>

              {/* Description */}
              <Text className="text-sm text-gray-600 mb-4 leading-5">
                {item?.content}
              </Text>

              {/* Hashtags */}
              <View className="flex-row mb-4">
                {item.hashtags?.map((tag: any) => (
                  <View
                    key={tag}
                    className="bg-gray-200 rounded-full px-3 py-1 mr-2"
                  >
                    <Text className="text-xs text-gray-700">#{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Embedded Image */}
              {item.images[0] && (
                <TouchableOpacity className="w-full h-48 bg-gray-200 rounded-lg mb-4">
                  <Image
                    source={{ uri: item.images[0] }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 10,
                    }}
                    contentFit="cover"
                    onError={(error) => console.log("Image error:", error)}
                  />
                </TouchableOpacity>
              )}

              {/* Engagement Bar */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="flex-row items-center mr-6">
                    <TouchableOpacity onPress={() => handleLikeAndUnLike(item)}>
                      {item.isLiked ? (
                        <MaterialCommunityIcons
                          name="thumb-up"
                          size={16}
                          color="black"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="thumb-up-outline"
                          size={16}
                          color="black"
                        />
                      )}
                    </TouchableOpacity>
                    <Text className="text-xs text-gray-600 ml-1">
                      {item?.likes} likes
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => handleComments(item._id)}
                  >
                    <Feather name="message-circle" size={16} color="gray" />
                    <Text className="text-xs text-gray-600 ml-1">
                      {item.commentCount} Comments
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center">
                  <Feather name="share" size={16} color="gray" />
                  <Text className="text-xs text-gray-600 ml-1">
                    {item?.shares} shares
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
};

export default Communitypage;


// import { useGetAllPosts } from "@/src/api_services/postsApi/postQuery";
// import {
//   useLikePostApi,
//   useSavePostApi,
//   useUnLikePostApi,
//   useUnSavePostApi,
// } from "@/src/api_services/postsApi/postsMutation";
// import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
// import Screen from "@/src/layout/Screen";
// import {
//   Feather,
//   Ionicons,
//   MaterialCommunityIcons,
//   MaterialIcons,
// } from "@expo/vector-icons";
// import { format } from "date-fns";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   Alert,
//   Modal,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const Communitypage = () => {
//   const router = useRouter();
//   const [showFilterModal, setShowFilterModal] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("all");

//   const getPosts = useGetAllPosts();
//   const savePost = useSavePostApi();
//   const unSavePost = useUnSavePostApi();
//   const likePostApi = useLikePostApi();
//   const unLikePostApi = useUnLikePostApi();

//   // console.log("getPosts", getPosts?.data);

//   const filterOptions = [
//     { id: "all", label: "All Posts", icon: "grid-view" },
//     { id: "my-posts", label: "My Posts", icon: "person" },
//     { id: "trending", label: "Trending", icon: "trending-up" },
//     { id: "recent", label: "Most Recent", icon: "access-time" },
//     { id: "most-liked", label: "Most Liked", icon: "thumb-up" },
//     { id: "saved", label: "Saved Posts", icon: "bookmark" },
//   ];

//   const handleFilterSelect = (filterId: string) => {
//     setSelectedFilter(filterId);
//     setShowFilterModal(false);
//     // TODO: Implement actual filtering logic here
//     console.log("Selected filter:", filterId);
//   };

//   const openWebView = (itemUrl: string) => {
//     try {
//       const uri = itemUrl;

//       if (!uri) {
//         Alert.alert("No article Url found");
//         return;
//       }
//       router.push({
//         pathname: "/profilepage/profile-screen/recommendations-webview",
//         params: { item: JSON.stringify(uri) },
//       });
//     } catch (error) {
//       Alert.alert("Failed to fetch article Url");
//     }
//   };

//   const handleSaveAndUnsave = (item: any) => {
//     console.log(item, "5555");
//     if (item.isSaved) {
//       unSavePost.mutate({
//         id: item._id,
//       });
//     } else {
//       savePost.mutate({
//         id: item._id,
//       });
//     }
//   };

//   const handleLikeAndUnLike = (item: any) => {
//     if (item.isLiked) {
//       unLikePostApi.mutate({
//         id: item._id,
//       });
//     } else {
//       likePostApi.mutate({
//         id: item._id,
//       });
//     }
//   };

//   const handleViewPost = (postId: string) => {
//     router.push({
//       pathname: `/(tabs)/communitypage/view-post`,
//       params: { item: JSON.stringify(postId) },
//     });
//   };

//   const handleComments = (postId: string) => {
//     router.push({
//       pathname: `/(tabs)/communitypage/comments`,
//       params: { item: JSON.stringify(postId) },
//     });
//   };

//   return (
//     <Screen className="px-4 py-3">
//       <LoadingOverlay isOpen={getPosts.isLoading} animationType="pulse" />

//       <TouchableOpacity
//         className="flex-row items-center justify-between"
//         onPress={() => {
//           router.push("/(tabs)/communitypage/create-post");
//         }}
//       >
//         <View className="flex-row items-center">
//           <View className="mx-3 bg-slate-400 h-10 w-10 items-center justify-center rounded-full">
//             <Text>US</Text>
//           </View>
//           <View>
//             <Text>What's on your thoughts?</Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           className="p-2"
//           onPress={() => setShowFilterModal(true)}
//         >
//           <MaterialIcons name="filter-list" size={24} color="black" />
//         </TouchableOpacity>
//       </TouchableOpacity>

//       <View className="h-0.5 bg-slate-200 my-2" />

//       {/* Filter Modal */}
//       <Modal
//         visible={showFilterModal}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setShowFilterModal(false)}
//       >
//         <TouchableOpacity
//           className="flex-1 bg-black/50 justify-end"
//           activeOpacity={1}
//           onPress={() => setShowFilterModal(false)}
//         >
//           <TouchableOpacity
//             className="bg-white rounded-t-3xl p-6"
//             activeOpacity={1}
//             onPress={(e) => e.stopPropagation()}
//           >
//             {/* Modal Header */}
//             <View className="flex-row items-center justify-between mb-6">
//               <Text className="text-xl font-[PoppinsSemiBold] text-black">
//                 Filter Posts
//               </Text>
//               <TouchableOpacity
//                 onPress={() => setShowFilterModal(false)}
//                 className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
//               >
//                 <MaterialIcons name="close" size={20} color="gray" />
//               </TouchableOpacity>
//             </View>

//             {/* Filter Options */}
//             <View className="space-y-2">
//               {filterOptions.map((option) => (
//                 <TouchableOpacity
//                   key={option.id}
//                   className={`flex-row items-center justify-between p-4 rounded-xl ${
//                     selectedFilter === option.id
//                       ? "bg-purple-100 border-2 border-[#8A3FFC]"
//                       : "bg-gray-50"
//                   }`}
//                   onPress={() => handleFilterSelect(option.id)}
//                 >
//                   <View className="flex-row items-center">
//                     <View
//                       className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
//                         selectedFilter === option.id
//                           ? "bg-[#8A3FFC]"
//                           : "bg-gray-200"
//                       }`}
//                     >
//                       <MaterialIcons
//                         name={option.icon}
//                         size={20}
//                         color={selectedFilter === option.id ? "white" : "gray"}
//                       />
//                     </View>
//                     <Text
//                       className={`text-base ${
//                         selectedFilter === option.id
//                           ? "font-[PoppinsSemiBold] text-[#8A3FFC]"
//                           : "font-[PoppinsMedium] text-gray-700"
//                       }`}
//                     >
//                       {option.label}
//                     </Text>
//                   </View>

//                   {selectedFilter === option.id && (
//                     <MaterialIcons
//                       name="check-circle"
//                       size={24}
//                       color="#8A3FFC"
//                     />
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* Apply Button */}
//             {/* <TouchableOpacity
//               className="bg-[#8A3FFC] py-4 rounded-full mt-6 items-center"
//               onPress={() => setShowFilterModal(false)}
//             >
//               <Text className="text-white font-[PoppinsSemiBold] text-base">
//                 Apply Filter
//               </Text>
//             </TouchableOpacity> */}
//           </TouchableOpacity>
//         </TouchableOpacity>
//       </Modal>

//       <ScrollView className="p-4 mb-10">
//         {getPosts?.data?.data?.length === 0 ? (
//           <View className="items-center justify-center mt-20">
//             <Text className="text-gray-500 text-base mt-4 font-[PoppinsMedium]">
//               No Post found
//             </Text>

//             <TouchableOpacity className="mt-6 bg-[#8A3FFC] px-6 py-3 rounded-full">
//               <Text className="text-white font-[PoppinsSemiBold]">
//                 Create a post
//               </Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           getPosts?.data?.data?.map((item: any) => {
//             const date = new Date(item?.updatedAt);
//             const formattedDate = format(date, "do MMMM yyyy");

//             return (
//               <TouchableOpacity
//                 key={item._id}
//                 className="my-2"
//                 onPress={() => handleViewPost(item._id)}
//               >
//                 {/* Recommendation Header */}
//                 <View className="flex-row items-center justify-between mb-4">
//                   <View className="flex-row items-center">
//                     <View className="w-8 h-8 rounded-full bg-purple-200 items-center justify-center mr-3">
//                       <View className="w-6 h-6 rounded-full bg-pink-300 items-center justify-center">
//                         <MaterialIcons
//                           name="person"
//                           size={16}
//                           color="#8A3FFC"
//                         />
//                       </View>
//                     </View>
//                     <View>
//                       <Text className="text-sm font-[PoppinsSemiBold] text-black">
//                         {item.user?.fullname}
//                       </Text>
//                       <Text className="text-xs text-gray-500">
//                         {formattedDate}
//                       </Text>
//                     </View>
//                   </View>

//                   <TouchableOpacity onPress={() => handleSaveAndUnsave(item)}>
//                     {item.isSaved ? (
//                       <Ionicons name="bookmark" size={20} color="gray" />
//                     ) : (
//                       <Ionicons
//                         name="bookmark-outline"
//                         size={24}
//                         color="gray"
//                       />
//                     )}
//                   </TouchableOpacity>
//                 </View>

//                 {/* Title */}
//                 <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
//                   {item?.title}
//                 </Text>

//                 {/* Description */}
//                 <Text className="text-sm text-gray-600 mb-4 leading-5">
//                   {item?.content}
//                 </Text>

//                 {/* Hashtags */}
//                 <View className="flex-row mb-4">
//                   {item.hashtags?.map((tag: any) => (
//                     <View
//                       key={tag}
//                       className="bg-gray-200 rounded-full px-3 py-1 mr-2"
//                     >
//                       <Text className="text-xs text-gray-700">#{tag}</Text>
//                     </View>
//                   ))}
//                 </View>

//                 {/* Embedded Image */}
//                 <TouchableOpacity className="w-full h-48 bg-gray-200 rounded-lg mb-4">
//                   <Image
//                     source={{ uri: item.images[0] }}
//                     style={{
//                       height: "100%",
//                       width: "100%",
//                       borderRadius: 10,
//                     }}
//                     contentFit="cover"
//                     onError={(error) => console.log("Image error:", error)}
//                   />
//                 </TouchableOpacity>

//                 {/* Engagement Bar */}
//                 <View className="flex-row items-center justify-between">
//                   <View className="flex-row items-center">
//                     <View className="flex-row items-center mr-6">
//                       <TouchableOpacity
//                         onPress={() => handleLikeAndUnLike(item)}
//                       >
//                         {item.isLiked ? (
//                           <MaterialCommunityIcons
//                             name="thumb-up"
//                             size={16}
//                             color="black"
//                           />
//                         ) : (
//                           <MaterialCommunityIcons
//                             name="thumb-up-outline"
//                             size={16}
//                             color="black"
//                           />
//                         )}
//                       </TouchableOpacity>
//                       <Text className="text-xs text-gray-600 ml-1">
//                         {item?.likes} likes
//                       </Text>
//                     </View>
//                     <TouchableOpacity
//                       className="flex-row items-center"
//                       onPress={() => handleComments(item._id)}
//                     >
//                       <Feather name="message-circle" size={16} color="gray" />
//                       <Text className="text-xs text-gray-600 ml-1">
//                         {item.commentCount} Comments
//                       </Text>
//                     </TouchableOpacity>
//                   </View>

//                   <View className="flex-row items-center">
//                     <Feather name="share" size={16} color="gray" />
//                     <Text className="text-xs text-gray-600 ml-1">
//                       {item?.shares} shares
//                     </Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             );
//           })
//         )}
//       </ScrollView>
//     </Screen>
//   );
// };

// export default Communitypage;


// import { useGetAllPosts } from "@/src/api_services/postsApi/postQuery";
// import {
//   useLikePostApi,
//   useSavePostApi,
//   useUnLikePostApi,
//   useUnSavePostApi,
// } from "@/src/api_services/postsApi/postsMutation";
// import LoadingOverlay from "@/src/custom-components/LoadingOverlay";
// import Screen from "@/src/layout/Screen";
// import {
//   Feather,
//   Ionicons,
//   MaterialCommunityIcons,
//   MaterialIcons,
// } from "@expo/vector-icons";
// import { format } from "date-fns";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   Alert,
//   Modal,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const Communitypage = () => {
//   const router = useRouter();
//   const [showFilterModal, setShowFilterModal] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("all");
//   const [displayedPosts, setDisplayedPosts] = useState([]);

//   // API Queries - Enable/disable based on selected filter
//   const getAllPosts = useGetAllPosts({
//     enabled: selectedFilter === "all",
//   });

//   // TODO: Import these hooks from your postQuery file
//   // const getMyPosts = useGetMyPosts({
//   //   enabled: selectedFilter === "my-posts",
//   // });

//   // const getTrendingPosts = useGetTrendingPosts({
//   //   enabled: selectedFilter === "trending",
//   // });

//   // const getRecentPosts = useGetRecentPosts({
//   //   enabled: selectedFilter === "recent",
//   // });

//   // const getMostLikedPosts = useGetMostLikedPosts({
//   //   enabled: selectedFilter === "most-liked",
//   // });

//   // const getSavedPosts = useGetSavedPosts({
//   //   enabled: selectedFilter === "saved",
//   // });

//   const savePost = useSavePostApi();
//   const unSavePost = useUnSavePostApi();
//   const likePostApi = useLikePostApi();
//   const unLikePostApi = useUnLikePostApi();

//   // Update displayed posts based on selected filter
//   useEffect(() => {
//     switch (selectedFilter) {
//       case "all":
//         setDisplayedPosts(getAllPosts?.data?.data || []);
//         break;
//       case "my-posts":
//         // setDisplayedPosts(getMyPosts?.data?.data || []);
//         break;
//       case "trending":
//         // setDisplayedPosts(getTrendingPosts?.data?.data || []);
//         break;
//       case "recent":
//         // setDisplayedPosts(getRecentPosts?.data?.data || []);
//         break;
//       case "most-liked":
//         // setDisplayedPosts(getMostLikedPosts?.data?.data || []);
//         break;
//       case "saved":
//         // setDisplayedPosts(getSavedPosts?.data?.data || []);
//         break;
//       default:
//         setDisplayedPosts(getAllPosts?.data?.data || []);
//     }
//   }, [
//     selectedFilter,
//     getAllPosts?.data,
//     // getMyPosts?.data,
//     // getTrendingPosts?.data,
//     // getRecentPosts?.data,
//     // getMostLikedPosts?.data,
//     // getSavedPosts?.data,
//   ]);

//   // Determine loading state based on active query
//   const isLoading = () => {
//     switch (selectedFilter) {
//       case "all":
//         return getAllPosts.isLoading;
//       case "my-posts":
//         // return getMyPosts.isLoading;
//         return false;
//       case "trending":
//         // return getTrendingPosts.isLoading;
//         return false;
//       case "recent":
//         // return getRecentPosts.isLoading;
//         return false;
//       case "most-liked":
//         // return getMostLikedPosts.isLoading;
//         return false;
//       case "saved":
//         // return getSavedPosts.isLoading;
//         return false;
//       default:
//         return false;
//     }
//   };

//   const filterOptions = [
//     { id: "all", label: "All Posts", icon: "grid-view" },
//     { id: "my-posts", label: "My Posts", icon: "person" },
//     { id: "trending", label: "Trending", icon: "trending-up" },
//     { id: "recent", label: "Most Recent", icon: "access-time" },
//     { id: "most-liked", label: "Most Liked", icon: "thumb-up" },
//     { id: "saved", label: "Saved Posts", icon: "bookmark" },
//   ];

//   const handleFilterSelect = (filterId: string) => {
//     setSelectedFilter(filterId);
//     setShowFilterModal(false);
//   };

//   const openWebView = (itemUrl: string) => {
//     try {
//       const uri = itemUrl;

//       if (!uri) {
//         Alert.alert("No article Url found");
//         return;
//       }
//       router.push({
//         pathname: "/profilepage/profile-screen/recommendations-webview",
//         params: { item: JSON.stringify(uri) },
//       });
//     } catch (error) {
//       Alert.alert("Failed to fetch article Url");
//     }
//   };

//   const handleSaveAndUnsave = (item: any) => {
//     if (item.isSaved) {
//       unSavePost.mutate({
//         id: item._id,
//       });
//     } else {
//       savePost.mutate({
//         id: item._id,
//       });
//     }
//   };

//   const handleLikeAndUnLike = (item: any) => {
//     if (item.isLiked) {
//       unLikePostApi.mutate({
//         id: item._id,
//       });
//     } else {
//       likePostApi.mutate({
//         id: item._id,
//       });
//     }
//   };

//   const handleViewPost = (postId: string) => {
//     router.push({
//       pathname: `/(tabs)/communitypage/view-post`,
//       params: { item: JSON.stringify(postId) },
//     });
//   };

//   const handleComments = (postId: string) => {
//     router.push({
//       pathname: `/(tabs)/communitypage/comments`,
//       params: { item: JSON.stringify(postId) },
//     });
//   };

//   return (
//     <Screen className="px-4 py-3">
//       <LoadingOverlay isOpen={isLoading()} animationType="pulse" />

//       <TouchableOpacity
//         className="flex-row items-center justify-between"
//         onPress={() => {
//           router.push("/(tabs)/communitypage/create-post");
//         }}
//       >
//         <View className="flex-row items-center">
//           <View className="mx-3 bg-slate-400 h-10 w-10 items-center justify-center rounded-full">
//             <Text>US</Text>
//           </View>
//           <View>
//             <Text>What's on your thoughts?</Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           className="p-2"
//           onPress={() => setShowFilterModal(true)}
//         >
//           <View className="relative">
//             <MaterialIcons name="filter-list" size={24} color="black" />
//             {selectedFilter !== "all" && (
//               <View className="absolute -top-1 -right-1 w-3 h-3 bg-purple-600 rounded-full" />
//             )}
//           </View>
//         </TouchableOpacity>
//       </TouchableOpacity>

//       <View className="h-0.5 bg-slate-200 my-2" />

//       {/* Active Filter Indicator */}
//       {selectedFilter !== "all" && (
//         <View className="flex-row items-center justify-between bg-purple-50 p-3 rounded-lg mb-2">
//           <View className="flex-row items-center">
//             <MaterialIcons
//               name={filterOptions.find((f) => f.id === selectedFilter)?.icon}
//               size={16}
//               color="#8A3FFC"
//             />
//             <Text className="text-sm text-[#8A3FFC] ml-2 font-[PoppinsMedium]">
//               {filterOptions.find((f) => f.id === selectedFilter)?.label}
//             </Text>
//           </View>
//           <TouchableOpacity
//             onPress={() => setSelectedFilter("all")}
//             className="px-3 py-1 bg-white rounded-full"
//           >
//             <Text className="text-xs text-gray-600">Clear</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Filter Modal */}
//       <Modal
//         visible={showFilterModal}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setShowFilterModal(false)}
//       >
//         <TouchableOpacity
//           className="flex-1 bg-black/50 justify-end"
//           activeOpacity={1}
//           onPress={() => setShowFilterModal(false)}
//         >
//           <TouchableOpacity
//             className="bg-white rounded-t-3xl p-6"
//             activeOpacity={1}
//             onPress={(e) => e.stopPropagation()}
//           >
//             {/* Modal Header */}
//             <View className="flex-row items-center justify-between mb-6">
//               <Text className="text-xl font-[PoppinsSemiBold] text-black">
//                 Filter Posts
//               </Text>
//               <TouchableOpacity
//                 onPress={() => setShowFilterModal(false)}
//                 className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
//               >
//                 <MaterialIcons name="close" size={20} color="gray" />
//               </TouchableOpacity>
//             </View>

//             {/* Filter Options */}
//             <View className="space-y-2">
//               {filterOptions.map((option) => (
//                 <TouchableOpacity
//                   key={option.id}
//                   className={`flex-row items-center justify-between p-4 rounded-xl ${
//                     selectedFilter === option.id
//                       ? "bg-purple-100 border-2 border-[#8A3FFC]"
//                       : "bg-gray-50"
//                   }`}
//                   onPress={() => handleFilterSelect(option.id)}
//                 >
//                   <View className="flex-row items-center">
//                     <View
//                       className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
//                         selectedFilter === option.id
//                           ? "bg-[#8A3FFC]"
//                           : "bg-gray-200"
//                       }`}
//                     >
//                       <MaterialIcons
//                         name={option.icon}
//                         size={20}
//                         color={selectedFilter === option.id ? "white" : "gray"}
//                       />
//                     </View>
//                     <Text
//                       className={`text-base ${
//                         selectedFilter === option.id
//                           ? "font-[PoppinsSemiBold] text-[#8A3FFC]"
//                           : "font-[PoppinsMedium] text-gray-700"
//                       }`}
//                     >
//                       {option.label}
//                     </Text>
//                   </View>

//                   {selectedFilter === option.id && (
//                     <MaterialIcons
//                       name="check-circle"
//                       size={24}
//                       color="#8A3FFC"
//                     />
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* Apply Button */}
//             <TouchableOpacity
//               className="bg-[#8A3FFC] py-4 rounded-full mt-6 items-center"
//               onPress={() => setShowFilterModal(false)}
//             >
//               <Text className="text-white font-[PoppinsSemiBold] text-base">
//                 Apply Filter
//               </Text>
//             </TouchableOpacity>
//           </TouchableOpacity>
//         </TouchableOpacity>
//       </Modal>

//       <ScrollView className="p-4 mb-10">
//         {displayedPosts?.length === 0 ? (
//           <View className="items-center justify-center mt-20">
//             <Text className="text-gray-500 text-base mt-4 font-[PoppinsMedium]">
//               No Post found
//             </Text>

//             <TouchableOpacity
//               onPress={() => router.push("/(tabs)/communitypage/create-post")}
//               className="mt-6 bg-[#8A3FFC] px-6 py-3 rounded-full"
//             >
//               <Text className="text-white font-[PoppinsSemiBold]">
//                 Create a post
//               </Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           displayedPosts?.map((item: any) => {
//             const date = new Date(item?.updatedAt);
//             const formattedDate = format(date, "do MMMM yyyy");

//             return (
//               <TouchableOpacity
//                 key={item._id}
//                 className="my-2"
//                 onPress={() => handleViewPost(item._id)}
//               >
//                 {/* Recommendation Header */}
//                 <View className="flex-row items-center justify-between mb-4">
//                   <View className="flex-row items-center">
//                     <View className="w-8 h-8 rounded-full bg-purple-200 items-center justify-center mr-3">
//                       <View className="w-6 h-6 rounded-full bg-pink-300 items-center justify-center">
//                         <MaterialIcons
//                           name="person"
//                           size={16}
//                           color="#8A3FFC"
//                         />
//                       </View>
//                     </View>
//                     <View>
//                       <Text className="text-sm font-[PoppinsSemiBold] text-black">
//                         {item.user?.fullname}
//                       </Text>
//                       <Text className="text-xs text-gray-500">
//                         {formattedDate}
//                       </Text>
//                     </View>
//                   </View>

//                   <TouchableOpacity onPress={() => handleSaveAndUnsave(item)}>
//                     {item.isSaved ? (
//                       <Ionicons name="bookmark" size={20} color="gray" />
//                     ) : (
//                       <Ionicons
//                         name="bookmark-outline"
//                         size={24}
//                         color="gray"
//                       />
//                     )}
//                   </TouchableOpacity>
//                 </View>

//                 {/* Title */}
//                 <Text className="text-lg font-[PoppinsSemiBold] text-black mb-3">
//                   {item?.title}
//                 </Text>

//                 {/* Description */}
//                 <Text className="text-sm text-gray-600 mb-4 leading-5">
//                   {item?.content}
//                 </Text>

//                 {/* Hashtags */}
//                 <View className="flex-row mb-4">
//                   {item.hashtags?.map((tag: any) => (
//                     <View
//                       key={tag}
//                       className="bg-gray-200 rounded-full px-3 py-1 mr-2"
//                     >
//                       <Text className="text-xs text-gray-700">#{tag}</Text>
//                     </View>
//                   ))}
//                 </View>

//                 {/* Embedded Image */}
//                 <TouchableOpacity className="w-full h-48 bg-gray-200 rounded-lg mb-4">
//                   <Image
//                     source={{ uri: item.images[0] }}
//                     style={{
//                       height: "100%",
//                       width: "100%",
//                       borderRadius: 10,
//                     }}
//                     contentFit="cover"
//                     onError={(error) => console.log("Image error:", error)}
//                   />
//                 </TouchableOpacity>

//                 {/* Engagement Bar */}
//                 <View className="flex-row items-center justify-between">
//                   <View className="flex-row items-center">
//                     <View className="flex-row items-center mr-6">
//                       <TouchableOpacity
//                         onPress={() => handleLikeAndUnLike(item)}
//                       >
//                         {item.isLiked ? (
//                           <MaterialCommunityIcons
//                             name="thumb-up"
//                             size={16}
//                             color="black"
//                           />
//                         ) : (
//                           <MaterialCommunityIcons
//                             name="thumb-up-outline"
//                             size={16}
//                             color="black"
//                           />
//                         )}
//                       </TouchableOpacity>
//                       <Text className="text-xs text-gray-600 ml-1">
//                         {item?.likes} likes
//                       </Text>
//                     </View>
//                     <TouchableOpacity
//                       className="flex-row items-center"
//                       onPress={() => handleComments(item._id)}
//                     >
//                       <Feather name="message-circle" size={16} color="gray" />
//                       <Text className="text-xs text-gray-600 ml-1">
//                         {item.commentCount} Comments
//                       </Text>
//                     </TouchableOpacity>
//                   </View>

//                   <View className="flex-row items-center">
//                     <Feather name="share" size={16} color="gray" />
//                     <Text className="text-xs text-gray-600 ml-1">
//                       {item?.shares} shares
//                     </Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             );
//           })
//         )}
//       </ScrollView>
//     </Screen>
//   );
// };

// export default Communitypage;