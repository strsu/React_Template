import { create } from 'zustand';
import { API } from '../services/constants';

import WebSocketManager from '../services/websocket';

export const useChatStore = create((set, get) => ({
  manager: null,
  user: '',
  conversation: {},
  // setConversation: (val) => set((state) => ({ conversation: val })),

  sendMessage: (message) => {
    if (get().manager) {
      get().manager.send(message);
    }
  },

  onMessage: (msg) => {
    if (msg) {
      console.log(msg);
      const room_id = msg.room;
      set((state) => ({
        conversation: {
          ...state.conversation,
          [room_id]: [...(state.conversation[room_id] || []), msg], // room_id에 해당하는 배열에 msg 추가
        },
      }));
    }
  },

  onConnect: () => {
    set(() => ({
      manager: new WebSocketManager(`${API.SOCKET.GOODS}`),
    }));
  },
}));
