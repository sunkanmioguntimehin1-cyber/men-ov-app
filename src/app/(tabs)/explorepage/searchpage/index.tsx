import { useGetPopularSearch } from "@/src/api_services/exploreApi/exploreQuery";
import { GradientIoniconsIcon } from "@/src/custom-components/GradientIcon";
import Screen from "@/src/layout/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SearchPage = () => {
  const router = useRouter();
  const [searchText, setSearchText] = React.useState("");

  const getPopularSearch = useGetPopularSearch(searchText);

  React.useEffect(() => {
    getPopularSearch.refetch();
  }, [searchText, getPopularSearch]);

  const handleSearchResult = (item: string) => {
    router.push({
      pathname: "/(tabs)/explorepage/view-search-result",
      params: { item: JSON.stringify(item) },
    });
  };

  return (
    <Screen className="px-8">
      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="bg-white flex-1 rounded-2xl px-4 py-3 flex-row items-center border border-primary shadow-sm ml-3">
          <GradientIoniconsIcon
            name="search"
            size={20}
            gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
          />
          <TextInput
            placeholder="Search symptoms, tips, community posts"
            placeholderTextColor="#9B9B9B"
            onChangeText={(text) => {
              setSearchText(text);
            }}
            className="flex-1 ml-3 text-base bg-white"
            value={searchText}
          />
        </View>
      </View>

      <View>
        <Text className="font-[PoppinsSemiBold] text-lg mb-4 text-black">
          {searchText ? "Search Results" : "Popular Searches"}
        </Text>

        {getPopularSearch.isLoading ? (
          <View className="items-center py-8">
            <ActivityIndicator size="large" color="#8553F3" />
          </View>
        ) : getPopularSearch?.data?.topics?.length > 0 ? (
          getPopularSearch.data.topics.map((item: any, index: number) => (
            <TouchableOpacity
              key={item.id || index}
              className="flex-row items-center py-4 border-b border-gray-200"
              onPress={() => {
                // Handle search action
                console.log("Search:", item);
                handleSearchResult(item.tag);
              }}
            >
              <GradientIoniconsIcon
                name="search"
                size={20}
                gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
              />
              <Text className="text-gray-700 text-base ml-4 flex-1 font-[PoppinsRegular]">
                {item.tag}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View className="items-center py-8">
            {/* <Ionicons name="search-outline" size={48} color="#D1D5DB" /> */}
            <GradientIoniconsIcon
              name="search-outline"
              size={48}
              gradientColors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
            />
            <Text className="text-gray-500 text-base mt-4 font-[PoppinsRegular] text-center">
              {searchText
                ? `No results found for "${searchText}"`
                : "No popular searches available"}
            </Text>
            {searchText && (
              <Text className="text-gray-400 text-sm mt-2 font-[PoppinsRegular] text-center px-8">
                Try adjusting your search terms
              </Text>
            )}
          </View>
        )}
      </View>
    </Screen>
  );
};

export default SearchPage;
