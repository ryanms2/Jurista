// ============================================
// Root Layout — Expo Router
// ============================================

import "../global.css";
import { useEffect, useState, useRef } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { View, ActivityIndicator, AppState, type AppStateStatus } from "react-native";
import { useAuthStore } from "../src/stores";
import { useNetworkStore } from "../src/stores";
import { useSyncStore } from "../src/stores";
import { getDatabase } from "../src/services";
import { startNetworkListener, setSyncApiUrl } from "../src/services/sync";
import { setUploadApiUrl } from "../src/services/photo-upload";
import { runMaintenanceJobs } from "../src/services/late-fee-job";
import { processPhotoUploads } from "../src/services/photo-upload";

SplashScreen.preventAutoHideAsync();

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:3000";

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const initialize = useAuthStore((s) => s.initialize);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const initNetwork = useNetworkStore((s) => s.initialize);
  const refreshPendingCount = useSyncStore((s) => s.refreshPendingCount);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    async function prepare() {
      try {
        // 1. Inicializar banco de dados local
        await getDatabase();

        // 2. Configurar URLs para sync e upload
        setSyncApiUrl(API_URL);
        setUploadApiUrl(API_URL);

        // 3. Inicializar auth
        await initialize();

        // 4. Inicializar listener de rede
        initNetwork();

        // 5. Iniciar auto-sync
        startNetworkListener();

        // 6. Rodar jobs de manutenção (multas, inadimplentes)
        runMaintenanceJobs().then((result) => {
          if (result.feesUpdated > 0) {
            console.log(
              `[Maintenance] ${result.feesUpdated} multas atualizadas, ` +
              `${result.defaulted} empréstimos inadimplentes`
            );
          }
        });

        // 7. Processar uploads pendentes
        processPhotoUploads().then((result) => {
          if (result.uploaded > 0) {
            console.log(`[Upload] ${result.uploaded} fotos enviadas`);
          }
        });

        // 8. Atualizar contador de sync
        await refreshPendingCount();

        setAppReady(true);
      } catch (error) {
        console.error("App initialization error:", error);
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  // Re-executar jobs quando o app volta ao foreground
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextState === "active" &&
          isAuthenticated
        ) {
          runMaintenanceJobs().catch(console.error);
          processPhotoUploads().catch(console.error);
          refreshPendingCount().catch(console.error);
        }
        appState.current = nextState;
      }
    );

    return () => subscription.remove();
  }, [isAuthenticated]);

  useEffect(() => {
    if (appReady && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [appReady, isLoading]);

  if (!appReady || isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#6366f1" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0f172a" },
          animation: "slide_from_right",
        }}
      />
    </>
  );
}
