// import { useGetArticleApi } from "@/src/api_services/articleApi/articleQuery";
// import { truncateSimple } from "@/src/lib/truncateSimple";
// import { Feather } from "@expo/vector-icons";
// import { format } from "date-fns";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React from "react";
// import {
//   Alert,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";

// const TabsArticles = () => {
//   const router = useRouter()
//   const getArticles = useGetArticleApi();


//   // const openWebView = (itemUrl: string) => {
//   //   console.log("itemUrl", itemUrl);
//   //   router.push({
//   //     pathname: "/homepage/articles-webview",
//   //     params: { item: JSON.stringify(itemUrl) },
//   //   });
//   // };

//    const openWebView = (itemUrl:string) => {
//      try {
//        const uri = itemUrl;

//        if (!uri) {
//          Alert.alert("No  article Url found");
//          return;
//        }
//        router.push({
//          pathname: "/homepage/articles-webview",
//          params: { item: JSON.stringify(uri) },
//        });
//      } catch (error) {
//        Alert.alert("Failed to fetch article Url");
//      }
//    };

//   return (
//     <View className="">
//       <Text className=" my-3 font-[PoppinsSemiBold] text-base">Articles</Text>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false} className=" pb-40">
//         {getArticles.data?.data
//           ?.reduce((rows: any[][], item: any, index: number) => {
//             if (index % 2 === 0) rows.push([item]);
//             else rows[rows.length - 1].push(item);
//             return rows;
//           }, [])
//           .map((pair: any[], idx: number) => (
//             <View key={idx} className="flex-col w-60 mx-2">
//               {pair.map((item) => {
//                 const date = new Date(item.publishedAt);
//                 const formattedDate = format(date, "do MMMM yyyy");

//                 return (
//                   <TouchableOpacity
//                     key={item.id}
//                     className="mb-4 h-auto"
//                     onPress={() => openWebView(item.url)}
//                   >
//                     <View className="w-60 h-40">
//                       <Image
//                         source={item.images[0]}
//                         style={{
//                           height: "100%",
//                           width: "100%",
//                           borderRadius: 10,
//                         }}
//                         contentFit="cover"
//                         onError={(error) => console.log("Image error:", error)}
//                       />
//                     </View>

//                     <View className="my-2">
//                       <Text className="text-primary text-xs font-[PoppinsMedium]">
//                         {item.author} • {formattedDate}
//                       </Text>
//                     </View>

//                     <View className="flex-row text-sm items-center justify-between">
//                       <Text className="font-[PoppinsSemiBold]">
//                         {truncateSimple(item.title, 17)}
//                       </Text>

//                       <TouchableOpacity onPress={() => openWebView(item.url)}>
//                         <Feather
//                           name="arrow-up-right"
//                           size={24}
//                           color="black"
//                         />
//                       </TouchableOpacity>
//                     </View>

//                     <View className="my-1 h-auto">
//                       <Text className="text-sm font-[PoppinsLight]">
//                         {item.summary}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default TabsArticles;


import { useGetArticleApi } from "@/src/api_services/articleApi/articleQuery";
import { truncateSimple } from "@/src/lib/truncateSimple";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

const TabsArticles = () => {
  const router = useRouter();
  const getArticles = useGetArticleApi();

  const openWebView = (itemUrl: string) => {
    try {
      const uri = itemUrl;

      if (!uri) {
        Alert.alert("No  article Url found");
        return;
      }
      router.push({
        pathname: "/homepage/articles-webview",
        params: { item: JSON.stringify(uri) },
      });
    } catch (error) {
      Alert.alert("Failed to fetch article Url");
    }
  };

  return (
    <View className="">
      <Text className=" my-3 font-[PoppinsSemiBold] text-base">Articles</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=" pb-40"
      >
        {getArticles.data?.data?.map((item: any) => {
          const date = new Date(item.publishedAt);
          const formattedDate = format(date, "do MMMM yyyy");

          return (
            <TouchableOpacity
              key={item.id}
              className="mb-4 h-auto w-60 mx-2"
              onPress={() => openWebView(item.url)}
            >
              <View className="w-60 h-40">
                <Image
                  source={item.images[0]}
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 10,
                  }}
                  contentFit="cover"
                  onError={(error) => console.log("Image error:", error)}
                />
              </View>

              <View className="my-2">
                <Text className="text-primary text-xs font-[PoppinsMedium]">
                  {item.author} • {formattedDate}
                </Text>
              </View>

              <View className="flex-row text-sm items-center justify-between">
                <Text className="font-[PoppinsSemiBold]">
                  {truncateSimple(item.title, 17)}
                </Text>

                <TouchableOpacity onPress={() => openWebView(item.url)}>
                  <Feather name="arrow-up-right" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <View className="my-1 h-auto">
                <Text className="text-sm font-[PoppinsLight]">
                  {item.summary}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabsArticles;