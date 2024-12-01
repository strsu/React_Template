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

  onMessage: (data) => {
    if (data) {
      const room_id = data.room;
      set((state) => ({
        conversation: {
          ...state.conversation,
          [room_id]: [...(state.conversation[room_id] || []), data.msg], // room_id에 해당하는 배열에 msg 추가
        },
      }));
    }
  },

  setConversation: (room_id, conversation) => {
    if (room_id) {
      set((state) => ({
        conversation: {
          ...state.conversation,
          [room_id]: conversation,
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
