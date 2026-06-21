import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from '@/utils/storage';
import { AdminSession } from '@/serviceManager/types.d';
import { SessionService } from '@/serviceManager/SessionService';
import { Logger } from '@/utils/logger';

interface SessionStoreState {
  sessions: AdminSession[];
  isFetching: boolean;
}

interface SessionStoreActions {
  fetchSessions: () => Promise<void>;
  setSessions: (sessions: AdminSession[]) => void;
  removeSession: (id: string) => void;
}

export type SessionStore = SessionStoreState & SessionStoreActions;

const initialState: SessionStoreState = {
  sessions: [],
  isFetching: false,
};

export const useSessionStore = create<SessionStore>()(
  persist(
    immer((set) => ({
      ...initialState,

      setSessions: (sessions) =>
        set((state) => {
          state.sessions = sessions;
        }),

      removeSession: (id) =>
        set((state) => {
          state.sessions = state.sessions.filter((s: AdminSession) => s.id !== id);
        }),

      fetchSessions: async () => {
        set((state) => { state.isFetching = true; });
        try {
          const res = await SessionService.fetchAllAdminSessions();
          if (res.success && res.data) {
            set((state) => {
              state.sessions = res.data!;
            });
          }
        } catch (error) {
          Logger.error("Failed to fetch sessions", error);
        } finally {
          set((state) => { state.isFetching = false; });
        }
      },
    })),
    { 
      name: 'session-store', 
      storage: createJSONStorage(() => zustandMMKVStorage) 
    },
  ),
);
