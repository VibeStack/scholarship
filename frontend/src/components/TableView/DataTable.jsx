// src/Components/tableView/DataTable.jsx
import TableRow from "./TableRow";

export default function DataTable({ students, selectedColumns }) {
  // Function to capitalize first letter
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {selectedColumns.map((col) => (
              <th key={col} className="px-4 py-2 border-b font-semibold text-gray-700">
                {capitalize(col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <TableRow key={student._id} student={student} selectedColumns={selectedColumns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
