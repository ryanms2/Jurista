// ============================================
// Tela de Login
// ============================================

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../src/stores";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:3000";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Preencha email e senha");
      return;
    }

    clearError();
    const success = await login(email.trim(), password, API_URL);

    if (success) {
      router.replace("/(tabs)/dashboard");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <View className="flex-1 justify-center px-8">
        {/* Logo / Title */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 rounded-2xl bg-primary items-center justify-center mb-4">
            <Text className="text-4xl font-sans-bold text-white">J</Text>
          </View>
          <Text className="text-3xl font-sans-bold text-text-primary">
            Jurista
          </Text>
          <Text className="text-base text-text-secondary mt-2">
            Sistema de Empréstimos
          </Text>
        </View>

        {/* Error Message */}
        {error && (
          <View className="bg-danger/20 border border-danger/30 rounded-xl px-4 py-3 mb-6">
            <Text className="text-danger text-center text-sm">{error}</Text>
          </View>
        )}

        {/* Form */}
        <View className="gap-4">
          {/* Email Input */}
          <View>
            <Text className="text-text-secondary text-sm mb-2 ml-1">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              placeholderTextColor="#64748b"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="bg-surface border border-border rounded-xl px-4 py-4 text-text-primary text-base"
              editable={!isLoading}
            />
          </View>

          {/* Password Input */}
          <View>
            <Text className="text-text-secondary text-sm mb-2 ml-1">Senha</Text>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••"
                placeholderTextColor="#64748b"
                secureTextEntry={!showPassword}
                className="bg-surface border border-border rounded-xl px-4 py-4 text-text-primary text-base pr-16"
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
              >
                <Text className="text-primary text-sm">
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`rounded-xl py-4 mt-4 items-center ${
              isLoading ? "bg-primary/50" : "bg-primary"
            }`}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white text-base font-sans-semibold">
                Entrar
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-8 items-center">
          <Text className="text-text-muted text-xs">
            Jurista v0.1.0 • Sistema de Empréstimos
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
