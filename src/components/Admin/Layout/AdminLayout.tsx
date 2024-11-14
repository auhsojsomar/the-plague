"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LayoutSidebar from "./Sidebar";
import Header from "./Header";
import { adminSidebar } from "@/constants/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const path = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component only renders client-side after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent rendering until client-side rendering is done
  if (!isMounted) {
    return null;
  }

  // Function to determine if the current route matches the sidebar item's link
  const isActive = (link: string) => {
    return path === link;
  };

  // Find the active sidebar item and set the title
  const activeItem = adminSidebar.find((data) => isActive(data.link));
  const title = activeItem ? activeItem.label : "Dashboard"; // Default to "Dashboard" if no match

  return (
    <div className="relative min-h-screen">
      <aside className="fixed w-64 h-full left-0 top-0">
        <LayoutSidebar />
      </aside>

      <main className="ml-64">
        {/* Pass the title to the Header component */}
        <Header title={title} />
        <div className="min-h-[calc(100vh-6rem)]">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
