// src/Components/Dashboard/CourceAndBranch.jsx
import React from "react";
import { useWatch } from "react-hook-form";
import SelectField from "./SelectField";

export default function CourceAndBranch({ register, errors, control }) {
  // watch the selected course
  const selectedCourse = useWatch({
    control,
    name: "course",
  });

  // mapping: course -> branches
  const courseBranches = {
    "B.Tech": ["CSE", "ECE", "Mechanical", "Civil", "IT", "Electronics"],
    "M.Tech": ["CSE", "ECE", "Mechanical", "Civil"],
    MBA: ["Finance", "Marketing", "HR", "Operations"],
  };

  // branches based on selected course (or empty if none)
  const branchOptions = courseBranches[selectedCourse] || [];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">
        Course Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Course Selection */}
        <SelectField
          label="Course"
          id="course"
          options={Object.keys(courseBranches)}
          register={register}
          rules={{
            required: { value: true, message: "Course is required" },
          }}
          errors={errors?.course}
        />

        {/* Branch Selection */}
        <SelectField
          label="Branch"
          id="branch"
          options={branchOptions}
          register={register}
          rules={{
            required: { value: true, message: "Branch is required" },
          }}
          errors={errors?.branch}
        />

        {/* Leet/Non-Leet */}
        <SelectField
          label="Leet/Non-Leet"
          id="leet"
          options={["Leet", "Non-Leet"]}
          register={register}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          errors={errors?.leet}
        />
      </div>
    </div>
  );
}
