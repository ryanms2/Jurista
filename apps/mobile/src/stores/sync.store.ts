// ============================================
// Sync Store (Zustand)
// ============================================

import { create } from "zustand";
import {
  getPendingCount,
  processQueue,
  pullUpdates,
} from "../services/sync";

interface SyncState {
  pendingCount: number;
  isSyncing: boolean;
  lastSyncAt: Date | null;
  lastError: string | null;

  // Actions
  refreshPendingCount: () => Promise<void>;
  sync: () => Promise<void>;
}

export const useSyncStore = create<SyncState>((set) => ({
  pendingCount: 0,
  isSyncing: false,
  lastSyncAt: null,
  lastError: null,

  refreshPendingCount: async () => {
    const count = await getPendingCount();
    set({ pendingCount: count });
  },

  sync: async () => {
    set({ isSyncing: true, lastError: null });

    try {
      // Push local changes
      const pushResult = await processQueue();

      // Pull remote updates
      await pullUpdates();

      // Update pending count
      const count = await getPendingCount();

      set({
        isSyncing: false,
        lastSyncAt: new Date(),
        pendingCount: count,
        lastError:
          pushResult.errors > 0
            ? `${pushResult.errors} operação(ões) falharam`
            : null,
      });
    } catch (error) {
      set({
        isSyncing: false,
        lastError: String(error),
      });
    }
  },
}));
