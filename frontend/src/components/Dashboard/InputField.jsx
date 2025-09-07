export default function InputField({
  label,
  id,
  register,
  rules,
  errors,
  placeholder = "",
  type = "text",
  className = "",
  ...rest
}) {
  return (
    <div className="mb-4 pb-4 relative">
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder || `Enter ${label}`}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...register(id, rules)}
        {...rest}
      />
      {/* ✅ Fix: handle nested error object */}
      {errors?.message && (
        <p className="text-red-600 text-[12px] mt-1 pl-2 absolute">{errors.message}</p>
      )}
    </div>
  );
}
