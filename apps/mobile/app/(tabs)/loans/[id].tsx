// ============================================
// Detalhes do Empréstimo
// ============================================
// Timeline de parcelas + registro de pagamento
// ============================================

import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Modal,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as Crypto from "expo-crypto";
import { getDatabase } from "../../../src/services";
import { enqueueSync } from "../../../src/services/sync";
import { useAuthStore } from "../../../src/stores";
import { Card, Badge, StatRow, Button, Select, Input, CurrencyInput, Separator } from "../../../src/components";

interface LoanDetail {
  id: string;
  client_id: string;
  client_name: string;
  collector_name: string;
  amount: number;
  interest_rate: number;
  total_with_interest: number;
  frequency: string;
  total_installments: number;
  installment_amount: number;
  status: string;
  commission_pct: number;
  commission_amount: number;
  late_fee_amount: number;
  late_fee_days: number;
  start_date: string;
  notes: string | null;
}

interface InstallmentItem {
  id: string;
  installment_no: number;
  amount: number;
  late_fee: number;
  total_due: number;
  due_date: string;
  status: string;
  paid_amount: number;
  paid_at: string | null;
  days_overdue: number;
}

export default function LoanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const [loan, setLoan] = useState<LoanDetail | null>(null);
  const [installments, setInstallments] = useState<InstallmentItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<InstallmentItem | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      const db = await getDatabase();

      const loanData = await db.getFirstAsync<LoanDetail>(
        `SELECT l.*, c.name as client_name,
         (SELECT name FROM users WHERE id = l.collector_id) as collector_name
         FROM loans l
         JOIN clients c ON l.client_id = c.id
         WHERE l.id = ?`,
        [id]
      );
      setLoan(loanData);

      const instData = await db.getAllAsync<InstallmentItem>(
        `SELECT * FROM installments WHERE loan_id = ? ORDER BY installment_no ASC`,
        [id]
      );
      setInstallments(instData);
    } catch (error) {
      console.error("Load loan:", error);
    }
  }, [id]);

  useEffect(() => { loadData(); }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const openPayment = (inst: InstallmentItem) => {
    setSelectedInstallment(inst);
    setPaymentAmount(inst.total_due.toFixed(2));
    setPaymentMethod("CASH");
    setPaymentNotes("");
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    if (!selectedInstallment || !user) return;
    const amt = parseFloat(paymentAmount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert("Atenção", "Informe o valor do pagamento");
      return;
    }

    setPaymentLoading(true);
    try {
      const db = await getDatabase();
      const paymentId = Crypto.randomUUID();
      const syncId = Crypto.randomUUID();

      // Inserir pagamento
      await db.runAsync(
        `INSERT INTO payments (id, installment_id, collector_id, amount, method, notes, sync_id)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [paymentId, selectedInstallment.id, user.id, amt, paymentMethod, paymentNotes || null, syncId]
      );

      // Atualizar parcela
      const newPaid = selectedInstallment.paid_amount + amt;
      const totalDue = selectedInstallment.total_due;
      const isPaid = newPaid >= totalDue;
      const status = isPaid ? "PAID" : newPaid > 0 ? "PARTIALLY_PAID" : selectedInstallment.status;

      await db.runAsync(
        `UPDATE installments SET paid_amount = ?, status = ?, paid_at = ? WHERE id = ?`,
        [newPaid, status, isPaid ? new Date().toISOString() : null, selectedInstallment.id]
      );

      // Verificar se todas as parcelas foram pagas
      if (isPaid) {
        const pendingCount = await db.getFirstAsync<{ count: number }>(
          `SELECT COUNT(*) as count FROM installments
           WHERE loan_id = ? AND id != ? AND status IN ('PENDING', 'OVERDUE', 'PARTIALLY_PAID')`,
          [id, selectedInstallment.id]
        );

        if (pendingCount && pendingCount.count === 0) {
          await db.runAsync(
            `UPDATE loans SET status = 'COMPLETED', end_date = ? WHERE id = ?`,
            [new Date().toISOString(), id]
          );
        }
      }

      // Enfileirar sync
      await enqueueSync("payment", paymentId, "create", {
        id: paymentId,
        installmentId: selectedInstallment.id,
        collectorId: user.id,
        amount: amt,
        method: paymentMethod,
        notes: paymentNotes,
        syncId,
      });

      // Registrar no caixa
      const cashMovId = Crypto.randomUUID();
      await db.runAsync(
        `INSERT INTO cash_movements (id, user_id, payment_id, type, amount, description)
         VALUES (?, ?, ?, 'INCOME', ?, ?)`,
        [cashMovId, user.id, paymentId, amt, `Parcela ${selectedInstallment.installment_no} - ${paymentMethod}`]
      );

      // Enfileirar sync do caixa
      await enqueueSync("cash_movement", cashMovId, "create", {
        id: cashMovId,
        userId: user.id,
        paymentId: paymentId,
        type: "INCOME",
        amount: amt,
        description: `Parcela ${selectedInstallment.installment_no} - ${paymentMethod}`,
      });

      setShowPaymentModal(false);
      await loadData();

      Alert.alert("✅", `Pagamento de R$ ${amt.toFixed(2)} registrado!`);
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Erro", "Falha ao registrar pagamento.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const getStatusConfig = (status: string, dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    switch (status) {
      case "PAID":
        return { color: "bg-success", icon: "✅", label: "Pago", text: "text-success" };
      case "OVERDUE":
        return { color: "bg-danger", icon: "🔴", label: "Atrasado", text: "text-danger" };
      case "PARTIALLY_PAID":
        return { color: "bg-warning", icon: "🟡", label: "Parcial", text: "text-warning" };
      default:
        if (due.getTime() === today.getTime()) {
          return { color: "bg-warning", icon: "📅", label: "Hoje", text: "text-warning" };
        }
        if (due < today) {
          return { color: "bg-danger", icon: "⚠️", label: "Vencida", text: "text-danger" };
        }
        return { color: "bg-muted", icon: "⏳", label: "Pendente", text: "text-text-muted" };
    }
  };

  const getFreqLabel = (f: string) => {
    const m: Record<string, string> = { DAILY: "Diário", WEEKLY: "Semanal", BIWEEKLY: "Quinzenal", MONTHLY: "Mensal" };
    return m[f] || f;
  };

  if (!loan) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-text-muted">Carregando...</Text>
      </View>
    );
  }

  const paidCount = installments.filter((i) => i.status === "PAID").length;
  const progress = loan.total_installments > 0 ? (paidCount / loan.total_installments) * 100 : 0;

  return (
    <>
      <ScrollView
        className="flex-1 bg-background"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Loan Summary */}
        <View className="px-5 pt-4">
          <Card className="border-primary/20">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="text-text-primary text-xl font-sans-bold">
                  R$ {loan.amount.toFixed(2)}
                </Text>
                <Text className="text-text-muted text-sm mt-0.5">
                  {loan.client_name} • {getFreqLabel(loan.frequency)}
                </Text>
              </View>
              <Badge
                text={loan.status === "ACTIVE" ? "Ativo" : loan.status === "COMPLETED" ? "Concluído" : loan.status}
                color={loan.status === "ACTIVE" ? "primary" : loan.status === "COMPLETED" ? "success" : "danger"}
              />
            </View>

            {/* Progress Bar */}
            <View className="mb-3">
              <View className="flex-row justify-between mb-1">
                <Text className="text-text-muted text-xs">Progresso</Text>
                <Text className="text-text-secondary text-xs font-sans-medium">
                  {paidCount}/{loan.total_installments} ({Math.round(progress)}%)
                </Text>
              </View>
              <View className="h-2 bg-surface-light rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </View>
            </View>

            <StatRow label="Total c/ juros" value={`R$ ${loan.total_with_interest.toFixed(2)}`} />
            <StatRow label="Parcela" value={`R$ ${loan.installment_amount.toFixed(2)}`} />
            <StatRow label="Juros" value={`${loan.interest_rate}%`} valueColor="text-warning" />
            <StatRow label="Comissão" value={`R$ ${loan.commission_amount.toFixed(2)} (${loan.commission_pct}%)`} valueColor="text-secondary" />
            <StatRow label="Cobrador" value={loan.collector_name || "-"} />
            <StatRow label="Início" value={new Date(loan.start_date).toLocaleDateString("pt-BR")} />
            {loan.notes && <StatRow label="Obs" value={loan.notes} />}
          </Card>
        </View>

        {/* Installments Timeline */}
        <View className="px-5 mt-4">
          <Text className="text-text-primary font-sans-bold text-base mb-3">
            📅 Parcelas
          </Text>

          {installments.map((inst, idx) => {
            const config = getStatusConfig(inst.status, inst.due_date);
            const canPay = inst.status !== "PAID";

            return (
              <View key={inst.id} className="flex-row mb-1">
                {/* Timeline line */}
                <View className="items-center w-8 mr-3">
                  <View className={`w-3 h-3 rounded-full ${config.color}`} />
                  {idx < installments.length - 1 && (
                    <View className="w-0.5 flex-1 bg-border" />
                  )}
                </View>

                {/* Card */}
                <TouchableOpacity
                  onPress={() => canPay && openPayment(inst)}
                  disabled={!canPay}
                  activeOpacity={canPay ? 0.7 : 1}
                  className={`flex-1 bg-surface border rounded-xl p-3 mb-2 ${
                    inst.status === "PAID" ? "border-success/20 opacity-70" : "border-border"
                  }`}
                >
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <View className="flex-row items-center">
                        <Text className="text-text-primary font-sans-semibold text-sm">
                          Parcela {inst.installment_no}
                        </Text>
                        <Text className={`ml-2 text-xs ${config.text}`}>
                          {config.icon} {config.label}
                        </Text>
                      </View>
                      <Text className="text-text-muted text-xs mt-0.5">
                        {new Date(inst.due_date).toLocaleDateString("pt-BR")}
                      </Text>
                    </View>

                    <View className="items-end">
                      <Text className={`font-sans-bold text-sm ${config.text}`}>
                        R$ {inst.total_due.toFixed(2)}
                      </Text>
                      {inst.late_fee > 0 && (
                        <Text className="text-danger text-[10px]">
                          +R$ {inst.late_fee.toFixed(2)} multa
                        </Text>
                      )}
                      {inst.status === "PARTIALLY_PAID" && (
                        <Text className="text-warning text-[10px]">
                          Pago: R$ {inst.paid_amount.toFixed(2)}
                        </Text>
                      )}
                    </View>
                  </View>

                  {canPay && (
                    <View className="mt-2 bg-primary/10 rounded-lg py-1.5 items-center">
                      <Text className="text-primary text-xs font-sans-medium">
                        Toque para registrar pagamento
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Payment Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-background rounded-t-3xl px-5 pt-6 pb-10">
            <View className="w-12 h-1.5 bg-border rounded-full self-center mb-6" />

            <Text className="text-text-primary text-lg font-sans-bold mb-1">
              💰 Registrar Pagamento
            </Text>
            {selectedInstallment && (
              <Text className="text-text-muted text-sm mb-4">
                Parcela {selectedInstallment.installment_no} •
                Vence {new Date(selectedInstallment.due_date).toLocaleDateString("pt-BR")}
              </Text>
            )}

            <CurrencyInput
              label="Valor do Pagamento"
              value={paymentAmount}
              onChangeValue={setPaymentAmount}
            />

            <Select
              label="Forma de Pagamento"
              options={[
                { value: "CASH", label: "💵 Dinheiro" },
                { value: "PIX", label: "📱 PIX" },
              ]}
              value={paymentMethod}
              onChange={setPaymentMethod}
            />

            <Input
              label="Observações (opcional)"
              value={paymentNotes}
              onChangeText={setPaymentNotes}
              placeholder="Ex: Recebido na residência"
            />

            <View className="flex-row gap-3 mt-4">
              <View className="flex-1">
                <Button
                  title="Cancelar"
                  variant="outline"
                  onPress={() => setShowPaymentModal(false)}
                />
              </View>
              <View className="flex-1">
                <Button
                  title="Confirmar"
                  icon="✅"
                  loading={paymentLoading}
                  onPress={handlePayment}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
