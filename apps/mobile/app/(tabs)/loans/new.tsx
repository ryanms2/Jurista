// ============================================
// Novo Empréstimo — com Simulação
// ============================================

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as Crypto from "expo-crypto";
import { getDatabase } from "../../../src/services";
import { enqueueSync } from "../../../src/services/sync";
import { useAuthStore } from "../../../src/stores";
import {
  Input,
  Button,
  Card,
  Select,
  CurrencyInput,
  Separator,
  StatRow,
} from "../../../src/components";

// Importar calculadora do shared (isomórfico!)
import {
  calculateLoan,
  generateInstallmentInputs,
  FREQUENCY_OPTIONS,
  SYSTEM_DEFAULTS,
  type LoanFrequency,
  type LoanCalculation,
} from "@jurista/shared";

interface ClientOption {
  id: string;
  name: string;
  cpf: string;
}

export default function NewLoanScreen() {
  const params = useLocalSearchParams<{ clientId?: string }>();
  const user = useAuthStore((s) => s.user);

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [searchClient, setSearchClient] = useState("");

  // Form
  const [clientId, setClientId] = useState(params.clientId || "");
  const [selectedClientName, setSelectedClientName] = useState("");
  const [amount, setAmount] = useState("500.00");
  const [interestRate, setInterestRate] = useState(`${SYSTEM_DEFAULTS.INTEREST_RATE}`);
  const [frequency, setFrequency] = useState<string>("DAILY");
  const [installments, setInstallments] = useState(`${SYSTEM_DEFAULTS.DAILY_INSTALLMENTS}`);
  const [commissionPct, setCommissionPct] = useState(`${SYSTEM_DEFAULTS.COMMISSION_PCT}`);
  const [notes, setNotes] = useState("");

  // Simulação em tempo real
  const simulation = useMemo<LoanCalculation | null>(() => {
    const amt = parseFloat(amount);
    const rate = parseFloat(interestRate);
    const inst = parseInt(installments, 10);
    const comm = parseFloat(commissionPct);

    if (isNaN(amt) || amt <= 0 || isNaN(rate) || rate <= 0 || isNaN(inst) || inst <= 0) {
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

  // Buscar clientes
  const loadClients = useCallback(async () => {
    try {
      const db = await getDatabase();
      const term = `%${searchClient}%`;
      const result = await db.getAllAsync<ClientOption>(
        `SELECT id, name, cpf FROM clients
         WHERE active = 1 AND (name LIKE ? OR cpf LIKE ?)
         ORDER BY name ASC LIMIT 20`,
        [term, term]
      );
      setClients(result);

      // Se veio com clientId via params, buscar nome
      if (params.clientId && !selectedClientName) {
        const c = await db.getFirstAsync<ClientOption>(
          `SELECT id, name, cpf FROM clients WHERE id = ?`,
          [params.clientId]
        );
        if (c) setSelectedClientName(c.name);
      }
    } catch (error) {
      console.error("Load clients:", error);
    }
  }, [searchClient, params.clientId]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  // Ajustar parcelas padrão ao mudar frequência
  useEffect(() => {
    switch (frequency) {
      case "DAILY": setInstallments("20"); break;
      case "WEEKLY": setInstallments("4"); break;
      case "BIWEEKLY": setInstallments("2"); break;
      case "MONTHLY": setInstallments("1"); break;
    }
  }, [frequency]);

  const handleSubmit = async () => {
    if (!clientId) {
      Alert.alert("Atenção", "Selecione um cliente");
      return;
    }
    if (!simulation) {
      Alert.alert("Atenção", "Verifique os valores do empréstimo");
      return;
    }

    Alert.alert(
      "Confirmar Empréstimo",
      `Valor: R$ ${simulation.amount.toFixed(2)}\n` +
        `Total c/ juros: R$ ${simulation.totalWithInterest.toFixed(2)}\n` +
        `Parcelas: ${simulation.totalInstallments}x R$ ${simulation.installmentAmount.toFixed(2)}\n` +
        `Comissão: R$ ${simulation.commissionAmount.toFixed(2)}`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: createLoan },
      ]
    );
  };

  const createLoan = async () => {
    if (!simulation || !user) return;

    setLoading(true);
    try {
      const db = await getDatabase();
      const loanId = Crypto.randomUUID();
      const collectorId = user.id;
      const installmentInputs = generateInstallmentInputs(simulation);

      // Inserir empréstimo
      await db.runAsync(
        `INSERT INTO loans (id, client_id, collector_id, amount, interest_rate, total_with_interest, frequency, total_installments, installment_amount, status, commission_pct, commission_amount, late_fee_amount, late_fee_days, start_date, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?, ?, ?, ?, ?, ?)`,
        [
          loanId, clientId, collectorId,
          simulation.amount, simulation.interestRate,
          simulation.totalWithInterest, simulation.frequency,
          simulation.totalInstallments, simulation.installmentAmount,
          simulation.commissionPct, simulation.commissionAmount,
          SYSTEM_DEFAULTS.LATE_FEE_AMOUNT, SYSTEM_DEFAULTS.LATE_FEE_INTERVAL_DAYS,
          new Date().toISOString(), notes || null,
        ]
      );

      // Inserir parcelas
      for (const inst of installmentInputs) {
        await db.runAsync(
          `INSERT INTO installments (id, loan_id, installment_no, amount, total_due, due_date, status)
           VALUES (?, ?, ?, ?, ?, ?, 'PENDING')`,
          [Crypto.randomUUID(), loanId, inst.installmentNo, inst.amount, inst.totalDue, inst.dueDate.toISOString()]
        );
      }

      // Enfileirar para sync
      await enqueueSync("loan", loanId, "create", {
        id: loanId,
        clientId, collectorId,
        amount: simulation.amount,
        interestRate: simulation.interestRate,
        totalWithInterest: simulation.totalWithInterest,
        frequency: simulation.frequency,
        totalInstallments: simulation.totalInstallments,
        installmentAmount: simulation.installmentAmount,
        commissionPct: simulation.commissionPct,
        commissionAmount: simulation.commissionAmount,
        startDate: new Date().toISOString(),
        notes,
        installments: installmentInputs,
      });

      // Registrar saída no caixa
      const cashMovId = Crypto.randomUUID();
      await db.runAsync(
        `INSERT INTO cash_movements (id, user_id, type, amount, description)
         VALUES (?, ?, 'EXPENSE', ?, ?)`,
        [cashMovId, collectorId, simulation.amount, `Empréstimo concedido - ${selectedClientName}`]
      );

      // Enfileirar sync do caixa
      await enqueueSync("cash_movement", cashMovId, "create", {
        id: cashMovId,
        userId: collectorId,
        type: "EXPENSE",
        amount: simulation.amount,
        description: `Empréstimo concedido - ${selectedClientName}`,
      });

      Alert.alert("Sucesso", "Empréstimo criado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Create loan:", error);
      Alert.alert("Erro", "Falha ao criar empréstimo.");
    } finally {
      setLoading(false);
    }
  };

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
        {/* Cliente */}
        <Text className="text-text-primary font-sans-bold text-lg mb-3">
          👤 Cliente
        </Text>

        {clientId && selectedClientName ? (
          <Card className="mb-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
                  <Text className="text-primary font-sans-bold">
                    {selectedClientName.charAt(0)}
                  </Text>
                </View>
                <Text className="text-text-primary font-sans-semibold">
                  {selectedClientName}
                </Text>
              </View>
              <TouchableOpacity onPress={() => { setClientId(""); setSelectedClientName(""); }}>
                <Text className="text-danger text-sm">Trocar</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ) : (
          <View className="mb-4">
            <Input
              placeholder="Buscar cliente por nome ou CPF..."
              value={searchClient}
              onChangeText={setSearchClient}
              leftIcon="🔍"
            />
            {clients.length > 0 && (
              <View className="bg-surface border border-border rounded-xl mt-1 max-h-48">
                <ScrollView nestedScrollEnabled>
                  {clients.map((c) => (
                    <TouchableOpacity
                      key={c.id}
                      onPress={() => {
                        setClientId(c.id);
                        setSelectedClientName(c.name);
                        setSearchClient("");
                      }}
                      className="px-4 py-3 border-b border-border"
                      activeOpacity={0.7}
                    >
                      <Text className="text-text-primary text-sm">{c.name}</Text>
                      <Text className="text-text-muted text-xs">
                        CPF: {c.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        )}

        <Separator label="VALORES" />

        {/* Valor */}
        <CurrencyInput
          label="Valor do Empréstimo"
          value={amount}
          onChangeValue={setAmount}
        />

        {/* Taxa */}
        <Input
          label="Taxa de Juros (%)"
          value={interestRate}
          onChangeText={setInterestRate}
          keyboardType="numeric"
          placeholder="20"
          leftIcon="📊"
        />

        {/* Frequência */}
        <Select
          label="Modalidade"
          options={FREQUENCY_OPTIONS.map((o) => ({
            value: o.value,
            label: o.label,
          }))}
          value={frequency}
          onChange={setFrequency}
        />

        {/* Parcelas */}
        <Input
          label="Número de Parcelas"
          value={installments}
          onChangeText={setInstallments}
          keyboardType="numeric"
          placeholder="20"
          leftIcon="📅"
        />

        {/* Comissão */}
        <Input
          label="Comissão do Cobrador (%)"
          value={commissionPct}
          onChangeText={setCommissionPct}
          keyboardType="numeric"
          placeholder="30"
          leftIcon="💼"
        />

        {/* Observações */}
        <Input
          label="Observações (opcional)"
          value={notes}
          onChangeText={setNotes}
          placeholder="Notas sobre o empréstimo..."
          multiline
          numberOfLines={2}
        />

        <Separator label="SIMULAÇÃO" />

        {/* Simulation Card */}
        {simulation ? (
          <Card className="mb-6 border-primary/30">
            <Text className="text-primary font-sans-bold text-base mb-3">
              📊 Resumo do Empréstimo
            </Text>

            <StatRow
              label="Valor emprestado"
              value={`R$ ${simulation.amount.toFixed(2)}`}
            />
            <StatRow
              label="Juros"
              value={`R$ ${simulation.interestAmount.toFixed(2)} (${simulation.interestRate}%)`}
              valueColor="text-warning"
            />
            <StatRow
              label="Total com juros"
              value={`R$ ${simulation.totalWithInterest.toFixed(2)}`}
              valueColor="text-text-primary"
            />

            <View className="h-px bg-border my-2" />

            <StatRow
              label="Parcelas"
              value={`${simulation.totalInstallments}x R$ ${simulation.installmentAmount.toFixed(2)}`}
              valueColor="text-primary"
            />
            <StatRow
              label="Comissão cobrador"
              value={`R$ ${simulation.commissionAmount.toFixed(2)} (${simulation.commissionPct}%)`}
              valueColor="text-secondary"
            />
            <StatRow
              label="1ª parcela vence em"
              value={simulation.dueDates[0]
                ? simulation.dueDates[0].toLocaleDateString("pt-BR")
                : "-"}
            />
            <StatRow
              label="Última parcela"
              value={simulation.dueDates[simulation.dueDates.length - 1]
                ? simulation.dueDates[simulation.dueDates.length - 1]!.toLocaleDateString("pt-BR")
                : "-"}
            />
          </Card>
        ) : (
          <Card className="mb-6">
            <Text className="text-text-muted text-center text-sm">
              Preencha os valores para ver a simulação
            </Text>
          </Card>
        )}

        {/* Submit */}
        <Button
          title="Criar Empréstimo"
          icon="✅"
          loading={loading}
          onPress={handleSubmit}
          disabled={!simulation || !clientId}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
