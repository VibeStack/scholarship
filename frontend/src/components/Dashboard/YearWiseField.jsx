// src/Components/Dashboard/YearWiseField.jsx
import { useState } from "react";
import InputField from "./InputField";

export default function YearWiseField({ register, errors }) {
  // Start with only 1 year by default
  const [years, setYears] = useState(["2023-24"]);

  const addYear = () => {
    const lastYearStart = parseInt(years[years.length - 1].split("-")[0]);
    const nextYear = `${lastYearStart + 1}-${lastYearStart + 2}`;
    setYears([...years, nextYear]);
  };

  return (
    <div className="bg-white p-4 rounded-lg border mb-6">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">
        Year-wise Fee Details
      </h2>

      {years.map((year) => (
        <div key={year} className="border p-4 rounded-lg mb-4 bg-gray-50">
          <h3 className="font-semibold mb-2 text-blue-600">{year}</h3>
          <InputField
            label="Fee Paid"
            id={`yearWise.${year}.feePaid`}
            register={register}
            rules={{ required: "Fee Paid is required" }}
            errors={errors?.[year] || {}}
            type="number"
          />

          <InputField
            label="Bank Amount"
            id={`yearWise.${year}.credited.amount`}
            register={register}
            rules={{ required: "Amount is required" }}
            errors={errors?.[year]?.credited || {}}
            type="number"
          />

          <InputField
            label="Bank Name"
            id={`yearWise.${year}.credited.bank`}
            register={register}
            rules={{ required: "Bank Name is required" }}
            errors={errors?.[year]?.credited || {}}
          />

          <InputField
            label="Account No"
            id={`yearWise.${year}.credited.accountNo`}
            register={register}
            rules={{ required: "Account No is required" }}
            errors={errors?.[year]?.credited || {}}
          />

          <InputField
            label="Date"
            id={`yearWise.${year}.credited.date`}
            register={register}
            rules={{ required: "Date is required" }}
            errors={errors?.[year]?.credited || {}}
            type="date"
          />

          <InputField
            label="40% Granted"
            id={`yearWise.${year}.granted40`}
            register={register}
            rules={{ required: "40% Granted is required" }}
            errors={errors?.[year] || {}}
            type="number"
          />

          <InputField
            label="60% Granted"
            id={`yearWise.${year}.granted60`}
            register={register}
            rules={{ required: "60% Granted is required" }}
            errors={errors?.[year] || {}}
            type="number"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addYear}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
      >
        Add Another Year
      </button>
    </div>
  );
}
