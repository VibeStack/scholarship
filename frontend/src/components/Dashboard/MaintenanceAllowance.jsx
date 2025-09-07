// src/Components/Dashboard/MaintenanceAllowance.jsx
import React from "react";
import InputField from "./InputField";

export default function MaintenanceAllowance({ register, errors }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">
        Maintenance Allowance
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Months"
          id="maintenanceAllowance.months"
          type="number"
          register={register}
          rules={{
            required: "Months are required",
            min: { value: 1, message: "At least 1 month required" },
            max: { value: 12, message: "Cannot exceed 12 months" },
          }}
          errors={errors?.maintenanceAllowance?.months}
        />
        <InputField
          label="Rate"
          id="maintenanceAllowance.rate"
          type="number"
          register={register}
          rules={{ required: "Rate is required" }}
          errors={errors?.maintenanceAllowance?.rate}
        />
        <InputField
          label="Total"
          id="maintenanceAllowance.total"
          type="number"
          register={register}
          rules={{ required: "Total is required" }}
          errors={errors?.maintenanceAllowance?.total}
        />
      </div>
    </div>
  );
}
