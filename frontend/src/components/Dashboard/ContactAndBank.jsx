// src/Components/Dashboard/ContactAndBank.jsx
import React from "react";
import InputField from "./InputField";

export default function ContactAndBank({ register, errors }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">
        Contact & Bank Info
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Contact No"
          id="contactNo"
          type="tel"
          register={register}
          rules={{
            required: { value: true, message: "Contact No is required" },
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter valid 10-digit mobile number",
            },
          }}
          errors={errors?.contactNo}
        />

        <InputField
          label="Aadhaar"
          id="aadhaar"
          register={register}
          rules={{
            required: { value: true, message: "Aadhaar is required" },
            pattern: {
              value: /^\d{12}$/,
              message: "Aadhaar must be 12 digits",
            },
          }}
          errors={errors?.aadhaar}
        />

        <InputField
          label="Email"
          id="email"
          register={register}
          rules={{
            required: { value: true, message: "Email address is required" },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email (e.g., user@domain.com)",
            },
          }}
          errors={errors?.email}
        />

        <InputField
          label="Bank Name"
          id="bank.name"
          register={register}
          rules={{ required: "Bank Name is required" }}
          errors={errors?.bank?.name}
        />
        <InputField
          label="Account No"
          id="bank.accountNo"
          register={register}
          rules={{ required: "Account No is required" }}
          errors={errors?.bank?.accountNo}
        />
        <InputField
          label="IFSC Code"
          id="bank.ifsc"
          register={register}
          rules={{
            required: { value: true, message: "IFSC Code is required" },
            pattern: {
              value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
              message: "Invalid IFSC Code",
            },
          }}
          errors={errors?.bank?.ifsc}
        />
      </div>
    </div>
  );
}
