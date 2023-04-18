import create from 'zustand';

export const useChat = create((set, get) => ({
    user: '',
    conversation: [],
    setConversation: (val) => set(state => ({ conversation: val })),

    sendMessage: (message, from, to) => {
    },

    onMessage: (msg) => {
        let conversation = useChat.getState().conversation;
        conversation.push(msg);
        useChat.getState().setConversation(conversation);
    },

}));