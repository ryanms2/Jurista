// ============================================
// Caixa do Dia — Resumo Financeiro
// ============================================
// Entradas (pagamentos), saídas (empréstimos),
// sangrias e depósitos
// ============================================

import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Alert,
  Modal,
} from "react-native";
import * as Crypto from "expo-crypto";
import { getDatabase } from "../../src/services";
import { enqueueSync } from "../../src/services/sync";
import { useAuthStore } from "../../src/stores";
import { Card, StatRow, Button, Input, CurrencyInput, Select, Separator, EmptyState } from "../../src/components";

interface CashItem {
  id: string;
  type: string;
  amount: number;
  description: string | null;
  date: string;
  user_name: string;
  payment_method?: string;
  client_name?: string;
}

interface DaySummary {
  income: number;
  expense: number;
  withdrawal: number;
  deposit: number;
  pix: number;
  cash: number;
  balance: number;
}

export default function CashScreen() {
  const user = useAuthStore((s) => s.user);
  const [refreshing, setRefreshing] = useState(false);
  const [movements, setMovements] = useState<CashItem[]>([]);
  const [summary, setSummary] = useState<DaySummary>({
    income: 0, expense: 0, withdrawal: 0, deposit: 0, pix: 0, cash: 0, balance: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [movType, setMovType] = useState("WITHDRAWAL");
  const [movAmount, setMovAmount] = useState("");
  const [movDescription, setMovDescription] = useState("");
  const [movLoading, setMovLoading] = useState(false);
  const [period, setPeriod] = useState<"today" | "all">("today");

  const loadData = useCallback(async () => {
    try {
      const db = await getDatabase();
      const today = new Date().toISOString().split("T")[0];

      let query = `SELECT cm.*, u.name as user_name,
         p.method as payment_method,
         (SELECT c.name FROM clients c
          JOIN loans l ON c.id = l.client_id
          JOIN installments i ON l.id = i.loan_id
          WHERE i.id = p.installment_id) as client_name
         FROM cash_movements cm
         LEFT JOIN users u ON cm.user_id = u.id
         LEFT JOIN payments p ON cm.payment_id = p.id`;
      let params: string[] = [];

      if (period === "today") {
        query += ` WHERE date(cm.date) = date(?)`;
        params.push(today);
      }
      query += ` ORDER BY cm.date DESC`;

      const result = params.length > 0 
        ? await db.getAllAsync<CashItem>(query, params)
        : await db.getAllAsync<CashItem>(query);
      setMovements(result);

      // Calcular resumo
      let income = 0, expense = 0, withdrawal = 0, deposit = 0, pix = 0, cash = 0;
      for (const m of result) {
        switch (m.type) {
          case "INCOME":
            income += m.amount;
            if (m.payment_method === "PIX") pix += m.amount;
            else cash += m.amount;
            break;
          case "EXPENSE": expense += m.amount; break;
          case "WITHDRAWAL": withdrawal += m.amount; break;
          case "DEPOSIT": deposit += m.amount; break;
        }
      }
      setSummary({
        income, expense, withdrawal, deposit, pix, cash,
        balance: income + deposit - expense - withdrawal,
      });
    } catch (error) {
      console.error("Load cash:", error);
    }
  }, [period]);

  useEffect(() => { loadData(); }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleMovement = async () => {
    if (!user) return;
    const amt = parseFloat(movAmount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert("Atenção", "Informe o valor");
      return;
    }

    setMovLoading(true);
    try {
      const db = await getDatabase();
      const movId = Crypto.randomUUID();

      await db.runAsync(
        `INSERT INTO cash_movements (id, user_id, type, amount, description)
         VALUES (?, ?, ?, ?, ?)`,
        [movId, user.id, movType, amt, movDescription || (movType === "WITHDRAWAL" ? "Sangria" : "Depósito")]
      );

      await enqueueSync("cash_movement", movId, "create", {
        id: movId,
        userId: user.id,
        type: movType,
        amount: amt,
        description: movDescription || null,
      });

      setShowModal(false);
      setMovAmount("");
      setMovDescription("");
      await loadData();

      Alert.alert("✅", `${movType === "WITHDRAWAL" ? "Sangria" : "Depósito"} registrado!`);
    } catch (error) {
      console.error("Movement error:", error);
      Alert.alert("Erro", "Falha ao registrar movimento.");
    } finally {
      setMovLoading(false);
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "INCOME": return { icon: "📥", label: "Entrada", color: "text-success" };
      case "EXPENSE": return { icon: "📤", label: "Saída", color: "text-danger" };
      case "WITHDRAWAL": return { icon: "💸", label: "Sangria", color: "text-warning" };
      case "DEPOSIT": return { icon: "💰", label: "Depósito", color: "text-primary" };
      default: return { icon: "📋", label: type, color: "text-text-muted" };
    }
  };

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long", day: "2-digit", month: "long",
  });

  return (
    <>
      <ScrollView
        className="flex-1 bg-background"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Text className="text-text-secondary text-sm capitalize">{today}</Text>
          <Text className="text-text-primary text-2xl font-sans-bold mt-1">
            Caixa do Dia
          </Text>
        </View>

        {/* Balance Card */}
        {/* Segmented Control */}
        <View className="px-5 mt-2 mb-2 flex-row bg-surface-light rounded-xl p-1 border border-border">
          <Button
            title="Caixa do Dia"
            variant={period === "today" ? "primary" : "outline"}
            size="sm"
            style={{ flex: 1, borderWidth: 0 }}
            onPress={() => setPeriod("today")}
          />
          <Button
            title="Caixa Geral"
            variant={period === "all" ? "primary" : "outline"}
            size="sm"
            style={{ flex: 1, borderWidth: 0 }}
            onPress={() => setPeriod("all")}
          />
        </View>

        <View className="px-5 mt-2">
          <Card className="border-primary/20">
            <Text className="text-text-muted text-sm mb-1">
              {period === "all" ? "Saldo Geral" : "Saldo do Dia"}
            </Text>
            <Text
              className={`text-3xl font-sans-bold ${
                summary.balance >= 0 ? "text-success" : "text-danger"
              }`}
            >
              R$ {summary.balance.toFixed(2)}
            </Text>
          </Card>
        </View>

        {/* Summary Cards */}
        <View className="flex-row flex-wrap px-4 gap-2 mt-3">
          <View className="flex-1 min-w-[45%]">
            <Card>
              <Text className="text-success text-lg font-sans-bold">
                R$ {summary.income.toFixed(2)}
              </Text>
              <Text className="text-text-muted text-xs mt-0.5">📥 Entradas</Text>
              <View className="flex-row mt-1 gap-2">
                <Text className="text-text-muted text-[10px]">
                  💵 R${summary.cash.toFixed(2)}
                </Text>
                <Text className="text-text-muted text-[10px]">
                  📱 R${summary.pix.toFixed(2)}
                </Text>
              </View>
            </Card>
          </View>
          <View className="flex-1 min-w-[45%]">
            <Card>
              <Text className="text-danger text-lg font-sans-bold">
                R$ {summary.expense.toFixed(2)}
              </Text>
              <Text className="text-text-muted text-xs mt-0.5">📤 Saídas</Text>
            </Card>
          </View>
          <View className="flex-1 min-w-[45%]">
            <Card>
              <Text className="text-warning text-lg font-sans-bold">
                R$ {summary.withdrawal.toFixed(2)}
              </Text>
              <Text className="text-text-muted text-xs mt-0.5">💸 Sangrias</Text>
            </Card>
          </View>
          <View className="flex-1 min-w-[45%]">
            <Card>
              <Text className="text-primary text-lg font-sans-bold">
                R$ {summary.deposit.toFixed(2)}
              </Text>
              <Text className="text-text-muted text-xs mt-0.5">💰 Depósitos</Text>
            </Card>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row px-5 gap-3 mt-4">
          <View className="flex-1">
            <Button
              title="Sangria"
              icon="💸"
              variant="outline"
              size="sm"
              onPress={() => {
                setMovType("WITHDRAWAL");
                setShowModal(true);
              }}
            />
          </View>
          <View className="flex-1">
            <Button
              title="Depósito"
              icon="💰"
              size="sm"
              onPress={() => {
                setMovType("DEPOSIT");
                setShowModal(true);
              }}
            />
          </View>
        </View>

        <Separator label="MOVIMENTAÇÕES" />

        {/* Movements List */}
        <View className="px-5">
          {movements.length === 0 ? (
            <EmptyState
              icon="🏦"
              title={period === "all" ? "Nenhuma movimentação" : "Nenhuma movimentação hoje"}
              subtitle="Pagamentos e saídas aparecerão aqui"
            />
          ) : (
            movements.map((mov) => {
              const config = getTypeConfig(mov.type);
              return (
                <View
                  key={mov.id}
                  className="flex-row items-center bg-surface border border-border rounded-xl p-3 mb-2"
                >
                  <Text className="text-xl mr-3">{config.icon}</Text>
                  <View className="flex-1">
                    <Text className="text-text-primary text-sm font-sans-medium">
                      {mov.description || config.label}
                    </Text>
                    {mov.client_name && (
                      <Text className="text-text-muted text-xs">
                        {mov.client_name}
                      </Text>
                    )}
                    <Text className="text-text-muted text-[10px]">
                      {new Date(mov.date).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {mov.payment_method ? ` • ${mov.payment_method}` : ""}
                    </Text>
                  </View>
                  <Text className={`font-sans-bold text-sm ${config.color}`}>
                    {mov.type === "INCOME" || mov.type === "DEPOSIT" ? "+" : "-"}
                    R$ {mov.amount.toFixed(2)}
                  </Text>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Withdrawal/Deposit Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-background rounded-t-3xl px-5 pt-6 pb-10">
            <View className="w-12 h-1.5 bg-border rounded-full self-center mb-6" />

            <Text className="text-text-primary text-lg font-sans-bold mb-4">
              {movType === "WITHDRAWAL" ? "💸 Sangria" : "💰 Depósito"}
            </Text>

            <CurrencyInput
              label="Valor"
              value={movAmount}
              onChangeValue={setMovAmount}
            />

            <Input
              label="Descrição (opcional)"
              value={movDescription}
              onChangeText={setMovDescription}
              placeholder={movType === "WITHDRAWAL" ? "Ex: Pagamento de despesas" : "Ex: Troco inicial"}
            />

            <View className="flex-row gap-3 mt-4">
              <View className="flex-1">
                <Button title="Cancelar" variant="outline" onPress={() => setShowModal(false)} />
              </View>
              <View className="flex-1">
                <Button title="Confirmar" icon="✅" loading={movLoading} onPress={handleMovement} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
