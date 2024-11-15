// pages/admin/dashboard.tsx

"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface SalesChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [data, setData] = useState<SalesChartData | null>(null);

  useEffect(() => {
    // Example: Fetching data from an API or using static data
    const fetchData = async () => {
      // You can replace this with your actual API call
      const fetchedData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Sales Data",
            data: [12, 19, 3, 5, 2, 3, 9],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.1,
          },
        ],
      };
      setData(fetchedData);
    };

    fetchData();
  }, []);

  // Ensure data is loaded before rendering the chart
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen p-6 bg-gray-100 w-full">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Sales Overview
        </h2>
        <div className="w-full h-96">
          <Line className="w-full" data={data} />
        </div>
      </div>
    </div>
  );
}
