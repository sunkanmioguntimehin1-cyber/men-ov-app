import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { QuotaInfo } from "../../widgets/messageParser";

interface QuotaBannerProps {
  info: QuotaInfo;
}

function formatResetTime(resets: string): string {
  try {
    const resetDate = new Date(resets);
    const now = new Date();
    const diffMs = resetDate.getTime() - now.getTime();

    if (diffMs <= 0) return "soon";

    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    if (diffHours < 24) return `in ${diffHours}h`;

    return "in 24 hours";
  } catch {
    return "in 24 hours";
  }
}

const QuotaBanner: React.FC<QuotaBannerProps> = ({ info }) => {
  const router = useRouter();
  const isExhausted = info.status === "exhausted";
  const resetLabel = formatResetTime(info.resets);

  if (!isExhausted) return null;

  return (
    <View style={styles.wrapper}>
      {/* Left: lock icon + text */}
      <View style={styles.left}>
        <View style={styles.iconBox}>
          {/* Lock icon using Unicode — no extra icon dep needed */}
          <Text style={styles.lockEmoji}>🔒</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.title}>Chat locked · daily limit reached</Text>
          <Text style={styles.sub}>Refreshes {resetLabel}.</Text>
        </View>
      </View>

      {/* Right: Upgrade button */}
      <TouchableOpacity
        onPress={() =>
          router.push("/(tabs)/homepage/profilepage/paywall-screen" as any)
        }
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={["#6B5591", "#6E3F8C", "#853385", "#9F3E83"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.upgradeBtn}
        >
          <Text style={styles.upgradeBtnText}>Upgrade</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E9D7FE",
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 6,
    shadowColor: "#6B5591",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F4EBFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  lockEmoji: {
    fontSize: 16,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontFamily: "PoppinsMedium",
    color: "#101828",
    lineHeight: 18,
  },
  sub: {
    fontSize: 11,
    fontFamily: "PoppinsRegular",
    color: "#667085",
    marginTop: 1,
  },
  upgradeBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
  },
  upgradeBtnText: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
    color: "#FFFFFF",
  },
});

export default QuotaBanner;
