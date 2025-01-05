"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema Validation with Zod
const maintenanceRecordSchema = z.object({
  id: z.string().nonempty("ID is required"),
  equipmentId: z.string().nonempty("Equipment selection is required"),
  date: z.date().refine((date) => date <= new Date(), "Date cannot be in the future"),
  type: z.enum(["Preventive", "Repair", "Emergency"]),
  technician: z.string().min(2, "Technician name must be at least 2 characters"),
  hoursSpent: z
    .number()
    .positive("Hours spent must be a positive number")
    .max(24, "Hours spent cannot exceed 24 hours"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  partsReplaced: z.array(z.string()).optional(),
  priority: z.enum(["Low", "Medium", "High"]),
  completionStatus: z.enum(["Complete", "Incomplete", "Pending Parts"]),
});

type MaintenanceRecord = z.infer<typeof maintenanceRecordSchema>;

export default function MaintenanceRecordForm() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<MaintenanceRecord>({
    resolver: zodResolver(maintenanceRecordSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "partsReplaced", // Managing dynamic array for parts replaced
  });

  const onSubmit = (data: MaintenanceRecord) => {
    console.log("Submitted Maintenance Record:", data);
    // Logic to handle form submission
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Maintenance Record</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ID */}
        <div>
          <label>ID</label>
          <input {...register("id")} className="border rounded p-2 w-full" />
          {errors.id && <p className="text-red-500">{errors.id.message}</p>}
        </div>

        {/* Equipment ID */}
        {/* Equipment ID */}
        <div>
            <label>Equipment ID</label>
            <input {...register("equipmentId")} className="border rounded p-2 w-full" />
            {errors.equipmentId && <p className="text-red-500">{errors.equipmentId.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label>Date</label>
          <input type="date" {...register("date", { valueAsDate: true })} className="border rounded p-2 w-full" />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        {/* Type */}
        <div>
          <label>Type</label>
          <select {...register("type")} className="border rounded p-2 w-full">
            <option value="Preventive">Preventive</option>
            <option value="Repair">Repair</option>
            <option value="Emergency">Emergency</option>
          </select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        {/* Technician */}
        <div>
          <label>Technician</label>
          <input {...register("technician")} className="border rounded p-2 w-full" />
          {errors.technician && <p className="text-red-500">{errors.technician.message}</p>}
        </div>

        {/* Hours Spent */}
        <div>
          <label>Hours Spent</label>
          <input
            type="number"
            {...register("hoursSpent", { valueAsNumber: true })}
            className="border rounded p-2 w-full"
          />
          {errors.hoursSpent && <p className="text-red-500">{errors.hoursSpent.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea {...register("description")} className="border rounded p-2 w-full" rows={3} />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        {/* Parts Replaced */}
        <div>
        <label className="block mb-2 font-medium">Parts Replaced</label>
        {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4 mb-2">
            <input
                {...register(`partsReplaced.${index}` as const)}
                className="border rounded p-2 flex-1"
                placeholder="Enter part name"
            />
            <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
                Remove
            </button>
            </div>
        ))}
        <button
            type="button"
            onClick={() => append("")}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
            Add Part
        </button>
        </div>

        {/* Priority */}
        <div>
          <label>Priority</label>
          <select {...register("priority")} className="border rounded p-2 w-full">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
        </div>

        {/* Completion Status */}
        <div>
          <label>Completion Status</label>
          <select {...register("completionStatus")} className="border rounded p-2 w-full">
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
            <option value="Pending Parts">Pending Parts</option>
          </select>
          {errors.completionStatus && <p className="text-red-500">{errors.completionStatus.message}</p>}
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
