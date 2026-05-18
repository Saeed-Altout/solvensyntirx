import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solven Syntrix",
  description: "Synthesizing Logic, Solving the Future.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
