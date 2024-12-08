"use client";

import { CustomFlowbiteTheme, Flowbite, Tabs } from "flowbite-react";
import { LuTag, LuTags } from "react-icons/lu";
import MainBanner from "./MainBanner";
import ProductBanner from "./ProductBanner";
import AddBannerButton from "./AddBannerButton";
import { useCallback, useState } from "react";
import BannerModal from "./BannerModal";

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
  const [activeTab, setActiveTab] = useState<string>("Main Banner");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleTabChange = (activeTabIndex: number) => {
    const tabTitles = ["Main Banner", "Product Banner"];
    setActiveTab(tabTitles[activeTabIndex]);
  };

  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <AddBannerButton label={`Add ${activeTab}`} onClick={openModal} />
        <Tabs
          className="mt-2"
          aria-label="Default tabs"
          variant="default"
          onActiveTabChange={handleTabChange}
        >
          <Tabs.Item active title="Main Banner" icon={LuTag}>
            <MainBanner />
          </Tabs.Item>
          <Tabs.Item title="Product Banner" icon={LuTags}>
            <ProductBanner />
          </Tabs.Item>
        </Tabs>
      </Flowbite>

      <BannerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={activeTab}
      />
    </>
  );
};

export default MenuTab;
