// ============================================
// Settings com Comissões e Fotos
// ============================================

import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { useAuthStore, useSyncStore, useNetworkStore } from "../../src/stores";
import {
  getCollectorCommission,
  getPendingPhotoCount,
  processPhotoUploads,
  runMaintenanceJobs,
} from "../../src/services";
import type { CommissionSummary } from "../../src/services";
import { Card, StatRow, Button, Separator, Badge } from "../../src/components";

export default function SettingsScreen() {
  const { user, logout } = useAuthStore();
  const { pendingCount, isSyncing, lastSyncAt, sync } = useSyncStore();
  const isConnected = useNetworkStore((s) => s.isConnected);
  const [refreshing, setRefreshing] = useState(false);
  const [pendingPhotos, setPendingPhotos] = useState(0);
  const [commission, setCommission] = useState<CommissionSummary | null>(null);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  const loadData = useCallback(async () => {
    const photoCount = await getPendingPhotoCount();
    setPendingPhotos(photoCount);

    if (user) {
      const comm = await getCollectorCommission(user.id);
      setCommission(comm);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja sair do aplicativo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  };

  const handleSync = async () => {
    if (!isConnected) {
      Alert.alert("Offline", "Conecte-se à internet para sincronizar.");
      return;
    }
    await sync();
    await loadData();
    Alert.alert("✅", "Dados sincronizados!");
  };

  const handleUploadPhotos = async () => {
    if (!isConnected) {
      Alert.alert("Offline", "Conecte-se à internet para enviar fotos.");
      return;
    }
    setUploadingPhotos(true);
    const result = await processPhotoUploads();
    setUploadingPhotos(false);
    await loadData();
    Alert.alert(
      "Upload de Fotos",
      `${result.uploaded} enviada(s), ${result.failed} falha(s)`
    );
  };

  const handleMaintenance = async () => {
    const result = await runMaintenanceJobs();
    Alert.alert(
      "Manutenção",
      `Multas atualizadas: ${result.feesUpdated}\n` +
        `Inadimplentes marcados: ${result.defaulted}`
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
      }
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* User Info */}
      <View className="px-5 pt-4">
        <Card>
          <View className="flex-row items-center">
            <View className="w-16 h-16 rounded-full bg-primary items-center justify-center mr-4">
              <Text className="text-white text-2xl font-sans-bold">
                {user?.name?.charAt(0) || "U"}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-text-primary text-lg font-sans-bold">
                {user?.name}
              </Text>
              <Text className="text-text-secondary text-sm">{user?.email}</Text>
              <View className="flex-row items-center mt-1">
                <View
                  className={`w-2 h-2 rounded-full mr-2 ${
                    user?.role === "MASTER" ? "bg-warning" : "bg-primary"
                  }`}
                />
                <Text className="text-text-muted text-xs">
                  {user?.role === "MASTER" ? "Administrador" : "Cobrador"}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </View>

      {/* Commission Card */}
      {commission && (
        <View className="px-5 mt-3">
          <Card className="border-secondary/20">
            <Text className="text-text-primary font-sans-semibold text-base mb-3">
              💼 Comissões
            </Text>

            <View className="flex-row gap-3">
              <View className="flex-1 bg-success/10 rounded-xl p-3 items-center">
                <Text className="text-success text-lg font-sans-bold">
                  R$ {commission.totalEarned.toFixed(2)}
                </Text>
                <Text className="text-text-muted text-[10px] mt-0.5">Ganhos</Text>
              </View>
              <View className="flex-1 bg-warning/10 rounded-xl p-3 items-center">
                <Text className="text-warning text-lg font-sans-bold">
                  R$ {commission.totalPending.toFixed(2)}
                </Text>
                <Text className="text-text-muted text-[10px] mt-0.5">Pendente</Text>
              </View>
            </View>
          </Card>
        </View>
      )}

      {/* Sync Status */}
      <View className="px-5 mt-3">
        <Card>
          <Text className="text-text-primary font-sans-semibold text-base mb-3">
            📡 Sincronização
          </Text>

          <StatRow
            label="Status"
            value={isConnected ? "🟢 Online" : "🔴 Offline"}
          />
          <StatRow
            label="Operações pendentes"
            value={`${pendingCount}`}
            valueColor={pendingCount > 0 ? "text-warning" : "text-success"}
          />
          <StatRow
            label="Fotos pendentes"
            value={`${pendingPhotos}`}
            valueColor={pendingPhotos > 0 ? "text-warning" : "text-success"}
          />
          {lastSyncAt && (
            <StatRow
              label="Última sync"
              value={lastSyncAt.toLocaleTimeString("pt-BR")}
            />
          )}

          <View className="flex-row gap-2 mt-3">
            <View className="flex-1">
              <Button
                title="Sincronizar"
                icon="🔄"
                size="sm"
                loading={isSyncing}
                disabled={!isConnected}
                onPress={handleSync}
              />
            </View>
            {pendingPhotos > 0 && (
              <View className="flex-1">
                <Button
                  title="Enviar Fotos"
                  icon="📸"
                  size="sm"
                  variant="secondary"
                  loading={uploadingPhotos}
                  disabled={!isConnected}
                  onPress={handleUploadPhotos}
                />
              </View>
            )}
          </View>
        </Card>
      </View>

      {/* Tools */}
      <View className="px-5 mt-3">
        <Card>
          <Text className="text-text-primary font-sans-semibold text-base mb-3">
            🛠️ Ferramentas
          </Text>

          <TouchableOpacity
            onPress={handleMaintenance}
            className="flex-row items-center py-3 border-b border-border"
            activeOpacity={0.7}
          >
            <Text className="text-base mr-3">📊</Text>
            <View className="flex-1">
              <Text className="text-text-primary text-sm">Atualizar Multas</Text>
              <Text className="text-text-muted text-xs">
                Recalcular multas de parcelas atrasadas
              </Text>
            </View>
            <Text className="text-text-muted">›</Text>
          </TouchableOpacity>

          {user?.role === "MASTER" && (
            <TouchableOpacity
              onPress={() => router.push("/collectors")}
              className="flex-row items-center py-3 border-b border-border"
              activeOpacity={0.7}
            >
              <Text className="text-base mr-3">👥</Text>
              <View className="flex-1">
                <Text className="text-text-primary text-sm">Gerenciar Cobradores</Text>
                <Text className="text-text-muted text-xs">
                  Adicionar, editar ou desativar cobradores
                </Text>
              </View>
              <Text className="text-text-muted">›</Text>
            </TouchableOpacity>
          )}

          {user?.role === "MASTER" && (
            <TouchableOpacity
              onPress={() => router.push("/system-settings")}
              className="flex-row items-center py-3"
              activeOpacity={0.7}
            >
              <Text className="text-base mr-3">⚙️</Text>
              <View className="flex-1">
                <Text className="text-text-primary text-sm">Configurações</Text>
                <Text className="text-text-muted text-xs">
                  Juros, multas, comissões padrão
                </Text>
              </View>
              <Text className="text-text-muted">›</Text>
            </TouchableOpacity>
          )}
        </Card>
      </View>

      {/* App Info */}
      <View className="px-5 mt-3">
        <Card>
          <StatRow label="Versão" value="0.1.0" />
          <StatRow label="SDK" value="Expo 54" />
        </Card>
      </View>

      {/* Logout */}
      <View className="px-5 mt-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-danger/10 border border-danger/20 rounded-2xl py-4 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-danger font-sans-semibold">Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
