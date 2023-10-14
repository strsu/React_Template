import { create } from 'zustand';
import { authApi } from '../services/auth/auth';

export const useAuthStore = create((set, get) => ({
  is_verified: null,
  access: null,
  refresh: localStorage.getItem('refresh'),

  setAccess: (val) => set((state) => ({ access: val })),
  setRefresh: (val) => set((state) => ({ refresh: val })),
  setVerify: (val) => set((state) => ({ is_verified: val })),

  init: async () => {
    let result = false;
    if (get().refresh != null) {
      result = await authApi.refresh();
    }
    set({
      is_verified: result,
    });
  },
}));
