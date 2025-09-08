import React from "react";

export default function YearWiseTable({ student, years = [] }) {
  const yearWise = student.yearWise || {};

  const columns = ["Year","Fee Paid","Credited Amount","Credited Bank","Credited Account","Credited Date","Granted 40%","Granted 60%"]

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            {
              columns.map((col)=>{
                return (<th key={crypto.randomUUID()} className="px-4 py-2 border-b text-gray-700 font-semibold text-center">{col}</th>)
              })
            }
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
                <td className="px-4 py-2 text-center">{year}</td>
                <td className="px-4 py-2 text-center">{data.feePaid ?? "-"}</td>
                <td className="px-4 py-2 text-center">{data.credited?.amount ?? "-"}</td>
                <td className="px-4 py-2 text-center">{data.credited?.bank ?? "-"}</td>
                <td className="px-4 py-2 text-center">{data.credited?.accountNo ?? "-"}</td>
                <td className="px-4 py-2 text-center">
                  {data.credited?.date ? new Date(data.credited.date).toLocaleDateString() : "-"}
                </td>
                <td className="px-4 py-2 text-center">{data.granted40 ?? "-"}</td>
                <td className="px-4 py-2 text-center">{data.granted60 ?? "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
