import { useEffect, useState } from "react";
import InputField from "./InputField";

export default function YearWiseField({
  register,
  yearWiseStart,
  degreeDuration,
}) {
  const [years, setYears] = useState([]);

  // Generate all years automatically
  useEffect(() => {
    if (!yearWiseStart || !degreeDuration) return;

    const generatedYears = [];
    let start = parseInt(yearWiseStart);

    for (let i = 0; i < degreeDuration; i++) {
      const startYear = start + i;
      const endYear = (start + i + 1).toString().slice(-2); // last two digits
      const yearLabel = `${startYear}-${endYear}`;
      generatedYears.push(yearLabel);
    }

    setYears(generatedYears);
  }, [yearWiseStart, degreeDuration]);

  return (
    <div className="bg-white p-4 rounded-lg border mb-6">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">
        Year-wise Fee Details
      </h2>

      {years.map((year) => (
        <div
          key={year}
          className="border p-4 rounded-lg mb-4 bg-gray-50 relative"
        >
          <div className="flex items-center justify-center mb-4 text-black font-extrabold px-4 py-2 rounded-lg relative">
            <h3 className="text-lg">Details of Year {year}</h3>
          </div>

          <InputField
            label="Fee Paid"
            id={`yearWise.${year}.feePaid`}
            register={register}
            type="number"
          />

          <InputField
            label="Bank Amount"
            id={`yearWise.${year}.credited.amount`}
            register={register}
            type="number"
          />

          <InputField
            label="Bank Name"
            id={`yearWise.${year}.credited.bank`}
            register={register}
          />

          <InputField
            label="Account No"
            id={`yearWise.${year}.credited.accountNo`}
            register={register}
          />

          <InputField
            label="Date"
            id={`yearWise.${year}.credited.date`}
            register={register}
            type="date"
          />

          <InputField
            label="40% Granted"
            id={`yearWise.${year}.granted40`}
            register={register}
            type="number"
          />

          <InputField
            label="60% Granted"
            id={`yearWise.${year}.granted60`}
            register={register}
            type="number"
          />
        </div>
      ))}
    </div>
  );
}
