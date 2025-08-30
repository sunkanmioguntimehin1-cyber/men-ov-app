import { Text, View } from "react-native";
import SafeScreen from "../../../components/SafeScreen";

export default function CommunityPage() {
  return (
    <SafeScreen>
      <View className="flex-1 justify-center items-center bg-red-300">
        <Text className="text-3xl font-semibold text-red-800"> I am the CommunityPage.</Text>
      </View>
    </SafeScreen>
  );
}