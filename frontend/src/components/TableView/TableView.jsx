import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ColumnSelector from "./ColumnSelector";
import DataTable from "./DataTable";
import axios from "axios";

export default function TableView() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([
    "name",
    "applicantId",
    "fatherName",
    "motherName",
    "dob",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [batchFilter, setBatchFilter] = useState(""); // user input for batch filtering

  const apiUrl = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${apiUrl}/api/students`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (mounted) setStudents(res.data);
      } catch (err) {
        if (mounted) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || err.message);
          } else {
            setError("Could not fetch students");
          }
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  // ✅ Filter students based on batch input
  const filteredStudents = useMemo(() => {
    console.log(batchFilter)
    if (!batchFilter.trim()) return students;

    const input = batchFilter.trim();

    // Check if input is a range: xxxx-xxxx
    const rangeMatch = input.match(/^(\d{4})\s*-\s*(\d{4})$/);

    if (rangeMatch) {
      const startInput = parseInt(rangeMatch[1], 10);
      const endInput = parseInt(rangeMatch[2], 10);

      return students.filter((student) => {
        if (!student.batch) return false;
        const batchMatch = student.batch.match(/^(\d{4})\s*-\s*(\d{4})$/);
        if (!batchMatch) return false;

        const batchStart = parseInt(batchMatch[1], 10);

        // ✅ include if batch start year lies within given range
        return batchStart >= startInput && batchStart <= endInput;
      });
    }

    // Otherwise treat input as a single start year
    const year = parseInt(input, 10);
    if (isNaN(year)) return students; // fallback if input is invalid

    return students.filter((student) => {
      if (!student.batch) return false;
      const batchMatch = student.batch.match(/^(\d{4})\s*-\s*(\d{4})$/);
      if (!batchMatch) return false;

      const batchStart = parseInt(batchMatch[1], 10);

      // ✅ include only if batch starts from given year
      return batchStart === year;
    });
  }, [students, batchFilter]);

  const allColumns = [
    "applicantId",
    "name",
    "fatherName",
    "motherName",
    "dob",
    "batch",
    "course",
    "branch",
    "leet",
    "contactNo",
    "aadhaar",
    "email",
    "bank.name",
    "bank.accountNo",
    "bank.ifsc",
    "category.caste",
    "category.subCaste",
    "category.familyIncome",
    "hostel",
    "affidavitBy",
    "maintenanceAllowance.months",
    "maintenanceAllowance.rate",
    "maintenanceAllowance.total",
    "fees.tuitionFee",
    "fees.otherFee",
    "fees.totalFeeClaim",
    "remarks",
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md mt-8">
      {/* Header */}
      <div className="flex flex-col items-center mb-6 relative">
        <img
          src="/img/gne_logo.png"
          alt="College Logo"
          className="h-16 w-16 mb-3"
        />
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Guru Nanak Dev Engineering College
        </h1>
        <p className="text-sm text-gray-600">
          Scholarship Management System (Teacher Portal)
        </p>

        <div className="absolute right-0 top-0 flex gap-2">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="absolute left-0 top-0">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition"
          >
            Back
          </button>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-red-700 via-red-800 to-black bg-clip-text text-transparent">
        Student Scholarship Table
      </h2>

      {/* Batch Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border">
        <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-700 font-medium">
          <span className="font-bold">Batch Filter:</span>
          <input
            type="text"
            placeholder="e.g. 2022 or 2020-2024"
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full sm:w-60"
          />
        </label>
        <p className="text-sm text-gray-500">
          Enter a year (e.g., 2020 → batch 2020-2024) or a range (e.g., 2020-2024 → batches 2020-2024 to 2020-2027).
        </p>
      </div>

      {/* Column Selector */}
      <ColumnSelector
        allColumns={allColumns}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />

      {/* Data Table */}
      <div className="mb-4">
        <DataTable
          students={filteredStudents}
          selectedColumns={selectedColumns}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
