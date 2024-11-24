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

function NyquistGraph() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  const realPart = Array.from({ length: 50 }, () => Math.random() * 40);
  const imaginaryPart = Array.from({ length: 50 }, () => Math.random() * 40 - 20);

  const chartData = {
    labels: Array.from({ length: 50 }, (_, i) => i),
    datasets: [
      {
        label: "Nyquist Plot",
        data: realPart.map((re, idx) => ({
          x: re,
          y: imaginaryPart[idx],
        })),
        borderColor: "rgba(6, 248, 248, 1)",
        backgroundColor: "rgba(6, 248, 248, 0.2)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Nyquist Plot" },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Real Part",
        },
      },
      y: {
        title: {
          display: true,
          text: "Imaginary Part",
        },
      },
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
    </div>
  );
}

export default NyquistGraph;
