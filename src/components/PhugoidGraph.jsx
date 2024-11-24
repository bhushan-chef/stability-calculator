import React from "react";
import { Line } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
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

function PhugoidGraph() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data || !data.time || !data.altitude) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2d2d2d",
          color: "white",
        }}
      >
        <p>No data available. Please simulate first.</p>
      </div>
    );
  }

  const chartData = {
    labels: data.time,
    datasets: [
      {
        label: "Altitude Deviation (m)",
        data: data.altitude,
        borderColor: "rgba(67, 56, 248, 1)",
        backgroundColor: "rgba(67, 56, 248, 0.3)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Phugoid Motion: Altitude vs Time" },
    },
    scales: {
      x: { title: { display: true, text: "Time (s)" } },
      y: { title: { display: true, text: "Altitude Deviation (m)" } },
    },
  };

  const goToNextPlot = () => {
    navigate("/root-locus", { state: data });
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
        onClick={goToNextPlot}
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
        Go to Root Locus Plot
      </button>
    </div>
  );
}

export default PhugoidGraph;
