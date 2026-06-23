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
  currentPage: number;
  hasMore: boolean;
  isFetchingNextPage: boolean;
  customerSessions: AdminSession[];
  isFetchingCustomerSessions: boolean;
  searchQuery: string;
}

interface SessionStoreActions {
  fetchSessions: (reset?: boolean, tab?: number) => Promise<void>;
  fetchNextPageSessions: (tab?: number) => Promise<void>;
  setSessions: (sessions: AdminSession[]) => void;
  removeSession: (id: string) => void;
  updateSessionStatus: (id: string, status: string) => void;
  fetchCustomerSessions: () => Promise<void>;
  setSearchQuery: (query: string) => void;
}

export type SessionStore = SessionStoreState & SessionStoreActions;

const initialState: SessionStoreState = {
  sessions: [],
  isFetching: false,
  currentPage: 0,
  hasMore: true,
  isFetchingNextPage: false,
  customerSessions: [],
  isFetchingCustomerSessions: false,
  searchQuery: '',
};

export const useSessionStore = create<SessionStore>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      setSearchQuery: (query) =>
        set((state) => {
          state.searchQuery = query;
        }),

      setSessions: (sessions) =>
        set((state) => {
          state.sessions = sessions;
        }),

      removeSession: (id) =>
        set((state) => {
          state.sessions = state.sessions.filter((s: AdminSession) => s.id !== id);
        }),

      updateSessionStatus: (id, status) =>
        set((state) => {
          const session = state.sessions.find((s) => s.id === id);
          if (session) {
            session.status = status;
            session.sessionState = status;
          }
        }),

      fetchSessions: async (reset = true, tab = 1) => {
        if (reset) {
          set((state) => {
            state.isFetching = true;
            state.currentPage = 0;
            state.hasMore = true;
          });
        } else {
          set((state) => { state.isFetching = true; });
        }
        try {
          const res = await SessionService.fetchAllAdminSessions(0, 20, tab, get().searchQuery);
          if (res.success && res.data) {
            set((state) => {
              const isArray = Array.isArray(res.data);
              state.sessions = isArray ? (res.data as any) : (res.data!.content || []);
              state.hasMore = isArray ? false : !res.data!.last;
              state.currentPage = 0;
            });
          }
        } catch (error) {
          Logger.error("Failed to fetch sessions", error);
        } finally {
          set((state) => { state.isFetching = false; });
        }
      },

      fetchNextPageSessions: async (tab = 1) => {
        const state = get();
        if (state.isFetchingNextPage || !state.hasMore) return;

        set((s) => { s.isFetchingNextPage = true; });
        try {
          const nextPage = state.currentPage + 1;
          const res = await SessionService.fetchAllAdminSessions(nextPage, 20, tab, state.searchQuery);
          if (res.success && res.data) {
            set((s) => {
              const isArray = Array.isArray(res.data);
              const newItems = isArray ? (res.data as any) : (res.data!.content || []);
              s.sessions = [...(s.sessions || []), ...newItems];
              s.hasMore = isArray ? false : !res.data!.last;
              s.currentPage = nextPage;
            });
          }
        } catch (error) {
          Logger.error("Failed to fetch next page of sessions", error);
        } finally {
          set((s) => { s.isFetchingNextPage = false; });
        }
      },

      fetchCustomerSessions: async () => {
        set((state) => { state.isFetchingCustomerSessions = true; });
        try {
          const res = await SessionService.getCustomerSessions();
          if (res.success && res.data) {
            set((state) => {
              state.customerSessions = res.data || [];
            });
          }
        } catch (error) {
          Logger.error("Failed to fetch customer sessions", error);
        } finally {
          set((state) => { state.isFetchingCustomerSessions = false; });
        }
      },
    })),
    { 
      name: 'session-store', 
      storage: createJSONStorage(() => zustandMMKVStorage),
      partialize: (state) => ({
        sessions: state.sessions,
        customerSessions: state.customerSessions,
        currentPage: state.currentPage,
        hasMore: state.hasMore,
        searchQuery: state.searchQuery,
      }),
    },
  ),
);
