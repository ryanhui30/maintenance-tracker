'use client'; // Add this directive to mark the component as a client component

import React, { useState, useEffect } from 'react';

export default function EquipmentTable() {
  const [equipment, setEquipment] = useState([]);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [departmentFilter, setDepartmentFilter] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<string>("");

  // Fetch equipment from localStorage on component mount
  useEffect(() => {
    const storedEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
    setEquipment(storedEquipment);
  }, []);

  // Delete an equipment entry
  const handleDelete = (id: string) => {
    const updatedEquipment = equipment.filter((eq) => eq.id !== id);
    setEquipment(updatedEquipment);
    localStorage.setItem('equipment', JSON.stringify(updatedEquipment));
  };

  // Handle status filter change
  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.value;
    const updatedSet = new Set(statusFilter);
    if (updatedSet.has(status)) {
      updatedSet.delete(status);
    } else {
      updatedSet.add(status);
    }
    setStatusFilter(updatedSet);
  };

  // Handle department filter change
  const handleDepartmentFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const department = event.target.value;
    const updatedSet = new Set(departmentFilter);
    if (updatedSet.has(department)) {
      updatedSet.delete(department);
    } else {
      updatedSet.add(department);
    }
    setDepartmentFilter(updatedSet);
  };

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

  // Filter equipment based on search input, status, and department
  const filteredEquipment = (sortedEquipment || []).filter((eq) => {
    const matchesSearch = Object.values(eq).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    );
    const matchesStatus = statusFilter.size === 0 || statusFilter.has(eq.status);
    const matchesDepartment = departmentFilter.size === 0 || departmentFilter.has(eq.department);
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Function to get row color based on status
  const getRowColor = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'bg-green-100';
      case 'Down':
        return 'bg-red-100';
      case 'Maintenance':
        return 'bg-yellow-100';
      case 'Retired':
        return 'bg-gray-100';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Equipment Table</h1>

      {/* Search Field */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search equipment..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Filters Section (Checklist below the search) */}
      <div className="mb-4">
        <div className="flex space-x-6">
          {/* Status Filters (Checkboxes) */}
          <div>
            <h2 className="font-bold text-sm mb-2">Status</h2>
            {['Operational', 'Down', 'Maintenance', 'Retired'].map((status) => (
              <div key={status}>
                <input
                  type="checkbox"
                  id={status}
                  value={status}
                  checked={statusFilter.has(status)}
                  onChange={handleStatusFilterChange}
                  className="mr-2"
                />
                <label htmlFor={status}>{status}</label>
              </div>
            ))}
          </div>

          {/* Department Filters (Checkboxes) */}
          <div>
            <h2 className="font-bold text-sm mb-2">Department</h2>
            {['Machining', 'Assembly', 'Packaging', 'Shipping'].map((department) => (
              <div key={department}>
                <input
                  type="checkbox"
                  id={department}
                  value={department}
                  checked={departmentFilter.has(department)}
                  onChange={handleDepartmentFilterChange}
                  className="mr-2"
                />
                <label htmlFor={department}>{department}</label>
              </div>
            ))}
          </div>
        </div>
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
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEquipment.map((eq) => (
            <tr
              key={eq.id}
              className={getRowColor(eq.status)}
            >
              <td className="border p-2">{eq.name}</td>
              <td className="border p-2">{eq.location}</td>
              <td className="border p-2">{eq.department}</td>
              <td className="border p-2">{eq.model}</td>
              <td className="border p-2">{eq.serialNumber}</td>
              <td className="border p-2">{eq.installDate}</td>
              <td className="border p-2">{eq.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(eq.id)}
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
