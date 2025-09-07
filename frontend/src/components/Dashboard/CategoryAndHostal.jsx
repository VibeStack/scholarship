// src/Components/Dashboard/CategoryAndHostal.jsx
import React from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function CategoryAndHostal({ register, errors }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">
        Category & Hostel
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField
          label="Caste"
          id="category.caste"
          options={["SC", "ST", "OBC", "General"]}
          register={register}
          rules={{
            required: { value: true, message: "Caste is required" },
          }}
          errors={errors?.category?.caste}
        />

        <InputField
          label="Sub-Caste"
          id="category.subCaste"
          register={register}
          rules={{ required: "Sub-Caste is required" }}
          errors={errors?.category?.subCaste}
        />
        <InputField
          label="Family Income"
          id="category.familyIncome"
          type="number"
          register={register}
          rules={{ required: "Family Income is required" }}
          errors={errors?.category?.familyIncome}
        />
        <SelectField
          label="Hostel"
          id="hostel"
          options={["Day Scholar", "Hosteller"]}
          register={register}
          rules={{ required: "Hostel is required" }}
          errors={errors?.hostel}
        />
        <SelectField
          label="Affidavit By"
          id="affidavitBy"
          options={["Father", "Mother"]}
          register={register}
          rules={{ required: "Affidavit By is required" }}
          errors={errors?.affidavitBy}
        />
      </div>
    </div>
  );
}
