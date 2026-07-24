import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System Demo - Alto Flow OS",
  description: "Live style guide showcasing the Alto Flow OS design system components",
};

export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}