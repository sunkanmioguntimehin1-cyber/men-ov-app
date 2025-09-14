import { Stack } from "expo-router";

export default function _HomePageLayout() {
    return (
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />
    );
}
