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
        backgroundColor: ["#A8E6CF", "#FFD3B6", "#FFAAA5"],
        hoverBackgroundColor: ["#94D7B5", "#FFBE9E", "#FF8A80"],
      },
    ],
  };

  const maintenanceHoursData = {
    labels: ["Mechanical", "Electrical", "Plumbing"],
    datasets: [
      {
        label: "Hours",
        data: [30, 50, 20],
        backgroundColor: ["#A3D8F4", "#FFB6C1", "#FFDAC1"],
        hoverBackgroundColor: ["#8FC8E6", "#FFA4B2", "#FFCFB0"],
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
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-2 text-[#6C5B7B]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart: Equipment Status Breakdown */}
        <div className="p-4 rounded-lg bg-white shadow">
          <h2 className="text-lg font-semibold mb-2 text-[#355C7D]">Equipment Status</h2>
          <Pie data={equipmentStatusData} />
        </div>

        {/* Bar Chart: Maintenance Hours by Department */}
        <div className="p-4 rounded-lg bg-white shadow">
          <h2 className="text-lg font-semibold mb-2 text-[#355C7D]">Maintenance Hours</h2>
          <Bar data={maintenanceHoursData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Recent Maintenance Activities */}
      <div className="p-4 rounded-lg bg-white shadow">
        <h2 className="text-lg font-semibold mb-2 text-[#355C7D]">Recent Activities</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-white shadow text-[#355C7D]">
              <th className="border p-2">Equipment</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id} className="odd:bg-white even:bg-[#F8F9FA]">
                <td className="border p-2 text-[#355C7D]">{activity.equipment}</td>
                <td className="border p-2 text-[#355C7D]">{activity.date}</td>
                <td className="border p-2 text-[#355C7D]">{activity.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Go Back Button */}
        <div className="mt-4">
            <a href="/" className="text-blue-500 underline">
            ← Go Back to Home
            </a>
        </div>
    </div>
  );
}
