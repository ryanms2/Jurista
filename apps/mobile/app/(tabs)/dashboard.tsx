// ============================================
// Dashboard — Tela Principal
// ============================================
// Mostra resumo de vencimentos (em dia, vence hoje, atrasados)
// ============================================

import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { getDatabase } from "../../src/services";
import { useAuthStore, useSyncStore } from "../../src/stores";

interface DashboardStats {
  overdue: number;
  dueToday: number;
  onTime: number;
  totalActive: number;
}

interface InstallmentItem {
  id: string;
  client_name: string;
  loan_id: string;
  amount: number;
  late_fee: number;
  total_due: number;
  due_date: string;
  days_overdue: number;
  status: string;
}

export default function DashboardScreen() {
  const user = useAuthStore((s) => s.user);
  const { pendingCount, refreshPendingCount } = useSyncStore();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    overdue: 0,
    dueToday: 0,
    onTime: 0,
    totalActive: 0,
  });
  const [overdueItems, setOverdueItems] = useState<InstallmentItem[]>([]);
  const [dueTodayItems, setDueTodayItems] = useState<InstallmentItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | "overdue" | "today" | "ontime">("all");

  const loadData = useCallback(async () => {
    try {
      const db = await getDatabase();
      const today = new Date().toISOString().split("T")[0];

      // Contar parcelas por status
      const collectorFilter =
        user?.role === "COLLECTOR" ? `AND l.collector_id = '${user.id}'` : "";

      const overdueResult = await db.getAllAsync<InstallmentItem>(
        `SELECT i.*, c.name as client_name
         FROM installments i
         JOIN loans l ON i.loan_id = l.id
         JOIN clients c ON l.client_id = c.id
         WHERE i.status IN ('PENDING', 'PARTIALLY_PAID', 'OVERDUE')
         AND date(i.due_date) < date('${today}')
         AND l.status = 'ACTIVE'
         ${collectorFilter}
         ORDER BY i.due_date ASC
         LIMIT 50`
      );

      const dueTodayResult = await db.getAllAsync<InstallmentItem>(
        `SELECT i.*, c.name as client_name
         FROM installments i
         JOIN loans l ON i.loan_id = l.id
         JOIN clients c ON l.client_id = c.id
         WHERE i.status IN ('PENDING', 'PARTIALLY_PAID')
         AND date(i.due_date) = date('${today}')
         AND l.status = 'ACTIVE'
         ${collectorFilter}
         ORDER BY c.name ASC`
      );

      const onTimeResult = await db.getFirstAsync<{ count: number }>(
        `SELECT COUNT(*) as count FROM installments i
         JOIN loans l ON i.loan_id = l.id
         WHERE i.status IN ('PENDING')
         AND date(i.due_date) > date('${today}')
         AND l.status = 'ACTIVE'
         ${collectorFilter}`
      );

      setOverdueItems(overdueResult);
      setDueTodayItems(dueTodayResult);
      setStats({
        overdue: overdueResult.length,
        dueToday: dueTodayResult.length,
        onTime: onTimeResult?.count || 0,
        totalActive: overdueResult.length + dueTodayResult.length + (onTimeResult?.count || 0),
      });

      await refreshPendingCount();
    } catch (error) {
      console.error("Dashboard load error:", error);
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

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#6366f1"
          colors={["#6366f1"]}
        />
      }
    >
      {/* Header */}
      <View className="px-5 pt-4 pb-2">
        <Text className="text-text-secondary text-sm">
          Olá, {user?.name?.split(" ")[0] || "Usuário"} 👋
        </Text>
        <Text className="text-text-primary text-2xl font-sans-bold mt-1">
          Dashboard
        </Text>
      </View>

      {/* Stats Cards */}
      <View className="flex-row flex-wrap px-4 gap-3 mt-2">
        {/* Atrasados */}
        <TouchableOpacity
          onPress={() => setActiveFilter("overdue")}
          className={`flex-1 min-w-[45%] rounded-2xl p-4 border ${
            activeFilter === "overdue"
              ? "bg-danger/20 border-danger/40"
              : "bg-surface border-border"
          }`}
          activeOpacity={0.7}
        >
          <Text className="text-danger text-3xl font-sans-bold">
            {stats.overdue}
          </Text>
          <Text className="text-text-secondary text-sm mt-1">
            🔴 Atrasados
          </Text>
        </TouchableOpacity>

        {/* Vence Hoje */}
        <TouchableOpacity
          onPress={() => setActiveFilter("today")}
          className={`flex-1 min-w-[45%] rounded-2xl p-4 border ${
            activeFilter === "today"
              ? "bg-warning/20 border-warning/40"
              : "bg-surface border-border"
          }`}
          activeOpacity={0.7}
        >
          <Text className="text-warning text-3xl font-sans-bold">
            {stats.dueToday}
          </Text>
          <Text className="text-text-secondary text-sm mt-1">
            🟡 Vence Hoje
          </Text>
        </TouchableOpacity>

        {/* Em Dia */}
        <TouchableOpacity
          onPress={() => setActiveFilter("ontime")}
          className={`flex-1 min-w-[45%] rounded-2xl p-4 border ${
            activeFilter === "ontime"
              ? "bg-success/20 border-success/40"
              : "bg-surface border-border"
          }`}
          activeOpacity={0.7}
        >
          <Text className="text-success text-3xl font-sans-bold">
            {stats.onTime}
          </Text>
          <Text className="text-text-secondary text-sm mt-1">
            🟢 Em Dia
          </Text>
        </TouchableOpacity>

        {/* Total */}
        <TouchableOpacity
          onPress={() => setActiveFilter("all")}
          className={`flex-1 min-w-[45%] rounded-2xl p-4 border ${
            activeFilter === "all"
              ? "bg-primary/20 border-primary/40"
              : "bg-surface border-border"
          }`}
          activeOpacity={0.7}
        >
          <Text className="text-primary text-3xl font-sans-bold">
            {stats.totalActive}
          </Text>
          <Text className="text-text-secondary text-sm mt-1">
            📋 Total Ativo
          </Text>
        </TouchableOpacity>
      </View>

      {/* Overdue List */}
      {(activeFilter === "all" || activeFilter === "overdue") &&
        overdueItems.length > 0 && (
          <View className="mt-6 px-5">
            <Text className="text-danger font-sans-semibold text-base mb-3">
              🔴 Parcelas Atrasadas
            </Text>
            {overdueItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-surface border border-danger/20 rounded-xl p-4 mb-2"
                activeOpacity={0.7}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-text-primary font-sans-semibold text-base">
                      {item.client_name}
                    </Text>
                    <Text className="text-text-muted text-xs mt-1">
                      Parcela • Venceu{" "}
                      {new Date(item.due_date).toLocaleDateString("pt-BR")}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-danger font-sans-bold text-lg">
                      R$ {item.total_due.toFixed(2)}
                    </Text>
                    {item.late_fee > 0 && (
                      <Text className="text-danger/70 text-xs">
                        +R$ {item.late_fee.toFixed(2)} multa
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

      {/* Due Today List */}
      {(activeFilter === "all" || activeFilter === "today") &&
        dueTodayItems.length > 0 && (
          <View className="mt-6 px-5">
            <Text className="text-warning font-sans-semibold text-base mb-3">
              🟡 Vence Hoje
            </Text>
            {dueTodayItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-surface border border-warning/20 rounded-xl p-4 mb-2"
                activeOpacity={0.7}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="text-text-primary font-sans-semibold text-base">
                      {item.client_name}
                    </Text>
                    <Text className="text-text-muted text-xs mt-1">
                      Parcela do dia
                    </Text>
                  </View>
                  <Text className="text-warning font-sans-bold text-lg">
                    R$ {item.amount.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

      {/* Empty State */}
      {stats.totalActive === 0 && (
        <View className="mt-12 items-center px-8">
          <Text className="text-5xl mb-4">🎉</Text>
          <Text className="text-text-primary text-lg font-sans-semibold text-center">
            Nenhuma parcela pendente
          </Text>
          <Text className="text-text-secondary text-sm text-center mt-2">
            Todos os pagamentos estão em dia!
          </Text>
        </View>
      )}

      {/* Spacer */}
      <View className="h-8" />
    </ScrollView>
  );
}
