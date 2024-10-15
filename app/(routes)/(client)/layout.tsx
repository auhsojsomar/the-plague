import type { Metadata } from "next";

import "@/app/globals.css";
import Navbar from "@/app/components/Client/Layout/Navbar/NavbarGeneric";

export const metadata: Metadata = {
  title: "The Plague",
  description: "Clothing shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Navbar />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
