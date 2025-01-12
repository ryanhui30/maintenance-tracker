'use client'; // Add this directive to mark the component as a client component

import React, { useState, useEffect } from 'react';

export default function MaintenanceTable() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<string>("");

  // Fetch maintenance records from localStorage on component mount
  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('maintenanceRecords') || '[]');
    setRecords(storedRecords);
  }, []);

  // Delete a maintenance record
  const handleDelete = (id: string) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
    localStorage.setItem('maintenanceRecords', JSON.stringify(updatedRecords));
  };

  // Sort maintenance records based on sortKey
  const sortedRecords = React.useMemo(() => {
    if (records) {
      return [...records].sort((a, b) => {
        if (sortKey) {
          return a[sortKey] > b[sortKey] ? 1 : -1;
        }
        return 0;
      });
    }
    return [];
  }, [records, sortKey]);

  // Filter maintenance records based on search input
  const filteredRecords = (sortedRecords || []).filter((record) =>
    Object.values(record).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Maintenance Records</h1>

      {/* Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search maintenance records..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Maintenance Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th onClick={() => setSortKey("id")} className="cursor-pointer border p-2">ID</th>
            <th onClick={() => setSortKey("equipmentId")} className="cursor-pointer border p-2">Equipment ID</th>
            <th onClick={() => setSortKey("date")} className="cursor-pointer border p-2">Date</th>
            <th onClick={() => setSortKey("technician")} className="cursor-pointer border p-2">Technician</th>
            <th onClick={() => setSortKey("description")} className="cursor-pointer border p-2">Description</th>
            <th onClick={() => setSortKey("hoursSpent")} className="cursor-pointer border p-2">Hours Spent</th>
            <th onClick={() => setSortKey("priority")} className="cursor-pointer border p-2">Priority</th>
            <th onClick={() => setSortKey("completionStatus")} className="cursor-pointer border p-2">Completion Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>
              <td className="border p-2">{record.id}</td>
              <td className="border p-2">{record.equipmentId}</td>
              <td className="border p-2">{record.date}</td>
              <td className="border p-2">{record.technician}</td>
              <td className="border p-2">{record.description}</td>
              <td className="border p-2">{record.hoursSpent}</td>
              <td className="border p-2">{record.priority}</td>
              <td className="border p-2">{record.completionStatus}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(record.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Go Back Button */}
      <div className="mt-4">
        <a href="/" className="text-blue-500 underline">
          ← Go Back to Home
        </a>
      </div>
    </div>
  );
}
