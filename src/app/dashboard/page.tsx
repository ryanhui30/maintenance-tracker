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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  // Generate PDF Report
  const generatePDF = async () => {
    const doc = new jsPDF();
    const element = document.getElementById('report-content');

    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('Maintenance_Report.pdf');
    }
  };

  // Recent Maintenance Activities
  const recentActivities = maintenanceData
    .slice(0, 5) // Show only the latest 5 activities
    .map((record) => ({
      equipmentId: record.equipmentId,
      date: record.date,
      action: record.type,
      hoursSpent: record.hoursSpent,
    }));

  // Calculate total maintenance hours
  const totalMaintenanceHours = maintenanceData.reduce((sum, record) => {
    const hours = record.hoursSpent ? parseFloat(record.hoursSpent) : 0;
    return sum + (isNaN(hours) ? 0 : hours);
  }, 0);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-2 text-[#6C5B7B]">Dashboard</h1>

      <div id="report-content" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pie Chart: Equipment Status Breakdown */}
          <div className="p-4 rounded-lg bg-white shadow">
            <h2 className="text-lg font-semibold mb-2 text-[#355C7D]">Equipment Status</h2>
            <Pie
              data={{
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
              }}
            />
          </div>

          {/* Bar Chart: Maintenance Hours by Type */}
          <div className="p-4 rounded-lg bg-white shadow">
            <h2 className="text-lg font-semibold mb-2 text-[#355C7D]">Maintenance Hours</h2>
            <Bar
              data={{
                labels: ['Preventive', 'Repair', 'Emergency'],
                datasets: [
                  {
                    label: 'Hours Spent',
                    data: ['Preventive', 'Repair', 'Emergency'].map((type) =>
                      maintenanceData
                        .filter((record) => record.type === type)
                        .reduce((sum, record) => sum + (record.hoursSpent || 0), 0)
                    ),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  },
                ],
              }}
              options={{ responsive: true }}
            />
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
                <th className="border p-2">Hours Spent</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <tr key={index} className="odd:bg-white even:bg-[#F8F9FA]">
                    <td className="border p-2 text-[#355C7D]">{activity.equipmentId}</td>
                    <td className="border p-2 text-[#355C7D]">{activity.date}</td>
                    <td className="border p-2 text-[#355C7D]">{activity.action}</td>
                    <td className="border p-2 text-[#355C7D]">{activity.hoursSpent}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="border p-2 text-center text-[#355C7D]">
                    No recent activities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total Maintenance Hours */}
        <div className="p-4 rounded-lg bg-white shadow">
          <h2 className="text-lg font-semibold text-[#355C7D]">Total Maintenance Hours</h2>
          <p className="text-[#6C5B7B]">{totalMaintenanceHours} hours</p>
        </div>
      </div>

      {/* Generate PDF Button */}
      <div className="mt-4">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate PDF Report
        </button>
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
