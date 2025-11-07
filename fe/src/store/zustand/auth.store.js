import { create } from "zustand";

export const useConvs = create((set) => ({
  convs: [],
  setConvs: (convs) => set({ convs }),
  selectedConv: "",
  setSelectedConv: (selectedConv) => set({ selectedConv }),
}));
