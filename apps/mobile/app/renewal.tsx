// ============================================
// Renovação de Empréstimo
// ============================================
// Análise de crédito + simulação de renovação
// ============================================

import { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as Crypto from "expo-crypto";
import { getDatabase } from "../src/services";
import { enqueueSync } from "../src/services/sync";
import { analyzeClientCredit, canRenewLoan } from "../src/services/credit";
import { useAuthStore } from "../src/stores";
import {
  Card,
  Button,
  CurrencyInput,
  Input,
  Select,
  StatRow,
  Separator,
  Badge,
} from "../src/components";

import {
  calculateLoan,
  generateInstallmentInputs,
  FREQUENCY_OPTIONS,
  SYSTEM_DEFAULTS,
  type LoanFrequency,
  type LoanCalculation,
  type CreditAnalysis,
} from "@jurista/shared";

interface ClientInfo {
  id: string;
  name: string;
  cpf: string;
  credit_score: number;
}

interface LastLoan {
  amount: number;
  interest_rate: number;
  frequency: string;
  commission_pct: number;
  status: string;
}

export default function RenewalScreen() {
  const { clientId } = useLocalSearchParams<{ clientId: string }>();
  const user = useAuthStore((s) => s.user);

  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(true);
  const [client, setClient] = useState<ClientInfo | null>(null);
  const [lastLoan, setLastLoan] = useState<LastLoan | null>(null);
  const [analysis, setAnalysis] = useState<CreditAnalysis | null>(null);
  const [renewalBlocked, setRenewalBlocked] = useState<string | null>(null);

  // Form
  const [amount, setAmount] = useState("500.00");
  const [interestRate, setInterestRate] = useState(`${SYSTEM_DEFAULTS.INTEREST_RATE}`);
  const [frequency, setFrequency] = useState("DAILY");
  const [installments, setInstallments] = useState(`${SYSTEM_DEFAULTS.DAILY_INSTALLMENTS}`);
  const [commissionPct, setCommissionPct] = useState(`${SYSTEM_DEFAULTS.COMMISSION_PCT}`);

  useEffect(() => {
    async function load() {
      if (!clientId) return;
      try {
        const db = await getDatabase();

        const clientData = await db.getFirstAsync<ClientInfo>(
          `SELECT id, name, cpf, credit_score FROM clients WHERE id = ?`,
          [clientId]
        );
        setClient(clientData);

        // Verificar se pode renovar
        const renewal = await canRenewLoan(clientId);
        if (!renewal.canRenew) {
          setRenewalBlocked(renewal.reason || "Não é possível renovar");
          setAnalyzing(false);
          return;
        }

        // Último empréstimo para referência
        const last = await db.getFirstAsync<LastLoan>(
          `SELECT amount, interest_rate, frequency, commission_pct, status
           FROM loans WHERE client_id = ? ORDER BY created_at DESC LIMIT 1`,
          [clientId]
        );

        if (last) {
          setLastLoan(last);
          setInterestRate(String(last.interest_rate));
          setFrequency(last.frequency);
          setCommissionPct(String(last.commission_pct));
        }

        // Análise de crédito
        const creditResult = await analyzeClientCredit(clientId, last?.amount || 500);
        setAnalysis(creditResult);

        // Aplicar valor recomendado (maxRenewalAmount)
        if (creditResult.maxRenewalAmount > 0) {
          setAmount(creditResult.maxRenewalAmount.toFixed(2));
        } else if (last) {
          setAmount(last.amount.toFixed(2));
        }

        // Atualizar credit score no banco
        await db.runAsync(
          `UPDATE clients SET credit_score = ?, updated_at = datetime('now') WHERE id = ?`,
          [creditResult.score, clientId]
        );
      } catch (error) {
        console.error("Renewal load error:", error);
      } finally {
        setAnalyzing(false);
      }
    }

    load();
  }, [clientId]);

  // Simulação
  const simulation = useMemo<LoanCalculation | null>(() => {
    const amt = parseFloat(amount);
    const rate = parseFloat(interestRate);
    const inst = parseInt(installments, 10);
    const comm = parseFloat(commissionPct);

    if (isNaN(amt) || amt <= 0 || isNaN(rate) || isNaN(inst) || inst <= 0) {
      return null;
    }

    return calculateLoan({
      amount: amt,
      interestRate: rate,
      frequency: frequency as LoanFrequency,
      totalInstallments: inst,
      commissionPct: isNaN(comm) ? 30 : comm,
      startDate: new Date(),
      excludeSundays: true,
    });
  }, [amount, interestRate, frequency, installments, commissionPct]);

  const handleRenew = async () => {
    if (!simulation || !user || !clientId) return;

    Alert.alert(
      "Confirmar Renovação",
      `Valor: R$ ${simulation.amount.toFixed(2)}\n` +
        `Total: R$ ${simulation.totalWithInterest.toFixed(2)}\n` +
        `${simulation.totalInstallments}x R$ ${simulation.installmentAmount.toFixed(2)}`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            setLoading(true);
            try {
              const db = await getDatabase();
              const loanId = Crypto.randomUUID();
              const installmentInputs = generateInstallmentInputs(simulation);

              const prevLoan = await db.getFirstAsync<{ id: string }>(
                `SELECT id FROM loans WHERE client_id = ? ORDER BY created_at DESC LIMIT 1`,
                [clientId]
              );

              await db.runAsync(
                `INSERT INTO loans (id, client_id, collector_id, amount, interest_rate, total_with_interest, frequency, total_installments, installment_amount, status, commission_pct, commission_amount, late_fee_amount, late_fee_days, start_date, previous_loan_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?, ?, ?, ?, ?, ?)`,
                [
                  loanId, clientId, user.id,
                  simulation.amount, simulation.interestRate,
                  simulation.totalWithInterest, simulation.frequency,
                  simulation.totalInstallments, simulation.installmentAmount,
                  simulation.commissionPct, simulation.commissionAmount,
                  SYSTEM_DEFAULTS.LATE_FEE_AMOUNT, SYSTEM_DEFAULTS.LATE_FEE_INTERVAL_DAYS,
                  new Date().toISOString(), prevLoan?.id || null,
                ]
              );

              for (const inst of installmentInputs) {
                await db.runAsync(
                  `INSERT INTO installments (id, loan_id, installment_no, amount, total_due, due_date, status)
                   VALUES (?, ?, ?, ?, ?, ?, 'PENDING')`,
                  [Crypto.randomUUID(), loanId, inst.installmentNo, inst.amount, inst.totalDue, inst.dueDate.toISOString()]
                );
              }

              await db.runAsync(
                `INSERT INTO cash_movements (id, user_id, type, amount, description)
                 VALUES (?, ?, 'EXPENSE', ?, ?)`,
                [Crypto.randomUUID(), user.id, simulation.amount, `Renovação - ${client?.name}`]
              );

              await enqueueSync("loan", loanId, "create", {
                id: loanId,
                clientId,
                collectorId: user.id,
                previousLoanId: prevLoan?.id,
                isRenewal: true,
              });

              Alert.alert("✅", "Empréstimo renovado com sucesso!", [
                { text: "OK", onPress: () => router.back() },
              ]);
            } catch (error) {
              console.error("Renewal error:", error);
              Alert.alert("Erro", "Falha ao renovar empréstimo.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-warning";
    return "text-danger";
  };

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case "EXCELLENT": return { text: "Excelente", color: "success" as const };
      case "GOOD": return { text: "Bom", color: "primary" as const };
      case "FAIR": return { text: "Regular", color: "warning" as const };
      case "POOR": return { text: "Ruim", color: "danger" as const };
      default: return { text: rating, color: "muted" as const };
    }
  };

  if (analyzing) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-4xl mb-4">📊</Text>
        <Text className="text-text-primary text-base font-sans-semibold">
          Analisando crédito...
        </Text>
        <Text className="text-text-muted text-sm mt-2">
          Verificando histórico de pagamentos
        </Text>
      </View>
    );
  }

  if (renewalBlocked) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <Text className="text-4xl mb-4">🚫</Text>
        <Text className="text-text-primary text-lg font-sans-bold text-center">
          Renovação Bloqueada
        </Text>
        <Text className="text-text-secondary text-sm mt-2 text-center">
          {renewalBlocked}
        </Text>
        <View className="mt-6">
          <Button title="Voltar" variant="outline" onPress={() => router.back()} />
        </View>
      </View>
    );
  }

  const isApproved = analysis ? !analysis.requiresMasterApproval : false;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Client Header */}
        <Card className="mb-4">
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center mr-3">
              <Text className="text-primary font-sans-bold text-lg">
                {client?.name?.charAt(0)}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-text-primary font-sans-bold">
                {client?.name}
              </Text>
              <Text className="text-text-muted text-xs">Renovação de Empréstimo</Text>
            </View>
          </View>
        </Card>

        {/* Credit Analysis Card */}
        {analysis && (
          <Card className="mb-4 border-primary/20">
            <Text className="text-text-primary font-sans-bold text-base mb-3">
              📊 Análise de Crédito
            </Text>

            {/* Score Gauge */}
            <View className="items-center mb-4">
              <View className="w-28 h-28 rounded-full border-4 border-surface-light items-center justify-center">
                <Text className={`text-3xl font-sans-bold ${getScoreColor(analysis.score)}`}>
                  {analysis.score}
                </Text>
                <Text className="text-text-muted text-xs">/100</Text>
              </View>
              <View className="mt-2">
                <Badge {...getRatingBadge(analysis.rating)} />
              </View>
            </View>

            {/* Factors */}
            <StatRow
              label="Pagamento em dia"
              value={`${Math.round(analysis.factors.onTimePayments.score)}pts`}
              valueColor={analysis.factors.onTimePayments.score >= 70 ? "text-success" : "text-warning"}
            />
            <StatRow
              label="Sem atraso excessivo"
              value={`${Math.round(analysis.factors.latePayments.score)}pts`}
            />
            <StatRow
              label="Tempo como cliente"
              value={`${Math.round(analysis.factors.clientAge.score)}pts`}
            />
            <StatRow
              label="Empréstimos concluídos"
              value={`${Math.round(analysis.factors.completedLoans.score)}pts`}
            />
            <StatRow
              label="Valor recomendado"
              value={`R$ ${analysis.maxRenewalAmount.toFixed(2)}`}
              valueColor="text-primary"
            />

            {analysis.requiresMasterApproval ? (
              <View className="bg-danger/10 border border-danger/20 rounded-xl p-3 mt-3">
                <Text className="text-danger text-sm text-center font-sans-medium">
                  ⚠️ Crédito não aprovado automaticamente
                </Text>
                <Text className="text-text-muted text-xs text-center mt-1">
                  Score abaixo do mínimo ({analysis.score}/40)
                </Text>
              </View>
            ) : (
              <View className="bg-success/10 border border-success/20 rounded-xl p-3 mt-3">
                <Text className="text-success text-sm text-center font-sans-medium">
                  ✅ Crédito aprovado
                </Text>
              </View>
            )}
          </Card>
        )}

        <Separator label="NOVO EMPRÉSTIMO" />

        <CurrencyInput label="Valor do Empréstimo" value={amount} onChangeValue={setAmount} />

        <Input label="Taxa de Juros (%)" value={interestRate} onChangeText={setInterestRate} keyboardType="numeric" leftIcon="📊" />

        <Select
          label="Modalidade"
          options={FREQUENCY_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          value={frequency}
          onChange={setFrequency}
        />

        <Input label="Parcelas" value={installments} onChangeText={setInstallments} keyboardType="numeric" leftIcon="📅" />

        <Input label="Comissão (%)" value={commissionPct} onChangeText={setCommissionPct} keyboardType="numeric" leftIcon="💼" />

        {/* Simulation */}
        {simulation && (
          <>
            <Separator label="SIMULAÇÃO" />
            <Card className="mb-6 border-primary/30">
              <StatRow label="Valor" value={`R$ ${simulation.amount.toFixed(2)}`} />
              <StatRow label="Juros" value={`R$ ${simulation.interestAmount.toFixed(2)}`} valueColor="text-warning" />
              <StatRow label="Total" value={`R$ ${simulation.totalWithInterest.toFixed(2)}`} />
              <View className="h-px bg-border my-1" />
              <StatRow label="Parcelas" value={`${simulation.totalInstallments}x R$ ${simulation.installmentAmount.toFixed(2)}`} valueColor="text-primary" />
              <StatRow label="Comissão" value={`R$ ${simulation.commissionAmount.toFixed(2)}`} valueColor="text-secondary" />
            </Card>
          </>
        )}

        <Button
          title="Renovar Empréstimo"
          icon="🔄"
          loading={loading}
          onPress={handleRenew}
          disabled={!simulation || !isApproved}
        />

        {!isApproved && (
          <Text className="text-text-muted text-xs text-center mt-3">
            O score do cliente está abaixo do mínimo. Apenas o Master pode aprovar manualmente.
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
