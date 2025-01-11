'use client'; // Add this directive to mark the component as a client component

import React, { useState } from 'react';

export default function EquipmentForm() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    department: "Machining",
    model: "",
    serialNumber: "",
    installDate: "",
    status: "Operational",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission to add new equipment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEquipment = { ...formData, id: Date.now().toString() }; // Add unique ID

    // Get the existing equipment data from localStorage
    const existingEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');

    // Add the new equipment to the existing list
    const updatedEquipment = [...existingEquipment, newEquipment];

    // Save the updated list back to localStorage
    localStorage.setItem('equipment', JSON.stringify(updatedEquipment));

    // Show success alert
    alert("Equipment added successfully!");

    // Reset form fields
    setFormData({
      id: "",
      name: "",
      location: "",
      department: "Machining",
      model: "",
      serialNumber: "",
      installDate: "",
      status: "Operational",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Equipment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>ID</label>
          <input
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          >
            <option value="Machining">Machining</option>
            <option value="Assembly">Assembly</option>
            <option value="Packaging">Packaging</option>
            <option value="Shipping">Shipping</option>
          </select>
        </div>
        <div>
          <label>Model</label>
          <input
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Serial Number</label>
          <input
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Install Date</label>
          <input
            name="installDate"
            type="date"
            value={formData.installDate}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          >
            <option value="Operational">Operational</option>
            <option value="Down">Down</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Retired">Retired</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
