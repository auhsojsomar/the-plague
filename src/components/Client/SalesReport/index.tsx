"use client";

import { useMemo, useState } from "react";
import DatePicker from "./DatePicker";
import Table from "./Table";

const SalesReportWrapper = () => {
  const today = useMemo(() => new Date(), []);
  const oneWeekAgo = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  }, []);

  const [dateFrom, setDateFrom] = useState<Date | null>(oneWeekAgo);
  const [dateTo, setDateTo] = useState<Date | null>(today);
  const [grandTotal, setGrandTotal] = useState(0);

  return (
    <>
      <DatePicker
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        grandTotal={grandTotal}
      />
      {dateFrom != null && dateTo != null && (
        <Table
          dateFrom={dateFrom}
          dateTo={dateTo}
          setGrandTotal={setGrandTotal}
        />
      )}
    </>
  );
};

export default SalesReportWrapper;
