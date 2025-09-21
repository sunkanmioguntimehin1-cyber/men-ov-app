// import { useGetLogApi } from '@/src/api_services/logApi/logQuery';
// import SafeScreen from '@/src/components/SafeScreen';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Image } from 'expo-image';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// const SummaryScreen = () => {
//   const router = useRouter()
//   const getAllLog = useGetLogApi();
//   const SeverityLevelData = [
//     { level: "Lvl 1", levelColor: "#20D72A" },
//     { level: "Lvl 2", levelColor: "#D7CE20" },
//     { level: "Lvl 3", levelColor: "#D77F20" },
//     { level: "Lvl 4", levelColor: "#D72020" },
//   ];
//   return (
//     <SafeScreen className="bg-white">
//       <ScrollView className="flex-1">
//         {/* Header */}
//         <View className="flex-row items-center justify-between px-8 py-4">
//           <TouchableOpacity
//             onPress={() => {
//               router.back();
//             }}
//           >
//             <MaterialIcons name="arrow-back-ios" size={24} color="black" />
//           </TouchableOpacity>

//           <Text className="text-lg font-[PoppinsSemiBold] text-black">
//             Summary
//           </Text>

//           <View />
//         </View>

       

//         <View className="p-8">
//           {getAllLog?.data?.data.map((item: any, index: number) => {
//             return (
//               <TouchableOpacity
//                 key={item.id}
//                 className=" bg-[#8A3FFC]  my-2 rounded-xl mx-1 p-2"
//                 // onPress={() => handleOpenLastSymptoms(item)}
//               >
//                 <View className=" flex-1 flex-row items-center justify-between p-2">
//                   <View className=" w-6 h-6">
//                     <Image
//                       source={require("@/assets/images/sman.png")}
//                       style={{
//                         height: "100%",
//                         width: "100%",
//                         // alignSelf: "center",
//                         borderRadius: 100,
//                       }}
//                       contentFit="contain"
//                       onError={(error) => console.log("Image error:", error)}
//                     />
//                   </View>

//                   <View>
//                     <Text className="text-white">{item.symptoms}</Text>
//                   </View>

//                   {/* <View className=" items-center justify-center w-5 h-5 rounded-full bg-[#D7CE20]">
//                     <Text className="text-white">{item.severityLevel}</Text>
//                   </View> */}

//                   <View
//                     className="items-center justify-center w-5 h-5 rounded-full mx-2"
//                     style={{
//                       backgroundColor:
//                         SeverityLevelData[item.severityLevel - 1]?.levelColor ||
//                         "#D0D5DD",
//                     }}
//                   >
//                     <Text className="text-white">{item.severityLevel}</Text>
//                   </View>
//                 </View>

//                 <View className="px-4">
//                   <Text className=" text-center  text-xs text-white font-[PoppinsMedium]">
//                     {item.recommendation}
//                     {/* Don't forget to hydrate */}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </ScrollView>
//     </SafeScreen>
//   );
// }

// export default SummaryScreen





import { useGetLogApi } from "@/src/api_services/logApi/logQuery";
import SafeScreen from "@/src/components/SafeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const SummaryScreen = () => {
  const router = useRouter();
  const getAllLog = useGetLogApi();

  const SeverityLevelData = [
    { level: "Lvl 1", levelColor: "#20D72A" },
    { level: "Lvl 2", levelColor: "#D7CE20" },
    { level: "Lvl 3", levelColor: "#D77F20" },
    { level: "Lvl 4", levelColor: "#D72020" },
  ];

  const logs = getAllLog?.data?.data || [];

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

        <View className="p-8">
          {logs.length === 0 ? (
            // 👉 Empty State UI
            <View className="items-center justify-center mt-20">
              {/* <Image
                source={require("@/assets/images/empty.png")} // create an empty state image
                style={{ width: 120, height: 120 }}
                contentFit="contain"
              /> */}
              <Text className="text-gray-500 text-base mt-4 font-[PoppinsMedium]">
                No logs found
              </Text>
              <Text className="text-gray-400 text-sm mt-2 text-center px-6">
                You haven’t added any symptoms yet. Start logging to see your
                summary here.
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/(tabs)/homepage")} // navigate to log form
                className="mt-6 bg-[#8A3FFC] px-6 py-3 rounded-full"
              >
                <Text className="text-white font-[PoppinsSemiBold]">
                  Add Log
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            // 👉 Logs List
            logs.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                className="bg-[#8A3FFC] my-2 rounded-xl mx-1 p-2"
              >
                <View className="flex-1 flex-row items-center justify-between p-2">
                  <View className="w-6 h-6">
                    <Image
                      source={require("@/assets/images/sman.png")}
                      style={{
                        height: "100%",
                        width: "100%",
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
                    className="items-center justify-center w-5 h-5 rounded-full mx-2"
                    style={{
                      backgroundColor:
                        SeverityLevelData[item.severityLevel - 1]?.levelColor ||
                        "#D0D5DD",
                    }}
                  >
                    <Text className="text-white">{item.severityLevel}</Text>
                  </View>
                </View>

                <View className="px-4">
                  <Text className="text-center text-xs text-white font-[PoppinsMedium]">
                    {item.recommendation}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default SummaryScreen;
