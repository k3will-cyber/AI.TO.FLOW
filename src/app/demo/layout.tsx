import type { Metadata } from "next";
import "./globals.css";
import { DesignTokensProvider } from "@/lib/designTokens";

export const metadata: Metadata = {
  title: "Design System Demo - Alto Flow OS",
  description: "Live style guide showcasing the Alto Flow OS design system components",
};

export default function DemoLayout({
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