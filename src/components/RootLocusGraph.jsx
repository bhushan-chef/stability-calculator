import React from "react";
import { Line } from "react-chartjs-2";
import { useNavigate, useLocation } from "react-router-dom";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function RootLocusGraph() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  const chartData = {
    labels: Array.from({ length: 50 }, (_, i) => i),
    datasets: [
      {
        label: "Root Locus (Real Part)",
        data: Array.from({ length: 50 }, () => Math.random() * 40),
        borderColor: "rgba(248, 67, 6, 1)",
        backgroundColor: "rgba(248, 67, 6, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
      {
        label: "Root Locus (Imaginary Part)",
        data: Array.from({ length: 50 }, () => Math.random() * 40 - 20),
        borderColor: "rgba(67, 56, 248, 1)",
        backgroundColor: "rgba(67, 56, 248, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Root Locus Plot" },
    },
    scales: {
      x: { title: { display: true, text: "Real Part" } },
      y: { title: { display: true, text: "Imaginary Part" } },
    },
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2d2d2d",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "80vh",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <Line data={chartData} options={options} />
      </div>
      <button
        onClick={() => navigate("/bode", { state: data })}
        style={{
          marginTop: "20px",
          backgroundColor: "#2563eb",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Go to Bode Plot
      </button>
    </div>
  );
}

export default RootLocusGraph;
