import {
  useCycleTrackingApi,
  useGetLogApi,
} from "@/src/api_services/logApi/logQuery";
import { useGetIntakeDetails } from "@/src/api_services/userApi/userQuery";
import SafeScreen from "@/src/components/SafeScreen";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { formatDistance, parseISO } from "date-fns";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const SummaryScreen = () => {
  const router = useRouter();
  const getAllLog = useGetLogApi();
  const getCycleTracking = useCycleTrackingApi();
  const getIntakeDetails = useGetIntakeDetails();

  const SeverityLevelData = [
    { level: "lvl 1", levelColor: "#20D72A", badgeColor: "#D7CE20" },
    { level: "lvl 2", levelColor: "#D7CE20", badgeColor: "#D7CE20" },
    { level: "lvl 3", levelColor: "#D77F20", badgeColor: "#D77F20" },
    { level: "lvl 4", levelColor: "#D72020", badgeColor: "#D72020" },
  ];

  const logs = getAllLog?.data || [];
  const getCycleTracker = getCycleTracking?.data?.data || [];

  // 1. Determine if EVERYTHING is empty
  const isEmpty = logs.length === 0 && getCycleTracker.length === 0;

  const symptomsData = [
    {
      name: "Back Pain",
      img: require("@/assets/images/backpain2.png"),
    },
    {
      name: "Headache",
      img: require("@/assets/images/headache2.png"),
    },
    {
      name: "Heart Palpitations",
      img: require("@/assets/images/heart_palpitations2.png"),
    },
    {
      name: "Anxiety",
      img: require("@/assets/images/anxiety2.png"),
    },
    {
      name: "Describe how you feel",
      img: require("@/assets/images/anxiety2.png"),
    },
  ];

  const getSymptomImage = (iconName: string) => {
    const symptom = symptomsData.find(
      (item) => item.name.toLowerCase() === iconName.toLowerCase()
    );
    return symptom?.img || require("@/assets/images/general.png");
  };

  const aiInsight = "Your back pain often occurs on days with elevated stress";

  return (
    <SafeScreen className="bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-8 py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-[PoppinsSemiBold] text-black">
            Summary
          </Text>
          <View />
        </View>

        <View className="px-8 pb-8">
          {isEmpty ? (
            /* 👉 Empty State UI - Only shows if BOTH are empty */
            <View className="items-center justify-center mt-20">
              <Text className="text-gray-500 text-base mt-4 font-[PoppinsMedium]">
                No logs found
              </Text>
              <Text className="text-gray-400 text-sm mt-2 text-center px-6">
                {`You haven't added any symptoms or cycle data yet.`}
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/homepage")}
                className="mt-6"
              >
                <LinearGradient
                  colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                  style={{
                    minHeight: 56,
                    paddingHorizontal: 24,
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text className="text-white font-[PoppinsSemiBold]">
                    Add Log
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Symptoms Section - Only shows if logs exist */}
              {logs.length > 0 && (
                <View className="mb-8">
                  <Text className="text-lg font-[PoppinsSemiBold] text-black mb-4">
                    How do you Feel today?
                  </Text>
                  {logs.map((symptom: any) => (
                    <LinearGradient
                      key={symptom.id}
                      colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                      style={{
                        borderRadius: 10,
                        padding: 16,
                        marginBottom: 10,
                      }}
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                          <View className="w-8 h-8 mr-3">
                            <Image
                              source={getSymptomImage(symptom.icon)}
                              style={{ height: "100%", width: "100%" }}
                              contentFit="contain"
                            />
                          </View>
                          <View className="flex-1">
                            <Text className="text-white font-[PoppinsSemiBold] text-base">
                              {symptom.symptoms}
                            </Text>
                            <Text className="text-white text-[10px] mt-1">
                              {symptom.recommendation}
                            </Text>
                          </View>
                        </View>
                        <View
                          className="px-2 py-1 rounded-lg"
                          style={{
                            backgroundColor:
                              SeverityLevelData[symptom.severityLevel - 1]
                                ?.badgeColor,
                          }}
                        >
                          <Text className="text-white text-xs font-[PoppinsMedium]">
                            {
                              SeverityLevelData[symptom.severityLevel - 1]
                                ?.level
                            }
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  ))}
                </View>
              )}

              {/* Cycle Summary Section - Only shows if cycle data exists */}
              {getCycleTracker.length > 0 && (
                <View className="mb-8">
                  <Text className="text-lg font-[PoppinsSemiBold] text-black mb-4">
                    Cycle summary
                  </Text>
                  {getCycleTracker.slice(0, 4).map((item: any) => {
                    const distance = item?.start
                      ? formatDistance(parseISO(item.start), new Date(), {
                          addSuffix: true,
                        })
                      : "N/A";
                    return (
                      <LinearGradient
                        key={item.id}
                        colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                        style={{
                          borderRadius: 10,
                          padding: 16,
                          marginBottom: 10,
                        }}
                      >
                        <Text className="text-white font-[PoppinsSemiBold] text-base">
                          {item.menopauseStage}
                        </Text>
                        <Text className="text-white text-[10px] mt-1">
                          Last period {distance}
                        </Text>
                      </LinearGradient>
                    );
                  })}
                </View>
              )}

              {/* AI Insights - Only show if there are symptoms to talk about */}
              {logs.length > 0 && (
                <View className="mb-8">
                  <Text className="text-lg font-[PoppinsSemiBold] text-black mb-4">
                    AI insights
                  </Text>
                  <View className="bg-white border border-gray-200 rounded-xl p-4 flex-row items-center">
                    <MaterialCommunityIcons
                      name="lightbulb-on-outline"
                      size={24}
                      color="#712A87"
                      style={{ marginRight: 12 }}
                    />
                    <Text className="text-gray-700 text-sm flex-1 font-[PoppinsMedium]">
                      {aiInsight}
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default SummaryScreen;
