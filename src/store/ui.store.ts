import { create } from "zustand";

interface UIState { query: string; cuisine: string; setQuery: (v: string) => void; setCuisine: (v: string) => void; }
export const useUIStore = create<UIState>((set) => ({ query: "", cuisine: "All", setQuery: (query) => set({ query }), setCuisine: (cuisine) => set({ cuisine }) }));
