// src/Components/tableView/TableView.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ColumnSelector from "./ColumnSelector";
import DataTable from "./DataTable";

export default function TableView() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(["name", "applicantId"]);

  // Fetch from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/students');
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchData();
  }, []);

  // All possible columns
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
    // Clear session / token here
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md mt-8">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 relative">
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

        <button
          onClick={handleLogout}
          className="absolute right-0 top-0 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition"
        >
          Back
        </button>
      </div>

      {/* Page Title */}
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-red-700 via-red-800 to-black bg-clip-text text-transparent relative after:content-[''] after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-red-600 after:to-black after:mx-auto after:mt-2 drop-shadow-md">
        Student Scholarship Table
      </h2>

      {/* Column Selector */}
      <ColumnSelector
        allColumns={allColumns}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />

      {/* Table */}
      <DataTable students={students} selectedColumns={selectedColumns} />
    </div>
  );
}
