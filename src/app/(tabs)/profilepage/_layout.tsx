import { Stack } from "expo-router";

export default function _ProfilePageLayout() {
    return (
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />
    );
}
