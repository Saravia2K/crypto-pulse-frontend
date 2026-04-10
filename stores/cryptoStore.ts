"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CryptoStore {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id) => set((s) => ({ favorites: [...s.favorites, id] })),
      removeFavorite: (id) =>
        set((s) => ({ favorites: s.favorites.filter((f) => f !== id) })),
      toggleFavorite: (id) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        isFavorite(id) ? removeFavorite(id) : addFavorite(id);
      },
      isFavorite: (id) => get().favorites.includes(id),
    }),
    { name: "crypto-pulse-favorites" },
  ),
);
