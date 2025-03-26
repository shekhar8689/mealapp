import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="home" options={{ title: "Home", headerShown: false }} />
    </Stack>
  );
}
