import { Text, View } from "react-native";
import SafeScreen from "../../../components/SafeScreen";

export default function CommunityPage() {
  return (
    <SafeScreen>
      <View className="flex-1 justify-center items-center ">
        <Text className="text-3xl font-semibold text-red-800">
          {" "}
          Watch out...
        </Text>
      </View>
    </SafeScreen>
  );
}