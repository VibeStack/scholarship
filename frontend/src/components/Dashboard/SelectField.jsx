export default function SelectField({
  label,
  id,
  options,
  register,
  rules,
  errors,
  disabled = false,
}) {
  return (
    <div className="mb-4 relative">
      <label
        htmlFor={id}
        className={`block font-semibold mb-1 ${
          disabled ? "text-gray-400" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <select
        id={id}
        disabled={disabled} // ✅ apply here
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
          disabled
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        {...register(id, rules)}
      >
        <option value="">Select {label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {/* ✅ Error handling */}
      {errors?.message && !disabled && (
        <p className="text-red-600 text-[12px] mt-1 pl-2 absolute">
          {errors.message}
        </p>
      )}
    </div>
  );
}
