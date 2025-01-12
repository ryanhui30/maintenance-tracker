'use client'; // Add this directive to mark the component as a client component

import React, { useState } from 'react';

export default function MaintenanceForm() {
  const [formData, setFormData] = useState({
    id: "", // Manually input the maintenance ID
    equipmentId: "",
    date: "",
    type: "Preventive",
    technician: "",
    hoursSpent: "",
    description: "",
    partsReplaced: [],
    priority: "Medium",
    completionStatus: "Incomplete",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePartsChange = (index: number, value: string) => {
    setFormData((prevData) => {
      const updatedParts = [...prevData.partsReplaced];
      updatedParts[index] = value;
      return { ...prevData, partsReplaced: updatedParts };
    });
  };

  const addPart = () => {
    setFormData((prevData) => ({
      ...prevData,
      partsReplaced: [...prevData.partsReplaced, ""],
    }));
  };

  const removePart = (index: number) => {
    setFormData((prevData) => {
      const updatedParts = prevData.partsReplaced.filter((_, i) => i !== index);
      return { ...prevData, partsReplaced: updatedParts };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!formData.id || !formData.equipmentId) {
      alert("Please fill in both the Maintenance ID and Equipment ID.");
      return;
    }

    // Convert hoursSpent to a number
    const maintenanceRecord = {
      ...formData,
      hoursSpent: parseFloat(formData.hoursSpent),
    };

    // Retrieve existing maintenance records from localStorage
    const existingRecords = JSON.parse(localStorage.getItem('maintenanceRecords') || '[]');

    // Add the new record to the list
    const updatedRecords = [...existingRecords, maintenanceRecord];

    // Save the updated records back to localStorage
    localStorage.setItem('maintenanceRecords', JSON.stringify(updatedRecords));

    // Success feedback
    alert("Maintenance record added successfully!");

    // Reset the form fields
    setFormData({
      id: "",
      equipmentId: "",
      date: "",
      type: "Preventive",
      technician: "",
      hoursSpent: "",
      description: "",
      partsReplaced: [],
      priority: "Medium",
      completionStatus: "Incomplete",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Maintenance Record</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Maintenance ID</label>
          <input
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            placeholder="Enter Maintenance ID"
            required
          />
        </div>
        <div>
          <label>Equipment ID</label>
          <input
            name="equipmentId"
            value={formData.equipmentId}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            placeholder="Enter Equipment ID"
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          >
            <option value="Preventive">Preventive</option>
            <option value="Repair">Repair</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>
        <div>
          <label>Technician</label>
          <input
            name="technician"
            value={formData.technician}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            placeholder="Enter Technician Name"
          />
        </div>
        <div>
          <label>Hours Spent</label>
          <input
            name="hoursSpent"
            type="number"
            value={formData.hoursSpent}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            placeholder="Enter Hours Spent"
          />
        </div>
        <div>
          <label className="block mb-2">Parts Replaced</label>
          <div className="border border-solid rounded p-4">
            <button
              type="button"
              onClick={addPart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Part
            </button>
            {formData.partsReplaced.map((part, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <input
                  value={part}
                  onChange={(e) => handlePartsChange(index, e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Enter Part"
                />
                <button
                  type="button"
                  onClick={() => removePart(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Completion Status</label>
          <select
            name="completionStatus"
            value={formData.completionStatus}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          >
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
            <option value="Pending Parts">Pending Parts</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>

      {/* Go Back Button */}
      <div className="mt-4">
        <a href="/" className="text-blue-500 underline">
          ← Go Back to Home
        </a>
      </div>
    </div>
  );
}
