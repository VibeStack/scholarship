import React from "react";

export default function YearWiseTable({ student, years = [] }) {
  const yearWise = student.yearWise || {};

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm mt-2 bg-white">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            <th className="px-4 py-2 border-b text-gray-700 font-semibold">Year</th>
            <th className="px-4 py-2 border-b text-gray-700 font-semibold">Fee Paid</th>
            <th className="px-4 py-2 border-b text-gray-700 font-semibold">Credited Amount</th>
            <th className="px-4 py-2 border-b text-gray-700 font-semibold">Credited Bank</th>
            <th className="px-4 py-2 border-b text-gray-700 font-semibold">Credited Account</th>
            <th className="px-4 py-2 border-b text-gray-700 font-semibold">Credited Date</th>
            <th className="px-4 py-2 border-b text-gray-700 font-semibold">Granted 40%</th>
            <th className="px-4 py-2 border-b text-gray-700 font-semibold">Granted 60%</th>
          </tr>
        </thead>
        <tbody>
          {years.map((year, idx) => {
            const data = yearWise[year] || {};
            return (
              <tr
                key={year}
                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-2">{year}</td>
                <td className="px-4 py-2">{data.feePaid ?? "-"}</td>
                <td className="px-4 py-2">{data.credited?.amount ?? "-"}</td>
                <td className="px-4 py-2">{data.credited?.bank ?? "-"}</td>
                <td className="px-4 py-2">{data.credited?.accountNo ?? "-"}</td>
                <td className="px-4 py-2">
                  {data.credited?.date ? new Date(data.credited.date).toLocaleDateString() : "-"}
                </td>
                <td className="px-4 py-2">{data.granted40 ?? "-"}</td>
                <td className="px-4 py-2">{data.granted60 ?? "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
