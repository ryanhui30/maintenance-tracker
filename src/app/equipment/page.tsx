'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name is required and must be at least 3 characters.";
    }
    if (!formData.location) {
      newErrors.location = "Location is required.";
    }
    if (!formData.model) {
      newErrors.model = "Model is required.";
    }
    if (!formData.serialNumber || !/^[a-zA-Z0-9]+$/.test(formData.serialNumber)) {
      newErrors.serialNumber = "Serial Number is required and must be alphanumeric.";
    }
    if (!formData.installDate) {
      newErrors.installDate = "Install Date is required.";
    } else {
      const installDate = new Date(formData.installDate);
      const today = new Date();
      if (installDate >= today) {
        newErrors.installDate = "Install Date must be a past date.";
      }
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!validateForm()) {
      alert("Please correct the errors before submitting.");
      return;
    }

    const newEquipment = { ...formData, id: Date.now().toString() }; // Add unique ID

    // Get the existing equipment data from localStorage
    const existingEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');

    // Add the new equipment to the existing list
    const updatedEquipment = [...existingEquipment, newEquipment];

    // Save the updated list back to localStorage
    localStorage.setItem('equipment', JSON.stringify(updatedEquipment));

    // Show success alert
    alert("Equipment added successfully!");

    // Reset form fields and errors
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
    setErrors({});
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Equipment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
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
          {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
        </div>
        <div>
          <label>Serial Number</label>
          <input
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
          {errors.serialNumber && <p className="text-red-500 text-sm">{errors.serialNumber}</p>}
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
          {errors.installDate && <p className="text-red-500 text-sm">{errors.installDate}</p>}
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

      {/* Go Back Button */}
      <div className="mt-4">
        <a href="/" className="text-blue-500 underline">
          ← Go Back to Home
        </a>
      </div>
    </div>
  );
}
