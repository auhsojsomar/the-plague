"use client";

import { adminSidebar } from "@/constants/sidebar";
import { CustomFlowbiteTheme, Flowbite, Sidebar } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header"; // Import the Header component

const customTheme: CustomFlowbiteTheme = {
  sidebar: {
    root: {
      inner: "h-full bg-gray-900 overflow-y-auto overflow-x-hidden px-3 py-4",
    },
    item: {
      base: "flex items-center justify-center rounded-lg px-2 py-4 text-base font-normal text-gray-900",
      icon: {
        base: "h-6 w-6 flex-shrink-0 text-white transition duration-75",
        active: "text-gray-700",
      },
    },
  },
};

const LayoutSidebar = () => {
  const path = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // This ensures that the component only renders on the client-side after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent rendering the Sidebar until it has mounted on the client
  if (!isMounted) {
    return null;
  }

  // Function to determine if the current route matches the sidebar item's link
  const isActive = (link: string) => {
    return path === link;
  };

  // Find the title based on the active path
  const activeItem = adminSidebar.find((data) => isActive(data.link));
  const title = activeItem ? activeItem.label : "Dashboard"; // Default to "Dashboard" if no match

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Sidebar aria-label="Admin Sidebar" className="h-full">
        <Sidebar.Items className="h-full">
          <Sidebar.ItemGroup>
            {adminSidebar.map((data) => (
              <Sidebar.Item
                as={Link} // Use Link as a wrapper for navigation
                href={data.link}
                key={data.link}
                className={`${
                  isActive(data.link) ? "bg-primary-color" : "hover:bg-gray-700"
                }`}
                icon={data.icon}
              >
                <span className="text-white">{data.label}</span>
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Pass the title to the Header component */}
      <Header title={title} />
    </Flowbite>
  );
};

export default LayoutSidebar;
