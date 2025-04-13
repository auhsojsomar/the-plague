import { BASE_URL } from "../BASE_URL";
import { SalesReport } from "@/interfaces/SalesReport";

interface ApiSalesReport {
  productName: string;
  variantName: string;
  quantitySold: number;
  unitPrice: number;
  discountType: "Percentage" | "FixedAmount";
  discountValue: number;
  total: number;
  dateCreated: string;
}

interface SalesReportResponse {
  data: SalesReport[];
  grandTotal: number;
}

export const getSalesReport = async ({
  dateFrom,
  dateTo,
}: {
  dateFrom: Date;
  dateTo: Date;
}): Promise<SalesReportResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/SalesReport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString(),
      }),
    });

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
    }

    const data: { data: ApiSalesReport[]; grandTotal: number } =
      await response.json();
    const salesReports: SalesReport[] = data.data.map(
      (item): SalesReport => ({
        productName: item.productName,
        variantName: item.variantName,
        quantitySold: item.quantitySold,
        unitPrice: item.unitPrice,
        discount: {
          type: item.discountType,
          value: item.discountValue,
        },
        total: item.total,
        dateCreated: new Date(item.dateCreated),
      })
    );

    return {
      data: salesReports,
      grandTotal: data.grandTotal,
    };
  } catch (error) {
    console.error("Error fetching sales report:", error);
    throw error;
  }
};
