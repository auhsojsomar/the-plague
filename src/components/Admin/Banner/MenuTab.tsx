"use client";

import { CustomFlowbiteTheme, Flowbite, Tabs } from "flowbite-react";
import { LuTag, LuTags } from "react-icons/lu";
import AddBannerButton from "./AddBannerButton";
import BannerModal from "./BannerModal";
import { useBannerContext } from "@/src/context/BannerContext";
import BannerTable from "./BannerTable";

const customTheme: CustomFlowbiteTheme = {
  tabs: {
    tablist: {
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium",
        variant: {
          default: {
            active: {
              on: "bg-gray-200/80 text-primary-color",
            },
          },
        },
      },
    },
  },
};

const MenuTab = () => {
  const { setActiveTab } = useBannerContext();

  const handleTabChange = (activeTabIndex: number) => {
    const tabTitles = ["Main Banner", "Product Banner"];
    setActiveTab(tabTitles[activeTabIndex]);
  };

  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <AddBannerButton />
        <Tabs
          className="mt-2"
          aria-label="Default tabs"
          variant="default"
          onActiveTabChange={handleTabChange}
        >
          <Tabs.Item active title="Main Banner" icon={LuTag}>
            <BannerTable />
          </Tabs.Item>
          <Tabs.Item title="Product Banner" icon={LuTags}>
            <BannerTable />
          </Tabs.Item>
        </Tabs>
      </Flowbite>

      <BannerModal />
    </>
  );
};

export default MenuTab;
