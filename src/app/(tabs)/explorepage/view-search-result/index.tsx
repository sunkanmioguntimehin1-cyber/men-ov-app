// import Screen from '@/src/layout/Screen';
// import React from 'react';
// import { ImageBackground, Text } from 'react-native';

// const ViewSearchResult = () => {
//   return (
//     <Screen scroll={true} className="bg-[#FCFCFD]">
//   <ImageBackground
//     source={require("@/assets/images/background.png")}
//     style={{
//       height: "60%",
//       width: "100%",
//     }}
//     resizeMode="cover"
//   >
//         <Text>ViewSearchResult</Text>
//       </ImageBackground>
//     </Screen>
//   );
// }

// export default ViewSearchResult

import { useGetSearchResult } from "@/src/api_services/exploreApi/exploreQuery";
import Screen from "@/src/layout/Screen";
import { Ionicons } from "@expo/vector-icons";
import { Image, ImageBackground } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const ViewSearchResult = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const newData = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

  console.log("newData", newData);

  const getSearchResult = useGetSearchResult(newData);

  React.useEffect(() => {
    if (newData) getSearchResult.refetch();
  }, [newData, getSearchResult]);

  const searchResult = getSearchResult?.data?.articles;

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

  return (
    <Screen scroll={true} className="bg-[#FCFCFD]">
      {/* Header */}
      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={{
          height: "20%",
          width: "100%",
        }}
        contentFit="cover"
      >
        <View className="flex-row items-center justify-center py-4 px-4 bg-white">
          <TouchableOpacity
            className="absolute left-4"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-[PoppinsSemiBold] text-lg text-black">
            {getSearchResult?.data?.query}
          </Text>
        </View>

        <View className="flex-1">
          {searchResult?.map((post: any, index: number) => (
            <TouchableOpacity
              key={post.id}
              className="mx-4 mb-6 bg-white rounded-3xl overflow-hidden shadow-sm"
              onPress={() => openWebView(post?.url)}
            >
              {/* Post Image */}
              <Image
                source={{ uri: post.images[0] }}
                style={{
                  width: "100%",
                  height: 240,
                }}
                contentFit="cover"
              />

              {/* Post Content */}
              <View className="p-5">
                <Text className="font-[PoppinsSemiBold] text-lg text-black mb-2">
                  {post.title}
                </Text>
                <Text className="font-[PoppinsRegular] text-sm text-gray-600 mb-4 leading-5">
                  {post.summary}
                </Text>

                {/* Read Post Button */}
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => {
                    openWebView(post.url);
                  }}
                >
                  <Text className="font-[PoppinsSemiBold] text-base text-[#8553F3] mr-2">
                    Read post
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="#8553F3" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>
    </Screen>
  );
};

export default ViewSearchResult;
