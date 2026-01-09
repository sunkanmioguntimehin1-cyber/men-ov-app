

import { useGetSearchResult } from "@/src/api_services/exploreApi/exploreQuery";
import { GradientText } from "@/src/components/GradientText";
import { GradientIoniconsIcon } from "@/src/custom-components/GradientIcon";
import Screen from "@/src/layout/Screen";
import { Ionicons } from "@expo/vector-icons";
import { Image, ImageBackground } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

const ViewSearchResult = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const newData = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

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
        pathname: "/(tabs)/explorepage/explore-webview",
        params: { item: JSON.stringify(uri) },
      });
    } catch (error) {
      Alert.alert("Failed to fetch article Url");
    }
  };

  return (
    <Screen scroll={false} className="bg-[#FCFCFD]">
      {/* Header */}

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
      <ImageBackground
        source={require("@/assets/images/ai2.png")}
        style={{
          height: "100%",
          width: "100%",
        }}
        contentFit="cover"
      >
        <ScrollView className="flex-1">
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
                  <GradientText className="font-[PoppinsSemiBold] text-base mr-2">
                    Read post
                  </GradientText>
                  <GradientIoniconsIcon
                    name="arrow-forward"
                    size={20}
                    gradientColors={[
                      "#6B5591",
                      "#6E3F8C",
                      "#853385",
                      "#9F3E83",
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ImageBackground>
    </Screen>
  );
};

export default ViewSearchResult;
