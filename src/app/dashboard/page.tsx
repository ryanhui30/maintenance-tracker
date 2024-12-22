"use client";

import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function Dashboard() {
  // Mock data for charts
  const equipmentStatusData = {
    labels: ["Operational", "Under Maintenance", "Out of Service"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#4caf50", "#ffc107", "#f44336"],
        hoverBackgroundColor: ["#45a049", "#e6ac00", "#e57373"],
      },
    ],
  };

  const maintenanceHoursData = {
    labels: ["Mechanical", "Electrical", "Plumbing"],
    datasets: [
      {
        label: "Hours",
        data: [30, 50, 20],
        backgroundColor: ["#3f51b5", "#ff5722", "#009688"],
      },
    ],
  };

  // Mock recent maintenance activities
  const recentActivities = [
    { id: 1, equipment: "Drill", date: "2024-12-15", action: "Lubrication" },
    { id: 2, equipment: "Tractor", date: "2024-12-14", action: "Engine Repair" },
    { id: 3, equipment: "Welding Machine", date: "2024-12-13", action: "Head Replacement" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Pie Chart: Equipment Status Breakdown */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Equipment Status Breakdown</h2>
        <div className="w-1/2 mx-auto">
          <Pie data={equipmentStatusData} />
        </div>
      </div>

      {/* Bar Chart: Maintenance Hours by Department */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Maintenance Hours by Department</h2>
        <div className="w-3/4 mx-auto">
          <Bar data={maintenanceHoursData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Recent Maintenance Activities */}
      <div>
        <h2 className="text-lg font-bold mb-2">Recent Maintenance Activities</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Equipment</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id}>
                <td className="border p-2">{activity.equipment}</td>
                <td className="border p-2">{activity.date}</td>
                <td className="border p-2">{activity.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Go Back Button */}
      <div className="mt-6">
        <a href="/" className="text-blue-500 underline">
          ← Go Back to Home
        </a>
      </div>
    </div>
  );
}
