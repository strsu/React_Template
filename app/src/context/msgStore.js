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
    if (get().msgList.length) {
      let msgList = get().msgList;
      let lastMsg = msgList.shift();
      set(() => ({
        msgList: msgList,
      }));
      return lastMsg;
    }
    return null;
  },
}));
