import { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Alert, TouchableOpacity, RefreshControl, Text } from "react-native";
import { Stack, router } from "expo-router";
import { useAuthStore } from "../../src/stores";
import { getCollectors, toggleCollectorStatus, UserItem } from "../../src/services/admin";
import { Card, Button, Badge } from "../../src/components";

import { SafeAreaView } from "react-native-safe-area-context";

export default function CollectorsListScreen() {
  const user = useAuthStore((s) => s.user);
  const [collectors, setCollectors] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const data = await getCollectors();
      setCollectors(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role !== "MASTER") {
      Alert.alert("Acesso Negado", "Apenas administradores podem gerenciar cobradores.");
      router.back();
      return;
    }
    loadData();
  }, [user, loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    if (id === user?.id) {
      Alert.alert("Erro", "Você não pode desativar sua própria conta.");
      return;
    }

    const action = currentStatus ? "desativar" : "ativar";
    
    Alert.alert(
      "Confirmar",
      `Deseja realmente ${action} este cobrador?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: currentStatus ? "destructive" : "default",
          onPress: async () => {
            try {
              await toggleCollectorStatus(id);
              await loadData();
            } catch (error: any) {
              Alert.alert("Erro", error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-text-muted">Carregando cobradores...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Custom Header */}
      <View className="flex-row items-center px-5 py-4 border-b border-border bg-background">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 p-2 -ml-2">
          <Text className="text-primary font-sans-semibold text-base">{"< Voltar"}</Text>
        </TouchableOpacity>
        <Text className="flex-1 text-text-primary text-lg font-sans-bold">Cobradores</Text>
      </View>
      
      <ScrollView 
        className="flex-1 px-5 pt-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
        }
      >
        {collectors.length === 0 ? (
          <View className="items-center justify-center py-10">
            <Text className="text-text-muted">Nenhum cobrador cadastrado.</Text>
          </View>
        ) : (
          collectors.map((collector) => (
            <Card key={collector.id} className="mb-3">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-text-primary font-sans-bold text-lg">{collector.name}</Text>
                  <Text className="text-text-secondary text-sm">{collector.email}</Text>
                </View>
                <Badge 
                  text={collector.active ? "Ativo" : "Inativo"} 
                  color={collector.active ? "success" : "danger"} 
                />
              </View>

              <View className="space-y-1 mb-4">
                <View className="flex-row justify-between">
                  <Text className="text-text-muted text-xs">Comissão:</Text>
                  <Text className="text-text-secondary text-xs">{collector.commissionPct ? `${collector.commissionPct}%` : "Padrão"}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-text-muted text-xs">Empréstimos Ativos:</Text>
                  <Text className="text-text-secondary text-xs">{collector._count?.loans || 0}</Text>
                </View>
              </View>

              <View className="flex-row gap-2">
                <View className="flex-1">
                  <Button 
                    title="Editar" 
                    variant="secondary" 
                    size="sm"
                    onPress={() => router.push({
                      pathname: "/collectors/new",
                      params: { 
                        id: collector.id,
                        name: collector.name,
                        email: collector.email,
                        phone: collector.phone || "",
                        commissionPct: collector.commissionPct?.toString() || ""
                      }
                    })}
                  />
                </View>
                <View className="flex-1">
                  <Button 
                    title={collector.active ? "Desativar" : "Ativar"} 
                    variant={collector.active ? "danger" : "primary"} 
                    size="sm"
                    onPress={() => handleToggleStatus(collector.id, collector.active)}
                  />
                </View>
              </View>
            </Card>
          ))
        )}
        <View className="h-24" />
      </ScrollView>

      {/* FAB para criar novo cobrador */}
      <View className="absolute bottom-8 left-5 right-5">
        <Button 
          title="Novo Cobrador" 
          icon="+" 
          onPress={() => router.push("/collectors/new")} 
        />
      </View>
    </SafeAreaView>
  );
}
