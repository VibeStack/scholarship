// src/Components/Dashboard/CourceAndBranch.jsx
import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";
import SelectField from "./SelectField";

export default function CourceAndBranch({ register, errors, control, setValue }) {
  // watch the selected course
  const selectedCourse = useWatch({
    control,
    name: "course",
  });

  // mapping: course -> branches
  const courseBranches = {
    "B.Tech": [
      "Computer Science & Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Information Technology",
      "Electronics & Communication Engineering",
      "Robotics & AI",
    ],
    "M.Tech": [
      "Electronics Engineering",
      "Mechanical Engineering",
      "Production Engineering",
      "Geo Technical Engineering",
      "Power Engineering",
      "CSE & IT",
      "Computer Science & Engineering",
      "Structural Engineering",
      "Environmental Science & Engineering",
    ],
    MBA: [],
    MCA: [],
    "B.Voc.": ["Interior Design"],
    "B.Com": ["Enterpreneurship"],
    BBA: [],
    BCA: [],
    "B.Arch": [],
  };

  // branches based on selected course (or empty if none)
  const branchOptions = courseBranches[selectedCourse] || [];
  const isBranchDisabled = branchOptions.length === 0;

  // ✅ Enable Leet/Non-Leet only for B.Tech
  const isLeetDisabled = selectedCourse !== "B.Tech";

  // ✅ Clear "leet" when not B.Tech (so it shows up as null in final object)
  useEffect(() => {
    if (isLeetDisabled) {
      setValue("leet", null); // always include in object
    }
  }, [isLeetDisabled, setValue]);

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
          rules={
            isBranchDisabled
              ? {}
              : { required: { value: true, message: "Branch is required" } }
          }
          errors={errors?.branch}
          disabled={isBranchDisabled}
        />

        {/* Leet/Non-Leet */}
        <SelectField
          label="Leet/Non-Leet"
          id="leet"
          options={["Leet", "Non-Leet"]}
          register={register}
          rules={
            isLeetDisabled
              ? {}
              : { required: { value: true, message: "This field is required" } }
          }
          errors={errors?.leet}
          disabled={isLeetDisabled} // ✅ disabled for non-B.Tech
        />
      </div>
    </div>
  );
}
