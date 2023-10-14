import { create } from 'zustand';

export const useMsgStore = create((set, get) => ({
  msgList: [],

  addMessage: (message) => {
    if (message) {
      set((state) => ({
        msgList: [...state.msgList, message],
      }));
    }
  },
  popMessage: () => {
    set((state) => ({
      msgList: state.msgList.slice(1),
    }));
  },
}));
