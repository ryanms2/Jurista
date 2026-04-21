// ============================================
// Clientes Tab — Stack Navigator
// ============================================

import { Stack } from "expo-router";

export default function ClientsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0f172a" },
        headerTintColor: "#f8fafc",
        headerTitleStyle: { fontWeight: "600" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Clientes" }} />
      <Stack.Screen name="[id]" options={{ title: "Detalhes" }} />
      <Stack.Screen name="new" options={{ title: "Novo Cliente" }} />
    </Stack>
  );
}
