import type { ReactNode } from "react";
import type { Metadata } from "next";

import { AppShell } from "@/components/shell/app-shell";

import "./globals.css";

export const metadata: Metadata = {
  title: "Rappi KAM Intelligence",
  description: "Demo operativa con shell funcional y narrativa de agente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
