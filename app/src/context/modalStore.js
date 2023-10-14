import { create } from 'zustand';

export const useModalStore = create((set, get) => ({
  render: null,

  open: (components) => {
    set({
      render: components,
    });
  },
  close: () => {
    set({
      render: null,
    });
  },
}));
