// ============================================
// Lista de Clientes
// ============================================

import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { getDatabase } from "../../../src/services";

interface ClientItem {
  id: string;
  name: string;
  cpf: string;
  phone1: string;
  active_loans: number;
}

export default function ClientsScreen() {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadClients = useCallback(async () => {
    try {
      const db = await getDatabase();
      const searchTerm = `%${search}%`;

      const result = await db.getAllAsync<ClientItem>(
        `SELECT c.id, c.name, c.cpf, c.phone1,
         (SELECT COUNT(*) FROM loans l WHERE l.client_id = c.id AND l.status = 'ACTIVE') as active_loans
         FROM clients c
         WHERE c.active = 1
         AND (c.name LIKE ? OR c.cpf LIKE ? OR c.phone1 LIKE ?)
         ORDER BY c.name ASC
         LIMIT 100`,
        [searchTerm, searchTerm, searchTerm]
      );

      setClients(result);
    } catch (error) {
      console.error("Load clients error:", error);
    }
  }, [search]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadClients();
    setRefreshing(false);
  }, [loadClients]);

  const formatCpf = (cpf: string) => {
    if (cpf.length !== 11) return cpf;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
  };

  return (
    <View className="flex-1 bg-background">
      {/* Search */}
      <View className="px-4 py-3">
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por nome, CPF ou telefone..."
          placeholderTextColor="#64748b"
          className="bg-surface border border-border rounded-xl px-4 py-3 text-text-primary"
        />
      </View>

      {/* List */}
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
          />
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/(tabs)/clients/${item.id}`)}
            className="bg-surface border border-border rounded-xl p-4 mb-2"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              {/* Avatar */}
              <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center mr-3">
                <Text className="text-primary font-sans-bold text-lg">
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>

              {/* Info */}
              <View className="flex-1">
                <Text className="text-text-primary font-sans-semibold text-base">
                  {item.name}
                </Text>
                <Text className="text-text-muted text-xs mt-0.5">
                  CPF: {formatCpf(item.cpf)}
                </Text>
              </View>

              {/* Badge */}
              {item.active_loans > 0 && (
                <View className="bg-primary/20 rounded-full px-3 py-1">
                  <Text className="text-primary text-xs font-sans-medium">
                    {item.active_loans} ativo{item.active_loans > 1 ? "s" : ""}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="items-center mt-12">
            <Text className="text-4xl mb-3">👥</Text>
            <Text className="text-text-secondary text-base">
              Nenhum cliente encontrado
            </Text>
          </View>
        }
      />

      {/* FAB - Add Client */}
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/clients/new")}
        className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg"
        activeOpacity={0.8}
      >
        <Text className="text-white text-2xl font-sans-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
}
