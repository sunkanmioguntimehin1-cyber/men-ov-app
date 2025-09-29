import { useGetLogApi } from "@/src/api_services/logApi/logQuery";
import { rS } from "@/src/lib/responsivehandler";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const YourLastSymptoms = ({ handleOpenLastSymptoms }:any) => {
  const router = useRouter()
    const getAllLog = useGetLogApi();

    console.log("logs:", getAllLog?.data);

    const SeverityLevelData = [
      { level: "Lvl 1", levelColor: "#20D72A" },
      { level: "Lvl 2", levelColor: "#D7CE20" },
      { level: "Lvl 3", levelColor: "#D77F20" },
      { level: "Lvl 4", levelColor: "#D72020" },
    ];

  return (
    <View>
      <View className=" flex-row items-center justify-between">
        <Text
          className="mb-2 font-[PoppinsMedium] text-black"
          style={{ fontSize:  rS(12) }}
        >
          Your last symptoms
        </Text>
        <TouchableOpacity onPress={()=>{
          router.push("/profilepage/summary-screen")
        }}>
          <Text
            className="mb-2 font-[PoppinsMedium] text-black"
            style={{ fontSize: rS(12) }}
          >
            View
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal className="">
        {getAllLog?.data?.slice(0,5).map((item: any) => {
          return (
            <TouchableOpacity
              key={item.id}
              className=" bg-[#8A3FFC] h-20  rounded-xl mx-1"
              onPress={() => handleOpenLastSymptoms(item)}
            >
              <View className=" mb-3 flex-row items-center justify-between p-2">
                <View className=" w-6 h-6">
                  <Image
                    source={require("@/assets/images/sman.png")}
                    style={{
                      height: "100%",
                      width: "100%",
                      // alignSelf: "center",
                      borderRadius: 100,
                    }}
                    contentFit="contain"
                    onError={(error) => console.log("Image error:", error)}
                  />
                </View>

                <View>
                  <Text className="text-white">{item.symptoms}</Text>
                </View>

                <View
                  className="items-center justify-center  w-5 h-5 rounded-full mx-2"
                  style={{
                    backgroundColor:
                      SeverityLevelData[item.severityLevel - 1]?.levelColor ||
                      "#D0D5DD",
                  }}
                >
                  <Text className="text-sm text-white">
                    {item.severityLevel}
                  </Text>
                </View>
              </View>

              <Text className=" text-center text-xs text-white font-[PoppinsMedium] px-2">
                {item.recommendation
                  ? item.recommendation
                  : " Don't forget to hydrate"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default YourLastSymptoms;
