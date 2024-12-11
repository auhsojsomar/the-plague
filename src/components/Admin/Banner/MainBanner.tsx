"use client";

import React, { useEffect } from "react";
import BannerTable from "./BannerTable";
import { useBannerContext } from "@/src/context/BannerContext";

const MainBanner = () => {
  const { data, refetchData } = useBannerContext();

  useEffect(() => {
    refetchData();
  }, [refetchData]);

  return (
    <div>
      {data.length > 0 ? (
        <BannerTable rowData={data} />
      ) : (
        <div>No banner available.</div>
      )}
    </div>
  );
};

export default MainBanner;
