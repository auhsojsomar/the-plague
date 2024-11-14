import AdminLayout from "@/src/components/Admin/Layout/AdminLayout";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminLayout>{children}</AdminLayout>;
}
