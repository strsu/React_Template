import { create } from 'zustand';

import WebSocketManager from '../services/websocket';

export const useChatStore = create((set, get) => ({
  manager: null,
  user: '',
  conversation: Array(),
  // setConversation: (val) => set((state) => ({ conversation: val })),

  sendMessage: (message, from, to) => {},

  onMessage: (msg) => {
    if (msg) {
      set((state) => ({
        conversation: [...state.conversation, msg],
      }));
    }
  },

  onConnect: () => {
    set(() => ({
      manager: new WebSocketManager('user'),
    }));
  },
}));
