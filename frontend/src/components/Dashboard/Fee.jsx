// src/Components/Dashboard/Fee.jsx
import React from "react";
import InputField from "./InputField";

export default function Fee({ register, errors }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">
        Fees
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Tuition Fee"
          id="fees.tuitionFee"
          type="number"
          register={register}
          rules={{
            required: "Tuition Fee is required",
            min: { value: 0, message: "Tuition Fee cannot be negative" },
          }}
          errors={errors?.fees?.tuitionFee}
        />
        <InputField
          label="Other Fee"
          id="fees.otherFee"
          type="number"
          register={register}
          rules={{ required: "Other Fee is required" }}
          errors={errors?.fees?.otherFee}
        />
        <InputField
          label="Total Fee Claim"
          id="fees.totalFeeClaim"
          type="number"
          register={register}
          rules={{ required: "Total Fee Claim is required" }}
          errors={errors?.fees?.totalFeeClaim}
        />
      </div>
    </div>
  );
}
