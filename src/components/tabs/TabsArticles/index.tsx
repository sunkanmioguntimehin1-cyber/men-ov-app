import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const TabsArticles = () => {
  return (
    <View className="">
      <Text className=" my-3 font-[PoppinsSemiBold] text-base">Articles</Text>

      <View className=" flex-row">
        <View className=" w-60 h-auto">
          <View className=" w-60 h-40 ">
            <Image
              source={require("@/assets/images/article.png")}
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
              Olivia Rhye • 20 May 2025
            </Text>
          </View>

          <View className=" flex-row text-sm  items-center justify-between">
            <Text className=" font-[PoppinsSemiBold]">My Recommendations</Text>

            <TouchableOpacity>
              <Feather name="arrow-up-right" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View className="my-1 h-auto  ">
            <Text className="text-sm font-[PoppinsLight]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis
              eos exercitationem quisquam quia quod et laboriosam
            </Text>
          </View>
        </View>

        <View className=" w-60 h-auto mx-5">
          <View className=" w-60 h-40 ">
            <Image
              source={require("@/assets/images/article.png")}
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
              Olivia Rhye • 20 May 2025
            </Text>
          </View>

          <View className=" flex-row text-sm  items-center justify-between">
            <Text className=" font-[PoppinsSemiBold]">My Recommendations</Text>

            <TouchableOpacity>
              <Feather name="arrow-up-right" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View className="my-1 h-auto  ">
            <Text className="text-sm font-[PoppinsLight]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis
              eos exercitationem quisquam quia quod et laboriosam
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default TabsArticles