// src/components/tableView/DataTable.jsx
import React, { useMemo, useState, useCallback } from "react";
import TableRow from "./TableRow";
import YearWiseTable from "./YearWiseTable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

/* Helpers */
const getNestedValue = (obj, path) =>
  path
    .split(".")
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : null),
      obj
    );

const formatHeader = (header) =>
  header
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/\./g, " ");

// ✅ Helper to get all years from batch
const getYearsFromBatch = (batch) => {
  if (!batch) return [];
  const match = batch.match(/(\d{4})\s*-\s*(\d{4})/);
  if (!match) return [];
  const start = parseInt(match[1], 10);
  const end = parseInt(match[2], 10);
  const years = [];
  for (let y = start; y < end; y++) {
    years.push(`${y}-${(y + 1).toString().slice(-2)}`);
  }
  return years;
};

export default function DataTable({
  students = [],
  selectedColumns = [],
  isLoading = false,
  error = null,
}) {
  // selection & filtering state
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState({ col: null, value: "" });

  // pagination
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(1);

  // Toggle filter column
  const toggleFilterFor = (col) => {
    if (activeFilter.col === col) {
      setActiveFilter({ col: null, value: "" });
    } else {
      setActiveFilter({ col, value: "" });
    }
  };

  const onFilterChange = (value) => setActiveFilter((s) => ({ ...s, value }));

  // Filtered list (single column)
  const filtered = useMemo(() => {
    if (!activeFilter.col || activeFilter.value.trim() === "") return students;
    const q = activeFilter.value.trim().toLowerCase();

    return students.filter((stu) => {
      const val = getNestedValue(stu, activeFilter.col);

      if (!val) return false;

      // Special handling for "batch" column
      if (activeFilter.col === "batch") {
        const match = String(val).match(/(\d{4})\s*-\s*(\d{4})/);
        if (match) {
          const startYear = parseInt(match[1], 10);
          const endYear = parseInt(match[2], 10);
          const year = parseInt(q, 10);
          if (!isNaN(year)) {
            return year >= startYear && year <= endYear;
          }
        }
      }

      // Default substring match
      return String(val).toLowerCase().includes(q);
    });
  }, [students, activeFilter]);

  // Pagination calculations
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const pageData = filtered.slice(start, start + pageSize);

  // Select toggles
  const toggleSelect = useCallback(
    (id) => {
      setSelectedRowIds((prev) => {
        const copy = new Set(prev);
        if (copy.has(id)) copy.delete(id);
        else copy.add(id);
        return copy;
      });
    },
    [setSelectedRowIds]
  );

  const clearSelection = () => setSelectedRowIds(new Set());

  const toggleSelectAllVisible = () => {
    const visibleIds = pageData.map((s) => s._id || s.applicantId);
    const allSelected = visibleIds.every((id) => selectedRowIds.has(id));
    setSelectedRowIds((prev) => {
      const copy = new Set(prev);
      if (allSelected) {
        visibleIds.forEach((id) => copy.delete(id));
      } else {
        visibleIds.forEach((id) => copy.add(id));
      }
      return copy;
    });
  };

  // ✅ Export functionality with year-wise flattening
  const exportToExcel = (mode = "visible") => {
    let dataToExport = [];
    if (mode === "all") dataToExport = students;
    else if (mode === "selected") {
      const sel = students.filter((s) =>
        selectedRowIds.has(s._id || s.applicantId)
      );
      dataToExport = sel;
    } else {
      dataToExport = filtered;
    }

    const rows = dataToExport.map((stu) => {
      const row = {};
      // student-level fields
      selectedColumns.forEach((col) => {
        const val = getNestedValue(stu, col);
        row[formatHeader(col)] = val ?? "";
      });
      row["Batch"] = stu.batch || "";

      // year-wise columns
      const years = getYearsFromBatch(stu.batch);
      years.forEach((year) => {
        const yearData = stu.yearWise?.[year] || {};
        row[`${year} Fee Paid`] = yearData.feePaid ?? "";
        row[`${year} Credited Amount`] = yearData.credited?.amount ?? "";
        row[`${year} Credited Bank`] = yearData.credited?.bank ?? "";
        row[`${year} Credited Account`] = yearData.credited?.accountNo ?? "";
        row[`${year} Credited Date`] = yearData.credited?.date
          ? new Date(yearData.credited.date).toLocaleDateString()
          : "";
        row[`${year} Granted 40%`] = yearData.granted40 ?? "";
        row[`${year} Granted 60%`] = yearData.granted60 ?? "";
      });

      return row;
    });

    const ws = XLSX.utils.json_to_sheet(rows);

    // auto column width
    const colWidths = Object.keys(rows[0] || {}).map((key) => ({
      wch: Math.max(
        key.length,
        ...rows.map((r) => String(r[key] || "").length)
      ),
    }));
    ws["!cols"] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `students_${mode}_${Date.now()}.xlsx`
    );
  };

  // UI states
  if (isLoading)
    return (
      <div className="text-center p-8 text-gray-500">
        Loading student data...
      </div>
    );
  if (error)
    return (
      <div className="text-center p-8 text-red-500">
        Error fetching data: {error}
      </div>
    );
  if (!students || students.length === 0)
    return (
      <div className="text-center p-8 text-gray-500">No students found.</div>
    );

  return (
    <div className="bg-white rounded-lg shadow-md border overflow-hidden">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600">Rows per page:</div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1 text-[14px]"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <button
            onClick={clearSelection}
            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Clear Selection
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToExcel("all")}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Export All
          </button>
          <button
            onClick={() => exportToExcel("visible")}
            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
          >
            Export Visible
          </button>
          <button
            onClick={() => exportToExcel("selected")}
            className="px-3 py-1 bg-yellow-600 text-black rounded text-sm hover:bg-yellow-700"
            disabled={selectedRowIds.size === 0}
          >
            Export Selected ({selectedRowIds.size})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse mb-2">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-3 py-2 border-b">
                <input
                  type="checkbox"
                  onChange={toggleSelectAllVisible}
                  checked={
                    pageData.length > 0 &&
                    pageData.every((s) =>
                      selectedRowIds.has(s._id || s.applicantId)
                    )
                  }
                />
              </th>
              {selectedColumns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 border-b font-semibold text-gray-600 text-xs uppercase tracking-wider"
                >
                  <div className="flex items-center gap-2">
                    <span>{formatHeader(col)}</span>
                    <button
                      onClick={() => toggleFilterFor(col)}
                      title={
                        activeFilter.col === col
                          ? "Remove filter"
                          : "Filter this column"
                      }
                      className={`p-1 rounded ${
                        activeFilter.col === col
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      🔍
                    </button>
                  </div>
                  {activeFilter.col === col && (
                    <div className="mt-2">
                      <input
                        value={activeFilter.value}
                        onChange={(e) => onFilterChange(e.target.value)}
                        placeholder={`Filter ${formatHeader(col)}...`}
                        className="w-full px-2 py-1 text-sm border rounded"
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {pageData.map((student) => (
              <React.Fragment key={student._id || student.applicantId}>
                <TableRow
                  student={student}
                  selectedColumns={selectedColumns}
                  isSelected={selectedRowIds.has(
                    student._id || student.applicantId
                  )}
                  toggleSelect={toggleSelect}
                />
                <tr>
                  <td
                    colSpan={selectedColumns.length + 1}
                    className="p-3 bg-gray-50"
                  >
                    <YearWiseTable
                      student={student}
                      years={getYearsFromBatch(student.batch)}
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between p-3 border-t">
        <div className="text-sm text-gray-600">
          Showing {start + 1} - {Math.min(start + pageSize, total)} of {total}{" "}
          students
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-2 py-1 border rounded disabled:opacity-40"
            disabled={page <= 1}
          >
            Prev
          </button>
          <div className="text-sm">
            Page{" "}
            <input
              type="number"
              value={page}
              onChange={(e) => {
                const v = Number(e.target.value) || 1;
                setPage(Math.min(Math.max(1, v), pages));
              }}
              className="w-14 px-2 py-1 border rounded text-center"
            />{" "}
            / {pages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            className="px-2 py-1 border rounded disabled:opacity-40"
            disabled={page >= pages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
