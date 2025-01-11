'use client'; // Add this directive to mark the component as a client component

import React, { useState, useEffect } from 'react';

export default function EquipmentTable() {
  const [equipment, setEquipment] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<string>("");

  // Fetch equipment from localStorage on component mount
  useEffect(() => {
    const storedEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
    setEquipment(storedEquipment);
  }, []);

  // Sort equipment based on sortKey
  const sortedEquipment = React.useMemo(() => {
    if (equipment) {
      return [...equipment].sort((a, b) => {
        if (sortKey) {
          return a[sortKey] > b[sortKey] ? 1 : -1;
        }
        return 0;
      });
    }
    return [];
  }, [equipment, sortKey]);

  // Filter equipment based on search input
  const filteredEquipment = (sortedEquipment || []).filter((eq) =>
    Object.values(eq).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  );

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

      {/* Equipment Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th onClick={() => setSortKey("name")} className="cursor-pointer border p-2">Name</th>
            <th className="cursor-pointer border p-2">Location</th>
            <th className="cursor-pointer border p-2">Department</th>
            <th className="cursor-pointer border p-2">Model</th>
            <th className="cursor-pointer border p-2">Serial Number</th>
            <th className="cursor-pointer border p-2">Install Date</th>
            <th className="cursor-pointer border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredEquipment.map((eq) => (
            <tr key={eq.id}>
              <td className="border p-2">{eq.name}</td>
              <td className="border p-2">{eq.location}</td>
              <td className="border p-2">{eq.department}</td>
              <td className="border p-2">{eq.model}</td>
              <td className="border p-2">{eq.serialNumber}</td>
              <td className="border p-2">{eq.installDate}</td>
              <td className="border p-2">{eq.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
