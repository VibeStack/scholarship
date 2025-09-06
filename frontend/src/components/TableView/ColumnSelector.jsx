// src/Components/tableView/ColumnSelector.jsx
export default function ColumnSelector({ allColumns, selectedColumns, setSelectedColumns }) {
  const handleToggle = (col) => {
    if (selectedColumns.includes(col)) {
      setSelectedColumns(selectedColumns.filter((c) => c !== col));
    } else {
      setSelectedColumns([...selectedColumns, col]);
    }
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-sm border">
      <h3 className="font-semibold mb-2">Select Columns to Display:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {allColumns.map((col) => (
          <label key={col} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedColumns.includes(col)}
              onChange={() => handleToggle(col)}
              className="h-4 w-4"
            />
            {col}
          </label>
        ))}
      </div>
    </div>
  );
}
