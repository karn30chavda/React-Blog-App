import { useId } from "react";

function Select({ options = [], label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-sm font-medium text-[#19647E]"
        ></label>
      )}
      <select
        id={id}
        ref={ref}
        className={`px-4 py-2 rounded-lg bg-white text-[#1F271B] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#28AFB0] focus:border-[#28AFB0] transition-all duration-200 w-full ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
