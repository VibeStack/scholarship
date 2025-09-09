// src/Components/Dashboard/CourceAndBranch.jsx
import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import SelectField from "./SelectField";

export default function CourceAndBranch({
  register,
  errors,
  control,
}) {
  const selectedCourse = useWatch({
    control,
    name: "course",
  });

  // mapping: course -> branches
  const courseInDifferentBranches = {
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

  const [branchOptions, setBranchOptions] = useState(
    courseInDifferentBranches[selectedCourse]
  );
  const [isBranchDisable, setIsBranchDisable] = useState(true);
  const [isLeetFieldDisabled, setIsLeetFieldDisabled] = useState(true);

  const courseChangeHandler = (e) => {
    setBranchOptions(courseInDifferentBranches[e.target.value]);

    if (courseInDifferentBranches[e.target.value].length === 0) {
      setIsBranchDisable(true);
    } else {
      setIsBranchDisable(false);
    }

    if (e.target.value === "B.Tech") {
      setIsLeetFieldDisabled(false);
    } else {
      setIsLeetFieldDisabled(true);
    }
  };

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
          options={Object.keys(courseInDifferentBranches)}
          register={register}
          rules={{
            required: { value: true, message: "Course is required" },
          }}
          errors={errors?.course}
          onChange={courseChangeHandler}
        />

        {/* Branch Selection */}
        <SelectField
          label="Branch"
          id="branch"
          options={branchOptions}
          register={register}
          rules={
            !isBranchDisable
              ? {
                  validate: (value) =>
                    value === "" ||
                    branchOptions.includes(value) ||
                    "Invalid branch selected",
                }
              : {}
          }
          errors={errors?.branch}
          disabled={isBranchDisable}
        />

        {/* Leet/Non-Leet */}
        <SelectField
          label="Leet / Non-Leet"
          id="leet"
          options={["Leet", "Non-Leet"]}
          register={register}
          rules={
            !isLeetFieldDisabled
              ? {
                  validate: (value) =>
                    value === null ||
                    value === "Leet" ||
                    value === "Non-Leet" ||
                    "Invalid option",
                }
              : {}
          }
          errors={errors?.leet}
          disabled={isLeetFieldDisabled}
        />
      </div>
    </div>
  );
}
