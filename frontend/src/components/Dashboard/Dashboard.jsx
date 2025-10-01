// src/Components/Dashboard/Dashboard.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import YearWiseField from "./YearWiseField";
import ApplicantInfo from "./ApplicantInfo";
import CourceAndBranch from "./CourceAndBranch";
import ContactAndBank from "./ContactAndBank";
import CategoryAndHostal from "./CategoryAndHostal";
import MaintenanceAllowance from "./MaintenanceAllowance";
import Fee from "./Fee";
import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [yearWiseStart, setYearWiseStart] = useState("");
  const [degreeDuration, setDegreeDuration] = useState(0);

  const onSubmit = async (data) => {

    console.log(data)
    // Filter yearWise to only include years with data
    if (data.yearWise) {
      const filteredYearWise = {};
      for (const [year, yData] of Object.entries(data.yearWise)) {
        const hasData =
          yData.feePaid ||
          (yData.credited &&
            (yData.credited.amount ||
              yData.credited.bank ||
              yData.credited.accountNo ||
              yData.credited.date)) ||
          yData.granted40 ||
          yData.granted60;

        if (hasData) filteredYearWise[year] = yData;
      }
      data.yearWise = filteredYearWise;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/students`, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        alert("✅ Student data saved successfully!");
        reset();
        navigate("/dashboard");
      } else {
        alert("❌ Error : " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md mt-8">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 relative">
        <img
          src="/img/gne_logo.png"
          alt="College Logo"
          className="h-16 w-16 mb-3"
        />
        <h1 className="text-2xl font-bold text-gray-800">
          Guru Nanak Dev Engineering College
        </h1>
        <p className="text-sm text-gray-600">
          Scholarship Management System (Teacher Portal)
        </p>
        <button
          onClick={handleLogout}
          className="absolute right-0 top-0 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-red-700 via-red-800 to-black bg-clip-text text-transparent">
        Student Scholarship Form
      </h2>

      {/* View Table Button */}
      <div className="flex justify-end my-4">
        <button
          type="button"
          onClick={() => navigate("/table-view")}
          className="py-3 px-6 rounded-full font-semibold text-white bg-green-500 shadow-lg hover:bg-green-600"
        >
          View Entries Table
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <ApplicantInfo
          register={register}
          errors={errors}
          setYearWiseStart={setYearWiseStart}
          setDegreeDuration={setDegreeDuration}
          getValues={getValues}
          setValue={setValue}
        />

        <CourceAndBranch
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
        />

        <ContactAndBank register={register} errors={errors} />

        <CategoryAndHostal register={register} errors={errors} />

        <MaintenanceAllowance register={register} errors={errors} />

        <Fee register={register} errors={errors} />

        {yearWiseStart && (
          <YearWiseField
            register={register}
            yearWiseStart={yearWiseStart}
            degreeDuration={degreeDuration}
          />
        )}

        <InputField
          label="Remarks"
          id="remarks"
          register={register}
          rules={{}}
          errors={errors}
        />

        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
            isSubmitting
              ? "bg-blue-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
