import { Stack } from "expo-router";

export default function _Layout() {
    return (
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />
    );
}
