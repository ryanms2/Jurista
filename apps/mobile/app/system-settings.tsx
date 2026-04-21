import { useState, useEffect } from "react";
import { View, ScrollView, Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from "react-native";
import { Stack, router } from "expo-router";
import { useAuthStore } from "../src/stores";
import { getSystemConfigs, updateSystemConfigs, SystemConfigItem } from "../src/services/admin";
import { Card, Input, Button } from "../src/components";

import { SafeAreaView } from "react-native-safe-area-context";

export default function SystemSettingsScreen() {
  const user = useAuthStore((s) => s.user);
  const [configs, setConfigs] = useState<SystemConfigItem[]>([]);
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.role !== "MASTER") {
      Alert.alert("Acesso Negado", "Apenas administradores podem acessar as configurações do sistema.");
      router.back();
      return;
    }

    loadConfigs();
  }, [user]);

  const loadConfigs = async () => {
    try {
      setLoading(true);
      const data = await getSystemConfigs();
      setConfigs(data);
      
      const initialForm: Record<string, string> = {};
      data.forEach(item => {
        initialForm[item.key] = item.value;
      });
      setForm(initialForm);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = Object.keys(form).map(key => ({
        key,
        value: form[key]
      }));

      await updateSystemConfigs(payload);
      Alert.alert("Sucesso", "Configurações atualizadas com sucesso!");
      router.back();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
  };

  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-text-muted">Carregando configurações...</Text>
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
        <Text className="flex-1 text-text-primary text-lg font-sans-bold">Configurações Globais</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
        
        <Card>
          <Text className="text-text-primary font-sans-semibold text-base mb-4">Valores Padrão do Sistema</Text>
          <Text className="text-text-muted text-sm mb-6">
            Estes valores serão usados automaticamente ao criar novos empréstimos ou cadastrar novos cobradores.
          </Text>

          {configs.map((config) => (
            <View key={config.key} className="mb-4">
              <Input
                label={config.description || config.key}
                value={form[config.key] || ""}
                onChangeText={(val) => handleChange(config.key, val)}
                keyboardType="numeric"
                placeholder="Ex: 10"
              />
            </View>
          ))}
        </Card>

        <View className="mt-6 mb-8">
          <Button 
            title="Salvar Alterações" 
            onPress={handleSave} 
            loading={saving} 
          />
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
