"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { BannerDto } from "@/interfaces/Banner";
import { getBanner } from "../lib/api/adminBannerApi";
import { BannerType } from "../shared/enums/BannerType";

interface BannerContextType {
  data: BannerDto[];
  activeTab: string;
  isOpen: boolean;
  selectedBanner: BannerDto | null;
  refetchData: () => void;
  setActiveTab: (tab: string) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedBanner: Dispatch<SetStateAction<BannerDto | null>>;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string>("Main Banner");
  const [data, setData] = useState<BannerDto[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBanner, setSelectedBanner] = useState<BannerDto | null>(null);

  const refetchData = useCallback(async () => {
    try {
      let fetchedData: BannerDto[] = [];

      if (activeTab === "Main Banner") {
        fetchedData = await getBanner(BannerType.Main);
      } else {
        fetchedData = await getBanner(BannerType.Product);
      }

      setData(fetchedData);
    } catch (error) {
      console.error(`Error fetching data for ${activeTab}:`, error);
      setData([]);
    }
  }, [activeTab]);

  return (
    <BannerContext.Provider
      value={{
        data,
        activeTab,
        isOpen,
        selectedBanner,
        refetchData,
        setActiveTab,
        setIsOpen,
        setSelectedBanner,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBannerContext = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBannerContext must be used within a BannerProvider");
  }
  return context;
};
