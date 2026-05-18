"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AccentScheme = "Brand" | "Electric" | "Royal" | "Cyan" | "Aurora";

export const ACCENT_PRESETS: Record<AccentScheme, { a: string; b: string; c: string }> = {
  Brand:    { a: "#4A90E2", b: "#1C2230", c: "#5BA0F0" },
  Electric: { a: "#00D4FF", b: "#2A6FFF", c: "#5BC9FF" },
  Royal:    { a: "#3D7BFF", b: "#1A1F71", c: "#6FA0FF" },
  Cyan:     { a: "#22E3F0", b: "#0EA5E9", c: "#67E8F9" },
  Aurora:   { a: "#5BFFE0", b: "#0066FF", c: "#7CFFD7" },
};

interface UIStore {
  theme: "light" | "dark" | "system";
  accentScheme: AccentScheme;
  mobileMenuOpen: boolean;
  setTheme: (t: "light" | "dark" | "system") => void;
  setAccentScheme: (s: AccentScheme) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: "system",
      accentScheme: "Brand",
      mobileMenuOpen: false,
      setTheme: (theme) => set({ theme }),
      setAccentScheme: (accentScheme) => set({ accentScheme }),
      toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
      closeMobileMenu: () => set({ mobileMenuOpen: false }),
    }),
    { name: "ss-ui" }
  )
);
