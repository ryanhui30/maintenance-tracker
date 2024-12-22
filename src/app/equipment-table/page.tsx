"use client";

import React, { useState } from "react";

type Equipment = {
  id: string;
  name: string;
  type: string;
  purchaseDate: string;
  maintenanceInterval: number;
  status: string; // e.g., "Operational", "Needs Repair", "Retired"
};

const mockData: Equipment[] = [
  { id: "1", name: "Drill", type: "Tool", purchaseDate: "2021-01-15", maintenanceInterval: 30, status: "Operational" },
  { id: "2", name: "Tractor", type: "Vehicle", purchaseDate: "2019-07-20", maintenanceInterval: 90, status: "Needs Repair" },
  { id: "3", name: "Welding Machine", type: "Tool", purchaseDate: "2020-05-12", maintenanceInterval: 60, status: "Retired" },
];

export default function EquipmentTable() {
  const [equipment, setEquipment] = useState<Equipment[]>(mockData);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<keyof Equipment>("name");
  const [bulkStatus, setBulkStatus] = useState("");

  // Sort equipment
  const sortedEquipment = [...equipment].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  // Filter equipment
  const filteredEquipment = sortedEquipment.filter((eq) =>
    Object.values(eq).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Update bulk status
  const updateBulkStatus = () => {
    const updatedEquipment = equipment.map((eq) =>
      eq.status !== bulkStatus ? { ...eq, status: bulkStatus } : eq
    );
    setEquipment(updatedEquipment);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Equipment Table</h1>

      {/* Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search equipment..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Bulk Status Update */}
      <div className="mb-4">
        <select
          value={bulkStatus}
          onChange={(e) => setBulkStatus(e.target.value)}
          className="border rounded p-2 mr-2"
        >
          <option value="">Select status</option>
          <option value="Operational">Operational</option>
          <option value="Needs Repair">Needs Repair</option>
          <option value="Retired">Retired</option>
        </select>
        <button
          onClick={updateBulkStatus}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Status for All
        </button>
      </div>

      {/* Equipment Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th
              onClick={() => setSortKey("name")}
              className="cursor-pointer border p-2"
            >
              Name
            </th>
            <th
              onClick={() => setSortKey("type")}
              className="cursor-pointer border p-2"
            >
              Type
            </th>
            <th
              onClick={() => setSortKey("purchaseDate")}
              className="cursor-pointer border p-2"
            >
              Purchase Date
            </th>
            <th
              onClick={() => setSortKey("maintenanceInterval")}
              className="cursor-pointer border p-2"
            >
              Interval (Days)
            </th>
            <th
              onClick={() => setSortKey("status")}
              className="cursor-pointer border p-2"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEquipment.map((eq) => (
            <tr
              key={eq.id}
              className={`${
                eq.status === "Operational"
                  ? "bg-green-100"
                  : eq.status === "Needs Repair"
                  ? "bg-yellow-100"
                  : "bg-red-100"
              }`}
            >
              <td className="border p-2">{eq.name}</td>
              <td className="border p-2">{eq.type}</td>
              <td className="border p-2">{eq.purchaseDate}</td>
              <td className="border p-2">{eq.maintenanceInterval}</td>
              <td className="border p-2">{eq.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Go Back Button */}
      <div className="mt-4">
        <a href="/equipment" className="text-blue-500 underline">
          ← Go Back to Equipment Form
        </a>
      </div>
    </div>
  );
}
