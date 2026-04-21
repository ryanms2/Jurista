// ============================================
// Auth Store (Zustand)
// ============================================

import { create } from "zustand";
import type { AuthUser } from "../services/auth";
import {
  login as loginService,
  logout as logoutService,
  getStoredUser,
  isAuthenticated as checkAuth,
} from "../services/auth";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  login: (email: string, password: string, apiUrl: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      const [authenticated, user] = await Promise.all([
        checkAuth(),
        getStoredUser(),
      ]);

      set({
        isAuthenticated: authenticated,
        user,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  login: async (email, password, apiUrl) => {
    set({ isLoading: true, error: null });

    const result = await loginService(email, password, apiUrl);

    if (result.success && result.user) {
      set({
        user: result.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Disparar pull imediatamente após login para garantir dados atualizados
      try {
        const { pullUpdates } = require("../services/sync");
        pullUpdates().catch(console.error);
      } catch {}

      return true;
    }

    set({
      isLoading: false,
      error: result.error || "Erro ao fazer login",
    });
    return false;
  },

  logout: async () => {
    await logoutService();
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
