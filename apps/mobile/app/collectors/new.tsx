import { useState } from "react";
import { View, ScrollView, Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { createCollector, updateCollector } from "../../src/services/admin";
import { Card, Input, Button } from "../../src/components";

import { SafeAreaView } from "react-native-safe-area-context";

export default function CollectorFormScreen() {
  const params = useLocalSearchParams();
  const isEditing = !!params.id;

  const [form, setForm] = useState({
    name: (params.name as string) || "",
    email: (params.email as string) || "",
    phone: (params.phone as string) || "",
    commissionPct: (params.commissionPct as string) || "",
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!form.name || !form.email) {
      Alert.alert("Erro", "Nome e Email são obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        await updateCollector(params.id as string, form);
        Alert.alert("Sucesso", "Cobrador atualizado com sucesso!");
      } else {
        await createCollector(form);
        Alert.alert(
          "Sucesso", 
          "Cobrador criado!\n\nA senha temporária gerada foi: 123456\nPeça para ele alterar após o primeiro acesso."
        );
      }
      router.back();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Custom Header */}
      <View className="flex-row items-center px-5 py-4 border-b border-border bg-background">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 p-2 -ml-2">
          <Text className="text-primary font-sans-semibold text-base">{"< Voltar"}</Text>
        </TouchableOpacity>
        <Text className="flex-1 text-text-primary text-lg font-sans-bold">
          {isEditing ? "Editar Cobrador" : "Novo Cobrador"}
        </Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
          <Card>
            <Text className="text-text-primary font-sans-semibold text-base mb-4">
              Dados do Cobrador
            </Text>

            <View className="space-y-4">
              <Input
                label="Nome Completo *"
                value={form.name}
                onChangeText={(val) => handleChange("name", val)}
                placeholder="Ex: João da Silva"
              />

              <Input
                label="E-mail *"
                value={form.email}
                onChangeText={(val) => handleChange("email", val)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="joao@email.com"
              />

              <Input
                label="Telefone (Opcional)"
                value={form.phone}
                onChangeText={(val) => handleChange("phone", val)}
                keyboardType="phone-pad"
                placeholder="(11) 99999-9999"
              />

              <Input
                label="Comissão Específica % (Opcional)"
                value={form.commissionPct}
                onChangeText={(val) => handleChange("commissionPct", val)}
                keyboardType="numeric"
                placeholder="Ex: 15 (Vazio = Padrão Global)"
              />
            </View>
          </Card>

          {!isEditing && (
            <View className="mt-4 px-2">
              <Text className="text-text-muted text-xs text-center">
                A senha padrão "123456" será gerada para este usuário.
              </Text>
            </View>
          )}

          <View className="mt-8 mb-8">
            <Button 
              title={isEditing ? "Salvar Alterações" : "Criar Cobrador"} 
              onPress={handleSave} 
              loading={loading} 
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
