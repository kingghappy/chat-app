import { create } from "zustand";

export const useConvs = create((set) => ({
  convs: [],
  setConvs: (convs) => set({ convs }),
  selectedConv: null,
  setSelectedConv: (selectedConv) => set({ selectedConv }),
}));


export const useMessage = create((set) => ({
  recipient: null,
  setRecipient: (recipient) => set({ recipient }),
  currMessage:null,
  setCurrMessage: (currMessage) => set({ currMessage }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  selectedConv: null,
  setSelectedConv: (selectedConv) => set({ selectedConv }),
  addMessage: (newMessage) => set((state) => ({
    messages: [...state.messages, newMessage]
  })),
}));