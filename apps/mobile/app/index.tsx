// ============================================
// Index — Redirect based on auth state
// ============================================

import { Redirect } from "expo-router";
import { useAuthStore } from "../src/stores";

export default function Index() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return <Redirect href="/login" />;
}
