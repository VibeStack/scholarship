// src/Components/Dashboard/ApplicantInfo.jsx
import React, { useState } from "react";
import InputField from "./InputField";
import axios from "axios";

export default function ApplicantInfo({
  register,
  errors,
  setYearWiseStart,
  setDegreeDuration,
  getValues,
  setValue,
}) {
  const YearWiseFieldCreation = (e) => {
    const [startYear, EndYear] = e.target.value.split("-");
    setYearWiseStart(startYear);
    setDegreeDuration(EndYear - startYear);
  };

  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "failed"

  const handleFetch = async () => {
    setStatus("loading");

    const apiUrl = import.meta.env.VITE_API_URL || "";

    try {
      const response = await axios.get(`${apiUrl}/api/students`);

      const student = response.data.find(
        (data) => data.applicantId?.trim() === getValues("applicantId")?.trim()
      );

      if (!student) {
        setStatus("failed");
        alert("⁉️ No student found with this Applicant ID!");

        setValue("name", "");
        setValue("fatherName", "");
        setValue("motherName", "");
        setValue("dob", "");
        setValue("batch", "");
        setValue("course", "");
        setValue("branch", "");
        setValue("leet", "");
        setValue("contactNo", "");
        setValue("aadhaar", "");
        setValue("email", "");
        setValue("bank.name", "");
        setValue("bank.accountNo", "");
        setValue("bank.ifsc", "");
        setValue("category.caste", "");
        setValue("category.subCaste", "");
        setValue("category.familyIncome", "");
        setValue("hostel", "");
        setValue("affidavitBy", "");
        setValue("maintenanceAllowance.months", "");
        setValue("maintenanceAllowance.rate", "");
        setValue("maintenanceAllowance.total", "");
        setValue("fees.tuitionFee", "");
        setValue("fees.otherFee", "");
        setValue("fees.totalFeeClaim", "");

        // Hide year-wise fields by resetting start and duration
        setYearWiseStart(null);
        setDegreeDuration(null);
        return;
      }

      const dob = student.dob
        ? new Date(student.dob).toISOString().split("T")[0]
        : "";

      // Populate inputs
      setValue("name", student.name || "");
      setValue("fatherName", student.fatherName || "");
      setValue("motherName", student.motherName || "");
      setValue("dob", dob);
      setValue("batch", student.batch || "");
      setValue("course", student.course || "");
      setValue("branch", student.branch || "");
      setValue("leet", student.leet || "");
      setValue("contactNo", student.contactNo || "");
      setValue("aadhaar", student.aadhaar || "");
      setValue("email", student.email || "");
      setValue("bank.name", student.bank?.name || "");
      setValue("bank.accountNo", student.bank?.accountNo || "");
      setValue("bank.ifsc", student.bank?.ifsc || "");
      setValue("category.caste", student.category?.caste || "");
      setValue("category.subCaste", student.category?.subCaste || "");
      setValue("category.familyIncome", student.category?.familyIncome || "");
      setValue("hostel", student.hostel || "");
      setValue("affidavitBy", student.affidavitBy || "");
      setValue(
        "maintenanceAllowance.months",
        student.maintenanceAllowance?.months || ""
      );
      setValue(
        "maintenanceAllowance.rate",
        student.maintenanceAllowance?.rate || ""
      );
      setValue(
        "maintenanceAllowance.total",
        student.maintenanceAllowance?.total || ""
      );
      setValue("fees.tuitionFee", student.fees?.tuitionFee || "");
      setValue("fees.otherFee", student.fees?.otherFee || "");
      setValue("fees.totalFeeClaim", student.fees?.totalFeeClaim || "");

      // Year-wise
      if (student.batch) {
        const [startYear, endYear] = student.batch.split("-").map(Number);
        setYearWiseStart(startYear);
        setDegreeDuration(endYear - startYear);
      }

      if (student.yearWise) {
        Object.entries(student.yearWise).forEach(([year, yData]) => {
          setValue(`yearWise.${year}.feePaid`, yData.feePaid || "");
          setValue(
            `yearWise.${year}.credited.amount`,
            yData.credited?.amount || ""
          );
          setValue(
            `yearWise.${year}.credited.bank`,
            yData.credited?.bank || ""
          );
          setValue(
            `yearWise.${year}.credited.accountNo`,
            yData.credited?.accountNo || ""
          );
          setValue(
            `yearWise.${year}.credited.date`,
            yData.credited?.date
              ? new Date(yData.credited.date).toISOString().split("T")[0]
              : ""
          );
          setValue(`yearWise.${year}.granted40`, yData.granted40 || "");
          setValue(`yearWise.${year}.granted60`, yData.granted60 || "");
        });
      }
      setValue("remarks", student.remarks || "");

      setStatus("success");
      alert("✅ Student data loaded!");
    } catch (error) {
      setStatus("failed");
      alert("❌ Failed to fetch data!");
    } finally {
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">
        Applicant Info
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <div className="relative">
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
          <button
            type="button"
            onClick={handleFetch}
            disabled={status === "loading"}
            className={`w-[75px] px-4 py-2 bg-blue-200 text-blue-700 font-bold rounded-lg flex items-center justify-center hover:bg-blue-300 disabled:opacity-50 absolute top-6.75 -right-[0.05rem] border-2 ${status === "idle" ? "bg-blue-200 border-blue-700" : ""} ${status === "success" ? "bg-green-200 border-green-700 hover:bg-green-300" : ""} ${status === "failed" ? "bg-red-200 border-red-700 hover:bg-red-300" : ""}`}
          >
            {status === "loading" && (
              <svg
                className="animate-spin h-6 w-[75px] text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
            )}

            {status === "success" && (
              <svg
                className="h-6 w-[75px] text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}

            {status === "failed" && (
              <svg
                className="h-6 w-[75px] text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}

            {status === "idle" && "GET"}
          </button>
        </div>

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
