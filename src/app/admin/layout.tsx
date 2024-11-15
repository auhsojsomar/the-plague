import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/globals.css";

export const metadata: Metadata = {
  title: "The Plague Admin Dashboard",
  description:
    "Admin portal for managing The Plague clothing shop inventory, orders, and settings.",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
