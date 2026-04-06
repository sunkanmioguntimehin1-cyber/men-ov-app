import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

export default function ResourceLinkWidget({
  title,
  subtitle = "4-7-8 technique for instant relief",
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Icon */}
      <View style={styles.iconBox}>
        <Text style={styles.iconEmoji}>🫁</Text>
      </View>

      {/* Text */}
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>{subtitle}</Text>
      </View>

      {/* Arrow */}
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F5FF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9D7FE",
    padding: 10,
    gap: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#E9D7FE",
    alignItems: "center",
    justifyContent: "center",
  },
  iconEmoji: { fontSize: 18 },
  textWrap: { flex: 1 },
  title: {
    fontSize: 13,
    color: "#712A87",
    fontFamily: "PoppinsMedium",
    textDecorationLine: "underline",
  },
  sub: {
    fontSize: 11,
    color: "#667085",
    fontFamily: "PoppinsRegular",
    marginTop: 1,
  },
  arrow: {
    fontSize: 20,
    color: "#712A87",
    fontWeight: "600",
  },
});
