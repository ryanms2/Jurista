// ============================================
// Authentication Service
// ============================================
// Gerencia login, logout e tokens JWT
// Armazena tokens no expo-secure-store
// ============================================

import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "jurista_auth_token";
const USER_KEY = "jurista_user_data";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "MASTER" | "COLLECTOR";
  phone?: string;
  commissionPct?: number;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: AuthUser;
  error?: string;
}

/**
 * Fazer login na API
 */
export async function login(
  email: string,
  password: string,
  apiUrl: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${apiUrl}/api/auth/mobile/login`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "true"
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      return { success: false, error: json.error || "Erro no login" };
    }

    const { token, user } = json.data;

    // Salvar token e dados do usuário
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));

    return {
      success: true,
      token,
      user,
    };
  } catch (error) {
    console.error("Auth fetch error:", error);
    return {
      success: false,
      error: "Não foi possível conectar ao servidor. Verifique sua conexão.",
    };
  }
}

/**
 * Fazer logout (limpar tokens e resetar timestamp de sync)
 */
export async function logout(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
  
  try {
    const { getDatabase } = require("./database");
    const db = await getDatabase();
    // Apenas reseta o timestamp para forçar sync completo no próximo login
    await db.execAsync(`DELETE FROM sync_metadata WHERE key = 'last_pull_timestamp';`);
  } catch (err) {
    console.error("Erro ao resetar sync no logout", err);
  }
}

/**
 * Obter token armazenado
 */
export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

/**
 * Obter dados do usuário armazenados
 */
export async function getStoredUser(): Promise<AuthUser | null> {
  const data = await SecureStore.getItemAsync(USER_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data) as AuthUser;
  } catch {
    return null;
  }
}

/**
 * Verificar se o usuário está autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getToken();
  return token !== null;
}

/**
 * Criar headers com token de autenticação
 */
export async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    "Bypass-Tunnel-Reminder": "true",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
