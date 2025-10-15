import {
  useCycleTrackingApi,
  useGetLogApi,
} from "@/src/api_services/logApi/logQuery";
import SafeScreen from "@/src/components/SafeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { formatDistance, parseISO } from "date-fns";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const SummaryScreen = () => {
  const router = useRouter();
  const getAllLog = useGetLogApi();
  const getCycleTracking = useCycleTrackingApi();

  const SeverityLevelData = [
    { level: "lvl 1", levelColor: "#20D72A", badgeColor: "#D7CE20" },
    { level: "lvl 2", levelColor: "#D7CE20", badgeColor: "#D7CE20" },
    { level: "lvl 3", levelColor: "#D77F20", badgeColor: "#D77F20" },
    { level: "lvl 4", levelColor: "#D72020", badgeColor: "#D72020" },
  ];

  const logs = getAllLog?.data || [];

  // console.log("logs234:", logs);
  // console.log("getCycleTracking:", getCycleTracking?.data?.data);

  // Mock data for demonstration - replace with actual data
  // const symptomsData = [
  //   {
  //     id: 1,
  //     name: "Back Pain",
  //     icon: require("@/assets/images/backpain.png"),
  //     recommendation: "Don't forget to hydrate.",
  //     severityLevel: 2,
  //   },
  //   {
  //     id: 2,
  //     name: "Heart Palpitations",
  //     icon: require("@/assets/images/heart_palpitations.png"),
  //     recommendation: "Don't forget to hydrate.",
  //     severityLevel: 3,
  //   },
  // ];

  const symptomsData = [
    {
      name: "Back Pain",
      img: require("@/assets/images/backpain.png"),
    },
    {
      name: "Headache",
      img: require("@/assets/images/headache.png"),
    },
    {
      name: "Heart Palpitations",
      img: require("@/assets/images/heart_palpitations.png"),
    },
    {
      name: "Anxiety",
      img: require("@/assets/images/anxiety.png"),
    },
    {
      name: "Describe how you feel",
      img: require("@/assets/images/general.png"),
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
          {logs.length === 0 ? (
            // 👉 Empty State UI
            <View className="items-center justify-center mt-20">
              <Text className="text-gray-500 text-base mt-4 font-[PoppinsMedium]">
                No logs found
              </Text>
              <Text className="text-gray-400 text-sm mt-2 text-center px-6">
                {
                  "You haven't added any symptoms yet. Start logging to see your summary here."
                }
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/(tabs)/homepage")}
                className="mt-6 bg-[#8A3FFC] px-6 py-3 rounded-full"
              >
                <Text className="text-white font-[PoppinsSemiBold]">
                  Add Log
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* How do you Feel today? Section */}
              <View className="mb-8">
                <Text className="text-lg font-[PoppinsSemiBold] text-black mb-4">
                  How do you Feel today?
                </Text>

                {logs.map((symptom: any) => (
                  <View
                    key={symptom.id}
                    className="bg-[#8A3FFC] rounded-xl p-4 mb-3"
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center flex-1">
                        <View className="w-8 h-8 mr-3">
                          <Image
                            source={getSymptomImage(symptom.icon)}
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                            contentFit="contain"
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-white font-[PoppinsSemiBold] text-base">
                            {symptom.symptoms}
                          </Text>
                          <Text className="text-white text-sm mt-1">
                            {symptom.recommendation}
                          </Text>
                        </View>
                      </View>

                      <View
                        className="px-2 py-1 rounded-lg border"
                        style={{
                          backgroundColor:
                            SeverityLevelData[symptom.severityLevel - 1]
                              ?.badgeColor,
                          borderColor:
                            SeverityLevelData[symptom.severityLevel - 1]
                              ?.badgeColor,
                        }}
                      >
                        <Text className="text-black text-xs font-[PoppinsMedium]">
                          {SeverityLevelData[symptom.severityLevel - 1]?.level}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Cycle summary Section */}
              <View className="mb-8">
                <Text className="text-lg font-[PoppinsSemiBold] text-black mb-4">
                  Cycle summary
                </Text>

                {getCycleTracking?.data?.data.map((item: any) => {
                  const dateString = item?.start;
                  const date = parseISO(dateString);
                  const now = new Date();
                  const distance = formatDistance(date, now, {
                    addSuffix: true,
                  });
                  return (
                    <View
                      className="bg-[#8A3FFC] rounded-xl p-4 mb-3"
                      key={item.id}
                    >
                      <Text className="text-white font-[PoppinsSemiBold] text-base">
                        {item.note}
                      </Text>
                      <Text className="text-white text-sm mt-1">
                        Last period {distance}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* AI insights Section */}
              <View className="mb-8">
                <Text className="text-lg font-[PoppinsSemiBold] text-black mb-4">
                  AI insights
                </Text>

                <View className="bg-white border border-gray-200 rounded-xl p-4">
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 mr-3">
                      <MaterialIcons
                        name="lightbulb"
                        size={24}
                        color="#8A3FFC"
                      />
                    </View>
                    <Text className="text-gray-700 text-sm flex-1 font-[PoppinsMedium]">
                      {aiInsight}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default SummaryScreen;
