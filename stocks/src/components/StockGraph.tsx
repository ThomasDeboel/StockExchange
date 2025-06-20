import React from "react";
import { Line } from "react-chartjs-2";
import { Stock } from "../types";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
);

type Props = {
  stock: Stock;
};

function downloadCSV(stock: Stock) {
  const now = new Date();
  const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const lastWeek = stock.history.filter(
    (point) => new Date(point.time) >= new Date(now.getTime() - WEEK_MS)
  );
  const header = "Time,Value\n";
  const rows = lastWeek
    .map((point) => `${point.time},${point.value}`)
    .join("\n");
  const csv = header + rows;
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${stock.name}-last-week.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const StockGraph: React.FC<Props> = ({ stock }) => {
  // Only show last 24 hours of history
  const now = new Date();
  const DAY_MS = 24 * 60 * 60 * 1000;
  const last24hHistory = stock.history.filter(
    (point) => new Date(point.time) >= new Date(now.getTime() - DAY_MS)
  );

  const labels = last24hHistory.map((point) =>
    // Format: "YYYY-MM-DD HH:mm"
    new Date(point.time).toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  const data = {
    labels,
    datasets: [
      {
        label: stock.name,
        data: last24hHistory.map((point) => point.value),
        borderColor: "rgb(75,192,192)",
        backgroundColor: "rgba(75,192,192,0.1)",
        fill: true,
        tension: 0.2,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Time" },
        ticks: { maxTicksLimit: 8 },
      },
      y: {
        title: { display: true, text: "Value" },
        beginAtZero: false,
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 600, background: "#fff" }}>
      <Line data={data} options={options} />
      <button onClick={() => downloadCSV(stock)} style={{ marginTop: 8 }}>
        Download Last Week CSV
      </button>
    </div>
  );
};

export default StockGraph;
