import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/globals.css";
import Layout from "@/src/components/Client/Layout/Layout";

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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
