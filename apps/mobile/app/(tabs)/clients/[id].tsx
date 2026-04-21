// ============================================
// Detalhes do Cliente
// ============================================
// Dados + fotos + histórico de empréstimos
// ============================================

import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { getDatabase } from "../../../src/services";
import { Card, Badge, StatRow, EmptyState, Button, Separator } from "../../../src/components";
import { maskCpf, maskPhone } from "../../../src/components/masks";

interface ClientDetail {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  address: string;
  phone1: string;
  phone2: string | null;
  credit_score: number;
  active: number;
  created_at: string;
}

interface PhotoItem {
  id: string;
  local_path: string | null;
  remote_url: string | null;
  type: string;
  description: string | null;
}

interface LoanSummary {
  id: string;
  amount: number;
  total_with_interest: number;
  frequency: string;
  status: string;
  start_date: string;
  total_installments: number;
  paid_count: number;
}

export default function ClientDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loans, setLoans] = useState<LoanSummary[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      const db = await getDatabase();

      const clientData = await db.getFirstAsync<ClientDetail>(
        `SELECT * FROM clients WHERE id = ?`,
        [id]
      );
      setClient(clientData);

      const photosData = await db.getAllAsync<PhotoItem>(
        `SELECT * FROM client_photos WHERE client_id = ? ORDER BY created_at DESC`,
        [id]
      );
      setPhotos(photosData);

      const loansData = await db.getAllAsync<LoanSummary>(
        `SELECT l.*,
         (SELECT COUNT(*) FROM installments i WHERE i.loan_id = l.id AND i.status = 'PAID') as paid_count
         FROM loans l WHERE l.client_id = ? ORDER BY l.created_at DESC`,
        [id]
      );
      setLoans(loansData);
    } catch (error) {
      console.error("Load client error:", error);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-warning";
    return "text-danger";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { text: "Excelente", color: "success" as const };
    if (score >= 60) return { text: "Bom", color: "primary" as const };
    if (score >= 40) return { text: "Regular", color: "warning" as const };
    return { text: "Ruim", color: "danger" as const };
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

  const getFrequencyLabel = (freq: string) => {
    const labels: Record<string, string> = {
      DAILY: "Diário", WEEKLY: "Semanal",
      BIWEEKLY: "Quinzenal", MONTHLY: "Mensal",
    };
    return labels[freq] || freq;
  };

  if (!client) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-text-muted">Carregando...</Text>
      </View>
    );
  }

  const scoreInfo = getScoreLabel(client.credit_score);

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
      }
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header Card */}
      <View className="px-5 pt-4">
        <Card>
          <View className="flex-row items-center">
            <View className="w-16 h-16 rounded-full bg-primary/20 items-center justify-center mr-4">
              {photos.find((p) => p.type === "selfie") ? (
                <Image
                  source={{ uri: photos.find((p) => p.type === "selfie")!.local_path || "" }}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <Text className="text-primary text-2xl font-sans-bold">
                  {client.name.charAt(0)}
                </Text>
              )}
            </View>
            <View className="flex-1">
              <Text className="text-text-primary text-xl font-sans-bold">
                {client.name}
              </Text>
              <Text className="text-text-muted text-sm mt-0.5">
                CPF: {maskCpf(client.cpf)}
              </Text>
            </View>
            <Badge text={scoreInfo.text} color={scoreInfo.color} />
          </View>
        </Card>
      </View>

      {/* Info Card */}
      <View className="px-5 mt-3">
        <Card>
          <Text className="text-text-primary font-sans-semibold mb-3">
            📋 Informações
          </Text>
          <StatRow label="RG" value={client.rg} />
          <StatRow label="Endereço" value={client.address} />
          <StatRow label="Telefone 1" value={maskPhone(client.phone1)} />
          {client.phone2 && (
            <StatRow label="Telefone 2" value={maskPhone(client.phone2)} />
          )}
          <StatRow
            label="Credit Score"
            value={`${client.credit_score}/100`}
            valueColor={getScoreColor(client.credit_score)}
          />
          <StatRow
            label="Desde"
            value={new Date(client.created_at).toLocaleDateString("pt-BR")}
          />
        </Card>
      </View>

      {/* Photos */}
      {photos.length > 0 && (
        <View className="px-5 mt-3">
          <Card>
            <Text className="text-text-primary font-sans-semibold mb-3">
              📸 Fotos ({photos.length})
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {photos.map((photo) => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() =>
                      setSelectedPhoto(
                        selectedPhoto === photo.id ? null : photo.id
                      )
                    }
                    activeOpacity={0.8}
                  >
                    <Image
                      source={{ uri: photo.local_path || photo.remote_url || "" }}
                      className={`rounded-xl ${
                        selectedPhoto === photo.id
                          ? "w-60 h-60"
                          : "w-20 h-20"
                      }`}
                      resizeMode="cover"
                    />
                    <Text className="text-text-muted text-[10px] text-center mt-1">
                      {photo.type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Card>
        </View>
      )}

      {/* Loans */}
      <View className="px-5 mt-3">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-text-primary font-sans-semibold text-base">
            💰 Empréstimos ({loans.length})
          </Text>
          <View className="flex-row gap-2">
            {loans.some((l) => l.status === "COMPLETED") && (
              <Button
                title="Renovar"
                icon="🔄"
                size="sm"
                variant="secondary"
                fullWidth={false}
                onPress={() =>
                  router.push({
                    pathname: "/renewal",
                    params: { clientId: id },
                  })
                }
              />
            )}
            <Button
              title="Novo"
              icon="+"
              size="sm"
              fullWidth={false}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/loans/new",
                  params: { clientId: id },
                })
              }
            />
          </View>
        </View>

        {loans.length === 0 ? (
          <EmptyState
            icon="📭"
            title="Sem empréstimos"
            subtitle="Este cliente ainda não possui empréstimos"
          />
        ) : (
          loans.map((loan) => {
            const badge = getStatusBadge(loan.status);
            return (
              <Card
                key={loan.id}
                className="mb-2"
                onPress={() => router.push(`/(tabs)/loans/${loan.id}`)}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-text-primary font-sans-semibold">
                      R$ {loan.amount.toFixed(2)}
                    </Text>
                    <Text className="text-text-muted text-xs mt-1">
                      {getFrequencyLabel(loan.frequency)} • {loan.paid_count}/{loan.total_installments} parcelas
                    </Text>
                    <Text className="text-text-muted text-xs">
                      Início: {new Date(loan.start_date).toLocaleDateString("pt-BR")}
                    </Text>
                  </View>
                  <Badge text={badge.text} color={badge.color} />
                </View>
              </Card>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
