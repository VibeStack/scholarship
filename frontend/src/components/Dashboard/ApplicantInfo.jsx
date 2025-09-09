// src/Components/Dashboard/ApplicantInfo.jsx
import React from "react";
import InputField from "./InputField";

export default function ApplicantInfo({
  register,
  errors,
  setYearWiseStart,
  setDegreeDuration,
}) {

  const YearWiseFieldCreation = (e) =>{
    const [startYear,EndYear] = e.target.value.split('-')
    setYearWiseStart(startYear)
    setDegreeDuration(EndYear-startYear)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">
        Applicant Info
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Applicant ID"
          id="applicantId"
          register={register}
          rules={{
            required: {
              value: true,
              message: "Applicant ID is required",
            },
          }}
          errors={errors?.applicantId}
        />

        <InputField
          label="Name"
          id="name"
          register={register}
          rules={{
            required: {
              value: true,
              message: "Name is required",
            },
          }}
          errors={errors?.name}
        />

        <InputField
          label="Father Name"
          id="fatherName"
          register={register}
          rules={{
            required: {
              value: true,
              message: "Father's Name is required",
            },
          }}
          errors={errors?.fatherName}
        />

        <InputField
          label="Mother Name"
          id="motherName"
          register={register}
          rules={{
            required: {
              value: true,
              message: "Mother's Name is required",
            },
          }}
          errors={errors?.motherName}
        />

        <InputField
          label="DOB"
          id="dob"
          type="date"
          register={register}
          rules={{
            required: {
              value: true,
              message: "Date of Birth is required",
            },
          }}
          errors={errors?.dob}
        />

        <InputField
          label="Batch"
          id="batch"
          register={register}
          rules={{
            required: {
              value: true,
              message: "Student Batch is required",
            },
            pattern: {
              value: /^\d{4}-\d{4}$/,
              message: "Batch must be in format YYYY-YYYY (e.g., 2020-2024)",
            },
            validate: (value) => {
              const [start, end] = value.split("-").map(Number);
              if (end <= start) {
                return "End year must be greater than start year";
              }
              return true;
            },
          }}
          errors={errors?.batch}
          onChange={YearWiseFieldCreation}
        />
      </div>
    </div>
  );
}
