import type { Metadata } from "next";
import "./globals.css";
import { DesignTokensProvider } from "./lib/designTokens";

export const metadata: Metadata = {
  title: "Alto Flow OS — AI Business Operating System",
  description:
    "Transforme sua empresa tradicional em uma operação assistida por inteligência artificial. Automação, CRM inteligente, marketing autônomo e experiências digitais avançadas.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Crect width=%2732%27 height=%2732%27 rx=%278%27 fill=%27%230B3D4F%27/%3E%3Ctext x=%2750%25%27 y=%2755%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27white%27 font-weight=%27900%27 font-size=%2712%27 font-family=%27Inter,sans-serif%27%3EAF%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    title: "Alto Flow OS — AI Business Operating System",
    description:
      "Transforme sua empresa tradicional em uma operação assistida por inteligência artificial.",
    siteName: "Alto Flow OS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-text antialiased">
        <DesignTokensProvider>{children}</DesignTokensProvider>
      </body>
    </html>
  );
}