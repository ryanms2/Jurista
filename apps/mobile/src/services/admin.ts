import { getToken } from "./auth";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.129:3000";

// --- Tipos ---

export interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  active: boolean;
  commissionPct: number | string | null;
  _count?: {
    loans: number;
  };
}

export interface SystemConfigItem {
  key: string;
  value: string;
  description: string | null;
}

// --- Funções Auxiliares ---

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = await getToken();
  if (!token) throw new Error("Não autenticado");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data: any = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro na requisição");
  }

  return data;
}

// --- Gerenciamento de Usuários (Cobradores) ---

export async function getCollectors(): Promise<UserItem[]> {
  const response = await fetchApi("/api/users");
  return response.data.users;
}

export async function createCollector(payload: { name: string; email: string; phone?: string; commissionPct?: string }): Promise<UserItem> {
  const response = await fetchApi("/api/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response.data.user;
}

export async function updateCollector(id: string, payload: { name: string; email: string; phone?: string; commissionPct?: string }): Promise<UserItem> {
  const response = await fetchApi(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return response.data.user;
}

export async function toggleCollectorStatus(id: string): Promise<UserItem> {
  const response = await fetchApi(`/api/users/${id}`, {
    method: "PATCH",
  });
  return response.data.user;
}

// --- Configurações do Sistema ---

export async function getSystemConfigs(): Promise<SystemConfigItem[]> {
  const response = await fetchApi("/api/settings");
  return response.data.settings;
}

export async function updateSystemConfigs(settings: { key: string; value: string }[]): Promise<SystemConfigItem[]> {
  const response = await fetchApi("/api/settings", {
    method: "PUT",
    body: JSON.stringify({ settings }),
  });
  return response.data.settings;
}

// --- Senhas ---

/** Master redefine a senha de um cobrador */
export async function resetCollectorPassword(id: string, newPassword: string): Promise<void> {
  await fetchApi(`/api/users/${id}/password`, {
    method: "POST",
    body: JSON.stringify({ newPassword }),
  });
}

/** Usuário altera a própria senha */
export async function changeMyPassword(currentPassword: string, newPassword: string): Promise<void> {
  await fetchApi("/api/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}
