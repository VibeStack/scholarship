export default function InputField({
  label,
  id,
  type = "text",
  register,
  rules,
  errors,
  placeholder,
  icon,
}) {
  return (
    <div className="mb-4 relative">
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>
      <div className="relative mb-6">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...register(id, rules)}
        />
      </div>
      {errors[id] && (
        <p className="text-red-600 text-[12px] absolute -bottom-5 pl-1">
          {errors[id].message}
        </p>
      )}
    </div>
  );
}
