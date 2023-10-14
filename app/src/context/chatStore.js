import { create } from 'zustand';

import WebSocketManager from '../services/websocket';

export const useChatStore = create((set, get) => ({
  manager: null,
  user: '',
  conversation: [],
  setConversation: (val) => set((state) => ({ conversation: val })),

  sendMessage: (message, from, to) => {},

  onMessage: (msg) => {
    let conversation = useChatStore.getState().conversation;
    conversation.push(msg);
    useChatStore.getState().setConversation(conversation);
  },

  onConnect: () => {
    set(() => ({
      manager: new WebSocketManager('user'),
    }));
  },
}));
