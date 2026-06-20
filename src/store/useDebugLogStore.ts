import { create } from 'zustand';

export interface ApiLog {
  id: string;
  timestamp: string;
  method: string;
  url: string;
  requestData?: any;
  status?: number;
  responseData?: any;
  error?: string;
  duration?: number;
}

interface DebugLogStore {
  logs: ApiLog[];
  addLog: (log: Omit<ApiLog, 'id' | 'timestamp'>) => string;
  updateLog: (id: string, update: Partial<ApiLog>) => void;
  clearLogs: () => void;
}

export const useDebugLogStore = create<DebugLogStore>((set) => ({
  logs: [],
  addLog: (log) => {
    const id = Math.random().toString(36).substring(7);
    const newLog: ApiLog = {
      ...log,
      id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    set((state) => ({ logs: [newLog, ...state.logs] }));
    return id;
  },
  updateLog: (id, update) => {
    set((state) => ({
      logs: state.logs.map((log) => (log.id === id ? { ...log, ...update } : log)),
    }));
  },
  clearLogs: () => set({ logs: [] }),
}));
