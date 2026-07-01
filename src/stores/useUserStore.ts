import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from '@/utils/storage';
import { AdminCustomer } from '@/serviceManager/types.d';
import { UserService } from '@/serviceManager/UserService';
import { Logger } from '@/utils/logger';

interface UserStoreState {
  customers: AdminCustomer[];
  isFetching: boolean;
  currentPage: number;
  hasMore: boolean;
  isFetchingNextPage: boolean;
  totalElements: number;
  searchQuery: string;
}

interface UserStoreActions {
  fetchCustomers: (reset?: boolean) => Promise<void>;
  fetchNextPageCustomers: () => Promise<void>;
  addCustomerLocally: (customer: AdminCustomer) => void;
  removeCustomerLocally: (id: string) => void;
  setSearchQuery: (query: string) => void;
}

export type UserStore = UserStoreState & UserStoreActions;

const initialState: UserStoreState = {
  customers: [],
  isFetching: false,
  currentPage: 0,
  hasMore: true,
  isFetchingNextPage: false,
  totalElements: 0,
  searchQuery: '',
};

export const useUserStore = create<UserStore>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      addCustomerLocally: (customer) =>
        set((state) => {
          state.customers.unshift(customer);
          state.totalElements += 1;
        }),

      setSearchQuery: (query) =>
        set((state) => {
          state.searchQuery = query;
        }),

      removeCustomerLocally: (id) =>
        set((state) => {
          const initialLength = state.customers.length;
          state.customers = state.customers.filter((c: AdminCustomer) => c.id !== id && c.phoneNumber !== id);
          if (state.customers.length < initialLength) {
            state.totalElements = Math.max(0, state.totalElements - 1);
          }
        }),

      fetchCustomers: async (reset = true) => {
        if (reset) {
          set((state) => {
            state.isFetching = true;
            state.isFetchingNextPage = false;
            state.currentPage = 0;
            state.hasMore = true;
          });
        } else {
          set((state) => { state.isFetching = true; state.isFetchingNextPage = false; });
        }
        try {
          const res = await UserService.fetchAllCustomers(0, 20, get().searchQuery);
          if (res.success && res.data) {
            set((state) => {
              const isArray = Array.isArray(res.data);
              state.customers = isArray ? (res.data as any) : (res.data!.content || []);
              state.hasMore = isArray ? false : !res.data!.last;
              state.currentPage = 0;
              state.totalElements = isArray ? state.customers.length : (res.data!.totalElements || 0);
              
              if (state.customers.length === 0) {
                state.totalElements = 0;
              }
            });
          }
        } catch (error) {
          Logger.error("Failed to fetch customers", error);
        } finally {
          set((state) => { state.isFetching = false; });
        }
      },

      fetchNextPageCustomers: async () => {
        const state = get();
        if (state.isFetchingNextPage || !state.hasMore) return;

        set((s) => { s.isFetchingNextPage = true; });
        try {
          const nextPage = state.currentPage + 1;
          const res = await UserService.fetchAllCustomers(nextPage, 20, state.searchQuery);
          if (res.success && res.data) {
            set((s) => {
              const isArray = Array.isArray(res.data);
              const newItems = isArray ? (res.data as any) : (res.data!.content || []);
              s.customers = [...(s.customers || []), ...newItems];
              s.hasMore = isArray ? false : !res.data!.last;
              s.currentPage = nextPage;
              if (!isArray && res.data!.totalElements !== undefined) {
                s.totalElements = res.data!.totalElements;
              }
            });
          }
        } catch (error) {
          Logger.error("Failed to fetch next page of customers", error);
        } finally {
          set((s) => { s.isFetchingNextPage = false; });
        }
      },
    })),
    { 
      name: 'user-store', 
      storage: createJSONStorage(() => zustandMMKVStorage),
      partialize: (state) => ({
        customers: state.customers,
        currentPage: state.currentPage,
        hasMore: state.hasMore,
        totalElements: state.totalElements,
        searchQuery: state.searchQuery,
      }),
    },
  ),
);
