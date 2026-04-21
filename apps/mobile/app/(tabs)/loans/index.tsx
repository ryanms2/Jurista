// ============================================
// Lista de Empréstimos
// ============================================

import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { getDatabase } from "../../../src/services";
import { useAuthStore } from "../../../src/stores";
import { Card, Badge, Select, EmptyState } from "../../../src/components";

interface LoanItem {
  id: string;
  client_name: string;
  amount: number;
  total_with_interest: number;
  frequency: string;
  status: string;
  total_installments: number;
  paid_count: number;
  start_date: string;
}

const STATUS_OPTIONS = [
  { value: "ALL", label: "Todos" },
  { value: "ACTIVE", label: "Ativos" },
  { value: "COMPLETED", label: "Concluídos" },
  { value: "DEFAULTED", label: "Inadimplentes" },
];

export default function LoansScreen() {
  const user = useAuthStore((s) => s.user);
  const [loans, setLoans] = useState<LoanItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ACTIVE");

  const loadLoans = useCallback(async () => {
    try {
      const db = await getDatabase();
      const collectorFilter = user?.role === "COLLECTOR" ? `AND l.collector_id = '${user.id}'` : "";
      const statusWhere = statusFilter !== "ALL" ? `AND l.status = '${statusFilter}'` : "";

      const result = await db.getAllAsync<LoanItem>(
        `SELECT l.*, c.name as client_name,
         (SELECT COUNT(*) FROM installments i WHERE i.loan_id = l.id AND i.status = 'PAID') as paid_count
         FROM loans l
         JOIN clients c ON l.client_id = c.id
         WHERE 1=1 ${collectorFilter} ${statusWhere}
         ORDER BY l.created_at DESC
         LIMIT 100`
      );
      setLoans(result);
    } catch (error) {
      console.error("Load loans:", error);
    }
  }, [user, statusFilter]);

  useEffect(() => { loadLoans(); }, [loadLoans]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadLoans();
    setRefreshing(false);
  }, [loadLoans]);

  const getFreqLabel = (f: string) => {
    const m: Record<string, string> = { DAILY: "Dia", WEEKLY: "Sem", BIWEEKLY: "Quin", MONTHLY: "Mês" };
    return m[f] || f;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE": return { text: "Ativo", color: "primary" as const };
      case "COMPLETED": return { text: "Concluído", color: "success" as const };
      case "DEFAULTED": return { text: "Inadimplente", color: "danger" as const };
      case "RENEWED": return { text: "Renovado", color: "muted" as const };
      default: return { text: status, color: "muted" as const };
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Filter */}
      <View className="px-4 py-3">
        <Select
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </View>

      <FlatList
        data={loans}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
        renderItem={({ item }) => {
          const badge = getStatusBadge(item.status);
          const progress = item.total_installments > 0
            ? Math.round((item.paid_count / item.total_installments) * 100)
            : 0;

          return (
            <Card
              className="mb-2"
              onPress={() => router.push(`/(tabs)/loans/${item.id}`)}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-text-primary font-sans-semibold text-base">
                    {item.client_name}
                  </Text>
                  <Text className="text-text-muted text-xs mt-0.5">
                    R$ {item.amount.toFixed(2)} • {getFreqLabel(item.frequency)} •{" "}
                    {item.paid_count}/{item.total_installments} parcelas
                  </Text>

                  {/* Mini Progress */}
                  <View className="mt-2">
                    <View className="h-1.5 bg-surface-light rounded-full overflow-hidden">
                      <View
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </View>
                  </View>
                </View>

                <View className="items-end ml-3">
                  <Badge text={badge.text} color={badge.color} />
                  <Text className="text-text-muted text-[10px] mt-1">
                    {new Date(item.start_date).toLocaleDateString("pt-BR")}
                  </Text>
                </View>
              </View>
            </Card>
          );
        }}
        ListEmptyComponent={
          <EmptyState
            icon="💰"
            title="Sem empréstimos"
            subtitle={statusFilter !== "ALL" ? "Altere o filtro para ver mais" : "Nenhum empréstimo cadastrado"}
          />
        }
      />

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/loans/new")}
        className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg"
        activeOpacity={0.8}
      >
        <Text className="text-white text-2xl font-sans-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
}
