"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema Validation with Zod
const equipmentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  type: z.string().nonempty("Type is required"),
  location: z.string().nonempty("Location is required"),
  department: z.enum(["Machining", "Assembly", "Packaging", "Shipping"]),
  model: z.string().nonempty("Model is required"),
  serialNumber: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "Serial Number must be alphanumeric"),
  installDate: z.date().refine((date) => date < new Date(), "Install date must be in the past"),
  status: z.enum(["Operational", "Down", "Maintenance", "Retired"]),
});

type EquipmentFormValues = z.infer<typeof equipmentSchema>;

export default function EquipmentPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema),
  });

  const onSubmit = (data: EquipmentFormValues) => {
    console.log("Submitted Data:", data);
    // Logic to handle form submission
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Equipment</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Input fields */}
        <div>
          <label>Name</label>
          <input {...register("name")} className="border rounded p-2 w-full" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label>Type</label>
          <input {...register("type")} className="border rounded p-2 w-full" />
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>
        <div>
          <label>Location</label>
          <input {...register("location")} className="border rounded p-2 w-full" />
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        </div>
        <div>
          <label>Department</label>
          <select {...register("department")} className="border rounded p-2 w-full">
            <option value="Machining">Machining</option>
            <option value="Assembly">Assembly</option>
            <option value="Packaging">Packaging</option>
            <option value="Shipping">Shipping</option>
          </select>
          {errors.department && <p className="text-red-500">{errors.department.message}</p>}
        </div>
        <div>
          <label>Model</label>
          <input {...register("model")} className="border rounded p-2 w-full" />
          {errors.model && <p className="text-red-500">{errors.model.message}</p>}
        </div>
        <div>
          <label>Serial Number</label>
          <input {...register("serialNumber")} className="border rounded p-2 w-full" />
          {errors.serialNumber && <p className="text-red-500">{errors.serialNumber.message}</p>}
        </div>
        <div>
          <label>Install Date</label>
          <input type="date" {...register("installDate")} className="border rounded p-2 w-full" />
          {errors.installDate && <p className="text-red-500">{errors.installDate.message}</p>}
        </div>
        <div>
          <label>Status</label>
          <select {...register("status")} className="border rounded p-2 w-full">
            <option value="Operational">Operational</option>
            <option value="Down">Down</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Retired">Retired</option>
          </select>
          {errors.status && <p className="text-red-500">{errors.status.message}</p>}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
