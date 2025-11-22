import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export const DisclaimerSheet = () => {
  const router = useRouter();
  return (
    <View className="flex-1 p-8">
      <View>
        <Text>Disclaimer</Text>
        <Text>{`Please read, it’s important!`}</Text>
      </View>
      <View className="mt-auto flex-1"></View>

      <TouchableOpacity
        className=" w-60 rounded-xl overflow-hidden"
        onPress={() => router.push("/(auth)/welcome")}
        activeOpacity={0.8}
      >
        <Text className="text-white text-lg font-[PoppinsMedium]">
          Get started
        </Text>
      </TouchableOpacity>
    </View>
  );
};
