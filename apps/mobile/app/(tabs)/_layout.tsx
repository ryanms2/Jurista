// ============================================
// Tabs Layout
// ============================================
// Navegação principal com 5 tabs
// ============================================

import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { useNetworkStore, useSyncStore } from "../../src/stores";

// Ícones simples (texto) - em produção usar @expo/vector-icons
function TabIcon({
  icon,
  label,
  focused,
  badge,
}: {
  icon: string;
  label: string;
  focused: boolean;
  badge?: number;
}) {
  return (
    <View className="items-center justify-center pt-2">
      <View className="relative">
        <Text
          className={`text-xl ${
            focused ? "text-primary" : "text-text-muted"
          }`}
        >
          {icon}
        </Text>
        {badge && badge > 0 ? (
          <View className="absolute -top-1 -right-3 bg-danger rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
            <Text className="text-white text-[10px] font-sans-bold">
              {badge > 99 ? "99+" : badge}
            </Text>
          </View>
        ) : null}
      </View>
      <Text
        className={`text-[10px] mt-1 ${
          focused ? "text-primary font-sans-semibold" : "text-text-muted"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const isConnected = useNetworkStore((s) => s.isConnected);
  const pendingCount = useSyncStore((s) => s.pendingCount);

  return (
    <View className="flex-1 bg-background">
      {/* Offline Banner */}
      {!isConnected && (
        <View className="bg-warning/20 border-b border-warning/30 px-4 py-2">
          <Text className="text-warning text-center text-xs font-sans-medium">
            📡 Modo Offline — Dados salvos localmente
          </Text>
        </View>
      )}

      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: "#0f172a" },
          headerTintColor: "#f8fafc",
          headerTitleStyle: { fontWeight: "600" },
          tabBarStyle: {
            backgroundColor: "#1e293b",
            borderTopColor: "#334155",
            borderTopWidth: 1,
            height: 70,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: "#6366f1",
          tabBarInactiveTintColor: "#64748b",
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="📊" label="Dashboard" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="clients"
          options={{
            title: "Clientes",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="👥" label="Clientes" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="loans"
          options={{
            title: "Empréstimos",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="💰" label="Empréstimos" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="cash"
          options={{
            title: "Caixa",
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="🏦" label="Caixa" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Menu",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon="⚙️"
                label="Menu"
                focused={focused}
                badge={pendingCount}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
