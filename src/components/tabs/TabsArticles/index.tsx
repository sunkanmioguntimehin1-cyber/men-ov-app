import { useGetArticleApi } from "@/src/api_services/articleApi/articleQuery";
import { truncateSimple } from "@/src/lib/truncateSimple";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { Image } from "expo-image";
import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TabsArticles = () => {
  const getArticles = useGetArticleApi();

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
    <View className="">
      <Text className=" my-3 font-[PoppinsSemiBold] text-base">Articles</Text>

      <ScrollView horizontal className=" flex-row">
        {getArticles.data?.data?.map((item: any) => {
          console.log(item.publishedAt);
          // const date = parseISO(item?.publishedAt);
          const date = new Date(item.publishedAt);
          const formattedDate = format(date, "do MMMM yyyy");

          console.log("item", item.title);
          return (
            <View key={item.id} className=" w-60 mx-2 h-auto">
              <View className=" w-60 h-40 ">
                <Image
                  source={item.images[0]}
                  style={{
                    height: "100%",
                    width: "100%",
                    // alignSelf: "center",
                    borderRadius: 10,
                  }}
                  contentFit="cover"
                  onError={(error) => console.log("Image error:", error)}
                />
              </View>
              <View className="my-2">
                <Text className=" text-primary text-xs font-[PoppinsMedium]">
                  {item.author} • {formattedDate}
                </Text>
              </View>

              <View className=" flex-row text-sm  items-center justify-between">
                <Text className=" font-[PoppinsSemiBold]">
                  {/* My Recommendations */}
                  {truncateSimple(item.title, 17)}
                </Text>

                <TouchableOpacity onPress={() => handleOpenArticle(item.url)}>
                  <Feather name="arrow-up-right" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <View className="my-1 h-auto  ">
                <Text className="text-sm font-[PoppinsLight]">
                  {item.summary}
                </Text>
              </View>
            </View>
          );
        })}

       
      </ScrollView>
    </View>
  );
};

export default TabsArticles;
