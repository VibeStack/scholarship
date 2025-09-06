// src/Components/tableView/TableRow.jsx
export default function TableRow({ student, selectedColumns }) {
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : ""), obj);
  };

  return (
    <tr className="hover:bg-gray-50">
      {selectedColumns.map((col) => (
        <td key={col} className="px-4 py-2 border-b text-gray-600">
          {getValue(student, col)}
        </td>
      ))}
    </tr>
  );
}
