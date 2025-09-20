import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SeverityLevel = ({ selectedSeverityLevel, setSelectedSeverityLevel }:any) => {
  // const setSymtomsDataList = useSymtomsStore().setSymtomsDataList;
  // const selectedSeverityLevel =
  //   useSymtomsStore().symtomsDataList.selectedSeverityLevel;

  // const [selectedSeverityLevel, setSelectedSeverityLevel] = React.useState<
  //   number | null
  // >(null);

  console.log("selectedSeverityLevel", selectedSeverityLevel);

  const SeverityLevelData = [
    {
      level: "Lvl 1",
      levelColor: "#20D72A",
    },
    {
      level: "Lvl 2",
      levelColor: "#D7CE20",
    },
    {
      level: "Lvl 3",
      levelColor: "#D77F20",
    },
    {
      level: "Lvl 4",
      levelColor: "#D72020",
    },
  ];

  return (
    <View>
      <View className="my-3">
        <Text>Severity Level</Text>

        <View className="flex-row items-center justify-between">
          {SeverityLevelData.map((item, index) => {
            const levelValue = index + 1; // 1–4
            const isSelected = levelValue === selectedSeverityLevel;

            return (
              <TouchableOpacity
                key={item.level}
                onPress={() => setSelectedSeverityLevel(levelValue)}
                className="w-20 h-12 items-center justify-center border border-[#D0D5DD] rounded-xl my-3"
                style={{
                  backgroundColor: isSelected ? item.levelColor : "transparent",
                }}
              >
                <Text
                  className="font-[PoppinsRegular]"
                  style={{
                    color: isSelected ? "white" : "#667085",
                  }}
                >
                  {item.level}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default SeverityLevel;
