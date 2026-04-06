import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Tab = { label: string; items: string[] };

type Props = {
  tabs?: Tab[];
};

const DEFAULT_TABS: Tab[] = [
  {
    label: "Lifestyle",
    items: ["Stay hydrated", "Avoid triggers", "Layer clothing"],
  },
  {
    label: "Natural",
    items: ["Black cohosh", "Evening primrose", "Phytoestrogens"],
  },
  {
    label: "Medical",
    items: ["HRT options", "Gabapentin", "SSRIs — discuss with doctor"],
  },
];

export default function ManagementTabsWidget({ tabs = DEFAULT_TABS }: Props) {
  const [active, setActive] = React.useState(0);

  return (
    <View style={styles.card}>
      {/* Tab bar */}
      <View style={styles.tabBar}>
        {tabs.map((tab, i) => (
          <TouchableOpacity
            key={tab.label}
            style={[styles.tab, i === active && styles.tabActive]}
            onPress={() => setActive(i)}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.tabText, i === active && styles.tabTextActive]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Items */}
      <View style={styles.items}>
        {tabs[active].items.map((item) => (
          <View key={item} style={styles.itemRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E9D7FE",
    overflow: "hidden",
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E9D7FE",
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#712A87",
  },
  tabText: {
    fontSize: 13,
    color: "#667085",
    fontFamily: "PoppinsRegular",
  },
  tabTextActive: {
    color: "#712A87",
    fontFamily: "PoppinsMedium",
  },
  items: {
    padding: 12,
    gap: 6,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    paddingVertical: 2,
  },
  bullet: {
    fontSize: 15,
    color: "#712A87",
    lineHeight: 20,
  },
  itemText: {
    fontSize: 13,
    color: "#101828",
    fontFamily: "PoppinsRegular",
    flex: 1,
    lineHeight: 20,
  },
});
