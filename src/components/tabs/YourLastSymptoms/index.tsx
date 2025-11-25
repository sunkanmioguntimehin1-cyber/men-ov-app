// import { useGetLogApi } from "@/src/api_services/logApi/logQuery";
// import { rS } from "@/src/lib/responsivehandler";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React from "react";
// import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// const YourLastSymptoms = ({ handleOpenLastSymptoms }: any) => {
//   const router = useRouter();
//   const getAllLog = useGetLogApi();

//   const symptomsData = [
//     {
//       name: "Back Pain",
//       img: require("@/assets/images/backpain.png"),
//     },
//     {
//       name: "Headache",
//       img: require("@/assets/images/headache.png"),
//     },
//     {
//       name: "Heart Palpitations",
//       img: require("@/assets/images/heart_palpitations.png"),
//     },
//     {
//       name: "Anxiety",
//       img: require("@/assets/images/anxiety.png"),
//     },
//     {
//       name: "Describe how you feel",
//       img: require("@/assets/images/general.png"),
//     },
//   ];

//   // Helper function to get the symptom image
//   const getSymptomImage = (iconName: string) => {
//     const symptom = symptomsData.find(
//       (item) => item.name.toLowerCase() === iconName.toLowerCase()
//     );
//     return symptom?.img || require("@/assets/images/general.png");
//   };

//   const SeverityLevelData = [
//     { level: "Lvl 1", levelColor: "#20D72A" },
//     { level: "Lvl 2", levelColor: "#D7CE20" },
//     { level: "Lvl 3", levelColor: "#D77F20" },
//     { level: "Lvl 4", levelColor: "#D72020" },
//   ];

//   return (
//     <View>
//       <View className=" flex-row items-center justify-between">
//         <Text
//           className="mb-2 font-[PoppinsMedium] text-black"
//           style={{ fontSize: rS(12) }}
//         >
//           Your last symptoms
//         </Text>
//       </View>

//       <ScrollView horizontal className="">
//         {getAllLog?.data?.slice(0, 5)?.map((item: any) => {
//           return (
//             <TouchableOpacity
//               key={item._id}
//               className=" bg-[#8A3FFC] h-20  rounded-xl mx-1"
//               onPress={() => handleOpenLastSymptoms(item)}
//             >
//               <View className=" mb-3 flex-row items-center justify-between p-2">
//                 <View className=" w-6 h-6">
//                   <Image
//                     source={getSymptomImage(item.icon)}
//                     style={{
//                       height: "100%",
//                       width: "100%",
//                       borderRadius: 100,
//                     }}
//                     contentFit="contain"
//                   />
//                 </View>

//                 <View className=" mx-1">
//                   <Text className="text-white">{item.symptoms}</Text>
//                 </View>

//                 <View
//                   className="items-center justify-center  w-5 h-5 rounded-full"
//                   style={{
//                     backgroundColor:
//                       SeverityLevelData[item.severityLevel - 1]?.levelColor ||
//                       "#D0D5DD",
//                   }}
//                 >
//                   <Text className="text-sm text-white">
//                     {item.severityLevel}
//                   </Text>
//                 </View>
//               </View>

//               <Text className=" text-center text-xs text-white font-[PoppinsMedium] px-2">
//                 {item.recommendation
//                   ? item.recommendation
//                   : " Don't forget to hydrate"}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// export default YourLastSymptoms;

import { useGetLogApi } from "@/src/api_services/logApi/logQuery";
import { rS } from "@/src/lib/responsivehandler";
import { truncateSimple } from "@/src/lib/truncateSimple";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const YourLastSymptoms = ({ handleOpenLastSymptoms }: any) => {
  const router = useRouter();
  const getAllLog = useGetLogApi();

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

  // Helper function to get the symptom image
  const getSymptomImage = (iconName: string) => {
    const symptom = symptomsData.find(
      (item) => item.name.toLowerCase() === iconName.toLowerCase()
    );
    return symptom?.img || require("@/assets/images/general.png");
  };

  const SeverityLevelData = [
    { level: "Lvl 1", levelColor: "#20D72A" },
    { level: "Lvl 2", levelColor: "#D7CE20" },
    { level: "Lvl 3", levelColor: "#D77F20" },
    { level: "Lvl 4", levelColor: "#D72020" },
  ];

  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Text
          className="mb-2 font-[PoppinsMedium] text-black"
          style={{ fontSize: rS(12) }}
        >
          Your last symptoms
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {getAllLog?.data?.slice(0, 5)?.map((item: any) => {
          return (
            <TouchableOpacity
              key={item._id}
              className="h-20 mx-1 overflow-hidden"
              onPress={() => handleOpenLastSymptoms(item)}
            >
              <LinearGradient
                colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="  "
                style={{
                  minHeight: 56,
                  padding: Platform.OS === "ios" ? 10 : 8,
                  // alignItems: "center",
                  // justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <View className="mb-3 flex-row items-center justify-between">
                  <View className="w-6 h-6">
                    <Image
                      source={getSymptomImage(item.icon)}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 100,
                      }}
                      contentFit="contain"
                    />
                  </View>

                  <View className="mx-1">
                    <Text className="text-white">{item.symptoms}</Text>
                  </View>

                  <View
                    className="items-center justify-center w-5 h-5 rounded-full"
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

                <Text className="text-center text-[8px] text-white font-[PoppinsMedium]">
                  {item.recommendation
                    ? `${truncateSimple(item.recommendation, 22)}`
                    : "Don't forget to hydrate"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default YourLastSymptoms;
