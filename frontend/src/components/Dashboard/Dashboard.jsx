// src/Components/Dashboard/Dashboard.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import SelectField from "./SelectField";
import YearWiseField from "./YearWiseField";

export default function Dashboard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      yearWise: {
        "2023-24": {},
      },
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Student Data Submitted:", data);
    await new Promise((res) => setTimeout(res, 2000));
    navigate("/"); // redirect after submit
    reset();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md mt-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-600">
        Scholarship Student Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Applicant Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Applicant Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Applicant ID" id="applicantId" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Name" id="name" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Father Name" id="fatherName" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Mother Name" id="motherName" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="DOB" id="dob" type="date" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Batch" id="batch" register={register} rules={{ required: "Required" }} errors={errors} />
          </div>
        </div>

        {/* Course & Branch */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Course Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField label="Course" id="course" options={["B.Tech", "M.Tech", "MBA"]} register={register} rules={{ required: "Required" }} errors={errors} />
            <SelectField label="Branch" id="branch" options={["CSE", "ECE", "Mechanical", "Civil", "IT", "Electronics"]} register={register} rules={{ required: "Required" }} errors={errors} />
            <SelectField label="Leet/Non-Leet" id="leet" options={["Leet", "Non-Leet"]} register={register} rules={{ required: "Required" }} errors={errors} />
          </div>
        </div>

        {/* Contact & Bank */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Contact & Bank Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Contact No" id="contactNo" type="tel" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Aadhaar" id="aadhaar" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Email" id="email" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Bank Name" id="bank.name" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Account No" id="bank.accountNo" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="IFSC Code" id="bank.ifsc" register={register} rules={{ required: "Required" }} errors={errors} />
          </div>
        </div>

        {/* Category & Hostel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Category & Hostel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField label="Caste" id="category.caste" options={["SC","ST","OBC","General"]} register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Sub-Caste" id="category.subCaste" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Family Income" id="category.familyIncome" type="number" register={register} rules={{ required: "Required" }} errors={errors} />
            <SelectField label="Hostel" id="hostel" options={["Day Scholar","Hosteller"]} register={register} rules={{ required: "Required" }} errors={errors} />
            <SelectField label="Affidavit By" id="affidavitBy" options={["Father","Mother"]} register={register} rules={{ required: "Required" }} errors={errors} />
          </div>
        </div>

        {/* Maintenance Allowance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Maintenance Allowance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="Months" id="maintenanceAllowance.months" type="number" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Rate" id="maintenanceAllowance.rate" type="number" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Total" id="maintenanceAllowance.total" type="number" register={register} rules={{ required: "Required" }} errors={errors} />
          </div>
        </div>

        {/* Fees */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-700">Fees</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="Tuition Fee" id="fees.tuitionFee" type="number" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Other Fee" id="fees.otherFee" type="number" register={register} rules={{ required: "Required" }} errors={errors} />
            <InputField label="Total Fee Claim" id="fees.totalFeeClaim" type="number" register={register} rules={{ required: "Required" }} errors={errors} />
          </div>
        </div>

        {/* Year-wise Fee Details */}
        <YearWiseField register={register} errors={errors.yearWise || {}} />

        {/* Remarks */}
        <InputField label="Remarks" id="remarks" register={register} rules={{ required: false }} errors={errors} />

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-white transition duration-200 mt-4 ${
            isSubmitting ? "bg-blue-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
