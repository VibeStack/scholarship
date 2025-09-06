// src/components/tableView/TableView.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ColumnSelector from "./ColumnSelector";
import DataTable from "./DataTable";

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

  const apiUrl = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiUrl}/api/students`);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        if (mounted) setStudents(data);
      } catch (err) {
        if (mounted) setError(err.message || "Could not fetch");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [apiUrl]);

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
    // Clear token/session here
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md mt-8">
      <div className="flex flex-col items-center mb-6 relative">
        <img src="/img/gne_logo.png" alt="College Logo" className="h-16 w-16 mb-3" />
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Guru Nanak Dev Engineering College
        </h1>
        <p className="text-sm text-gray-600">Scholarship Management System (Teacher Portal)</p>

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

      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-red-700 via-red-800 to-black bg-clip-text text-transparent">
        Student Scholarship Table
      </h2>

      <ColumnSelector
        allColumns={allColumns}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />

      <div className="mb-4">
        <DataTable students={students} selectedColumns={selectedColumns} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}
