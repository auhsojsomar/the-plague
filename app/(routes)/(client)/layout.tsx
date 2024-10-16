import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import Navbar from "@/app/components/Client/Layout/Navbar/NavbarGeneric";

export const metadata: Metadata = {
  title: "The Plague",
  description: "Clothing shop",
};

const inter = Inter({
  subsets: ["latin"], // Specify subsets
  weight: ["400", "700"], // Specify weights you want to use
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-20 font-display">{children}</div>
      </body>
    </html>
  );
}
