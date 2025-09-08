import React from "react";

const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);

const formatDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

function Row({ student, selectedColumns, isSelected, toggleSelect }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-3 py-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelect(student._id || student.applicantId)}
          className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
      </td>
      {selectedColumns.map((col) => {
        const raw = getNestedValue(student, col);
        const display = col === "dob" ? formatDate(raw) : raw ?? "—";
        return (
          <td
            key={col}
            className="px-4 py-3 text-gray-700 text-sm text-center"
            title={String(display)}
          >
            {String(display)}
          </td>
        );
      })}
    </tr>
  );
}

export default React.memo(Row);
