"use client";

import React, { useState } from "react";

type Equipment = {
  id: string;
  name: string;
};

type MaintenanceRecord = {
  id: string;
  equipmentId: string;
  date: string;
  description: string;
  cost: number;
};

// Mock data
const equipmentData: Equipment[] = [
  { id: "1", name: "Drill" },
  { id: "2", name: "Tractor" },
  { id: "3", name: "Welding Machine" },
];

const maintenanceData: MaintenanceRecord[] = [
  { id: "1", equipmentId: "1", date: "2024-01-10", description: "Lubrication", cost: 50 },
  { id: "2", equipmentId: "2", date: "2024-02-15", description: "Engine Repair", cost: 300 },
  { id: "3", equipmentId: "1", date: "2024-03-20", description: "Battery Replacement", cost: 80 },
  { id: "4", equipmentId: "3", date: "2024-04-01", description: "Welding Head Replacement", cost: 150 },
];

export default function MaintenanceRecords() {
  const [records, setRecords] = useState<MaintenanceRecord[]>(maintenanceData);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<keyof MaintenanceRecord>("date");
  const [groupByEquipment, setGroupByEquipment] = useState(false);

  // Sort records
  const sortedRecords = [...records].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  // Filter records
  const filteredRecords = sortedRecords.filter((record) =>
    Object.values(record).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Group records by equipment
  const groupedRecords = groupByEquipment
    ? equipmentData.map((equipment) => ({
        equipment,
        records: filteredRecords.filter(
          (record) => record.equipmentId === equipment.id
        ),
      }))
    : null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Maintenance Records</h1>

      {/* Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search records..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Group by Equipment */}
      <div className="mb-4">
        <label className="mr-2">
          <input
            type="checkbox"
            checked={groupByEquipment}
            onChange={(e) => setGroupByEquipment(e.target.checked)}
            className="mr-1"
          />
          Group by Equipment
        </label>
      </div>

      {/* Maintenance Records Table */}
      {!groupByEquipment ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th
                onClick={() => setSortKey("date")}
                className="cursor-pointer border p-2"
              >
                Date
              </th>
              <th
                onClick={() => setSortKey("equipmentId")}
                className="cursor-pointer border p-2"
              >
                Equipment
              </th>
              <th
                onClick={() => setSortKey("description")}
                className="cursor-pointer border p-2"
              >
                Description
              </th>
              <th
                onClick={() => setSortKey("cost")}
                className="cursor-pointer border p-2"
              >
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="border p-2">{record.date}</td>
                <td className="border p-2">
                  {
                    equipmentData.find((eq) => eq.id === record.equipmentId)
                      ?.name
                  }
                </td>
                <td className="border p-2">{record.description}</td>
                <td className="border p-2">${record.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          {groupedRecords?.map(({ equipment, records }) => (
            <div key={equipment.id} className="mb-4">
              <h2 className="text-xl font-bold">{equipment.name}</h2>
              {records.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300 mt-2">
                  <thead>
                    <tr>
                      <th className="border p-2">Date</th>
                      <th className="border p-2">Description</th>
                      <th className="border p-2">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.id}>
                        <td className="border p-2">{record.date}</td>
                        <td className="border p-2">{record.description}</td>
                        <td className="border p-2">${record.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No records found.</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Go Back Button */}
      <div className="mt-4">
        <a href="/" className="text-blue-500 underline">
          ← Go Back to Home
        </a>
      </div>
    </div>
  );
}
