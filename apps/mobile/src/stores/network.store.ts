// ============================================
// Network Store (Zustand)
// ============================================

import { create } from "zustand";
import NetInfo, { type NetInfoState } from "@react-native-community/netinfo";

interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  connectionType: string | null;

  // Actions
  initialize: () => () => void;
  updateState: (state: NetInfoState) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isConnected: true,
  isInternetReachable: true,
  connectionType: null,

  initialize: () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      set({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
        connectionType: state.type,
      });
    });

    return unsubscribe;
  },

  updateState: (state) => {
    set({
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable,
      connectionType: state.type,
    });
  },
}));
