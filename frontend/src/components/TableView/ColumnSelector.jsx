import React, { useMemo, useState } from "react";

export default function ColumnSelector({ allColumns, selectedColumns, setSelectedColumns }) {
  const [query, setQuery] = useState("");

  const visibleColumns = useMemo(() => {

    if (!query) return allColumns;
    return allColumns.filter((c) => c.toLowerCase().includes(query.toLowerCase()));
  }, [allColumns, query]);

  const toggle = (col) => {
    if (selectedColumns.includes(col)) {
      setSelectedColumns(selectedColumns.filter((c) => c !== col));
    } else {
      setSelectedColumns([...selectedColumns, col]);
    }
  };

  const selectAllVisible = () => {
    const unique = Array.from(new Set([...selectedColumns, ...visibleColumns]));
    setSelectedColumns(unique);
  };

  const clearVisible = () => {
    setSelectedColumns(selectedColumns.filter((c) => !visibleColumns.includes(c)));
  };

  const formatColumnName = (col) => {
    // Remove dots and split camelCase
    return col
      .replace(/\./g, " ")                 // Replace dots with spaces
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase
      .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize each word
  };


  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow border">
      <div className="flex items-center justify-between mb-3 gap-2">
        <h3 className="font-bold text-gray-800">Columns</h3>
        <div className="flex gap-2">
          <button
            onClick={selectAllVisible}
            className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Select visible
          </button>
          <button
            onClick={clearVisible}
            className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Clear visible
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {visibleColumns.map((col) => (
          <label key={col} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={selectedColumns.includes(col)}
              onChange={() => toggle(col)}
              className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
            <span className="select-none">{formatColumnName(col)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
