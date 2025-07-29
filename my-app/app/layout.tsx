import type { Metadata } from "next";
import "@/ui/globals.css";

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: "Juan Manuel App",
  description: "Portfolio App to show you my strengths",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
