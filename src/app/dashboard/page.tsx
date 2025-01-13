'use client';

import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  const [equipmentData, setEquipmentData] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load data from localStorage
      const equipment = JSON.parse(localStorage.getItem('equipment') || '[]');
      const maintenance = JSON.parse(localStorage.getItem('maintenanceRecords') || '[]');

      setEquipmentData(equipment);
      setMaintenanceData(maintenance);
    }
  }, []);

  // Pie Chart: Equipment Status Breakdown
  const equipmentStatusData = {
    labels: ['Operational', 'Down', 'Maintenance', 'Retired'],
    datasets: [
      {
        label: 'Equipment Status',
        data: [
          equipmentData.filter((eq) => eq.status === 'Operational').length,
          equipmentData.filter((eq) => eq.status === 'Down').length,
          equipmentData.filter((eq) => eq.status === 'Maintenance').length,
          equipmentData.filter((eq) => eq.status === 'Retired').length,
        ],
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800', '#9E9E9E'],
      },
    ],
  };

  // Bar Chart: Maintenance Hours by Type
  const maintenanceTypes = ['Preventive', 'Repair', 'Emergency'];

  const maintenanceHoursData = {
    labels: maintenanceTypes,
    datasets: [
      {
        label: 'Hours Spent',
        data: maintenanceTypes.map((type) =>
          maintenanceData
            .filter((record) => record.type === type)
            .reduce((sum, record) => sum + (record.hoursSpent || 0), 0)
        ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Recent Maintenance Activities
  const recentActivities = maintenanceData
    .slice(0, 5) // Show only the latest 5 activities
    .map((record) => ({
      equipmentId: record.equipmentId, // Displaying the equipment ID
      date: record.date,
      action: record.type,
    }));

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-2 text-[#6C5B7B]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart: Equipment Status Breakdown */}
        <div className="p-4 rounded-lg bg-white shadow">
          <h2 className="text-lg font-semibold mb-2 text-[#355C7D]">Equipment Status</h2>
          <Pie data={equipmentStatusData} />
        </div>

        {/* Bar Chart: Maintenance Hours by Type */}
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
              <th className="border p-2">Equipment ID</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <tr key={index} className="odd:bg-white even:bg-[#F8F9FA]">
                  <td className="border p-2 text-[#355C7D]">{activity.equipmentId}</td>
                  <td className="border p-2 text-[#355C7D]">{activity.date}</td>
                  <td className="border p-2 text-[#355C7D]">{activity.action}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="border p-2 text-center text-[#355C7D]">
                  No recent activities found.
                </td>
              </tr>
            )}
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
