import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Providers } from "@/context/providers";

export const metadata: Metadata = {
  title: "FoodFlow",
  description: "Frontend-only startup-grade food delivery UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-[var(--font-jakarta)]">
        <Providers>
          <Navbar />
          <main className="mx-auto min-h-[80vh] w-full max-w-7xl px-4 py-6">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
