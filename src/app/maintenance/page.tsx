"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema Validation with Zod
const maintenanceSchema = z.object({
  equipmentId: z.string().nonempty("Equipment ID is required"),
  maintenanceDate: z.date().refine((date) => date <= new Date(), "Date cannot be in the future"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  technician: z.string().nonempty("Technician name is required"),
  status: z.enum(["Completed", "In Progress", "Pending"]),
});

type MaintenanceFormValues = z.infer<typeof maintenanceSchema>;

export default function MaintenancePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceSchema),
  });

  const onSubmit = (data: MaintenanceFormValues) => {
    console.log("Maintenance Record Submitted:", data);
    // Logic to handle maintenance form submission
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Maintenance Record</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Equipment ID */}
        <div>
          <label>Equipment ID</label>
          <input {...register("equipmentId")} className="border rounded p-2 w-full" />
          {errors.equipmentId && <p className="text-red-500">{errors.equipmentId.message}</p>}
        </div>

        {/* Maintenance Date */}
        <div>
          <label>Maintenance Date</label>
          <input type="date" {...register("maintenanceDate")} className="border rounded p-2 w-full" />
          {errors.maintenanceDate && <p className="text-red-500">{errors.maintenanceDate.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea {...register("description")} className="border rounded p-2 w-full" rows={3} />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        {/* Technician */}
        <div>
          <label>Technician Name</label>
          <input {...register("technician")} className="border rounded p-2 w-full" />
          {errors.technician && <p className="text-red-500">{errors.technician.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label>Status</label>
          <select {...register("status")} className="border rounded p-2 w-full">
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>
          {errors.status && <p className="text-red-500">{errors.status.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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
