// src/Components/Dashboard/SelectField.jsx
export default function SelectField({
  label,
  id,
  options,
  register,
  rules,
  errors,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-1">
        {label}
      </label>
      <select
        id={id}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register(id, rules)}
      >
        <option value="">Select {label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
