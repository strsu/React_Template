import { create } from 'zustand';
import { authApi } from '../services/auth/auth';

export const useAuthStore = create((set, get) => ({
  is_verified: false,
  access: null,
  refresh: localStorage.getItem('refresh'),

  setAccess: (val) => set((state) => ({ access: val })),
  setRefresh: (val) => set((state) => ({ refresh: val })),
  setVerify: (val) => set((state) => ({ is_verified: val })),

  init: async () => {
    if (get().refresh != null) {
      const response = await authApi.refresh();
      set({
        is_verified: response,
      });
    }
  },
}));
